// koa
const Koa  = require('koa')
const koa  = new Koa()
const host = '127.0.0.1'
const port = '4444'

koa.use(function(ctx){
  ctx.body = eth.blockNumber
})

koa.listen(port)
console.log( `server runnint at: ${host}:${port}` );




// web3
/*
 * Mainnet	production network  https://mainnet.infura.io/your-api-key
 * Ropsten	test network	      https://ropsten.infura.io/your-api-key
 * INFURAnet	test network	    https://infuranet.infura.io/your-api-key
 * Kovan	test network	        https://kovan.infura.io/your-api-key
 * Rinkeby	test network	      https://rinkeby.infura.io/your-api-key
 * IPFS	gateway	                https://ipfs.infura.io/
 */
const Web3 = require('web3')
// const web3 = new Web3(new Web3.providers.HttpProvider("https://jsonrpc.medishares.net"));
// const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
// const web3 = new Web3(new Web3.providers.HttpProvider("wss://mainnet.infura.io/ws"));
// const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
// const web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.28.129:8545"));
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const eth  = web3.eth;

// geth 启动命令：
// geth --testnet --rpc --rpcapi db,eth,net,web3,personal --rpccorssdomain "*" --rpcaddr 127.0.0.1 --rpcport 8545 console


// contract
const contractConfig = require('./assets/js/contract')
const contract = eth.contract(contractConfig.abi).at(contractConfig.address)


// console.log( eth.getTransactionReceipt )


console.log( eth.blockNumber )


// 自运行
;(function(){
  return;
  let bet = contract.LogBet(
    // { _userAddress: '' },
    { fromBlock:eth.blockNumber-(60*24*15) * 7}
  )
  bet.watch((err,result)=>{
    console.log( err? err: 'done'  )
  })
  // 
  // console.log( web3.fromWei(eth.getBalance(contractConfig.address).toNumber()), ' ETH' )
})()
