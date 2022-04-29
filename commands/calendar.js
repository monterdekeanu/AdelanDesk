const fs = require('fs');
const https = require('https');
const { MessageEmbed, MessageAttachment, Message } = require('discord.js');
const ical = require('node-ical');
const path = require('path');
const { clear } = require('console');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
module.exports = {
  category: 'help',
  description: 'Returns Student Schedule',
  callback: async ({ interaction, message, text }) => {
    const embed = new MessageEmbed().setColor('GREEN')
    var calendarDb = await require('../db/calendar.json');
    var flag = 0;

    function retrieveCalendar(calendarDb) {
      return new Promise(resolve => {
        calendarDb.some(block => { //Download Calendar for User
          if (block[0] == message.author.username + "#" + message.author.discriminator) {
            const url = block[1];
            flag = 1
            https.get(url, (res) => {
              const path = `feed.ics`;
              const filePath = fs.createWriteStream(path);
              res.pipe(filePath);
              filePath.on('finish', () => {
                resolve("Calendar Retrieved")
                filePath.close();
              })
            })
          }
        })

        
      })
    }
    const calendarStatus = await retrieveCalendar(calendarDb)
    console.log(calendarStatus + " for " + message.author.username)
    var totalTask = 0;
    const events = await ical.sync.parseFile('feed.ics');
    var today = new Date()
    for (const event of Object.values(events)) { // Listing of Events
      try {
        var localDay = event.end.toLocaleDateString("en-SG", { day: 'numeric' })
        var localYear = event.end.toLocaleDateString("en-SG", { year: 'numeric' })
        var localMonth = event.end.toLocaleDateString("en-SG", { month: 'numeric' })
        if (((event.summary.toString().slice(event.summary.toString().length - 3, event.summary.toString().length) == "Due")||(event.summary.toString().slice(event.summary.toString().length - 4, event.summary.toString().length) == "Ends")) && ((localYear >= today.getYear()) && (localMonth == today.getMonth() + 1) && (localDay >= today.getDate()) || (localYear >= today.getYear()) && (localMonth > today.getMonth() + 1) && (today.getTime() < event.end.getTime()))) {
          totalTask++
          event.end.getTime();
          embed.addField(months[event.end.getMonth()] + " " + event.end.getDate() + " | " + event.end.toLocaleTimeString("en-SG", { hour: '2-digit', minute: '2-digit', timeZone: "Asia/Singapore" }), event.location + ` \n` + " " + event.summary, false)
        }

      } catch (err) {
        console.log(err)
      }
    };
    
    totalTask = clearDuplicate(embed,totalTask)
    embed.setTitle(`USJ-R Schedule for: ${message.author.username} | Total Tasks: ${totalTask}`)
    message.channel.send({ embeds: [embed] })

    if (flag == 0) {
      message.channel.send(message.author.username + " is not registered");
    }

  },
}


function clearDuplicate(embed,totalTask){
  const regexDue = /Availability Ends/i
    for(var x = 0; x < embed.fields.length;x++){
      
      embed.fields[x].value = embed.fields[x].value.replace(regexDue,'Due')
    }
    for(var x = 0; x < embed.fields.length;x++){
      for(var j = x+1; j < embed.fields.length;j++){
        
        if(embed.fields[x].value.localeCompare(embed.fields[j].value)==0){
          totalTask--
          embed.fields.splice(x,1)
        }
      }
    }
    return totalTask
}