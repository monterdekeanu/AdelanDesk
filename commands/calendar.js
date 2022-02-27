
const { MessageEmbed, MessageAttachment, Message } = require('discord.js');
const ical = require('node-ical');
const path = require('path');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
module.exports = {
  category: 'help',
  description: 'Returns Student Schedule',
  callback: async ({ interaction, message, text }) => {
    const embed = new MessageEmbed().setColor('GREEN').setTitle("USJ-R BS Computer Engineering | CPE1_1")
    // use the sync function parseFile() to parse this ics file
    const events = ical.sync.parseFile('feed.ics');
    // loop through events and log them
    for (const event of Object.values(events)) {
      if(event.summary.toString().slice(event.summary.toString().length-3,event.summary.toString().length) == "Due" ){
        embed.addField(months[event.end.getMonth()] + " " + event.end.getDate() + " | " + event.end.toLocaleTimeString("en-US"),event.location+ ` \n`+" "+ event.summary,false)
      }
      
    };
    message.channel.send({ embeds: [embed] })
  },
}