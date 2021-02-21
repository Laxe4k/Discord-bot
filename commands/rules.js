const Discord = require('discord.js')

module.exports = {
    run: async (message, args) => {
        await message.channel.bulkDelete( + 1, true)
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.').then(sent => sent.delete({timeout: 5e3}))
        message.channel.send(`@everyone`, new Discord.MessageEmbed()
            .setTitle('Règlement du serveur !')
            .setDescription('**Bienvenue sur le discord de LAXE !**\n\nTu arrives sur une communauté active, où tu seras amené à côtoyer d\'autres personnes.\n\nIl y a donc quelques règles de vie à respecter :\n\n<:Valid:713833501241114685> - Une **écriture correcte** est exigée, nous ne sommes pas des traducteurs, c\'est à dire **pas de langage sms** !\n\n<:Valid:713833501241114685> - Reste **poli**, et un minimum agréable.\n\n<:Valid:713833501241114685> - Utilise les channels écrits et vocaux en fonction de tes besoins (mettre vos dessins dans le channel votre art, les images dans le channel vos images, etc..)\n\n<:Valid:713833501241114685> - **Pseudo correct** utilisé sur Discord / Twitch ou le jeu demandé.\n\n<:Not_Valid:713833501421469796> - **Ne pas ping** LAXE, les VIPs ou les Streamers, même si vous avez une réelle question.\n\n<:Not_Valid:713833501421469796> - **Ne divulguez pas** vos informations personnelles (nom, âge, adresse etc...)\n\n<:Not_Valid:713833501421469796> - **Pas **de partage des liens web (sauf exception) ou des photos étranges.\n\n<:Not_Valid:713833501421469796> - **Les pubs de stream, de chaines Youtube** et **autres **ne sont **pas** autorisées sans la permission d\'un administrateur.\n\n<:Not_Valid:713833501421469796> - Ton pseudo et les messages que tu envoies ne doivent **pas **contenir de propos déplacés (racisme, homophobie, sexisme, etc...).\n\n<:Not_Valid:713833501421469796> - **Pas **de photo de profil et pseudos choquants ou provocateurs.\n\n<:Not_Valid:713833501421469796> - **Pas **de soundboard.\n\n<:Not_Valid:713833501421469796> - **Pas de multicomptes** !\n\n<:Not_Valid:713833501421469796> - **Pas de spam**.\n\nBien évidemment, tout n\'est pas écrit dans les règles, à vous de faire preuve de bon sens ! \n\n**Chaque irrespect des règles sera noté et sanctionné.\nEt pour finir, le plus important : restez sympas et amusez-vous**.\n\n*De la part de l\'administration et de la modération, et bienvenue à vous !*')
            .setColor('#459558')
            .setAuthor('Laxe4k', 'https://cdn.discordapp.com/attachments/778896543234916363/813075201839333426/Laxe4k.jpg', 'https://google.fr')
            .setFooter('Règlement', 'https://cdn.discordapp.com/attachments/778896543234916363/813075675551760384/14845612563.jpg')
            .setTimestamp()
            .setURL(''))
    },
    name: 'rules'
}