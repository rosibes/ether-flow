import React from "react";
import { requestAccount } from "../utils/contractServices";

function ConnectWalletButton({ setAccount, setProvider }) {
  const connectWallet = async () => {
    try {
      const account = await requestAccount(setProvider); // Setează provider-ul la conectare
      if (account) {
        setAccount(account); // Setează contul conectat
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return <div className="bg-custom-blue h-screen flex justify-center items-center">
   <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-blue-900 transition duration-300"

   onClick={connectWallet}>Connect Web3 Wallet</button>;
    <footer className=" text-gray-100 w-full py-4 mt-4 text-sm border-t absolute bottom-0">
          Developed by <a
            href="https://x.com/rosibes27"
            target="_blank"
            rel="noopener noreferrer" className="text-gray-100 text-lg">rosibes</a>
        </footer>
   </div>
}

export default ConnectWalletButton;
