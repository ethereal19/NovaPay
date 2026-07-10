import React from "react";

const Navbar = ({ isConnected, address, network, connect, disconnect, isLoading }) => {
  // Truncate address for display: GAAAA...XXXX
  const truncatedAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <nav className="border-b border-slate-800/80 bg-[#0d0e15]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <svg
              className="w-6 h-6 text-white transform -rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
            Stellar<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Pay</span>
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Network Badge */}
          {isConnected && (
            <div className="hidden sm:flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300">
              <span className={`w-2.5 h-2.5 rounded-full ${
                network === "TESTNET" 
                  ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" 
                  : "bg-amber-400"
              }`} />
              <span>{network || "UNKNOWN"}</span>
            </div>
          )}

          {/* Connect / Wallet Info */}
          {isConnected ? (
            <div className="flex items-center space-x-2 bg-slate-900/50 border border-slate-800 rounded-xl p-1 pr-3">
              <span className="text-xs font-medium text-slate-400 px-3 hidden md:inline">
                {truncatedAddress}
              </span>
              <button
                onClick={disconnect}
                disabled={isLoading}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              disabled={isLoading}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold text-white rounded-xl group bg-gradient-to-br from-cyan-500 to-violet-600 group-hover:from-cyan-500 group-hover:to-violet-600 hover:text-white focus:ring-2 focus:outline-none focus:ring-cyan-800 transition-all duration-300 disabled:opacity-50"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-slate-955 dark:bg-[#0d0e15] rounded-lg group-hover:bg-opacity-0">
                {isLoading ? "Connecting..." : "Connect Wallet"}
              </span>
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
