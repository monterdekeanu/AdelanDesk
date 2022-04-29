const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    category: "Motivate",
    description: "Returns Motivational Quotes from API",
    callback: async ({interaction,message,text}) => {
        function retrieveQuotes(){
            const quoteURL = "https://zenquotes.io/api/random"
            return new Promise((resolve) =>{ // q = quote && a = author
                try{
                    fetch(quoteURL).then(response => response.json()).then((quoteObject)=> resolve(quoteObject[0].q+" — "+quoteObject[0].a))
                } catch(error){
                    console.log("Error in retrieving API")
                }
            })
        }
        const quote = await retrieveQuotes();
        message.channel.send(`*${quote}*`)
    },
}