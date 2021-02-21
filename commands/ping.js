const Discord = require('discord.js')

module.exports = {
    run: async (message, args) => {
        await message.channel.bulkDelete( + 1, true)
        message.channel.send('Pong !').then(sent => sent.delete({timeout: 5e3}))
    },
    name: 'ping',
    help: {
        description: 'Pong !'
    }
}