import { Client, Intents, MessageEmbed } from 'discord.js';
import { logger } from '../util/logger.js';

const discordBotToken = process.env.DISCORD_BOT_TOKEN;
const discordBotChannelId = process.env.DISCORD_BOT_CHANNEL_ID;

const sendFarmNotification = async (investedFarm, bestFarm) => {

    const difference = Number(bestFarm.farmAPY) - Number(investedFarm.farmAPY);
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

    logger.info('Discord bot logging in...');

    await client.login(discordBotToken);

    const farmEmbed = new MessageEmbed()
        .setColor('#0EAB4D')
        .setTitle(`Better farm found: ${bestFarm.provider} - ${bestFarm.coin}`)
        .setDescription(`${difference}% APY difference`)
        .setURL(`https://yieldyak.com/farms/detail/${bestFarm.contractAddress}`)
        .setAuthor({ name: 'Yield Yak Farm Notifier Bot', iconURL: 'https://pbs.twimg.com/profile_images/1466883079310659585/nJmWTHN5_400x400.png'})
        .setThumbnail('https://pbs.twimg.com/profile_images/1466883079310659585/nJmWTHN5_400x400.png')
        .addFields(
            { name: 'Best Farm', value: `${bestFarm.provider} - ${bestFarm.coin}` },
            { name: 'Best Farm APY', value: `${bestFarm.farmAPY}%`, inline: true },
            { name: 'Best Farm TVL', value: `${bestFarm.tvl}`, inline: true },
        )
        .addField('\u200B', '\u200B', true)
        .addFields(
            { name: 'Invested Farm', value: `${investedFarm.provider} - ${investedFarm.coin}` },
            { name: 'Invested Farm APY', value: `${investedFarm.farmAPY}%`, inline: true },
            { name: 'Invested Farm TVL', value: `${investedFarm.tvl}`, inline: true },
        )
        .setTimestamp();

    logger.info('Sending farm notification embed');
    const channelCache = await client.channels.cache;
    await channelCache.get(discordBotChannelId).send({ embeds: [farmEmbed] });
    logger.info('Discord bot logging out...');
    client.destroy();
}

export default sendFarmNotification;