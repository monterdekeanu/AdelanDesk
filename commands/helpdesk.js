
const { MessageEmbed, MessageAttachment, Message } = require('discord.js');
const path = require('path');
module.exports = {
  category: 'help',
  description: 'Returns USJ-R Email',
  callback: async ({ interaction, message, text }) => {
    const embed = new MessageEmbed().setColor('GREEN')

    embed.setTitle("AdelanDesk - The Josenian Discord Help Desk")
      .addFields({
        "name": `š¦ USJ-R VP Finance - Accounting Office š¦`,
        "value": "\n\nš [Facebook Page](https://fb.com/usjraccountingoffice)" + `\nš¬ vpbf@usjr.edu.ph\n`
      },
        {
          "name": `š University of San Jose-Recoletos - Office of the University Registrar š`,
          "value": `\n\nš [Facebook Page](https://web.facebook.com/usjrregistrar)\nš¬ registrar@usjr.edu.ph\n`
        },
        {
          "name": `šŖ¢ USJ-R Student Affairs Office šŖ¢`,
          "value": `\n\nš [Facebook Page](https://web.facebook.com/sao.usjr.edu.ph)\nš¬ sao@usjr.edu.ph\n`
        },
        {
          "name": `š USJ-R Student Development and Placement Center š`,
          "value": `\n\nš [Facebook Page](https://web.facebook.com/usjrSDPCcares)\nš¬ sdpc@usjr.edu.ph\n`
        })
      .setDescription('All inquiries/concerns are advised to be sent directly via e-mail for faster response. \n\n Kindly follow this format:\n\nStudent Number\nName\nYear & Course\n\n <concern>')
      .setImage(`https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/271721523_10159725669833351_8296343863332714183_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=e3f864&_nc_eui2=AeH5Rrqx5LdhkXKx2BBUKN0ZztI7aFegTsjO0jtoV6BOyOPC_ShQFYK_Di1mey-b8Iv7Wr64DF3_qIb3KvgS7lQ9&_nc_ohc=d3D4kZFsNcgAX9-O9q4&tn=JVKKzAW3JcbgCll3&_nc_zt=23&_nc_ht=scontent.fceb1-2.fna&oh=00_AT-chsGfULY8fGb7PJeyTqh-XJIwH4G3Dtfy3aseVcsFzg&oe=620A5628`)
      .setAuthor({
        "name": 'University of San Jose - Recoletos',
        "icon_url": 'https://scontent.fceb1-2.fna.fbcdn.net/v/t1.6435-9/65261651_10157341592153351_4752807223455907840_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeE8r1WG8xOYNjcbB6XorKF5lqvuk_TSulGWq-6T9NK6Uew75pWwZtLOhKwFfn3B0yG7WZ8tlFg9iP98Z1mrF4s9&_nc_ohc=P8ME_Kp2I48AX_4Nq15&tn=JVKKzAW3JcbgCll3&_nc_ht=scontent.fceb1-2.fna&oh=00_AT9fdbu94J95v3iNA_EahQOLudB3MQFljn5UTicE2FfjgQ&oe=622ADA12'
      })
    message.channel.send({ embeds: [embed] })

  },
}