const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: 'pigeon',
    description: 'Pigeon !',
    group: 'Fun',
    hidden: true,
    guildOnly: true,
    execute(message, args) {
        let description = "Je veux un :regional_indicator_p:";
        const pigeonTab = [
            "Je veux un :regional_indicator_i:",
            "Je veux un :regional_indicator_g:",
            "Je veux un :regional_indicator_e:",
            "Je veux un :regional_indicator_o:",
            "Je veux un :regional_indicator_n:"
        ];
        const embed = new MessageEmbed()
            .setColor(0x00bfff)
            .setDescription(description)

        message.delete().then(() => {
            message.channel.send(embed).then(msg => {
                let itemsProcessed = 0;
                pigeonTab.forEach(function (element, index, array) {
                    setTimeout(function () {
                        description += "\n" + element;
                        embed.setDescription(description);
                        msg.edit(embed);
                        itemsProcessed++;
                        if (itemsProcessed === array.length) {
                            setTimeout(function () {
                                description += "\n\n" + ":regional_indicator_p::regional_indicator_i::regional_indicator_g::regional_indicator_e::regional_indicator_o::regional_indicator_n: :grey_exclamation::grey_exclamation::grey_exclamation::grey_exclamation:";
                                embed.setDescription(description);
                                msg.edit(embed);
                            }, (index + 1) * 300);
                        }
                    }, (index + 1) * 1300);
                    return Promise.all([msg]);
                });
            })
        });
    },
};