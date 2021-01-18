const {
    MessageEmbed
} = require('discord.js');
const {
    getRandomNumber
} = require('../../util/getRandomNumber');
const {
    getAnime
} = require('../../util/getAnime');
const prefix = process.env.PREFIX;
module.exports = {
    name: 'anime',
    description: 'Afficher des informations à propos d\'un anime.',
    group: 'Utilitaire',
    example: `\n`,
    exampleDesc: `*Pour un anime aléatoire*`,
    example2: ` The Seven Deadly Sins`,
    cooldown: 5,
    execute(message, args) {
        let animeSearch = "";
        let url = "https://kitsu.io/api/edge/anime?filter";
        const baseUrlLength = url.length;
        let searchedAnime = null;
        message.delete().then(async () => {
            if (args.length) {
                for (var i = 0; i < args.length; i++) {
                    if (i > 0) {
                        animeSearch += "%20";
                    }
                    animeSearch += args[i].toLowerCase();
                }
                url += "[text]=" + animeSearch;
            }
            while (searchedAnime == null || searchedAnime == []) {
                if (!args.length) {
                    animeSearch = getRandomNumber(43878);
                    if (url.length > baseUrlLength) {
                        url = url.replace(/([0-9])+$/g, animeSearch.toString());
                    } else {
                        url += "[id]=" + animeSearch;
                    }
                }
                searchedAnime = await getAnime(url);
            }
        }).then(() => {
            const embed = new MessageEmbed()
                .setTitle((searchedAnime.titles.en ? searchedAnime.titles.en + " - " : "") + "*" + searchedAnime.titles.en_jp + "*")
                .setThumbnail(searchedAnime.posterImage ? searchedAnime.posterImage.original : "")
                .setImage(searchedAnime.coverImage ? searchedAnime.coverImage.original : "")
                .setColor(0x00bfff)
                .setDescription(searchedAnime.description ? searchedAnime.description : "" + searchedAnime.youtubeVideoId ? "\n\nTrailer : https://www.youtube.com/watch?v=" + searchedAnime.youtubeVideoId : "")
                .setFooter(searchedAnime.averageRating ? "Note moyenne : " + searchedAnime.averageRating + "/100" : "")
            return message.channel.send(embed);
        });
    },
};