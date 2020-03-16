const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Search for stuff.',
      runIn: ['text'],
      cooldown: 600,
    });
  }

  async run(msg) {
    const reward = Math.round(Math.random() * (500 - 20) + 20);
    msg.author.settings.update('balance', msg.author.settings.get('balance') + reward);
    const response = [`You searched and found ${msg.guild.settings.get('currency')}**${reward}**`];
    const itemsToFind = require('../../../config/items/inv_items.json');
    if (Math.round(Math.random() * 6) === 1) {
      const itemFound = itemsToFind[Math.round(Math.random() * (itemsToFind.length - 1))];
      const currentItems = msg.author.settings.items;
      currentItems.push(itemFound.codename);
      msg.author.settings.update('items', currentItems, { action: 'overwrite' });
      response.push(`, and a ${itemFound.title}`);
    }
    msg.send(
      new MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setColor('GREEN')
        .setDescription(response.join('')),
    );
  }
};