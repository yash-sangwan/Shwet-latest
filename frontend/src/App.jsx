import React, { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@solana/wallet-adapter-react-ui/styles.css";

import "./App.css";
import HomeDB from "./pages/Dashboard/HomeDB";
import NotificationDB from "./pages/Dashboard/NotificationDB";
import GroupsDB from "./pages/Dashboard/GroupsDB";
import Home from "./pages/Home";
import Docs from "./pages/Docs";
import Pricing from "./pages/Pricing";
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
import RequestProof from "./components/Dashboard/PublicPost/RequestProof";
import Playground from "./pages/Playground/Playground";
import PublicPost from "./components/Dashboard/PublicPost/PublicPost";
import { AuthProvider } from "./components/Private/AuthContext";

import WorkerRoute from "./components/Private/WokerRoute";
import ProviderRoute from "./components/Private/ProviderRoute";

import Init from "./pages/Init";
import PageNotFound from "./pages/PageNotFound";

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
