import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch';
import { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior } from '@discordjs/voice';

// Command Builder export
export const data = new SlashCommandBuilder()
    .setName('skip_music')
    .setDescription('Skips the current song playing!');

// Execute function export
// async means that we need for this function to finish before moving on
export async function execute(interaction, player, queue) {
    
    // it should just stop and put the player into Idle so we can hit
    // the Idle logic which will play the next song in the queue
    player.stop();
    await interaction.reply({ content: `Skipping the first song`, ephemeral: true });
}