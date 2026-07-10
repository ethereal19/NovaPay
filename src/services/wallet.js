import { 
  isConnected, 
  requestAccess, 
  getAddress, 
  getNetwork as freighterGetNetwork, 
  signTransaction as freighterSignTransaction 
} from "@stellar/freighter-api";

/**
 * Checks if the Freighter extension is installed.
 * @returns {Promise<boolean>}
 */
export const isFreighterInstalled = async () => {
  try {
    const result = await isConnected();
    return !!result.isConnected;
  } catch (error) {
    console.error("Error checking Freighter installation:", error);
    return false;
  }
};

/**
 * Requests access to the user's Freighter wallet.
 * @returns {Promise<string>} - The user's public address
 */
export const connectWallet = async () => {
  const installed = await isFreighterInstalled();
  if (!installed) {
    throw new Error("Freighter wallet is not installed. Please install it to continue.");
  }

  try {
    const result = await requestAccess();
    if (result.error) {
      throw new Error(result.error.message || "Failed to connect to Freighter wallet.");
    }
    return result.address;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};

/**
 * Disconnects the wallet by performing any required cleanup.
 * Freighter is an extension, so we just simulate disconnection by resetting local state.
 * @returns {Promise<boolean>}
 */
export const disconnectWallet = async () => {
  // Simulating wallet disconnection (no Freighter API call needed for this)
  return true;
};

/**
 * Retrieves the currently selected public key from the authorized wallet.
 * @returns {Promise<string>}
 */
export const getPublicKey = async () => {
  try {
    const result = await getAddress();
    if (result.error) {
      throw new Error(result.error.message || "Failed to retrieve public key.");
    }
    return result.address;
  } catch (error) {
    console.error("Error getting public key:", error);
    throw error;
  }
};

/**
 * Retrieves the currently active network name (e.g. 'TESTNET' or 'PUBLIC').
 * @returns {Promise<string>}
 */
export const getNetwork = async () => {
  try {
    const result = await freighterGetNetwork();
    if (result.error) {
      throw new Error(result.error.message || "Failed to retrieve network info.");
    }
    return result.network; // e.g. "TESTNET", "PUBLIC"
  } catch (error) {
    console.error("Error getting network:", error);
    throw error;
  }
};

/**
 * Requests the wallet to sign the transaction XDR.
 * @param {string} xdr - Base64 encoded transaction XDR
 * @param {string} network - The network name ('TESTNET' or 'PUBLIC')
 * @returns {Promise<string>} - Signed transaction XDR
 */
export const signTransaction = async (xdr, network = "TESTNET") => {
  try {
    const result = await freighterSignTransaction(xdr, { network });
    if (result.error) {
      throw new Error(result.error.message || "Transaction signing rejected or failed.");
    }
    return result.signedTxXdr;
  } catch (error) {
    console.error("Error signing transaction:", error);
    throw error;
  }
};
