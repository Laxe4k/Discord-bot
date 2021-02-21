module.exports = {
    run: async (message, args) => {
        await message.channel.bulkDelete( + 1, true)
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.').then(sent => sent.delete({timeout: 5e3}))
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à bannir.').then(sent => sent.delete({timeout: 5e3}))
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas bannir le propriétaire du serveur.').then(sent => sent.delete({timeout: 5e3}))
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas Bannir ce membre.').then(sent => sent.delete({timeout: 5e3}))
        if (!member.bannable) return message.channel.send('Le bot ne peut pas bannir ce membre.').then(sent => sent.delete({timeout: 5e3}))
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        await member.ban({reason})
        message.channel.send(`${member.user.tag} a été banni !`).then(sent => sent.delete({timeout: 5e3}))
    },
    name: 'ban',
    guildOnly: true,
    help: {
        description: 'Ban un membre du serveur',
        syntax: '<@membre> [raison]'
    }
}