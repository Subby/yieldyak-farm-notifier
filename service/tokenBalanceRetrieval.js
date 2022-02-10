import axios from 'axios';

const fetchInvestedFarm = async (farmContractAddresses) => {
    const walletTokenBalanceFetchUrl = `https://api.covalenthq.com/v1/43114/address/address/balances_v2/?key=P`;
    const walletTokenBalanceData = await axios.get(walletTokenBalanceFetchUrl);
    return walletTokenBalanceData.data.data.items
    .filter(tokenItem => {
        return farmContractAddresses.includes(tokenItem.contract_address.toLowerCase()) && tokenItem.balance > 0;
    })
    [0].contract_address;
}

export default fetchInvestedFarm;