import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch';
import { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior } from '@discordjs/voice';

// Command Builder export
export const data = new SlashCommandBuilder()
    .setName('pause_music')
    .setDescription('Pauses the current playing song!');

// Execute function export
// async means that we need for this function to finish before moving on
export async function execute(interaction, player) {

    player.pause();
    await interaction.reply({ content: `Pause the current song!`, ephemeral: true });
    
}