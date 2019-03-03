/**
 * A Bot for Slack!
 */

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
 * TODO: fixed b0rked reconnect behavior
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
// BEGIN EDITING HERE!

controller.on('bot_channel_join', function (bot, message) {
    bot.reply(message, "I'm here!")
});




controller.hears('look sad', 'direct_message,mention,direct_mention', function (bot, message) {
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": "https://user-images.githubusercontent.com/10780489/53689635-24fc2000-3d28-11e9-81f6-0e4a80baa428.png"
    },
]
});
});

controller.hears('look happy', 'direct_message,mention,direct_mention', function (bot, message) {
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": "https://user-images.githubusercontent.com/10780489/53689637-29283d80-3d28-11e9-9c93-cdbccf3c6f8e.png"
    },
]
});
});

controller.hears('look excited', 'direct_message,mention,direct_mention', function (bot, message) {
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": "https://user-images.githubusercontent.com/10780489/53689637-29283d80-3d28-11e9-9c93-cdbccf3c6f8e.png"
    },
]
});
});

controller.hears('look angry', 'direct_message,mention,direct_mention', function (bot, message) {
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": "https://user-images.githubusercontent.com/10780489/53689634-24fc2000-3d28-11e9-9363-d5c5728128f6.png"
    },
]
});
});

controller.hears('look dissapointed', 'direct_message,mention,direct_mention', function (bot, message) {
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": "https://user-images.githubusercontent.com/10780489/53689636-24fc2000-3d28-11e9-9ce3-dec3c8b116b2.png"
    },
]
});
});

controller.hears('look tired', 'direct_message,mention,direct_mention', function (bot, message) {
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": "https://user-images.githubusercontent.com/10780489/53689633-24fc2000-3d28-11e9-93e8-9e7bc368f0a6.png"
    },
]
});
});

controller.hears('look ok', 'direct_message,mention,direct_mention', function (bot, message) {
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": "https://user-images.githubusercontent.com/10780489/53689633-24fc2000-3d28-11e9-93e8-9e7bc368f0a6.png"
    },
]
});
});

controller.hears('look fine', 'direct_message,mention,direct_mention', function (bot, message) {
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": "https://user-images.githubusercontent.com/10780489/53689633-24fc2000-3d28-11e9-93e8-9e7bc368f0a6.png"
    },
]
});
});

controller.hears('look scared', 'direct_message,mention,direct_mention', function (bot, message) {
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": "https://user-images.githubusercontent.com/10780489/53689636-24fc2000-3d28-11e9-9ce3-dec3c8b116b2.png"
    },
]
});
});

controller.hears('look bored', 'direct_message,mention,direct_mention', function (bot, message) {
    bot.reply(message, {
      "text": "",
      "attachments": [
    {
        "fields": [],
        "image_url": "https://user-images.githubusercontent.com/10780489/53689636-24fc2000-3d28-11e9-9ce3-dec3c8b116b2.png"
    },
]
});
});

controller.hears('look hello', 'direct_message,mention,direct_mention', function (bot, message) {
    bot.reply(message, 'Hello!');
});

controller.hears('Whose a good boy?', 'mention,direct_mention,direct_message', function (bot, message) {
    bot.reply(message, 'Woof!');
});

// controller.hears('go', 'direct_message', function (bot, message) {
//     bot.reply(message, '/remind @rafaelzingle hi at 4:08PM');
// });

/**
 * AN example of what could be:
 * Any un-handled direct mention gets a reaction and a pat response!
 */
controller.hears('go', 'direct_message,mention,direct_mention', function (bot, message) {
    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face'
    }, function (err) {
        if (err) {
            console.log(err)
        }
        bot.reply(message, "Hi!!!!!");
  });
});
