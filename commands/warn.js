const fs = require('fs')
 
module.exports = {
    run: async (message, args, client) => {
        await message.channel.bulkDelete( + 1, true)
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.').then(sent => sent.delete({timeout: 5e3}))
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à warn.').then(sent => sent.delete({timeout: 5e3}))
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn le propriétaire du serveur.').then(sent => sent.delete({timeout: 5e3}))
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn ce membre.').then(sent => sent.delete({timeout: 5e3}))
        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send('Veuillez indiquer une raison.').then(sent => sent.delete({timeout: 5e3}))
        if (!client.db.warns[member.id]) client.db.warns[member.id] = []
        client.db.warns[member.id].unshift({
            reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(`${member} a été warn pour ${reason} !`).then(sent => sent.delete({timeout: 5e3}))
    },
    name: 'warn',
    guildOnly: true,
    help: {
        description: 'donne un avertisement à un membre du serveur',
        syntax: '<@membre> [raison]'
    }
}
 