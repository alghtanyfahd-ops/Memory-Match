const StellarSdk = require('stellar-sdk');
const crypto = require('crypto');
const HORIZON = 'https://horizon-testnet.stellar.org';
exports.handler = async (event) => {
 if (event.httpMethod !== 'POST') return {statusCode:405,body:JSON.stringify({error:'POST only'})};
 try {
  const {stellarAddress, level, proof} = JSON.parse(event.body || '{}');
  if (!/^G[A-Z2-7]{55}$/.test(stellarAddress||'')) throw new Error('عنوان Stellar غير صالح');
  const rewards={1:'10',2:'25',3:'50'}; const amount=rewards[level] || '10';
  if (!proof) throw new Error('بيانات الفوز مفقودة');
  const server = new StellarSdk.Horizon.Server(HORIZON);
  const issuer=process.env.ISSUER; const asset=new StellarSdk.Asset(process.env.ASSET_CODE||'MGC',issuer);
  const destination=await server.loadAccount(stellarAddress);
  if (!destination.balances.some(b=>b.asset_code===asset.code && b.asset_issuer===issuer)) throw new Error('أضف Trustline لعملة MGC أولاً');
  const source=StellarSdk.Keypair.fromSecret(process.env.DISTRIBUTION_SECRET);
  const account=await server.loadAccount(source.publicKey());
  const tx=new StellarSdk.TransactionBuilder(account,{fee:StellarSdk.BASE_FEE,networkPassphrase:StellarSdk.Networks.TESTNET})
   .addOperation(StellarSdk.Operation.payment({destination:stellarAddress,asset,amount}))
   .setTimeout(30).build(); tx.sign(source); const result=await server.submitTransaction(tx);
  return {statusCode:200,body:JSON.stringify({ok:true,amount,hash:result.hash})};
 } catch(e){ return {statusCode:400,body:JSON.stringify({ok:false,error:e.message})}; }
};
