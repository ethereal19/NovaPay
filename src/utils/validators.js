import { Keypair } from '@stellar/stellar-sdk';

/**
 * Validates a Stellar public address.
 * A valid Stellar address starts with 'G', is 56 characters long, and uses base32 encoding.
 * @param {string} address
 * @returns {boolean}
 */
export const isValidStellarAddress = (address) => {
  if (!address || typeof address !== 'string') return false;
  
  // Basic regex check to prevent throwing inside Keypair
  const stellarAddressRegex = /^G[A-D2-7][A-Z2-7]{54}$/;
  if (!stellarAddressRegex.test(address)) return false;

  try {
    return Keypair.isValidPublicKey(address);
  } catch (error) {
    return false;
  }
};

/**
 * Validates a transaction amount.
 * @param {string|number} amount - The amount to send
 * @param {string|number} balance - The current user balance in XLM
 * @returns {{isValid: boolean, reason?: string}}
 */
export const isValidAmount = (amount, balance) => {
  const numAmount = parseFloat(amount);
  const numBalance = parseFloat(balance);

  if (isNaN(numAmount) || numAmount <= 0) {
    return { isValid: false, reason: 'Amount must be greater than 0.' };
  }

  if (isNaN(numBalance) || numBalance <= 0) {
    return { isValid: false, reason: 'Your balance is 0 or invalid.' };
  }

  // Stellar transactions require a small fee (standard base fee is 0.00001 XLM, but we suggest leaving at least 0.0001 XLM for fees)
  const requiredFee = 0.00001;
  if (numAmount + requiredFee > numBalance) {
    return { 
      isValid: false, 
      reason: `Insufficient funds. You need at least ${requiredFee} XLM for the transaction fee.` 
    };
  }

  return { isValid: true };
};
