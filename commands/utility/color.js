const {
    MessageEmbed
} = require('discord.js');
const {
    getRandomNumber
} = require('../../util/getRandomNumber');
const Jimp = require('jimp');
const prefix = process.env.PREFIX;
module.exports = {
    name: 'color',
    aliases: ['randomcolor', 'couleur'],
    description: 'Générer ou afficher une couleur.',
    group: 'Utilitaire',
    example: `\`${prefix}${this.name} \`\n` +
        `\`${prefix}${this.name} #00bfff\`\n`,
    cooldown: 5,
    execute(message, args) {
        message.delete().then(async () => {
            let redDec = greenDec = blueDec = null;
            let redHex = greenHex = blueHex = "";
            let colorHex = "#";
            if (!args.length) {
                redDec = getRandomNumber(255);
                greenDec = getRandomNumber(255);
                blueDec = getRandomNumber(255);
                redHex = redDec.toString(16).toUpperCase();
                greenHex = greenDec.toString(16).toUpperCase();
                blueHex = blueDec.toString(16).toUpperCase();
                colorHex += redHex + greenHex + blueHex;
            }
            let colorEmbed = "**hex**: " + colorHex +
                `\n**rgb**: rgb(${redDec}, ${greenDec}, ${blueDec})`;
            return Promise.all([colorEmbed, colorHex]);
        }).then(async ([colorEmbed, colorHex]) => {
            let imageColor = parseInt((colorHex.replace(/^#/, '') + "FF"), 16);
            let imageRow = new Array(80).fill(imageColor);
            let imageData = new Array(50).fill(imageRow);
            new Jimp(80, 50, async function (err, image) {
                if (err) throw err;

                imageData.forEach((row, y) => {
                    row.forEach((color, x) => {
                        image.setPixelColor(color, x, y);
                    });
                });

                image.write('./images/couleur.png', (err) => {
                    if (err) throw err;
                });
            });
            return Promise.all([colorEmbed, colorHex]);
        }).then(async ([colorEmbed, colorHex]) => {
            let embed = new MessageEmbed()
                .setColor(colorHex)
                .setDescription(colorEmbed)
                .attachFiles(['./images/couleur.png'])
                .setThumbnail('attachment://couleur.png');
            message.channel.send(embed);
        });
    },
};