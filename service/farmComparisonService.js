import { logger } from '../util/logger.js';

const percentageDifferenceToNotify = Number(process.env.APY_PERCENTAGE_DIFFERENCE_TO_NOTIFY);

const compareFarms = (investedFarm, farmData) => {
    let bestFarm = {farmAPY: 0};
    const investedFarmAPY = Number(investedFarm.farmAPY);
    if(Number(farmData[0].farmAPY) > investedFarmAPY) {
        bestFarm = farmData[0];
    } else if (Number(farmData[1].farmAPY) > investedFarmAPY) {
        bestFarm = farmData[1];
    } else if (Number(farmData[2].farmAPY) > investedFarmAPY) {
        bestFarm = farmData[2];
    }
    return bestFarm; 
}

const findBestFarm = (investedFarm, farmData) => {
    const bestFarm = compareFarms(investedFarm, farmData);
    const difference = Number(bestFarm.farmAPY) - Number(investedFarm.farmAPY);

    logger.info('Invested farm: %o', investedFarm);
    logger.info('Best farm: %o', bestFarm);

    if(Number(difference) > Number(percentageDifferenceToNotify)) {
        return bestFarm;
    } else {
        return investedFarm;
    }
}

export default findBestFarm;