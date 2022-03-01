
const { MessageEmbed, MessageAttachment, Message } = require('discord.js');
const path = require('path');


module.exports = {
  category: 'help',
  description: 'Returns USJ-R e-Libraries',
  callback: async ({ interaction, message, text }) => {
    message.channel.send({
      embeds: [{
        "type": "rich",
        "title": `Josenian E-Libraries`,
        "description": "",
        "color": 'GREEN',
        "fields": [
          {
            "name": `e-Book Central `,
            "value": `https://site.ebrary.com/lib/usjr \nUsername: ENGINEER\nPassword: NBR29VXP`,
            "inline": true
          },
          {
            "name": `IG Publishing e-Book library `,
            "value": `https://portal.igpublish.com \nusername: ph_uosjr01\npassword: ph_uosjr@01`,
            "inline": true
          },
          {
            "name": `Gale Virtual Reference Library `,
            "value": `https://infotrac.galegroup.com/itweb/phusjr\nPassword: respect`
          },
          {
            "name": `Wiley Books Online`,
            "value": `https://olabout.wiley.com/WileyCDA/Section/id-832372.html\nUsername: UNISJR\nPassword: WILEY12345`,
            "inline": true
          },
          {
            "name": `Online Public Access Catalog (OPAC)`,
            "value": `opac.usjr.edu.ph:8080`,
            "inline": true
          }
        ],
        "image": {
          "url": `https://usjr.edu.ph/wp-content/uploads/2016/06/OEAM8427.jpg`,
          "height": 0,
          "width": 0
        }
      }]
    })
  },
}