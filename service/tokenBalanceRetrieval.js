import axios from 'axios';
import { logger } from '../util/logger.js';

const walletAddress = process.env.WALLET_ADDRESS;
const covalentApiKey = process.env.COVALENT_API_KEY;

const fetchInvestedFarm = async (farmContractAddresses) => {
    const walletTokenBalanceFetchUrl = `https://api.covalenthq.com/v1/43114/address/${walletAddress}/balances_v2/?key=${covalentApiKey}`;
    const walletTokenBalanceData = await axios.get(walletTokenBalanceFetchUrl);
    const investedFarmAddress = walletTokenBalanceData.data.data.items
    .filter(tokenItem => {
        return farmContractAddresses.includes(tokenItem.contract_address.toLowerCase()) && tokenItem.balance > 0;
    })[0].contract_address;
    logger.info('Fetched invested farm %o', investedFarmAddress);
    return investedFarmAddress;
}

export default fetchInvestedFarm;