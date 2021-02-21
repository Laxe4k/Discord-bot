module.exports = {
    run: async (message, args) => {
        await message.channel.bulkDelete( + 1, true)
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.').then(sent => sent.delete({timeout: 5e3}))
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à unmute.').then(sent => sent.delete({timeout: 5e3}))
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez unmute le propriétaire du serveur.').then(sent => sent.delete({timeout: 5e3}))
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas unmute ce membre.').then(sent => sent.delete({timeout: 5e3}))
        if (!member.manageable) return message.channel.send('Le bot ne peut pas unmute ce membre.').then(sent => sent.delete({timeout: 5e3}))
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie.'
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted').then(sent => sent.delete({timeout: 5e3}))
        if (!muteRole) return message.channel.send('Il n\'y a pas de muterole.').then(sent => sent.delete({timeout: 5e3}))
        await member.roles.remove(muteRole)
        message.channel.send(`${member} a été unmute !`).then(sent => sent.delete({timeout: 5e3}))
    },
    name: 'unmute',
    guildOnly: true,
    help: {
        description: 'démute un membre du serveur',
        syntax: '<@membre> [raison]'
    }
}
 