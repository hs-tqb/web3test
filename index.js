// koa
const Koa  = require('koa')
const koa  = new Koa()
const host = '127.0.0.1'
const port = '5555'

// geth
// const geth    = require('geth')
// const gethOpt = {
//   networkid: "10101",
//   port: 30303,
//   rpcport: 8546,
//   mine: null
// }
// geth.start(gethOpt, function (err, proc) {
//   if (err) return console.error(err);
//   // get your geth on!
// });

// web3
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

koa.use(async (ctx)=>{
  ctx.body = await new Promise((resolve,reject)=>{
    web3.eth.getAccounts((err,result)=>{
      if ( err ) return reject(JSON.stringify(err))
      else resolve(JSON.stringify(result))
    })
  }).catch(err=>{
    console.log(err.toString())
  })
})

koa.listen(port)
console.log( `server runnint at: ${host}:${port}` );
