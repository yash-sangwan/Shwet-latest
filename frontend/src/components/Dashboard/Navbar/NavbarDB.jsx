import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { FiMenu, FiX } from "react-icons/fi";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import Notification from "../../Notification";
import LoginComponent from "../../Auth/Login";
import { getProgram } from "../../../Utils/anchorClient";
import ConnectSheet from '../../../Components/Dashboard/UserConnect/ConnectSheet';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import WalletButton from './WalletButton';

const NavbarDB = ({ onConnect, isAccountReadyFromProps }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isAccountReady, setIsAccountReady] = useState(isAccountReadyFromProps || false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connected, connect, select, disconnect, wallet, wallets, publicKey } = useWallet();
  const [notification, setNotification] = useState({ message: "", type: "", visible: false });
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWalletLoading, setIsWalletLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [walletAction, setWalletAction] = useState("");
  const [isUserInitialized, setIsUserInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isConnectSheetOpen, setIsConnectSheetOpen] = useState(false);

  useEffect(() => {
    const checkUserInitialization = async () => {
      if (connected && publicKey) {
        const program = getProgram(wallet.adapter);
        const [userPda] = await PublicKey.findProgramAddressSync(
          [Buffer.from("user"), publicKey.toBuffer()],
          program.programId
        );
        const accountInfo = await program.provider.connection.getAccountInfo(userPda);
        setIsUserInitialized(!!accountInfo);
      }
    };

    checkUserInitialization();
  }, [connected, publicKey, wallet]);

  const fetchTokenBalance = async () => {
    // Implement actual token balance fetching logic here
    // return 0;

    // return Math.floor(Math.random() * 1000);
  };

  const handleWalletConnect = async (walletName) => {
    try {
      setIsConnecting(true);
      setWalletAction("connect");
      await handleConnect(walletName);
      closeConnectSheet();
    } catch (error) {
      console.error("Error in handleWalletConnect:", error);
      showNotification(`Failed to connect wallet: ${error.message}`, "error");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnect = async (selectedWalletName) => {
    try {
      const selectedWallet = wallets.find(w => w.adapter.name === selectedWalletName);
      if (!selectedWallet) {
        throw new Error(`No wallet found with the name: ${selectedWalletName}`);
      }
      if (selectedWallet.readyState !== WalletReadyState.Installed) {
        throw new Error(`${selectedWalletName} is not installed or not ready`);
      }
      await select(selectedWallet.adapter.name);
      await connect();
      if (!connected || !publicKey) {
        throw new Error("Wallet connected, but connection state is inconsistent");
      }
      setIsWalletConnected(true);
      onConnect();
      await initializeUserAccount();
    } catch (error) {
      console.error("Detailed connect error:", error);
      throw error;
    }
  };

  const initializeUserAccount = async () => {
    if (!connected || !publicKey || !wallet) {
      showNotification("Please ensure your wallet is connected before initializing.", "error");
      return;
    }

    try {
      setIsLoading(true);
      const program = getProgram(wallet.adapter);
      const [userPda] = await PublicKey.findProgramAddressSync(
        [Buffer.from("user"), publicKey.toBuffer()],
        program.programId
      );
      const accountInfo = await program.provider.connection.getAccountInfo(userPda);

      if (!accountInfo) {
        await program.methods
          .initUser("Your Name")
          .accounts({
            userAccount: userPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        showNotification("User account initialized successfully!", "success");
        setIsUserInitialized(true);
      } else {
        setIsUserInitialized(true);
      }
    } catch (error) {
      console.error("Failed to initialize user account:", error);
      showNotification("Failed to initialize user account. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToWrite = () => navigate("/addData");

  useEffect(() => {
    setIsWalletLoading(false);
  }, [connected]);

  const handleLogin = () => setShowLogin(true);

  const handleLoginSuccess = async () => {
    try {
      setIsLoading(true);
      if (localStorage.getItem("jwtToken")) {
        setShowLogin(false);
        showNotification("Login successful!", "success");
        navigate("/read/home");
        setIsLoggedIn(true);
      }
    } catch (error) {
      showNotification(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      localStorage.removeItem("jwtToken");
      await handleDisconnect();
      setIsLoggedIn(false);
      showNotification("Logout successful!", "success");
      navigate("/read/home");
    } catch (error) {
      showNotification(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (walletAction === "connect" && connected && !isConnecting && !isWalletLoading) {
      showNotification("Wallet connected successfully!", "success");
    } else if (walletAction === "disconnect" && !connected && !isConnecting && !isWalletLoading) {
      showNotification("Wallet disconnected successfully!", "success");
    }
  }, [connected, isConnecting, isWalletLoading, walletAction]);

  const handleDisconnect = async () => {
    try {
      setIsLoading(true);
      setWalletAction("disconnect");
      await disconnect();
      showNotification("Wallet disconnected successfully!", "success");
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      showNotification("Failed to disconnect wallet. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openConnectSheet = () => setIsConnectSheetOpen(true);
  const closeConnectSheet = () => setIsConnectSheetOpen(false);

  return (
    <nav className="bg-gray-900 text-white flex items-center justify-between px-4 py-3 fixed top-0 left-0 w-full z-50 shadow-lg">
      {notification.visible && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      
      {showLogin && (
        <LoginComponent
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}
      
      <div className="flex items-center space-x-4 lg:space-x-8 flex-shrink-0">
        <div className="text-primary text-2xl font-bold mr-4">Shwet</div>
        <NavLinks />
      </div>
      
      <div className="flex-grow max-w-xl mx-4 hidden lg:block">
        <SearchBar />
      </div>
      
      <div className="flex items-center space-x-4">
        {isWalletLoading ? (
          <span className="text-white">Loading...</span>
        ) : !connected && !isConnecting ? (
          <button
            className="bg-primary text-black px-4 py-2 rounded-full hover:bg-secondary transition-colors duration-300 connect-btn whitespace-nowrap"
            onClick={openConnectSheet}
          >
            Connect Wallet
          </button>
        ) : connected && !isConnecting ? (
          <>
            <WalletButton
              publicKey={publicKey}
              fetchTokenBalance={fetchTokenBalance}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 whitespace-nowrap"
              onClick={handleNavigateToWrite}
            >
              Contribute
            </button>
            <UserMenu
              connected={connected}
              isConnecting={isConnecting}
              publicKey={publicKey}
              handleDisconnect={handleDisconnect}
              handleLogout={handleLogout}
            />
          </>
        ) : (
          <span className="text-white">Connecting...</span>
        )}
        
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden fixed top-0 right-0 w-64 h-full bg-gray-900 bg-opacity-95 z-40 flex flex-col items-center justify-start pt-16 transition-transform duration-300 ease-in-out transform translate-x-0">
          <button className="absolute top-4 right-4 text-white text-3xl" onClick={toggleMenu}>
            &times;
          </button>
          <NavLinks />
          <div className="mt-4 w-full px-4">
            <SearchBar />
          </div>
        </div>
      )}

      <ConnectSheet
        isOpen={isConnectSheetOpen}
        onClose={closeConnectSheet}
        onConnect={handleWalletConnect}
        wallets={wallets}
      />
    </nav>
  );
};

export default NavbarDB;