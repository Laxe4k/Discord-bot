const Discord = require('discord.js')

module.exports = {
    run: async (message, args) => {
        await message.channel.bulkDelete( + 1, true)
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.').then(sent => sent.delete({timeout: 5e3}))
        message.channel.send(`@everyone`, new Discord.MessageEmbed()
            .setTitle('J\'ai créé ma page Patreon')
            .setDescription('Pour les gens qui veulent m\'aider financièrement j\'ai créé ma page Patreon avec un système d\'abonnement qui vous débloque des grade en plus sur mon discord mais en même temps des petits avantages avec les abonnements de Patreon. Merci à tous ceux qui m\'aideront financièrement 😘')
            .setColor('#FF424D')
            .addField('Lien', 'https://www.patreon.com/Laxe4k', true)
            .setAuthor('Laxe4k', 'https://cdn.discordapp.com/attachments/778896543234916363/813075201839333426/Laxe4k.jpg', 'https://google.fr')
            .setImage('https://i.pinimg.com/564x/c9/a3/e6/c9a3e6c748890b41170a07401abbb630.jpg')
            .setThumbnail('https://i.pinimg.com/564x/5c/18/de/5c18de44c499b1588a150841c807e6d2.jpg')
            .setFooter('Annonce', 'https://cdn.discordapp.com/attachments/778896543234916363/813075675551760384/14845612563.jpg')
            .setTimestamp()
            .setURL(''))
    },
    name: 'annonce'
}