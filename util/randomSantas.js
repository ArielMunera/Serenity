exports.randomSantas = (users) => {
    let santas = new Array();
    let usedUsers = new Array();
    // On parcourt toutes les personnes qui ont réagi pour leur sélectionner une personne à qui offrir un cadeau
    for (let i = 0; i < users.length; i++) {
        let randomIndex = Math.floor(Math.random() * users.length);
        let userToGift = null;
        // On fait en sorte que le userToGift ne se retrouve pas en doublon
        if (usedUsers.length > 0) {
            while (usedUsers.lastIndexOf(users[randomIndex]) !== -1 && users[randomIndex] !== users[i]) {
                randomIndex = Math.floor(Math.random() * users.length);
            }
        }
        userToGift = users[randomIndex];
        usedUsers.push(userToGift);
        let tempSanta = {
            "santaName": users[i].username,
            "santaId": users[i].id,
            "userToGiftName": userToGift.username,
            "userToGiftId": userToGift.id
        };
        santas.push(tempSanta);
    }
    return santas;
};