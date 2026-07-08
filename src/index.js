import * as StellarSdk from "@stellar/stellar-sdk";

const HORIZON = "https://horizon-testnet.stellar.org";

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "POST only" }),
        {
          status: 405,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    try {
      const { stellarAddress, level, proof } = await request.json();

      if (!/^G[A-Z2-7]{55}$/.test(stellarAddress || "")) {
        throw new Error("عنوان Stellar غير صالح");
      }

      if (!proof) {
        throw new Error("بيانات الفوز مفقودة");
      }

      const rewards = {
        1: "10",
        2: "25",
        3: "50"
      };

      const amount = rewards[level] || "10";

      const server = new StellarSdk.Horizon.Server(HORIZON);

      const asset = new StellarSdk.Asset(
        env.ASSET_CODE,
        env.ISSUER
      );

      const destination = await server.loadAccount(stellarAddress);

      const hasTrustline = destination.balances.some(
        (b) =>
          b.asset_code === env.ASSET_CODE &&
          b.asset_issuer === env.ISSUER
      );

      if (!hasTrustline) {
        throw new Error("يجب إضافة Trustline لعملة MGC أولاً");
      }

      const source = StellarSdk.Keypair.fromSecret(
        env.DISTRIBUTION_SECRET
      );

      const account = await server.loadAccount(
        source.publicKey()
      );

      const transaction = new StellarSdk.TransactionBuilder(
        account,
        {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET
        }
      )
        .addOperation(
          StellarSdk.Operation.payment({
            destination: stellarAddress,
            asset,
            amount
          })
        )
        .setTimeout(30)
        .build();

      transaction.sign(source);

      const result = await server.submitTransaction(transaction);

      return new Response(
        JSON.stringify({
          ok: true,
          amount,
          hash: result.hash
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

    } catch (error) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: error.message
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
  }
};
