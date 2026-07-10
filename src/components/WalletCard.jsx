import React from "react";
import toast from "react-hot-toast";

const WalletCard = ({ isConnected, address, network, connect, isLoading }) => {
  const handleCopy = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    toast.success("Wallet address copied to clipboard!", { id: "copy-address" });
  };

  return (
    <div className="glass-panel glass-panel-hover p-6 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
            Wallet Status
          </h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isConnected 
              ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
              : "bg-slate-800 text-slate-400 border border-slate-700"
          }`}>
            <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${
              isConnected ? "bg-cyan-400 animate-pulse" : "bg-slate-500"
            }`} />
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>

        {isConnected ? (
          <div className="space-y-4">
            {/* Address Row */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Account Public Address
              </label>
              <div className="flex items-center justify-between bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2.5">
                <span className="font-mono text-sm text-slate-200 select-all overflow-hidden text-ellipsis mr-2" title={address}>
                  {address}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Copy Address"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Network Row */}
            <div className="flex justify-between items-center bg-slate-900/30 px-3 py-2 rounded-xl border border-slate-800/50">
              <span className="text-xs text-slate-400">Selected Network</span>
              <span className={`text-xs font-mono font-bold ${
                network === "TESTNET" ? "text-cyan-400" : "text-amber-400"
              }`}>
                {network || "UNKNOWN"}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-slate-400 mb-6 font-medium">
              Connect your Freighter wallet to query your balance and start sending Testnet XLM.
            </p>
            <button
              onClick={connect}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 active:scale-[0.98] transition-all duration-300 text-sm disabled:opacity-50"
            >
              {isLoading ? "Connecting to Freighter..." : "Connect Wallet"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletCard;
