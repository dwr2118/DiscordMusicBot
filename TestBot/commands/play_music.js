import { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } from '@discordjs/voice';
import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch';
import ytdl from 'ytdl-core';


// Command Builder export
export const data = new SlashCommandBuilder()
    .setName('play_music')
    .setDescription('Queries YT API for songs!')
    // allows for user to send a string input to the bot
    .addStringOption(option =>
		option.setName('link-or-song-name')
			.setDescription('Enter song name or link to play!')
            .setRequired(true));

// Execute function export
// async means that we need for this function to finish before moving on
export async function execute(interaction, connection, player, queue) {

    // Subscribe the connection to the audio player (will play audio on the voice connection)
    const subscription = connection.subscribe(player);

    // // subscription could be undefined if the connection is destroyed!
    // if (subscription) {
    //     // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
    //     setTimeout(() => subscription.unsubscribe(), 5_000);
    // }

    // grab the string input from the user
    const request = interaction.options.getString('link-or-song-name');

    // youtube API Key in process.env.YTAPIKEY
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${request}&key=${process.env.YTAPIKEY}`;
    let response = await fetch(url);
    let json = await response.json();
    // console.log(json.items);

    let videoId = json.items[0].id.videoId;
    let videoTitles = json.items[0].snippet.title;
    // Grab the first JSON item that is a youtube video 
    if(json.items[0].id.videoId == null){
        for(let i = 0; i < json.items.length; i++){
            if(json.items[i].id.videoId != null){
                videoId = json.items[i].id.videoId;
                videoTitles = json.items[i].snippet.title;
                break;
            }
        }
    }

    let videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // use ephemeral responses to the user to let them know which songs 
    // to pick from the Youtube grab 
    await interaction.reply({ content: `From ${request}, playing: ${videoTitles}`, ephemeral: true });

    // Stream audio from YouTube
    const stream = ytdl(videoUrl, { filter: 'audioonly' });
    const resource = createAudioResource(stream);
    queue.push(resource);

    // define the audio resource from the youtube searches 
    // const resource = createAudioResource('./assets/kevgenix.mp3');
    // player.play(resource);
    // connection.subscribe(player);
}




            // if (play_first === 0){
            //     player.play(queue.shift());
            //     connection.subscribe(player);
            //     play_first = 1;
            // }
            

            // player.on(AudioPlayerStatus.Playing, () => {
            //     console.log("Wait for the current song to end!");
            // });

            // player.on(AudioPlayerStatus.Idle, () => {
            //     console.log('Player has gone idle! Potentially going to play next song in queue.');

            //     if(queue.length > 0){
            //         player.play(queue.shift());
            //         connection.subscribe(player);
            //     }

            // });