console.log('Beep Beep');

// grabs the Discord object to use discord API 
const Discord = require('discord.js');
require("dotenv").config();

// TODO: figure out what intents are needed for the idea voice to music bot 
const client = new Discord.Client({ 
    intents: [  
        Discord.GatewayIntentBits.Guilds, 
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ]
})

// event handlers is how interactions works w/ bot

// handles ANY particular event, ready = on bot startup? 
// and readyDiscord is function to be executed
client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('I am ready');
}

// message event handler for whenever a message was sent ever 
client.on('messageCreate', gotMessage);

function gotMessage(msg) {

    console.log(msg.content);
    
    // checking if chama was typed in music-channel
    if(msg.content === 'chama' && msg.channel.id == '691702595227746326'){

        // msg.channel.send('Chama 💀');
        msg.reply('Chama 💀');

    }
}

// Token stored privately within .env file
client.login(process.env.BOTTOKEN);
