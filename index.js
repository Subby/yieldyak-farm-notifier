import fetchFarms from './service/farmService.js'
import fetchInvestedFarm from './service/tokenBalanceRetrieval.js'

const farmData = await fetchFarms();
const farmContractAddresses = farmData.map(farm => farm.contractAddress.toLowerCase());
const investedFarmContract = await fetchInvestedFarm(farmContractAddresses);
const investedFarm = farmData.filter(farm => farm.contractAddress.toLowerCase() === investedFarmContract)[0];
const findBetterFarm = (investedFarm, farmData) => {
    let bestFarm = {};
    const investedFarmAPY = investedFarm.farmAPY;
    if(farmData[0].farmAPY > investedFarmAPY) {
        bestFarm = farmData[0];
    } else if (farmData[1].farmAPY > investedFarmAPY) {
        bestFarm = farmData[1];
    } else if (farmData[2].farmAPY > investedFarmAPY) {
        bestFarm = farmData[2];
    } 
    return {investedFarm, bestFarm};
}

console.log(findBetterFarm(investedFarm, farmData));
