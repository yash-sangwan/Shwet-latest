import React, { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@solana/wallet-adapter-react-ui/styles.css";

import "./App.css";
import HomeDB from "./Pages/Dashboard/HomeDB";
import NotificationDB from "./Pages/Dashboard/NotificationDB";
import GroupsDB from "./Pages/Dashboard/GroupsDB";
import Home from "./Pages/Home";
import Docs from "./Pages/Docs";
import Pricing from "./Pages/Pricing";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import RequestProof from "./Components/Dashboard/PublicPost/RequestProof";
import Playground from "./Pages/Playground/Playground";
import PublicPost from "./Components/Dashboard/PublicPost/PublicPost";
import { AuthProvider } from "./Components/Private/AuthContext";

import WorkerRoute from "./Components/Private/WokerRoute";
import ProviderRoute from "./Components/Private/ProviderRoute";

import Init from "./Pages/Init";
import PageNotFound from "./Pages/PageNotFound";

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
    <AuthProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/docs" element={<Docs />} />
                  <Route path="/pricing" element={<Pricing />} />

                  <Route path="/user/init" element={<Init />} />

                  {/* <Route path="/user/dashboard" element={<HomeDB />} />
                  <Route path="/user/dashboard/group" element={<GroupsDB />} />
                  <Route path="/user/dashboard/notifications" element={<NotificationDB />} />
                  <Route path="/user/dashboard/contribute/request-proof" element={<RequestProof />} />
                  <Route path="/user/dashboard/contribute" element={<PublicPost />} /> */}

                  <Route
                    path="/user/dashboard/*"
                    element={
                      <WorkerRoute>
                        <Routes>
                          <Route index element={<HomeDB />} />
                          <Route path="group" element={<GroupsDB />} />
                          <Route path="notifications" element={<NotificationDB />} />
                          <Route path="contribute/request-proof" element={<RequestProof />} />
                          <Route path="contribute" element={<PublicPost />} />
                        </Routes>
                      </WorkerRoute>
                    }
                  />

                  <Route path="/playground" element={ <ProviderRoute> <Playground /> </ProviderRoute> } />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </div>
            </Router>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </AuthProvider>
  );
}

export default App;