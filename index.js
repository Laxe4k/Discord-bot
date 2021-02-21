const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true
    }),
    config = require('./config.json'),
    fs = require('fs')
 
client.login(process.env.TOKEN);
client.commands = new Discord.Collection()
client.db = require('./db.json')
 
fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})
 
client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
 
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    command.run(message, args, client)
})

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
        .setDescription(`**${member} à rejoint !** Nous somme maintenant **${member.guild.memberCount}** sur le serveur !`)
        .setImage('https://cdn.discordapp.com/attachments/778896543234916363/813101023534776361/BIENVENUE.png')
        .setFooter('LAXE™ | Public', 'https://cdn.discordapp.com/attachments/778896543234916363/813104908131106856/14845612563.jpg')
        .setTimestamp()
        .setColor('#00ff00'))

    member.roles.add(config.greeting.role)

})

client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
        .setDescription(`**${member.user.tag} à quitté !** Nous somme maintenant **${member.guild.memberCount}** sur le serveur !`)
        .setImage('https://cdn.discordapp.com/attachments/778896543234916363/813101023622463508/A_BIENTOT.png')
        .setFooter('LAXE™ | Public', 'https://cdn.discordapp.com/attachments/778896543234916363/813104908131106856/14845612563.jpg')
        .setTimestamp()
        .setColor('#ff0000'))

})

client.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
    else reaction.users.remove(user)
})
 
client.on('messageReactionRemove', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem || !reactionRoleElem.removable) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.remove(emoji.roles)
})

client.on('ready', () => {
    const statuses = [
        () => `!help`,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: 'STREAMING', url: 'https://twitch.tv/Laxe4k'})
        i = ++i % statuses.length
    }, 1e4)
setInterval(() => {
    const [bots, humans] = client.guilds.cache.first().members.cache.partition(member => member.user.bot)
    client.channels.cache.get(config.serverStats.humans).setName(`Humains : ${humans.size}`)
    client.channels.cache.get(config.serverStats.bots).setName(`Bots : ${bots.size}`)
    client.channels.cache.get(config.serverStats.total).setName(`Total : ${client.guilds.cache.first().memberCount}`)
}, 3e4)
})

client.on('channelCreate', channel => {
    if (!channel.guild) return
    const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) return
    channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
    })
})
