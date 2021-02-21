const fs = require('fs')
 
module.exports = {
    run: async (message, args, client) => {
        await message.channel.bulkDelete( + 1, true)
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.').then(sent => sent.delete({timeout: 5e3}))
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à unwarn.').then(sent => sent.delete({timeout: 5e3}))
        if (!client.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn.').then(sent => sent.delete({timeout: 5e3}))
        const warnIndex = parseInt(args[1], 10) - 1
        if (warnIndex < 0 || !client.db.warns[member.id][warnIndex]) return message.channel.send('Ce warn n\'existe pas.').then(sent => sent.delete({timeout: 5e3}))
        const { reason } = client.db.warns[member.id].splice(warnIndex, 1)[0]
        if (!client.db.warns[member.id].length) delete client.db.warns[member.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(`${member} a été unwarn pour ${reason} !`).then(sent => sent.delete({timeout: 5e3}))
    },
    name: 'unwarn',
    guildOnly: true,
    help: {
        description: 'Retire l\'avertisement du membre du serveur.',
        syntax: '<@membre>'
    }
}
 