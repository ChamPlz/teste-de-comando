const Discord = require("discord.js"); //baixar a lib
const jimp = require("jimp")
const client = new Discord.Client(); 
const config = require("./config.json"); 



client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`); 
  client.user.setPresence({ game: { name: 'Ajude meu criador...', type: 1, url: 'https://www.twitch.tv/champlzl'} });
    //0 = Jogando
    //  1 = Transmitindo
    //  2 = Ouvindo
    //  3 = Assistindo
});

client.on("guildMemberAdd", async member => {

  let canal = client.channels.get("567459254580150272")
  let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
  let mask = await jimp.read('mascara.png')
  let fundo = await jimp.read('fundo.png')
  
  jimp.read(member.user.displayAvatarURL).then(avatar => {
  avatar.resize(130, 130)
  mask.resize(130, 130)
  avatar.mask(mask)

  fundo.print(fonte, 170, 175, member.user.username)
  fundo.composite(avatar, 40, 90).write('bemvindo.png')
  canal.send(``, { files: ["bemvindo.png"] })
  canal.send(`${member}`)
  console.log('Imagem enviada para o Discord')
  })
  .catch(err => {
  console.log('error avatar')
  })
})


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  
  // coamdno ping
  if(comando === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latencia da API é ${Math.round(client.ping)}ms`);
  }
  if(comando === "avatar") {
    message.reply(message.author.avatarURL);
  }
});

client.login(config.token);