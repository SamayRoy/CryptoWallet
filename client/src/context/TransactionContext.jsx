// import React, { useEffect, useState } from "react";
// import {ethers} from 'ethers';

// import {contractABI, contractAddress} from '../utils/constants';


// export const TransactionContext = React.createContext();

// const {ethereum} = window;

// const getEthereumContract  = () => {
//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const signer = provider.getSigner();
//     const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

//     console.log({
//         provider,
//         signer,
//         transactionContract
//     })
// }

// export const transactionProvider = ({children}) => {

//     const [connectedAccount, setConnectedAccount] = useState("");
    
//     const checkIfWalletIsConnected = async () => {
//         if(!ethereum){
//             console.log("Make sure you have metamask!");
//             return;
//         const accounts = await ethereum.request({method: 'eth_accounts'});

//         console.log(accounts);

//         useEffect(() => {
//             checkIfWalletIsConnected();
//         }, []);
//     }

//     const connectWallet = async () => {
//         try{
//             if(!ethereum){
//                 console.log("Make sure you have metamask!");
//                 return;
//             const accounts = await ethereum.request({method: 'eth_requestAccounts'});

//             setCurrent

//         }
//     } catch (error) {
//         console.log(error)

//         throw new Error("Error Eth object")
//     }
//     useEffect(() => {
//         checkIfWalletIsConnected();
//     }, []);

// }}

//     return (
//         <TransactionContext.Provider value={{connectWallet}}>
//             {children}</TransactionContext.Provider>
//     );
// };


import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });

    return transactionContract;
};

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState("");

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            }
            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setConnectedAccount(accounts[0]);
                // You can add more logic here, like fetching the user's balance
            } else {
                console.log("No authorized account found");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

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
        <TransactionContext.Provider value={{ connectWallet, connectedAccount }}>
            {children}
        </TransactionContext.Provider>
    );
};