const {
  MessageEmbed
} = require('discord.js');
const {
  frenchWords
} = require('../../util/frenchWords.json');
const {
  firstHangman,
  secondHangman
} = require('../../util/hangmanDeath.json');
const {
  getRandomNumber
} = require('../../util/getRandomNumber.js');
const {
  replaceAt
} = require('../../util/replaceAt.js');
module.exports = {
  name: 'pendu',
  aliases: ['hangman'],
  description: 'Jeu du pendu\nCette commande est assez lente, merci d\'être patient avec elle',
  group: 'Fun',
  args: false,
  cooldown: 10,
  execute(message, args) {
    const randomIndex = getRandomNumber(frenchWords.length);
    const hangmanDeath = getRandomNumber(2) == 1 ? firstHangman : secondHangman;
    const wordToSearch = frenchWords[randomIndex].toLowerCase();
    let deathCount = 0;
    let displayedWord = "_ ".repeat(wordToSearch.length).trim();
    let wrongLetters = [];
    const filter = m => m.content.length == 1 && message.author.id == m.author.id;
    let isGameRunning = true;
    message.delete().then(() => {
      let hangmanMessage = "`" + displayedWord + "`\n" +
        wrongLetters.join(', ') + "\n" +
        "```text\n" + hangmanDeath[0] + "\n```\n";
      const embed = new MessageEmbed()
        .setTitle("Jeu du Pendu")
        .setColor(0x00bfff)
        .setDescription(hangmanMessage)
        .setFooter("Le temps maximum par lettre est de 1 minute !")
      message.channel.send(embed).then(async msg => {
        while (isGameRunning) {
          await message.channel.awaitMessages(filter, {
            max: 1,
            time: 60000,
            errors: ['time']
          }).then(collected => {
            const playerMessage = collected.values().next().value;
            const playerLetter = playerMessage.content.toLowerCase();
            playerMessage.delete().then(() => {
              if (wordToSearch.search(playerLetter) != -1) {
                for (var i = 0; i < displayedWord.length; i++) {
                  if (wordToSearch[i] == playerLetter) {
                    displayedWord = replaceAt(displayedWord, i * 2, playerLetter.toUpperCase());
                  }
                }
                if (displayedWord.search("_") == -1) {
                  isGameRunning = false;
                  const endEmbed = new MessageEmbed()
                    .setTitle("Félicitations !")
                    .setColor(0x0fefff)
                    .setDescription("Tu as remporté la victoire ! Le mot était bien **" + wordToSearch.toUpperCase() + "**");
                  message.channel.send(endEmbed);
                }
                hangmanMessage = "`" + displayedWord + "`\n" +
                  wrongLetters.join(', ').toUpperCase() + "\n" +
                  "```" + hangmanDeath[deathCount] + "```\n";
                embed.setDescription(hangmanMessage);
                msg.edit(embed);
              } else {
                wrongLetters[deathCount] = playerLetter;
                hangmanMessage = "`" + displayedWord + "`\n" +
                  wrongLetters.join(', ').toUpperCase() + "\n" +
                  "```" + hangmanDeath[deathCount] + "```\n";
                embed.setDescription(hangmanMessage);
                msg.edit(embed);
                if (deathCount == hangmanDeath.length - 1) {
                  const endEmbed = new MessageEmbed()
                    .setColor(0x0fefff)
                    .setDescription(":bulb: Tu es pendu ! Le mot à trouver était **" + wordToSearch.charAt(0).toUpperCase() + wordToSearch.slice(1) + "**");
                  isGameRunning = false;
                  message.channel.send(endEmbed);
                }
                deathCount += 1;
              }
            });
          }).catch(collected => {
            if (isGameRunning) {
              isGameRunning = false;
              const timeEmbed = new MessageEmbed()
                .setColor(0x0fefff)
                .setDescription(":bulb: Temps écoulé :clock1:");
              message.channel.send(timeEmbed);
            }
          });
        }
      });
    });
  },
};

/*
********************************** firstHangman **********************************
1/6
  _______
 |/      |
 |
 |
 |
 |
_|___

---------------------------------
2/6
  _______
 |/      |
 |      (_)
 |
 |
 |
_|___


---------------------------------
3/6
  _______
 |/      |
 |      (_)
 |       |
 |       |
 |
_|___

---------------------------------
4/6
  _______
 |/      |
 |      (_)
 |      \|/
 |       |
 |
_|___

---------------------------------
5/6
  _______
 |/      |
 |      (_)
 |      \|/
 |       |
 |      / \
_|___

---------------------------------
6/6
  _______
 |/      |
 |      (x)
 |      \|/
 |       |
 |      / \
_|___


********************************** secondHangman **********************************

1/7
   ,==========Y===
   ||  /      |
   || /       |
   ||/        
   ||
   ||
  /||
 //||
============

---------------------------------
2/7
   ,==========Y===
   ||  /      |
   || /       |
   ||/        O
   ||
   ||
  /||
 //||
============

---------------------------------
3/7
   ,==========Y===
   ||  /      |
   || /       |
   ||/        O
   ||         |
   ||
  /||
 //||
============

---------------------------------
4/7
   ,==========Y===
   ||  /      |
   || /       |
   ||/        O
   ||        /|
   ||
  /||
 //||
============

---------------------------------
5/7
   ,==========Y===
   ||  /      |
   || /       |
   ||/        O
   ||        /|\ 
   ||
  /||
 //||
============

---------------------------------
6/7
   ,==========Y===
   ||  /      |
   || /       |
   ||/        O
   ||        /|\ 
   ||        /
  /||
 //||
============

---------------------------------
7/7
   ,==========Y===
   ||  /      |
   || /       |
   ||/        O
   ||        /|\ 
   ||        / \
  /||
 //||
============
*/