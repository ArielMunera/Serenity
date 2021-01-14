const {
    MessageEmbed
} = require('discord.js');
const request = require('request');
const prefix = process.env.PREFIX;
module.exports = {
    name: 'anime',
    description: 'Afficher des informations à propos d\'un anime.',
    group: 'Utilitaire',
    example: `\`${prefix}${this.name} \`\n`,
    cooldown: 5,
    execute(message, args) {
        message.delete().then(() => {
            let animeSearch = "";
            if (args)
                for (var i = 0; i < args.length; i++) {
                    if (i > 0) {
                        animeSearch += "%20";
                    }
                    animeSearch += args[i].toLowerCase();
                }

            request("https://kitsu.io/api/edge/anime?filter[text]=" + animeSearch, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const searchedAnime = JSON.parse(body).data[0].attributes;
                    console.log(searchedAnime);
                    const embed = new MessageEmbed()
                        .setTitle(searchedAnime.titles.en + " - *" + searchedAnime.titles.en_jp + "*")
                        .setThumbnail(searchedAnime.posterImage.original)
                        .setImage(searchedAnime.coverImage.original)
                        .setColor(0x00bfff)
                        .setDescription(searchedAnime.description + "\n\n" + "Trailer : https://www.youtube.com/watch?v=" + searchedAnime.youtubeVideoId)
                        .setFooter("Note moyenne : " + searchedAnime.averageRating + "/100")
                    message.channel.send(embed);
                }
            });
        })
    },
};