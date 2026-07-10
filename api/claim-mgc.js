import StellarSdk from "@stellar/stellar-sdk";

const server = new StellarSdk.Horizon.Server("https://api.testnet.minepi.com");
const NETWORK_PASSPHRASE = "Pi Testnet";
const REWARD_AMOUNT = "10";

export default async function handler(req, res) {
if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

try {
const {
  destination,
  accessToken,
  piUserId,
  username
} = req.body || {}; 
if (!accessToken) {
  return res.status(401).json({
    success: false,
    error: "Pi Access Token مفقود"
  });
}

const verify = await fetch("https://api.minepi.com/v2/me", {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

if (!verify.ok) {
  return res.status(401).json({
    success: false,
    error: "Pi Access Token غير صالح"
  });
}

const piUser = await verify.json();

if (piUser.uid !== piUserId) {
  return res.status(401).json({
    success: false,
    error: "فشل التحقق من المستخدم"
  });
}
  
  ```
if (!destination || !destination.startsWith("G")) {
  return res.status(400).json({
    error: "عنوان محفظة اللاعب غير صالح"
  });
}

const distributor = StellarSdk.Keypair.fromSecret(
  process.env.DISTRIBUTOR_SECRET
);

const mgc = new StellarSdk.Asset(
  "MGC",
  process.env.MGC_ISSUER_PUBLIC_KEY
);

const distributorAccount = await server.loadAccount(
  distributor.publicKey()
);

const transaction = new StellarSdk.TransactionBuilder(
  distributorAccount,
  {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE
  }
)
  .addOperation(
    StellarSdk.Operation.payment({
      destination,
      asset: mgc,
      amount: REWARD_AMOUNT
    })
  )
  .setTimeout(90)
  .build();

transaction.sign(distributor);

const result = await server.submitTransaction(transaction);

return res.status(200).json({
  success: true,
  reward: REWARD_AMOUNT,
  asset: "MGC",
  transactionHash: result.hash
});
```

} catch (error) {
console.error(error);

```
return res.status(500).json({
  success: false,
  error:
    error.response?.data?.extras?.result_codes ||
    error.message ||
    "فشل إرسال مكافأة MGC"
});
```

}
}
