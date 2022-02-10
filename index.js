import fetchFarms from './service/farmService.js'
import fetchBalanceForToken from './service/tokenBalanceRetrieval.js'

const farmData = await fetchFarms();

farmData.forEach(farm => {
    console.log(farm);
});

