const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));



let from  = '',
    to    = '',
    value = 0,  // wei
    privateKey  = '',
    credentials = ''




var t = web3.eth.sendTransaction({ from, to, value }); 
web3.eth.getTransaction(t);
