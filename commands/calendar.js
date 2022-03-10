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
    const events = ical.sync.parseFile('feed.ics');
    // loop through events and log them
    const url = 'https://adelantelms.usjr.edu.ph/d2l/le/calendar/feed/user/feed.ics?token=aae2xhrhc1fx58ug283a';
  
    https.get(url,(res) => {
        // Image will be stored at this path
        const path = `feed.ics`; 
        const filePath = fs.createWriteStream(path);
        res.pipe(filePath);
        filePath.on('finish',() => {
            filePath.close();
            console.log('Download Completed'); 
        })
    })
    var totalTask = 0;
    setTimeout(()=>{
      var today = new Date()
       for (const event of Object.values(events)) {
         var localDay = event.end.toLocaleDateString("en-SG",{ day: 'numeric'})
         var localYear = event.end.toLocaleDateString("en-SG",{ year: 'numeric'})
         var localMonth = event.end.toLocaleDateString("en-SG",{ month: 'numeric'})

         
      if((event.summary.toString().slice((event.summary.toString().length-3,event.summary.toString().length) == "Due") || (event.summary.toString().slice(event.summary.toString().length-4,event.summary.toString().length) == "Ends")) && (localYear >= today.getYear()&&localMonth == today.getMonth()+1 && localDay >= today.getDate() || localYear >= today.getYear()&&localMonth > today.getMonth()+1) && (today.getTime() < event.end.getTime()) ){
        totalTask++
        event.end.getTime();
        embed.addField(months[event.end.getMonth()] + " " + event.end.getDate() + " | " + event.end.toLocaleTimeString("en-SG",{ hour: '2-digit', minute:'2-digit',timeZone: "Asia/Singapore" }),event.location+ ` \n`+" "+ event.summary,false)
      }
      
    };
    embed.setTitle(`USJ-R BS Computer Engineering | CPE1_1 | Total Tasks: ${totalTask}`)
    message.channel.send({ embeds: [embed] })
},2500)
    
  },
}