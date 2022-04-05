const fs = require('fs');
const https = require('https');
const { MessageEmbed, MessageAttachment, Message } = require('discord.js');
const ical = require('node-ical');
const path = require('path');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
module.exports = {
  category: 'help',
  description: 'Returns Student Schedule',
  callback: async ({ interaction, message, text }) => {
    const embed = new MessageEmbed().setColor('GREEN')
    // use the sync function parseFile() to parse this ics file
   
    // loop through events and log them
    var calendarDb = require('../db/calendar.json');
    var flag = 0;
    var status = 0;
    calendarDb.some(block =>{
      if(block[0]==message.author.username + "#" + message.author.discriminator){
        const url = block[1];
        flag=1
        https.get(url, (res) => {
      const path = `feed.ics`;
      const filePath = fs.createWriteStream(path);
      res.pipe(filePath);
      filePath.on('finish', () => {
        filePath.close();
        console.log('Download Completed: ' + message.author.username);
      })
    })
    
    var totalTask = 0;
    setTimeout(() => { 
      const events = ical.sync.parseFile('feed.ics');
      var today = new Date()
      for (const event of Object.values(events)) {
        try{
          var localDay = event.end.toLocaleDateString("en-SG", {day: 'numeric'})
        var localYear = event.end.toLocaleDateString("en-SG", { year: 'numeric' })
        var localMonth = event.end.toLocaleDateString("en-SG", { month: 'numeric' })
        if ((event.summary.toString().slice(event.summary.toString().length - 3, event.summary.toString().length) == "Due") && ((localYear >= today.getYear()) && (localMonth == today.getMonth() + 1) && (localDay >= today.getDate()) || (localYear >= today.getYear()) && (localMonth > today.getMonth() + 1) && (today.getTime() < event.end.getTime()))) {
          totalTask++
          event.end.getTime();
          embed.addField(months[event.end.getMonth()] + " " + event.end.getDate() + " | " + event.end.toLocaleTimeString("en-SG", { hour: '2-digit', minute: '2-digit', timeZone: "Asia/Singapore" }), event.location + ` \n` + " " + event.summary, false)
        }

        }catch(err){
          console.log(err)
        }
      };
      embed.setTitle(`USJ-R Schedule for: ${message.author.username} | Total Tasks: ${totalTask}`)
      message.channel.send({ embeds: [embed] })
    }, 3000)
        
      }
    })
    if(flag == 0){
      message.channel.send(message.author.username + " is not registered");
    }

  },
}