// koa
const Koa  = require('koa')
const koa  = new Koa()
const host = '127.0.0.1'
const port = '4444'

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
// const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io"));
// const web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.28.129:8545"));
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const eth  = web3.eth;


// contract
process.env.NODE_ENV = 'development'
const contractConfig = require('./assets/js/contract')
const contract = eth.contract(contractConfig.abi).at('0x2D05359A51ca13C4ac5f4437585AFaf5bF2050F9')
let bet = contract.LogBet(
    { _userAddress: '' },
    { fromBlock   :3303936-(60*24*15) * 7}
  );

// bet.watch((err,result)=>{
//   console.log('______________rb')
//   console.log( err||result )
//   console.log('______________rb')
// })




eth.getBlockNumber((err,res)=>{
  console.log('________________')
  console.log(err||res)
  console.log('________________')
})


koa.use(async (ctx)=>{
  ctx.body = await new Promise((resolve,reject)=>{
    eth.getBlockNumber((err,result)=>{
      if ( err ) reject(-1)
      else resolve(result)
    })
  })
})

koa.listen(port)
console.log( `server runnint at: ${host}:${port}` );
