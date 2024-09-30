import { createMint, mintTo } from "@lightprotocol/compressed-token";
import { Rpc, confirmTx, createRpc, bn } from "@lightprotocol/stateless.js";
import { PublicKey } from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import { getKeypairFromFile } from "@solana-developers/helpers";

const RPC_ENDPOINT =
  "https://devnet.helius-rpc.com?api-key=cefa0faa-49d0-4044-8359-118378eb7cbd";
const COMPRESSION_RPC_ENDPOINT = RPC_ENDPOINT;
const connection: Rpc = createRpc(RPC_ENDPOINT, COMPRESSION_RPC_ENDPOINT);

const mint = async () => {
  const PAYER = await getKeypairFromFile("./my-keypair.json");
  const MINT_KEYPAIR = await getKeypairFromFile("./mint-keypair.json");

  console.log(MINT_KEYPAIR.publicKey);

//   const { mint, transactionSignature } = await createMint(
//     connection,
//     PAYER,
//     MINT_KEYPAIR.publicKey,
//     10
//   );
//   console.log(`new mint: ${mint}`);
//   console.log(`create-mint success! txId: ${transactionSignature}`);

  /// Mint compressed tokens
  const mint = new PublicKey("GVr9USRV6C72yEYRCj81eE26dBZzkQG1nZqZ8LCBZkqn");
  
  const mintToTxId = await mintTo(
    connection,
    PAYER,
    mint,
    PAYER.publicKey,
    MINT_KEYPAIR,
    1e12
  );
  console.log(`mint-to success! txId: ${mintToTxId}`);


  
};


mint();