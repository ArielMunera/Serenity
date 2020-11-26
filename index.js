const fs = require('fs');
const Discord = require('discord.js');
const {
    prefix,
    token
} = require('./config.json');
const Canvas = require('canvas');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.login(token);

client.once('ready', () => {
    console.log("Ready !");
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

/*************** Nouveau sur le serveur ***************/
client.on('guildMemberAdd', member => {
    const channel = client.channels.cache.find(ch => ch.name === 'accueil-visiteur');
    if (!channel) return;

    channel.send(`Bienvenue sur le serveur, ${member}!`);
});

/*************** Autres ***************/

/*client.on("guildMemberAdd", async member => {
    console.log("Test venue");
    const channel = member.guild.channels.cache.find(
        ch => ch.name === "accueil-visiteur"
    );
    if (!channel) return

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage("./wallpaper.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Texte générique d'introduction avant le nom d'utilisateur
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
        "Bienvenue sur le serveur,",
        canvas.width / 2.5,
        canvas.height / 3.5
    );

    // Ajouter le nom d'utilisateur
    ctx.font = applyText(canvas, `${member.displayName}`);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
        `${member.displayName}!`,
        canvas.width / 2.5,
        canvas.height / 1.8
    );

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(
        member.user.displayAvatarURL({
            format: "jpg"
        })
    );
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "bienvenue-image.png"
    );

    channel.send(`Bienvenue sur le serveur, ${member}!`, attachment);
});*/

client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'accueil-visiteur');
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    // Since the image takes time to load, you should await it
    const background = await Canvas.loadImage('./wallpaper.jpg');
    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // Use helpful Attachment class structure to process the file for you
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send(`Welcome to the server, ${member}!`, attachment);
});