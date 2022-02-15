import 'dotenv/config'
import fetchFarms from './service/farmRetrievalService.js';
import fetchInvestedFarm from './service/tokenBalanceRetrieval.js';
import findBestFarm from './service/farmComparisonService.js'
import sendFarmNotification from './service/discordNotifierService.js';
import {logger} from './util/logger.js';

const farmData = await fetchFarms();
const farmContractAddresses = farmData.map(farm => farm.contractAddress.toLowerCase());
const investedFarmContract = await fetchInvestedFarm(farmContractAddresses);
const investedFarm = farmData.filter(farm => farm.contractAddress.toLowerCase() === investedFarmContract)[0];
const bestFarm = findBestFarm(investedFarm, farmData);
const isInvestedFarmBestOption = bestFarm.contractAddress.toLowerCase() === investedFarm.contractAddress.toLowerCase();

if(!isInvestedFarmBestOption) {
    logger.info('Better farm found, sending notification...');
    await sendFarmNotification(investedFarm, bestFarm);
}