import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export const useWalletPayment = () => {

  const [error, setError] = useState(null);


  return { handlePayment, error };
};