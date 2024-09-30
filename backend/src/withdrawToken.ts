import { Rpc, confirmTx, createRpc, bn, sendAndConfirmTx, buildTx, buildAndSignTx } from "@lightprotocol/stateless.js";
import { transfer } from "@lightprotocol/compressed-token";
import { PublicKey } from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import {
  CompressedTokenProgram,
  selectMinCompressedTokenAccountsForTransfer,
} from "@lightprotocol/compressed-token";
import { getKeypairFromFile } from "@solana-developers/helpers";

/// Helius exposes the Solana and compression RPC endpoints through a single URL
const RPC_ENDPOINT =
  "https://devnet.helius-rpc.com?api-key=cefa0faa-49d0-4044-8359-118378eb7cbd";
const COMPRESSION_RPC_ENDPOINT = RPC_ENDPOINT;
const connection: Rpc = createRpc(RPC_ENDPOINT, COMPRESSION_RPC_ENDPOINT);

const amount = bn(1e8);

const withdraw = async () => {
  const PAYER = await getKeypairFromFile("./my-keypair.json");
  console.log(PAYER.publicKey)
  const mint = new PublicKey("GVr9USRV6C72yEYRCj81eE26dBZzkQG1nZqZ8LCBZkqn");
  const recipient = new PublicKey("ARWRANUGJ7eAKvfXzpMtWRQFPFUYPUxMYvGXHFf5F7mH");
  
  try {
    // 1. Fetch latest token account state
    const compressedTokenAccounts =
      await connection.getCompressedTokenAccountsByOwner(PAYER.publicKey, {
        mint,
      });

      console.log(`compressed token accounts: ${compressedTokenAccounts}`)
    // 2. Select accounts to transfer from based on the transfer amount
    // const [inputAccounts] = selectMinCompressedTokenAccountsForTransfer(
    //   compressedTokenAccounts.items,
    //   amount
    // );

    // 3. Fetch recent validity proof
    // const proof = await connection.getValidityProof(
    //   inputAccounts.map((account) => bn(account.compressedAccount.hash))
    // );

    // 4. Create transfer instruction
    // const ix = await CompressedTokenProgram.transfer({
    //   payer: PAYER.publicKey,
    //   inputCompressedTokenAccounts: inputAccounts,
    //   toAddress: recipient,
    //   amount,
    //   recentInputStateRootIndices: proof.rootIndices,
    //   recentValidityProof: proof.compressedProof,
    // });
    
    // const buildid = await buildTx(
    //     ix,
    //     PAYER.publicKey,
    //     latestBlockHash,

    // )


    // 5. Sign and send...
    /// Transfer compressed tokens
    const transferTxId = await transfer(
      connection,
      PAYER,
      mint,
      1e9, // Amount
      PAYER, // Owner
      recipient // To address
    );

    // console.log(`Transfer success! txId: ${transferTxId}`);

    const tx = await confirmTx(
      connection,
      transferTxId
    )

console.log(`Transaction is confirmed: ${transferTxId}`)

    // 8. Fetch recipient balances to verify the transfer
    const balances = await connection.getCompressedTokenBalancesByOwner(
      recipient
    );
    balances.items.forEach((balance) => {
      console.log(`Mint: ${balance.mint.toBase58()}`);
      console.log(`Balance: ${balance.balance}`);
      console.log("---");
  })
  } catch (error: any) {
    console.log(`ERROR IS: ${error.message}`);
  }
};

withdraw();