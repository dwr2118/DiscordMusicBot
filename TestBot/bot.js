import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import * as choochoo from "./commands/choochoo.js";
import * as play_music from "./commands/play_music.js";
import * as pause_music from "./commands/pause_music.js";
import * as resume_music from "./commands/resume_music.js";
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, NoSubscriberBehavior } from "@discordjs/voice";

// puts all contents from .env into variable process which can be indexed
// to grab the specific hidden env variables
config(); 

// queue for the songs to play 
let queue = [];

// base property is intents, which is an array of GatewayIntentBits
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// create an audio player that can be paused or played 
const player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
    },
});

// event handler for once the client is ready 
function readyDiscord() {
    console.log('I am ready ' + client.user.tag);
}

async function handleInteraction(interaction) {
    // checks if the command is an actual command listed within the commands dir
    if (!interaction.isChatInputCommand()) return; 

    // grab the actual name of the command, interaction's property commandName
    const { commandName } = interaction;

    if (commandName === 'choochoo') {
        // choochoo is async function so we need to wait for it 
        // choochoo already exported 
        await choochoo.execute(interaction);
    }else if(commandName === 'play_music'){

        const member = interaction.member;
        // Check if the member is connected to a voice channel
        if (member && member.voice && member.voice.channel) {
            // Get the voice channel
            const channel = member.voice.channel;
            console.log(`User is in voice channel: ${channel.name}`);
            
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            await play_music.execute(interaction, connection, player, queue);

        } else {
            console.log('User is not in a voice channel');
            await interaction.reply({ content: `Please join a voice channel first`, ephemeral: true });
        }
    }else if( commandName === 'pause_music'){
        await pause_music.execute(interaction, player);
    }
    else if( commandName === 'resume_music'){
        await resume_music.execute(interaction, player);
    }
}

player.on(AudioPlayerStatus.Playing, () => {
	console.log('The audio player has started playing!');
});

player.on(AudioPlayerStatus.Idle, () => {

    console.log('Going to play the next song in the queue.');
    // if(queue.length > 0){
    //     console.log('Going to play the next song in the queue.');
    //     player.play(queue.shift());
    //     connection.subscribe(player);
    // }
    
});



// event handler for when the bot is ready at the beginning
client.once(Events.ClientReady, readyDiscord);

// make the bot actually login 
client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, handleInteraction);