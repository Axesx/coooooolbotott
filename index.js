const { Client } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
    disableEveryone: false
});

config({
    path: __dirname + "/.env"
})


client.on("ready", () => {
    console.log(`Ja sam online!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "Salty Studio open uskoro",
            type: "PLAYING"
        }
    }); 
})

client.on("message", async message => {
    const prefix = ".";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === "ping") {
        const msg = await message.channel.send(`🏓 Trazim....`);
        msg.edit(`🏓 Pronadjen!\nTvoja xorp je ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms\nTvoj ping je ${Math.round(client.ping)}ms`);
    }

    if (cmd === "say") {
        if (message.deletable) message.delete();
        if(!message.member.roles.find(r => r.name ==="「🔰」🇴​🇼​🇳​🇪​🇷​")) return message.channel.send('```Nemas premisiju za to!```'),message.react('✔️');
        if (args.length < 0) return message.reply(`Nista za rec?`).then(m => m.delete(5000));
        
        const roleColor = message.guild.me.highestRole.hexColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new RichEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor(roleColor === "#000000" ? "#ffffff" :  roleColorv)
                .setTimestamp()
                .setImage(client.user.displayAvatarURL)
                .setAuthor(message.author.username, message.author.displayAvatarURL);

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" ")); 
        }
    }
});
        


client.login(process.env.TOKEN);