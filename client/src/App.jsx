import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { requestAccount } from "./utils/contractServices";
import ConnectWalletButton from "./components/ConnectWalletButton";
import ContractInfo from "./components/ContractInfo";
import ContractActions from "./components/ContractActions";
import "react-toastify/dist/ReactToastify.css";
import './index.css';

function App() {
  const [account, setAccount] = useState(null); // pentru a ține cont de adresa portofelului conectat
  const [provider, setProvider] = useState(null); // providerul de Ethereum (MetaMask)

  useEffect(() => {
    const fetchCurAccount = async () => {
      const account = await requestAccount(provider);
      if (account) {
        setAccount(account);
      }
    };

    if (provider) {
      fetchCurAccount();
    }
  }, [provider]);

  useEffect(() => {
    const handleAccountChanged = (newAccounts) => {
      setAccount(newAccounts.length > 0 ? newAccounts[0] : null);
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
    }

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChanged);
    };
  }, []);

  const handleLogout = () => {
    setAccount(null);
    setProvider(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-custom-blue">
      <ToastContainer />
      {!account ? (
        <ConnectWalletButton setAccount={setAccount} setProvider={setProvider} />
      ) : (
        <div className="w-full max-w-lg">
          <ContractInfo account={account} handleLogout={handleLogout} />
          <ContractActions />
        </div>
      )}
      <div className="w-full py-7 mt-4 text-sm border-t absolute bottom-0">
      <footer className=" text-gray-100  py-4 text-sm  absolute bottom-0 ml-10">
      Developed by <a
            href="https://x.com/rosibes27"
            target="_blank"
            rel="noopener noreferrer" className="text-gray-100 text-lg">rosibes</a>
        </footer>
      </div>
      
    </div>

  );
}

export default App;
