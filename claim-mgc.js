import StellarSdk from "@stellar/stellar-sdk";

const server = new StellarSdk.Horizon.Server(
  "https://api.testnet.minepi.com"
);

const NETWORK_PASSPHRASE = "Pi Testnet";
const REWARD_AMOUNT = "10";

const MGC_ISSUER_PUBLIC_KEY =
  "GDOER6G5XBEVYVQUCZNNGV27ADGELVNVAAEYKLZT6I4HRNVEF57RG64T";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "POST only"
    });
  }

  try {
    const {
      level,
      proof,
      destination
    } = req.body || {};

    if (!proof) {
      throw new Error("بيانات الفوز مفقودة");
    }

    if (!destination || !destination.startsWith("G")) {
      throw new Error("عنوان Stellar غير صالح");
    }

    // حساب التوزيع
    const distributor = StellarSdk.Keypair.fromSecret(
      process.env.DISTRIBUTOR_SECRET
    );

    // عملة MGC
    const mgc = new StellarSdk.Asset(
      "MGC",
      MGC_ISSUER_PUBLIC_KEY
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

    const result = await server.submitTransaction(
      transaction
    );

    return res.status(200).json({
      ok: true,
      level,
      reward: REWARD_AMOUNT,
      asset: "MGC",
      transactionHash: result.hash,
      message: "تم إرسال مكافأة MGC بنجاح"
    });

  } catch (e) {
    console.error(e);

    return res.status(400).json({
      ok: false,
      error:
        e.response?.data?.extras?.result_codes ||
        e.message
    });
  }
}
