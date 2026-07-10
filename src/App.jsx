import React from "react";
import { Toaster } from "react-hot-toast";
import { useWallet } from "./hooks/useWallet";
import Navbar from "./components/Navbar";
import WalletCard from "./components/WalletCard";
import BalanceCard from "./components/BalanceCard";
import SendMoney from "./components/SendMoney";
import StatusCard from "./components/StatusCard";

function App() {
  const wallet = useWallet();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Toast notifications config */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: "bg-slate-900 text-slate-100 border border-slate-800 rounded-xl",
          style: {
            background: "#12131c",
            color: "#f1f5f9",
            border: "1px solid #1e293b",
          },
          success: {
            iconTheme: {
              primary: "#22d3ee",
              secondary: "#12131c",
            },
          },
          error: {
            iconTheme: {
              primary: "#f87171",
              secondary: "#12131c",
            },
          },
        }}
      />

      {/* Navigation Header */}
      <Navbar
        isConnected={wallet.isConnected}
        address={wallet.address}
        network={wallet.network}
        connect={wallet.connect}
        disconnect={wallet.disconnect}
        isLoading={wallet.isLoading}
      />

      {/* Main Content Dashboard */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8 md:py-12">
        
        {/* Dashboard Header */}
        <div className="text-center md:text-left mb-10 space-y-2">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white font-outfit">
            Decentralized{" "}
            <span className="text-gradient-purple-cyan font-extrabold">
              Payments Dashboard
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-medium max-w-xl">
            Securely transact using Freighter Wallet on the Stellar Testnet. View your real-time balances, submit instant payments, and review receipt confirmations.
          </p>
        </div>

        {/* Status Error Display */}
        {wallet.error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold rounded-2xl px-4 py-3 flex items-center space-x-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{wallet.error}</span>
          </div>
        )}

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Row: Wallet Info & Balance */}
          <div className="h-full">
            <WalletCard
              isConnected={wallet.isConnected}
              address={wallet.address}
              network={wallet.network}
              connect={wallet.connect}
              isLoading={wallet.isLoading}
            />
          </div>

          <div className="h-full">
            <BalanceCard
              isConnected={wallet.isConnected}
              balance={wallet.balance}
              refresh={wallet.refresh}
              isLoading={wallet.isLoading}
            />
          </div>

          {/* Bottom Row: Send Money Form & Status Card */}
          <div className="h-full">
            <SendMoney
              isConnected={wallet.isConnected}
              balance={wallet.balance}
              send={wallet.send}
              txStatus={wallet.txStatus}
            />
          </div>

          <div className="h-full">
            <StatusCard
              txStatus={wallet.txStatus}
              txHash={wallet.txHash}
              txError={wallet.txError}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#07080c]/50 text-slate-500 py-6 text-center text-xs font-semibold tracking-wider uppercase">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <span>StellarPay © 2026 - Designed with visual excellence</span>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Powered by</span>
            <span className="text-cyan-400 font-bold">Stellar Network</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
