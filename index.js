var MyCoolAgent = require('./MyCoolAgent');
var request = require("request");

var openConvs = {};

var echoAgent = new MyCoolAgent({
  accountId: '{Your Key}',
  username: '{Your Key}',
  password: '{Your Key}'
});

var xClientID = "{Your Key}";
var xClientSecret = "{Your Key}"
var botID = "{Your Key}";

var context = {};
var dialogID = "";
var watsondialog = "";

echoAgent.on('MyCoolAgent.ContentEvnet',(contentEvent)=>{
  if (contentEvent.message.startsWith('#close')) {
    echoAgent.updateConversationField({
      conversationId: contentEvent.dialogId,
      conversationField: [{
        field: "ConversationStateField",
        conversationState: "CLOSE"
      }]
    });
    console.log("closed conversation");
  } else {
    dialogID = contentEvent.dialogId;
    var url = "https://api.ibm.com/virtualagent/run/api/v1/bots/"+botID+"/dialogs/"+watsondialog+"/messages?version=2016-09-16";
    var body = {
      "message": contentEvent.message,
      "context":context
      };
    sendRequest(url, body);
    console.log("sending message: " + contentEvent.message);
  }
});

echoAgent.on('MyCoolAgent.connectToWatson',(contentEvent)=>{ 
  var url = "https://api.ibm.com/virtualagent/run/api/v1/bots/"+botID+"/dialogs?version=2016-09-16";
  var body = {};
  sendRequest(url, body);
});

function sendRequest(url, body) {
  request.post({
    url: url,
    body: body,
    json: true,
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "X-IBM-Client-Id": xClientID,
      "X-IBM-Client-Secret": xClientSecret
    }
  }, function (e, r, b) {
    console.log(JSON.stringify(b));
    context = b.message.context;
    watsondialog = b.dialog_id;
    echoAgent.publishEvent({
      dialogId: dialogID,
      event: {
          type: 'ContentEvent', 
          contentType: 'text/plain', 
          message: b.message.text[0]
      }
    });
  });
}