import React, { useState } from "react";
import { isValidStellarAddress, isValidAmount } from "../utils/validators";

const SendMoney = ({ isConnected, balance, send, txStatus }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [recipientError, setRecipientError] = useState("");
  const [amountError, setAmountError] = useState("");

  const handleRecipientChange = (e) => {
    const val = e.target.value.trim();
    setRecipient(val);
    if (!val) {
      setRecipientError("");
    } else if (!isValidStellarAddress(val)) {
      setRecipientError("Invalid Stellar public address format (must start with G, 56 chars).");
    } else {
      setRecipientError("");
    }
  };

  const handleAmountChange = (e) => {
    const val = e.target.value;
    setAmount(val);
    if (!val) {
      setAmountError("");
      return;
    }

    const validation = isValidAmount(val, balance);
    if (!validation.isValid) {
      setAmountError(validation.reason);
    } else {
      setAmountError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConnected) return;

    // Run full validation check
    let hasError = false;

    if (!recipient) {
      setRecipientError("Recipient address is required.");
      hasError = true;
    } else if (!isValidStellarAddress(recipient)) {
      setRecipientError("Please enter a valid Stellar public key.");
      hasError = true;
    }

    if (!amount) {
      setAmountError("Amount is required.");
      hasError = true;
    } else {
      const validation = isValidAmount(amount, balance);
      if (!validation.isValid) {
        setAmountError(validation.reason);
        hasError = true;
      }
    }

    if (hasError) return;

    const success = await send(recipient, amount);
    if (success) {
      // Clear inputs on successful send
      setRecipient("");
      setAmount("");
    }
  };

  const isSending = txStatus === "sending";
  const isFormValid = isConnected && recipient && amount && !recipientError && !amountError;

  return (
    <div className="glass-panel p-6 relative overflow-hidden h-full">
      {/* Background radial highlight */}
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl" />

      <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-6">
        Send Payment
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Recipient Address Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Recipient Public Key
          </label>
          <div className="relative">
            <input
              type="text"
              value={recipient}
              onChange={handleRecipientChange}
              disabled={!isConnected || isSending}
              placeholder="e.g. GB2...XYZ"
              className={`w-full bg-slate-950/80 border text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none transition-all duration-300 ${
                recipientError 
                  ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50" 
                  : "border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
              } disabled:opacity-50`}
            />
          </div>
          {recipientError && (
            <p className="text-red-400 text-xs mt-1.5 font-medium pl-1">
              {recipientError}
            </p>
          )}
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Amount (XLM)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={amount}
              onChange={handleAmountChange}
              disabled={!isConnected || isSending}
              placeholder="0.00"
              className={`w-full bg-slate-950/80 border text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none transition-all duration-300 ${
                amountError 
                  ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50" 
                  : "border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
              } disabled:opacity-50`}
            />
            {isConnected && (
              <button
                type="button"
                onClick={() => {
                  const maxSend = Math.max(0, parseFloat(balance) - 0.0001); // leave small fee room
                  setAmount(maxSend.toString());
                  setAmountError("");
                }}
                disabled={isSending}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors px-2 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20"
              >
                MAX
              </button>
            )}
          </div>
          {amountError ? (
            <p className="text-red-400 text-xs mt-1.5 font-medium pl-1">
              {amountError}
            </p>
          ) : isConnected ? (
            <p className="text-slate-500 text-xs mt-1.5 pl-1">
              Base fee: ~0.00001 XLM (100 stroops)
            </p>
          ) : null}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSending}
          className={`w-full font-semibold py-3.5 px-4 rounded-xl text-sm transition-all duration-300 flex items-center justify-center space-x-2 ${
            isFormValid && !isSending
              ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 hover:opacity-95 text-white shadow-lg shadow-cyan-500/15 active:scale-[0.98]"
              : "bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed"
          }`}
        >
          {isSending ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Submitting Transaction...</span>
            </>
          ) : (
            <span>Send XLM</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default SendMoney;
