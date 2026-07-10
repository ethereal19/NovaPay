import React from "react";

const StatusCard = ({ txStatus, txHash, txError }) => {
  const isIdle = txStatus === "idle";
  const isSending = txStatus === "sending";
  const isSuccess = txStatus === "success";
  const isFailed = txStatus === "failed";

  // Stellar Testnet Block Explorer URL
  const explorerUrl = `https://stellar.expert/explorer/testnet/tx/${txHash}`;

  const truncatedHash = txHash
    ? `${txHash.slice(0, 16)}...${txHash.slice(-16)}`
    : "";

  return (
    <div className="glass-panel p-6 relative overflow-hidden h-full flex flex-col justify-between">
      {/* Background glow based on status */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl transition-colors duration-500 ${
        isSuccess ? "bg-emerald-500/10" : isFailed ? "bg-red-500/10" : isSending ? "bg-cyan-500/10" : "bg-slate-500/5"
      }`} />

      <div>
        <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-6">
          Transaction Receipt
        </h3>

        {/* Idle State */}
        {isIdle && (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">No Recent Transactions</p>
              <p className="text-slate-600 text-xs mt-1">Initiate a transfer above to view the transaction receipt here.</p>
            </div>
          </div>
        )}

        {/* Sending / Loading State */}
        {isSending && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-cyan-400 animate-pulse">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-cyan-400 text-sm font-semibold tracking-wide animate-pulse">Sending Transaction...</p>
              <p className="text-slate-500 text-xs mt-1">Please approve the transaction prompt in your Freighter Wallet.</p>
            </div>
          </div>
        )}

        {/* Success State */}
        {isSuccess && (
          <div className="space-y-4 py-2">
            <div className="flex items-center space-x-3 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-emerald-400 text-sm font-semibold">Transaction Successful</p>
                <p className="text-xs text-slate-500">Confirmed on Stellar Testnet</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Transaction Hash
                </label>
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 break-all select-all">
                  {txHash}
                </div>
              </div>

              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-slate-800 hover:border-slate-700 font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors duration-200"
              >
                <span>View on StellarExpert</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {/* Failure State */}
        {isFailed && (
          <div className="space-y-4 py-2">
            <div className="flex items-center space-x-3 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-red-400 text-sm font-semibold">Transaction Failed</p>
                <p className="text-xs text-slate-500">Operation Rejected or Reverted</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Failure Reason
              </label>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-3 text-xs font-mono text-red-400/90 whitespace-pre-wrap">
                {txError || "Unknown connection error or block validation failure."}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
