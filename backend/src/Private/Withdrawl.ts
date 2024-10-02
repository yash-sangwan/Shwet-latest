import dotenv from "dotenv";
import { Rpc, confirmTx, createRpc, bn } from "@lightprotocol/stateless.js";
import { transfer } from "@lightprotocol/compressed-token";
import { PublicKey } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const RPC_ENDPOINT =
  "https://devnet.helius-rpc.com?api-key=cefa0faa-49d0-4044-8359-118378eb7cbd";

const COMPRESSION_RPC_ENDPOINT = RPC_ENDPOINT;

const connection: Rpc = createRpc(RPC_ENDPOINT, COMPRESSION_RPC_ENDPOINT);

dotenv.config();

interface WithdrawResult {
  status: boolean;
  txid?: string;
}

export const Withdraw = async (
  Address: string,
  Amount: number
): Promise<WithdrawResult> => {
  try {
    const recipient = new PublicKey(Address);
    const amount = Amount * 1e9;

    const PAYER = await getKeypairFromEnvironment("KEYPAIR");

    console.log(PAYER.publicKey);
    console.log(recipient);
    const MINT = process.env.MINT as string;
    const mint = new PublicKey(MINT);

    // 1. Fetch latest token account state
    const compressedTokenAccounts =
      await connection.getCompressedTokenAccountsByOwner(PAYER.publicKey, {
        mint,
      });

    console.log(`compressed token accounts: ${compressedTokenAccounts}`);
    const transferTxId = await transfer(
      connection,
      PAYER,
      mint,
      amount, // Amount
      PAYER, // Owner
      recipient // To address
    );

    // console.log(`Transfer success! txId: ${transferTxId}`);

    const tx = await confirmTx(connection, transferTxId);

    console.log(`Transaction is confirmed: ${transferTxId}`);

    // 8. Fetch recipient balances to verify the transfer
    const balances = await connection.getCompressedTokenBalancesByOwner(
      recipient
    );
    
    // balances.items.forEach((balance) => {
    //   console.log(`Mint: ${balance.mint.toBase58()}`);
    //   console.log(`Balance: ${balance.balance}`);
    //   console.log("---");
    // });
    return { status: true, txid: transferTxId };
  } catch (error) {
    console.error("Error in withdraw:", error);
    return { status: false, txid: "" };
  }
};
