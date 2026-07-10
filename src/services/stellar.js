import { Horizon, TransactionBuilder, Networks, Operation, Asset } from '@stellar/stellar-sdk';

// Initialize Horizon Server for Stellar Testnet
const HORIZON_URL = "https://horizon-testnet.stellar.org";
const server = new Horizon.Server(HORIZON_URL);

/**
 * Fetches the native (XLM) balance for a given public key.
 * @param {string} publicKey
 * @returns {Promise<string>} - The native XLM balance
 */
export const getBalance = async (publicKey) => {
  try {
    const account = await server.loadAccount(publicKey);
    const nativeBalance = account.balances.find(b => b.asset_type === 'native');
    return nativeBalance ? nativeBalance.balance : '0';
  } catch (error) {
    console.error("Error in getBalance:", error);
    throw new Error(
      error.response?.status === 404
        ? "Account not found on Testnet. Please fund it using Friendbot."
        : "Failed to fetch account balance. Please check your network connection."
    );
  }
};

/**
 * Loads account details from Horizon.
 * @param {string} publicKey
 * @returns {Promise<object>} - Account object containing sequence number, balances etc.
 */
export const loadAccount = async (publicKey) => {
  try {
    return await server.loadAccount(publicKey);
  } catch (error) {
    console.error("Error in loadAccount:", error);
    throw new Error(
      error.response?.status === 404
        ? "Source account does not exist on Testnet. Please fund it."
        : "Failed to load account from Stellar network."
    );
  }
};

/**
 * Builds, prompts for signature, and submits a Stellar XLM payment transaction.
 * @param {string} sourcePublicKey
 * @param {string} destinationPublicKey
 * @param {string|number} amount
 * @param {function} signTxCallback - Callback function to sign the XDR via Freighter wallet
 * @returns {Promise<object>} - Submission response including transaction hash
 */
export const sendTransaction = async (sourcePublicKey, destinationPublicKey, amount, signTxCallback) => {
  try {
    // 1. Load source account details (essential for getting the next sequence number)
    const sourceAccount = await server.loadAccount(sourcePublicKey);

    // 2. Fetch recommended base fee from network
    const baseFee = await server.fetchBaseFee().catch(() => 100); // Fallback to 100 stroops

    // 3. Build the transaction structure
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: baseFee,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: destinationPublicKey,
          asset: Asset.native(),
          amount: amount.toString(),
        })
      )
      .setTimeout(180) // 3-minute validity window
      .build();

    // 4. Convert transaction to Base64 unsigned XDR
    const unsignedXdr = transaction.toXDR();

    // 5. Ask Freighter to sign the transaction XDR (via callback)
    const signedXdr = await signTxCallback(unsignedXdr);

    if (!signedXdr) {
      throw new Error("Signing failed: No signed XDR returned from wallet.");
    }

    // 6. Re-instantiate the signed transaction object
    const signedTx = TransactionBuilder.fromXDR(signedXdr, Networks.TESTNET);

    // 7. Submit transaction to the Horizon server
    const response = await server.submitTransaction(signedTx);
    return response;
  } catch (error) {
    console.error("Error in sendTransaction:", error);
    
    // Extract Horizon specific errors if available
    if (error.response?.data?.extras?.result_codes) {
      const codes = error.response.data.extras.result_codes;
      let reason = codes.transaction;
      if (codes.operations && codes.operations.length > 0) {
        reason += ` (${codes.operations.join(", ")})`;
      }
      throw new Error(`Horizon Transaction Failed: ${reason}`);
    }

    throw error;
  }
};
