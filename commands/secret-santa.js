const {
    MessageEmbed
} = require('discord.js');
const {
    randomSantas
} = require('../util/randomSantas');
module.exports = {
    name: 'secret-santa',
    description: 'Organisez un Père-Noël secret.',
    group: 'Fun',
    usage: "[DD/MM/YYYY](facultatif) [HH:MM](facultatif)",
    guildOnly: true,
    examples: "$secret-santa\n" +
        "Cela fixe la date de fin de participation une semaine après le jour de la commande.\n" +
        "$secret-santa 16/12/2020 12:00\n" +
        "Cela fixe la date de fin de participation au 16 décembre 2020 à midi",
    execute(message, args) {
        const text = "**Bonsoir** @everyone\n\n" +
            "La période de Noël approchant que diriez-vous d'organiser un petit \"**Secret Santa**\" ?\n" +
            "Pour les volontaires, l'idée serait d'offrir un cadeau à une personne désignée au hasard.\n\n" +
            "Évidemment le cadeau serait numérique ou physique en fonction des préférences et du budget de chacun!\n" +
            "Cela peut être un jeu, un poème, une musique. Bref toutes les idées sont bonnes\n\n" +
            "Si vous voulez participer réagissez à la mention 🎅 sur ce message";
        const embed = new MessageEmbed()
            // Set the title of the field
            .setTitle('Secret Santa')
            // Set the color of the embed
            .setColor(0xd4423e)
            // Set the main content of the embed
            .setDescription(text);
        message.delete().then(async () => {
            // Send the embed to the same channel as the message
            const replyMsg = await message.channel.send(embed);
            // on ajoute les réactions à notre réponse :
            replyMsg.react('🎅').then(() => {
                let miliSeconds = null;
                if (args[0]) {
                    const endDay = args[0].split('/')[0];
                    const endMonth = args[0].split('/')[1];
                    const endYear = args[0].split('/')[2];
                    const endDateText = endYear + "-" + endMonth + "-" + endDay;
                    let startDate = new Date();
                    let endDate = new Date(endDateText + ("T" + (args[1] ? args[1] : ""))); // new Date(YYYY-MM-DDTHH:MM:SS);
                    miliSeconds = (endDate.getTime() - startDate.getTime());
                }

                let users = new Array();
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '🎅' && !user.bot;
                };

                const collector = replyMsg.createReactionCollector(filter, {
                    //time = temps défini par l'utilisateur ou une semaine
                    time: miliSeconds || 604800000,
                    dispose: true
                });
                // Lorsqu'un utilisateur ajoute une réaction
                collector.on('collect', (reaction, user) => {
                    users.push(user);
                    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                });

                // Lorsqu'un utilisateur enlève une réaction
                collector.on('remove', (reaction, user) => {
                    users.splice(users.indexOf(user), 1);
                    console.log(`Removing ${reaction.emoji.name} from ${user.tag}`);
                });

                // Une fois le temps fini
                collector.on('end', collected => {
                    console.log("*************************************************");
                    console.log(`${collected.size} reacted`);
                    console.log(`${users.length} participants`);
                    console.log("*************************************************");
                    if (users.length <= 2) {
                        return message.channel.send("Il n'y a pas eu assez de participants au **Secret Santa**, celui-ci est donc annulé");
                    }
                    let randomisedSantas = new Array();
                    let isThereDuplicates = false;
                    // Tant que le Pere Noël et la personne à qui il doit offrir un cadeau est la même on relance pour que ces deux personnes soient différentes
                    do {
                        randomisedSantas = randomSantas(users);
                        randomisedSantas.forEach(santa => {
                            if (santa.santaId == santa.userToGiftId) {
                                isThereDuplicates = true;
                            } else {
                                isThereDuplicates = false;
                            }
                        });
                    } while (isThereDuplicates);

                    var privateMessage = (nameToGift) => {
                        return "Bonjour cher humain,\n\n" +
                            "Suite à une grève simultanée des lutins et des rennes les délais pour la fabrication de tous les cadeaux ne pourrons êtres tenus.\n\n" +
                            "Il est bien sûr impensable de tout le monde n 'ait pas son cadeau.\n" +
                            "Il a donc été décidé à contrecœur de faire appel à des intermédiaires et à leur esprit de Noël. Chacun devra choisir un cadeau et l'offrir à la personne qui lui sera désigné.\n\n" +
                            "La personne qui vous a été attribué est: **" + nameToGift + "**\n\n" +
                            "Choisissez bien et que l'esprit de Noël soit avec vous."
                    }
                    const embed = (nameToGift) => new MessageEmbed()
                        .setColor(0xd4423e)
                        .setDescription(privateMessage(nameToGift));
                    // Pour chaque personne ayant réagi on leur envoi un MP avec le nom de la personne à qui ils doiven offrir un cadeau
                    randomisedSantas.forEach(santa => {
                        const user = message.client.users.cache.get(santa.santaId);
                        user.send(embed(santa.userToGiftName))
                            .catch(error => {
                                console.error(`Could not send help DM to ${user.username}.\n`, error);
                                message.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
                            });
                    });
                });
            });
        });
    },
};