import { SlashCommandBuilder } from 'discord.js';

// Command Builder export
export const data = new SlashCommandBuilder()
    .setName('choochoo')
    .setDescription('Replies choo choo!');

// Execute function export
// async means that we need for this function to finish before moving on
export async function execute(interaction) {
    // console.log('Interaction from using slash command'+interaction);
    await interaction.reply('Choo choo!');
}