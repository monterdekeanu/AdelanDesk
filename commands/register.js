const fs = require('fs');
const path = require('path');
module.exports = {
  category: 'help',
  description: 'Returns Student Schedule',
  callback: async ({ interaction, message, text }) => {

    var isFound = 0;
    fs.readFile('./db/calendar.json', 'utf-8', (err, jsonString) => {
      if (err) {
        console.log(err)
      } else {
        var data = JSON.parse(jsonString);
        
        if (text.match(/https:\/\/adelantelms.usjr.edu.ph\/d2l\/le\/calendar\/feed\/user/) != null) {
          data.forEach(object =>{
            if(object[0] == message.author.username + "#" + message.author.discriminator){
               object[1] = text
              
              isFound = 1
              message.channel.send(message.author.username + " is calendar is UPDATED.");
            }
          })
          if(isFound){
            fs.writeFile('./db/calendar.json', JSON.stringify(data, null, 2), err => {
            if (err) {
              console.log(err)
            } else {
              console.log("Register successful.")
              message.channel.send(message.author.username + " is added into the database.");
            }
          })
          }
          if(isFound==0){  
            data.push([message.author.username + "#" + message.author.discriminator, text])
          fs.writeFile('./db/calendar.json', JSON.stringify(data, null, 2), err => {
            if (err) {
              console.log(err)
            } else {
              console.log("Register successful.")
              message.channel.send(message.author.username + " is added into the database.");
            }
          })
          console.log("match")
        } 
      }else {
          message.channel.send("Invalid Registration URL");
        }
          }
          
    })
  },
}