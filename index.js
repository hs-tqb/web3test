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
 * npm ERR! 1.0.0-beta2, 1.0.0-beta1, 1.0.0-beta.28, 1.0.0-beta.27, 1.0.0-beta.26, 1.0.0-beta.25, 1.0.0-beta.24, 1.0.0-beta.23, 1.0.0-beta.22, 1.0.0-beta.21, 1.0.0-beta.20, 1.0.0-beta.19, 1.0.0-beta.18, 1.0.0-beta.17, 1.0.0-beta.16, 1.0.0-beta.15, 1.0.0-beta.14, 1.0.0-beta.13, 1.0.0-beta.12, 1.0.0-beta.11, 1.0.0-beta.10, 1.0.0-beta.9, 1.0.0-beta.7, 1.0.0-beta.6, 1.0.0-beta.5, 1.0.0-beta.4, 1.0.0-beta.3, 1.0.0-beta.2, 1.0.0-beta.1, 0.20.4, 0.20.3, 0.20.2, 0.20.1, 0.20.0, 0.19.1, 0.19.0, 0.18.4, 0.18.2, 0.18.1, 0.18.0, 0.17.0-beta, 0.17.0-alpha, 0.16.0, 0.15.3, 0.15.2, 0.15.1, 0.15.0, 0.14.1, 0.14.0, 0.13.0, 0.12.2, 0.12.1, 0.12.0, 0.11.0, 0.10.0, 0.9.2, 0.9.1, 0.9.0, 0.8.1, 0.8.0, 0.7.1, 0.7.0, 0.6.0, 0.5.0, 0.4.3, 0.4.2, 0.4.1, 0.4.0, 0.3.6, 0.3.4, 0.3.3, 0.3.2, 0.3.1, 0.3.0, 0.2.8, 0.2.7, 0.2.6, 0.2.5
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
// const web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.28.130:8545"));
// const web3 = new Web3(new Web3.providers.HttpProvider("http://172.26.0.3:8545"));
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io"));
const eth  = web3.eth;
const blockNumber = eth.blockNumber
// geth 启动命令：
// geth --testnet --fast --rpc --rpcapi "db,eth,net,web3,personal" --rpccorsdomain "*" --rpcaddr "127.0.0.1" --rpcport "8545" console
// pm2 start --name "geth" geth -- --datadir "/mnt/data/ethereum" --fast --rpc --rpcapi "db,eth,net,web3,personal" --rpccorsdomain "*" --rpcaddr "127.0.0.1" --rpcport "8545" console


// contract
const contractConfig = require('./assets/js/contract')
const contract = eth.contract(contractConfig.abi).at(contractConfig.address)
console.log( blockNumber )


// console.log( eth.getTransactionReceipt )

// console.log( Object.keys(contract) )
// allEvents 没有动静
contract.allEvents({
  // _userAddress: '',
  fromBlock:blockNumber-(60*24*15) * 7
},(err,res)=>{
  console.log('_______________s');
  console.log(err? 'err': res.event)
  console.log('_______________e');
})


// 自运行
;(function(){
  return;
  let bet = contract.LogBet(
    { _userAddress: '' },
    { fromBlock:eth.blockNumber-(60*24*15) * 7}
  )
  bet.watch((err,result)=>{
    console.log('_________________');
    console.log( err? err: 'done'  )
    console.log('_________________');
  })
  // 
  // console.log( web3.fromWei(eth.getBalance(contractConfig.address).toNumber()), ' ETH' )
})()
