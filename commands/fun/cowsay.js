module.exports = {
    name: 'cowsay',
    aliases: [''],
    description: 'Laissez parler une vache',
    usage: "[texte]",
    guildOnly: true,
    example: `Je suis une vache qui parle`,
    group: 'Fun',
    args: true,
    execute(message, args) {
        let text = "";
        for (let i = 0; i < args.length; i++) {
            if (i > 0) {
                text = text + " ";
            }
            text = text + args[i];
        }

        const cow = "   \\   ^__^\n" +
            "    \\  (oO)\\_______\n" +
            "       (__)\\       )\\/\\\n" +
            "         U  ||----w |\n" +
            "            ||     ||\n";

        let finalMessage = "< " + text + " >\n" + cow;
        message.channel.send("```" + finalMessage + "```");
    },
};