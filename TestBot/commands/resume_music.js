import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch';
import { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior } from '@discordjs/voice';

// Command Builder export
export const data = new SlashCommandBuilder()
    .setName('resume_music')
    .setDescription('Pauses the current playing song!');

// Execute function export
// async means that we need for this function to finish before moving on
export async function execute(interaction, player) {
    
    // Unpause after 5 seconds
    setTimeout(() => player.unpause(), 1_000);
    await interaction.reply({ content: `Resume the current song!`, ephemeral: true });
}