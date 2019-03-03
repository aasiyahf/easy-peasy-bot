/**
 * A Bot for Slack!
 */

/*
* A list of AarfDog icons
*/
var sadDog = "https://user-images.githubusercontent.com/10780489/53689635-24fc2000-3d28-11e9-81f6-0e4a80baa428.png";
var happyDog = "https://user-images.githubusercontent.com/10780489/53689637-29283d80-3d28-11e9-9c93-cdbccf3c6f8e.png";
var madDog = "https://user-images.githubusercontent.com/10780489/53689634-24fc2000-3d28-11e9-9363-d5c5728128f6.png";
var tiredDog = "https://user-images.githubusercontent.com/10780489/53689633-24fc2000-3d28-11e9-93e8-9e7bc368f0a6.png";
var scaredDog = "https://user-images.githubusercontent.com/10780489/53689636-24fc2000-3d28-11e9-9ce3-dec3c8b116b2.png";

/*
* Lists with different pictures for each emotion
*/
var sad = ["https://user-images.githubusercontent.com/10780489/53698362-b2338900-3da9-11e9-9b7c-efbf5f1c3bfd.gif"];
var happy = ["https://user-images.githubusercontent.com/10780489/53698359-a47e0380-3da9-11e9-9e4e-03200a4d0a82.gif",
"https://user-images.githubusercontent.com/10780489/53698360-a47e0380-3da9-11e9-94e8-b8f8fc3d7223.gif",
"https://user-images.githubusercontent.com/10780489/53698361-a47e0380-3da9-11e9-9fdf-cf1998cacc02.gif"];
var mad = ["https://user-images.githubusercontent.com/10780489/53698363-b790d380-3da9-11e9-9737-394d748fcfb8.gif",
"https://user-images.githubusercontent.com/10780489/53698364-b790d380-3da9-11e9-8b09-68f32ca4a243.gif"];
var tired = ["https://user-images.githubusercontent.com/10780489/53698375-d1321b00-3da9-11e9-8a25-16dd02b23be3.gif",
"https://user-images.githubusercontent.com/10780489/53698376-d1321b00-3da9-11e9-80bf-c7cf065aac14.gif"];
var scared = ["https://user-images.githubusercontent.com/10780489/53698365-bbbcf100-3da9-11e9-9304-b44c907732b1.gif"];

/**
 * Define a function for initiating a conversation on installation
 * With custom integrations, we don't have a way to find out who installed us, so we can't message them :(
 */

function onInstallation(bot, installer) {
    if (installer) {
        bot.startPrivateConversation({user: installer}, function (err, convo) {
            if (err) {
                console.log(err);
            } else {
                convo.say('I am a bot that has just joined your team');
                convo.say('You must now /invite me to a channel so that I can be of use!');
            }
        });
    }
}


/**
 * Configure the persistence options
 */

var config = {};
if (process.env.MONGOLAB_URI) {
    var BotkitStorage = require('botkit-storage-mongo');
    config = {
        storage: BotkitStorage({mongoUri: process.env.MONGOLAB_URI}),
    };
} else {
    config = {
        json_file_store: ((process.env.TOKEN)?'./db_slack_bot_ci/':'./db_slack_bot_a/'), //use a different name if an app or CI
    };
}

/**
 * Are being run as an app or a custom integration? The initialization will differ, depending
 */

if (process.env.TOKEN || process.env.SLACK_TOKEN) {
    //Treat this as a custom integration
    var customIntegration = require('./lib/custom_integrations');
    var token = (process.env.TOKEN) ? process.env.TOKEN : process.env.SLACK_TOKEN;
    var controller = customIntegration.configure(token, config, onInstallation);
} else if (process.env.CLIENT_ID && process.env.CLIENT_SECRET && process.env.PORT) {
    //Treat this as an app
    var app = require('./lib/apps');
    var controller = app.configure(process.env.PORT, process.env.CLIENT_ID, process.env.CLIENT_SECRET, config, onInstallation);
} else {
    console.log('Error: If this is a custom integration, please specify TOKEN in the environment. If this is an app, please specify CLIENTID, CLIENTSECRET, and PORT in the environment');
    process.exit(1);
}


/**
 * A demonstration for how to handle websocket events. In this case, just log when we have and have not
 * been disconnected from the websocket. In the future, it would be super awesome to be able to specify
 * a reconnect policy, and do reconnections automatically. In the meantime, we aren't going to attempt reconnects,
 * WHICH IS A B0RKED WAY TO HANDLE BEING DISCONNECTED. So we need to fix this.
 *
 */
// Handle events related to the websocket connection to Slack
controller.on('rtm_open', function (bot) {
    console.log('** The RTM api just connected!');
});

controller.on('rtm_close', function (bot) {
    console.log('** The RTM api just closed');
    // you may want to attempt to re-open
});

/**
 * Core bot logic goes here!
 */

controller.on('bot_channel_join', function (bot, message) {
    bot.reply(message, "I'm here!")
});

/*
* List of dog icons
*/
var icons = [sadDog, happyDog, madDog, tiredDog, scaredDog];

/*
* Function to pick a random number
*/
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/*
* Function to return a random dog icon
*/
controller.hears(['how are you?', 'How are you?'], 'direct_mention,direct_message,mention', function (bot, message) {
  var icon = getRandomInt(icons.length);
  bot.reply(message, {
    "text": "",
    "attachments": [
      {
        "fields": [],
        "image_url": icons[icon]
      }
    ]
  })
});

controller.hears(['sad', 'Sad'], 'direct_message,mention,direct_mention', function (bot, message) {
  var pic = getRandomInt(sad.length);
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": sad[pic]
    },
]
});
});

controller.hears(['happy', 'Happy', 'excited', 'Excited'], 'direct_message,mention,direct_mention', function (bot, message) {
    var pic = getRandomInt(happy.length);
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": happy[pic]
    },
]
});
});

controller.hears(['mad', 'Mad', 'angry', 'Angry'], 'direct_message,mention,direct_mention', function (bot, message) {
  var pic = getRandomInt(mad.length);
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": mad[pic]
    },
]
});
});

controller.hears(['tired', 'Tired', 'sleepy', 'Sleepy'], 'direct_message,mention,direct_mention', function (bot, message) {
  var pic = getRandomInt(tired.length);
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": tired[pic]
    },
]
});
});

controller.hears(['scared', 'Scared', 'frightened', 'Frightened'], 'direct_message,mention,direct_mention', function (bot, message) {
  var pic = getRandomInt(scared.length);
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": scared[pic]
    },
]
});
});

controller.hears(['hello', 'Hello'], 'direct_message,mention,direct_mention', function (bot, message) {
    bot.reply(message, 'Hello!');
});

controller.hears(['Whose a good boy?', 'Who\'s a good boy?'], 'mention,direct_mention,direct_message', function (bot, message) {
    bot.reply(message, 'Woof!');
});

controller.hears(['Go', 'GO', 'go'], 'direct_message,mention,direct_mention', function (bot, message) {
    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'hugging_face'
    }, function (err) {
        if (err) {
            console.log(err)
        }
        bot.reply(message, "Hi!!!!!");
  });
});
