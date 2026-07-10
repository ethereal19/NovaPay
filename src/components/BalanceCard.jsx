import React, { useState } from "react";

const BalanceCard = ({ isConnected, balance, refresh, isLoading }) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleRefresh = async () => {
    if (isLoading || !isConnected) return;
    setIsRotating(true);
    await refresh();
    // Keep rotating for a bit to make the animation feel smooth
    setTimeout(() => {
      setIsRotating(false);
    }, 800);
  };

  // Format balance to make it look clean: e.g., 10,000.00
  const formattedBalance = isConnected
    ? parseFloat(balance).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 7,
      })
    : "0.00";

  return (
    <div className="glass-panel glass-panel-hover p-6 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
            Available Balance
          </h3>
          {isConnected && (
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className={`p-1.5 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 rounded-lg transition-all duration-200 ${
                isRotating || isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
              title="Refresh Balance"
            >
              <svg
                className={`w-5 h-5 ${
                  isRotating || isLoading ? "animate-spin text-cyan-400" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15.89M9 11l3-3m0 0l3 3m-3-3v12"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="py-2">
          {isConnected ? (
            <div className="space-y-1">
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-mono">
                  {formattedBalance}
                </span>
                <span className="text-xl font-bold text-cyan-400 tracking-wide">
                  XLM
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">
                Stellar Lumens
              </p>
            </div>
          ) : (
            <div className="py-4">
              <span className="text-3xl font-bold text-slate-600 font-mono tracking-tight">
                -- XLM
              </span>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                Wallet Not Connected
              </p>
            </div>
          )}
        </div>
      </div>

      {isConnected && (
        <div className="mt-6 border-t border-slate-800/80 pt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Asset Class</span>
          <span className="font-mono text-slate-400">Native (XLM)</span>
        </div>
      )}
    </div>
  );
};

export default BalanceCard;
