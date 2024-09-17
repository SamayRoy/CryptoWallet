import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
    if (typeof window.ethereum === 'undefined') {
      console.log("MetaMask is not installed or not detected.");
      throw new Error("MetaMask is not installed or not detected.");
      return;
    }
  
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  
      console.log({
        provider,
        signer,
        transactionContract
      });
  
      return transactionContract;
    } catch (error) {
      console.error("Error in getEthereumContract:", error);
      throw new Error("Failed to get the Ethereum contract.");
    }
  }
  

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState("");
    const [formData, setFormData] = useState({addressTo: '', amount: '', message: '', keyword: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount') || 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            }
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            console.log(accounts)

            if (accounts.length) {
                setConnectedAccount(accounts[0]);

                //getALlTransactions();
            } else {
                console.log("No authorized account found");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

    const sendTransaction = async (transaction) => {
        try {
            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            }
            const {addressTo, amount, message, keyword} = formData;
            const transactionContract = await getEthereumContract();
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: connectedAccount,
                        to: addressTo,
                        gasLimit: "0x4200",
                        value: ethers.utils.parseEther(amount)._hex
                    }
                ] 
            }); 
            const transactionHash = await transactionContract.addToBlockchain(addressTo,amount,message, keyword);
            setIsLoading(true);
            console.log("Loading - ${transactionHash.hash}");
            await transactionHash.wait();
            setIsLoading(true);
            console.log("Success - ${transactionHash.hash}");
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
        } catch (error) {
            console.log(error);
            throw new Error("Error sending transaction");
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setConnectedAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("Error connecting to wallet");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAccount,formData,setFormData, sendTransaction, handleChange }}>
            {children}
        </TransactionContext.Provider>
    );
};