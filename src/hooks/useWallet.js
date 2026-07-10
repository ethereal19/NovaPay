import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { 
  isFreighterInstalled, 
  connectWallet, 
  disconnectWallet, 
  getPublicKey, 
  getNetwork, 
  signTransaction 
} from "../services/wallet";
import { getBalance, sendTransaction } from "../services/stellar";
import { isValidStellarAddress, isValidAmount } from "../utils/validators";

export const useWallet = () => {
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState("0");
  const [network, setNetwork] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Transaction States
  const [txStatus, setTxStatus] = useState("idle"); // idle | sending | success | failed
  const [txHash, setTxHash] = useState("");
  const [txError, setTxError] = useState("");

  // Check if wallet was previously authorized on mount
  useEffect(() => {
    const checkConnection = async () => {
      const installed = await isFreighterInstalled();
      if (!installed) return;

      try {
        const activeAddress = await getPublicKey();
        if (activeAddress) {
          setAddress(activeAddress);
          setIsConnected(true);
          
          const activeNetwork = await getNetwork();
          setNetwork(activeNetwork);
          
          // Initial balance check
          const xlmBalance = await getBalance(activeAddress);
          setBalance(xlmBalance);
        }
      } catch (err) {
        // Silent catch since it just means they haven't authorized yet
        console.log("Auto-connection skipped: wallet is locked or not authorized.");
      }
    };
    checkConnection();
  }, []);

  // Fetch / Refresh Balance
  const refresh = useCallback(async (showToast = false) => {
    if (!address) return;
    setIsLoading(true);
    try {
      const xlmBalance = await getBalance(address);
      setBalance(xlmBalance);
      if (showToast) {
        toast.success("Balance updated!", { id: "balance-refresh" });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update balance.");
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  // Connect Wallet
  const connect = async () => {
    setError("");
    setIsLoading(true);
    try {
      const activeAddress = await connectWallet();
      setAddress(activeAddress);
      setIsConnected(true);
      
      const activeNetwork = await getNetwork();
      setNetwork(activeNetwork);

      // Verify network is TESTNET
      if (activeNetwork !== "TESTNET") {
        toast.error("Please switch your Freighter wallet to Testnet!");
      }

      // Fetch balance
      const xlmBalance = await getBalance(activeAddress);
      setBalance(xlmBalance);

      toast.success("Wallet connected successfully!");
    } catch (err) {
      console.error("Connect failed:", err);
      setError(err.message || "Failed to connect wallet.");
      toast.error(err.message || "Connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect Wallet
  const disconnect = async () => {
    setIsLoading(true);
    try {
      await disconnectWallet();
      setAddress("");
      setIsConnected(false);
      setBalance("0");
      setNetwork("");
      setTxStatus("idle");
      setTxHash("");
      setTxError("");
      toast.success("Wallet disconnected.");
    } catch (err) {
      console.error("Disconnect failed:", err);
      toast.error("Failed to disconnect wallet.");
    } finally {
      setIsLoading(false);
    }
  };

  // Send XLM Payment
  const send = async (destination, amount) => {
    // Reset transaction states
    setTxStatus("idle");
    setTxHash("");
    setTxError("");

    // 1. Client-side Validations
    if (!isValidStellarAddress(destination)) {
      const errMsg = "Invalid recipient Stellar address.";
      setTxStatus("failed");
      setTxError(errMsg);
      toast.error(errMsg);
      return false;
    }

    const amountValidation = isValidAmount(amount, balance);
    if (!amountValidation.isValid) {
      setTxStatus("failed");
      setTxError(amountValidation.reason);
      toast.error(amountValidation.reason);
      return false;
    }

    // Double check network
    try {
      const activeNetwork = await getNetwork();
      setNetwork(activeNetwork);
      if (activeNetwork !== "TESTNET") {
        const errMsg = "Freighter is on the wrong network. Switch to Testnet.";
        setTxStatus("failed");
        setTxError(errMsg);
        toast.error(errMsg);
        return false;
      }
    } catch (err) {
      const errMsg = "Failed to verify wallet network.";
      setTxStatus("failed");
      setTxError(errMsg);
      toast.error(errMsg);
      return false;
    }

    // 2. Execute Transaction
    setTxStatus("sending");
    const loadToast = toast.loading("Building and sending transaction...");

    try {
      // Sign callback helper to bridge to wallet signature requests
      const signCallback = async (unsignedXdr) => {
        return await signTransaction(unsignedXdr, "TESTNET");
      };

      const result = await sendTransaction(
        address,
        destination,
        amount,
        signCallback
      );

      setTxStatus("success");
      setTxHash(result.hash);
      
      toast.dismiss(loadToast);
      toast.success("Transaction Successful!");

      // Refresh balance after successful transfer
      setTimeout(() => {
        refresh(false);
      }, 1000);

      return true;
    } catch (err) {
      console.error("Payment execution error:", err);
      
      let errorMsg = err.message || "Transaction failed.";
      if (errorMsg.includes("User rejected")) {
        errorMsg = "Transaction signature request was rejected by user.";
      }

      setTxStatus("failed");
      setTxError(errorMsg);
      
      toast.dismiss(loadToast);
      toast.error("Transaction Failed");
      
      return false;
    }
  };

  return {
    address,
    isConnected,
    balance,
    network,
    isLoading,
    error,
    txStatus,
    txHash,
    txError,
    connect,
    disconnect,
    refresh: () => refresh(true),
    send,
  };
};
