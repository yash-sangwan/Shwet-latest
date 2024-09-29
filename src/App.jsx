import React, { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@solana/wallet-adapter-react-ui/styles.css";

import "./App.css";
import HomeDB from "./Pages/Dashboard/HomeDB";
import NotificationDB from "./Pages/Dashboard/NotificationDB";
import GroupsDB from "./Pages/Dashboard/GroupsDB";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';
import { BlogProvider } from "./Components/extra/BlogContext";
import RequestProof from "./Components/Dashboard/PublicPost/RequestProof";
import Playground from "./Pages/Playground/Playground";
import PublicPost from "./Components/Dashboard/PublicPost/PublicPost";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => `https://api.devnet.solana.com`, []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <BlogProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/read/home" element={<HomeDB />} />
                  <Route path="/read/groups" element={<GroupsDB />} />
                  <Route path="/read/notifications" element={<NotificationDB />} />
                  <Route path="/playground" element={<Playground />} />
                  <Route path="/request-proof" element={<RequestProof />} />
                  <Route path="/addData" element={<PublicPost />} />
                </Routes>
              </div>
            </Router>
          </BlogProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;