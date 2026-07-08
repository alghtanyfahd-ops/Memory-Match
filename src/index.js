
import * as StellarSdk from "@stellar/stellar-sdk";

const HORIZON = "https://horizon-testnet.stellar.org";

export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    // Pi Domain Validation
    if (request.method === "GET" && url.pathname === "/validation-key.txt") {
      return new Response(
        "ce0c45ed75eee0b02640c20964969d7394bc1c22bf7a06bdf625fb3afd137ef3ce7b85202c75379a8f8d11a700af7e6ca1f882e02d44c784297a46ff633b4988 ",
        {
          headers: {
            "Content-Type": "text/plain"
          }
        }
      );
    }

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
