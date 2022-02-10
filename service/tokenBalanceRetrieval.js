import axios from 'axios';

const fetchBalanceForToken = async (tokenContract) => {
    const tokenBalanceFetchUrl = `https://api.snowtrace.io/api?module=account&action=tokenbalance&contractaddress=0x8c571111fc30f921774f3caa3e1a20e464173c9d&address=${tokenContract}&tag=latest&apikey=x`;
    const tokenRequest = await axios.get(tokenBalanceFetchUrl);
    console.log(tokenRequest);
}

export default fetchBalanceForToken;