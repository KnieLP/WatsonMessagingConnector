var prompt = require('prompt-sync')();
var MyCoolAgent = require('./MyCoolAgent');

var openConvs = {};

var echoAgent = new MyCoolAgent({
  accountId: '71715659',
  username: 'knie@liveperson.com',
  password: 'Password1!!'
});

var context = {};
var dialogID = "";
var chatID = "";

var BOT_ID = 'a73ccfa6-caf3-4807-926f-cf5cd605d1be';
var XIBMClientID: '50b4cda7-ccd4-4d5f-bca3-d5ee10f4e70c',
var XIBMClientSecret: 'B7oB6rJ2rH8oA7iB1mG5rW1yG0dK3nB5wD8iB3pY4cG0yO8fA5'

echoAgent.on('MyCoolAgent.ContentEvnet',(contentEvent)=>{
    if (contentEvent.message.startsWith('#close')) {
        echoAgent.updateConversationField({
            conversationId: contentEvent.dialogId,
            conversationField: [{
                    field: "ConversationStateField",
                    conversationState: "CLOSE"
                }]
        });
    } else {
        dialogID = contentEvent.dialogId;
        /*
        conversation.message({
          input: { text: contentEvent.message },
          context : context
        },processResponse); */

        console.log("sending message: " + contentEvent.message);
    }
});
