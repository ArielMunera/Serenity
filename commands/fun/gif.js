const request = require('request');
const prefix = process.env.PREFIX;
module.exports = {
    name: 'gif',
    description: 'Call a random gif',
    group: 'Fun',
    usage: "<arguments>",
    args: true,
    example: " chat",
    execute(message, args) {

        // Split message to search GIPHY
        // let splitWord = message.toString().split(" ");
        let gifWord = "";

        // Loop through incase of multiple word search
        for (var i = 0; i < args.length; i++) {
            if (i > 0) {
                gifWord = gifWord + "+";
            }
            gifWord = gifWord + args[i];
        }

        request("http://api.giphy.com/v1/gifs/search?q=" + gifWord + "&api_key=" + process.env.GIPHYKEY + "&limit=100", function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Convert body to JSON object
                let jsonUrl = JSON.parse(body);

                // Get random number to choose GIF
                let totGif = jsonUrl.data.length;

                if (totGif > 100) {
                    totGif = 100;
                }

                let ranNum = Math.floor(Math.random() * totGif);

                message.channel.send(jsonUrl.data[ranNum].url);
            }
        });
    },
};