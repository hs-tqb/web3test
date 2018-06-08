const Web3   = require('web3')
const web3   = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const eth    = web3.eth;

const account = eth.accounts[0]



console.log(`账户：${account}`)
console.log(`区块数：${eth.blockNumber}`)
if ( account )
eth.getBalance(account, function(err,result) {
    console.log(`余额：${err||result.toNumber()}`);
});

