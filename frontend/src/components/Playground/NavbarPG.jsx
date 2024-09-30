import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCopy,
} from "react-icons/fa";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import Notification from "../Notification";
import LoginComponent from "../Auth/Login";
import { getProgram } from "../../Utils/anchorClient";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiMenu, FiX } from "react-icons/fi";
import ConnectSheet from '../Dashboard/UserConnect/ConnectSheet'

const NavbarDB = ({ onConnect, isAccountReadyFromProps }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isAccountReady, setIsAccountReady] = useState(isAccountReadyFromProps || false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connected, connect, select, disconnect, wallet, wallets, publicKey } = useWallet();
  const [notification, setNotification] = useState({ message: "", type: "", visible: false });
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWalletLoading, setIsWalletLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [walletAction, setWalletAction] = useState("");
  const [isUserInitialized, setIsUserInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [isConnectSheetOpen, setIsConnectSheetOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openConnectSheet = () => setIsConnectSheetOpen(true);
  const closeConnectSheet = () => setIsConnectSheetOpen(false);

  const handleWalletConnect = async (walletName) => {
    try {
      setIsConnecting(true);
      setWalletAction("connect");
      console.log(`Attempting to connect to ${walletName}`);
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
      console.log(`handleConnect called with wallet: ${selectedWalletName}`);
      
      const selectedWallet = wallets.find(w => w.adapter.name === selectedWalletName);
      
      if (!selectedWallet) {
        throw new Error(`No wallet found with the name: ${selectedWalletName}`);
      }
  
      console.log(`Selected wallet:`, selectedWallet);
      console.log(`Wallet ready state:`, selectedWallet.readyState);
  
      if (selectedWallet.readyState !== WalletReadyState.Installed) {
        throw new Error(`${selectedWalletName} is not installed or not ready`);
      }
  
      console.log(`Selecting wallet: ${selectedWallet.adapter.name}`);
      await select(selectedWallet.adapter.name);
      
      console.log("Wallet selected, attempting to connect");
      await connect();
  
      if (!connected || !publicKey) {
        throw new Error("Wallet connected, but connection state is inconsistent");
      }
  
      console.log(`Connected successfully. Public Key: ${publicKey.toBase58()}`);
      setIsWalletConnected(true);
      onConnect();
  
      await initializeUserAccount();
    } catch (error) {
      console.error("Detailed connect error:", error);
      throw error;
    }
  };
  
  useEffect(() => {
    const initStatus = localStorage.getItem('userInitialized');
    if (initStatus === 'true') {
      setIsUserInitialized(true);
    }
  }, []);

  const initializeUserAccount = async () => {
    if (!connected || !publicKey || !wallet) {
      console.error("Cannot initialize user account: Wallet not fully connected");
      showNotification("Please ensure your wallet is connected before initializing.", "error");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Initializing user account...");

      const program = getProgram(wallet.adapter);

      const [userPda] = await PublicKey.findProgramAddressSync(
        [Buffer.from("user"), publicKey.toBuffer()],
        program.programId
      );

      console.log("Derived user account:", userPda.toBase58());

      const accountInfo = await program.provider.connection.getAccountInfo(userPda);

      if (!accountInfo) {
        console.log("User account not found, initializing...");
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
        localStorage.setItem('userInitialized', 'true');
      } else {
        console.log("User account already exists.");
        setIsUserInitialized(true);
        localStorage.setItem('userInitialized', 'true');

        const userAccount = await program.account.user.fetch(userPda);
        console.log("User account data:", userAccount);
      }
    } catch (error) {
      console.error("Failed to initialize user account:", error);
      showNotification("Failed to initialize user account. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToWrite = () => {
    navigate("/addpost");
  };
  const menuRef = useRef(null);
  // Navigate to Playground
  const handleNavigateToPlayground = () => {
    navigate("/playground");
  };

  // Useffect for login
  /*
  
  useEffect(()=>{
    if(!(localStorage.getItem('jwtToken'))){
      setIsLoggedIn(false);
    }else{
      setIsLoggedIn(true)
    }
      }, [localStorage.getItem('jwtToken')])
    
      */

  // useffect for wallet
  useEffect(() => {
    setIsWalletLoading(false);
  }, [connected]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu(); // Close menu when clicking outside
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, toggleMenu]);
  
  const handleLogin = () => {
    setShowLogin(true); // Show login component when login button is clicked
  };

  const handleLoginSuccess = async () => {
    try {
      setIsLoading(true);
      if (localStorage.getItem("jwtToken")) {
        setShowLogin(false); // Hide login component after successful login
        showNotification("Login successful!", "success");
        navigate("/read/home"); // Navigate to the desired route after login
        setIsLoggedIn(true);
      }
    } catch (error) {
      showNotification(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      localStorage.removeItem("jwtToken"); // Clear the JWT token
      await handleDisconnect();
      setIsLoggedIn(false); // Update isLoggedIn state to false
      showNotification("Logout successful!", "success");
      navigate("/read/home"); // Redirect to the login page after logout
    } catch (error) {
      showNotification(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      walletAction === "connect" &&
      connected &&
      !isConnecting &&
      !isWalletLoading
    ) {
      showNotification("Wallet connected successfully!", "success");
    } else if (
      walletAction === "disconnect" &&
      !connected &&
      !isConnecting &&
      !isWalletLoading
    ) {
      showNotification("Wallet disconnected successfully!", "success");
    }
  }, [connected, isConnecting, isWalletLoading, walletAction]);


 
  

  const handleDisconnect = async () => {
    try {
      setIsLoading(true);
      setWalletAction("disconnect"); // Set action to disconnect
      await disconnect();
      showNotification("Wallet disconnected successfully!", "success");
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      showNotification(
        "Failed to disconnect wallet. Please try again.",
        "error"
      );
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

  const handleCopyPublicKey = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      showNotification("Public key copied to clipboard!", "success");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const shortenPublicKey = (publicKey) => {
    if (!publicKey) return "";
    const publicKeyStr = publicKey.toBase58();
    return `${publicKeyStr.slice(0, 3)}...${publicKeyStr.slice(-3)}`;
  };
  return (
    <nav className="bg-gray-900 text-white flex items-center justify-between px-8 py-2 fixed top-0 left-0 w-full z-50">
    {notification.visible && (
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />
    )}
  
    {/* Show login component when showLogin is true */}
    {showLogin && (
      <LoginComponent
        onSuccess={handleLoginSuccess}
        onClose={() => setShowLogin(false)}
      />
    )}
  
    {/* Brand Logo */}
    <div className="text-primary text-3xl font-bold mr-4">Shwet</div>
  
    {/* Navigation Links - Hidden on small/medium screens, visible on large */}
    <div
      className={`lg:flex items-center space-x-7 flex-1 justify-center mr-4 ${
        isMenuOpen ? "hidden" : "hidden"
      } lg:block`}
    >
    
      <NavLink
        to="/playground"
        className={({ isActive }) =>
          `relative cursor-pointer text-xl playground-icon ${
            isActive
              ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
              : "hover:text-gray-300"
          }`
        }
      >
        <FontAwesomeIcon icon={faCode} />
      </NavLink>
    </div>

  
    {/* Profile and Connect buttons (always visible) */}
    <div className="flex items-center space-x-4 relative">
      {isLoggedIn ? (
        <button
          className="bg-primary text-black px-4 py-1 rounded-full hover:bg-secondary"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className="bg-primary text-black px-4 py-1 rounded-full hover:bg-secondary"
          onClick={handleLogin}
        >
          Login
        </button>
      )}
  
      {isWalletLoading ? (
        <span className="text-white">Loading...</span>
      ) : (
        <>
           {!connected && !isConnecting ? (
    <button
      className="bg-primary text-black px-4 py-1 rounded-full hover:bg-secondary connect-btn"
      onClick={openConnectSheet}
    >
      Connect
    </button>
  ) : connected && !isConnecting ? (
            <>
              {/* <button className="bg-gray-700 text-white px-4 py-1 rounded-full hover:bg-gray-600 ">
                Try Shwet+
              </button> */}
  
              <div className="relative" ref={dropdownRef}>
                <div className="cursor-pointer" onClick={toggleDropdown}>
                  <img
                    src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
  
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg p-2 z-50">
                    <div className="flex items-center justify-between px-2 py-1">
                      <span
                        className="text-white text-sm cursor-pointer"
                        onClick={handleCopyPublicKey}
                        title="Click to copy public key"
                      >
                        {publicKey ? shortenPublicKey(publicKey) : "N/A"}
                      </span>
                      <FaCopy
                        className="text-white cursor-pointer hover:text-gray-300"
                        onClick={handleCopyPublicKey}
                        title="Copy Public Key"
                      />
                    </div>
                    <hr className="border-gray-700 my-2" />
                    <button
                      className="w-full text-left px-2 py-1 text-white hover:bg-gray-700 rounded"
                      onClick={handleDisconnect}
                    >
                      Disconnect Wallet
                    </button>
                  </div>
                )}
              </div>
  
              {isUserInitialized ? (
             null
              ) : (
                // <button
                //   className="bg-primary text-black px-4 py-1 rounded-full hover:bg-secondary .initialize-btn"
                //   onClick={initializeUserAccount}
                // >
                //   Initialize User
                // </button>
                ""
              )}
            </>
          ) : (
            <span className="text-white">Connecting...</span>
          )}
        </>
      )}
  
      {/* Hamburger Icon (Visible on medium and smaller screens) */}
      <div className="lg:hidden ml-4">
        <button
          onClick={toggleMenu}
          className="text-white text-3xl focus:outline-none"
        >
          {isMenuOpen ? null : <FiMenu />}
        </button>
      </div>
    </div>
  
    {/* Full-Screen Mobile Menu */}
  {/* Only show the sidebar on small screens */}
  {isMenuOpen && (
        <div
          ref={menuRef}
          className={`lg:hidden fixed top-0 right-0 w-2/5 h-full bg-gray-900 bg-opacity-95 z-40 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Cross button to close the menu */}
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={toggleMenu}
          >
            &times;
          </button>

          {/* Navigation Links */}
         
          <NavLink
            to="/playground"
            className="text-xl text-white mb-6 flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition-colors duration-300 playground-icon"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faCode} className="mr-2" /> Playground
          </NavLink>

          {/* Shwet+ Button */}
          <button
            className="bg-gray-700 text-white px-6 py-2 rounded-full mb-6 hover:bg-gray-600 transition-colors duration-300"
            onClick={toggleMenu}
          >
            Try Shwet+
          </button>
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
