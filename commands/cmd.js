
const { MessageEmbed, MessageAttachment, Message } = require('discord.js');
const path = require('path');
module.exports = {
  category: 'help',
  description: 'Returns AdelanDesk Commands',
  callback: async ({ interaction, message, text }) => {
    const embed = new MessageEmbed().setColor('GREEN')
    message.channel.send({ embeds: [
    {
      "type": "rich",
      "title": `AdelanDesk`,
      "description": `AdelanDesk is made to cater Josenians in their academic endeavors.\n\nAvailable Commands:`,
      "color": 0x0dff00,
      "fields": [
        {
          "name": `!helpdesk | USJ-R Departments`,
          "value": `*displays USJ-R departments with hotlines*.`
        },
        {
          "name": `!calendar | LMS Calendar`,
          "value": `*displays student's brightspace academic calendar*.`
        },
        {
          "name": `!library | e-Libraries`,
          "value": `*displays accessible e-Libraries*`
        }
      ],
      "image": {
        "url": `https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/271721523_10159725669833351_8296343863332714183_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=e3f864&_nc_eui2=AeH5Rrqx5LdhkXKx2BBUKN0ZztI7aFegTsjO0jtoV6BOyOPC_ShQFYK_Di1mey-b8Iv7Wr64DF3_qIb3KvgS7lQ9&_nc_ohc=3OrETLQtMU8AX9kSoHv&tn=caOGLL6fGCVOGDhD&_nc_ht=scontent.fceb1-2.fna&oh=00_AT_EqoGqIw1B8fCSsmdbcDBO8CELu7yrJApGJBMH9vmrsg&oe=622BF468`,
        "height": 0,
        "width": 0
      }
    }
  ] })

  },
}