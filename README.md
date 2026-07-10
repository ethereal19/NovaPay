# ⭐ StellarPay - Simple Payment dApp

A beginner-friendly decentralized application (dApp) built with **React**, **Vite**, **Tailwind CSS**, **Freighter Wallet**, and the **Stellar Testnet**.

This application allows users to securely connect their Freighter wallet, view their Testnet XLM balance, and send XLM to another Stellar wallet while displaying transaction status and confirmation.

🚀 **Live Demo:** [nova-pay-nine.vercel.app](https://nova-pay-nine.vercel.app/)

---

## 🚀 Features

* 🔗 **Connect Freighter Wallet:** Seamless authorization using the Freighter extension.
* 🔌 **Disconnect Wallet:** Simulated cleanup to sign out of the active session.
* 💳 **Wallet Details:** Display truncated addresses with quick copy-to-clipboard buttons.
* 💰 **Live XLM Balances:** Fetches balance directly from Testnet Horizon and supports manual updates.
* 💸 **Send XLM:** Build, sign, and submit native payments on the Stellar Testnet.
* ✅ **Receipt Confirmations:** Real-time transaction hashes with clickable links to StellarExpert block explorer.
* 📱 **Responsive UI:** Modern, space-themed glassmorphism UI styled with Tailwind CSS v3.
* ⚠️ **Error Handling:** Built-in checks for network, wallet presence, form input bounds, and rejection states.

---

## 🛠️ Tech Stack

| Technology           | Purpose                        |
| -------------------- | ------------------------------ |
| React                | Frontend Framework             |
| Vite                 | Build Tool                     |
| Tailwind CSS         | Styling & Design System        |
| Freighter Wallet API | Wallet Integration             |
| Stellar SDK          | Stellar Blockchain Interaction |
| Stellar Testnet      | Blockchain Network             |
| React Hot Toast      | Real-time Notifications        |

---

## 📂 Project Structure

```text
stellarpay/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation & network indicator
│   │   ├── WalletCard.jsx    # Wallet connection status & copy actions
│   │   ├── BalanceCard.jsx   # Current XLM balance & refresh action
│   │   ├── SendMoney.jsx     # Payment form & input validation
│   │   ├── StatusCard.jsx    # Detailed transaction receipts & explorer links
│   │   └── Loader.jsx        # Orbital neon loading spinner
│   ├── hooks/
│   │   └── useWallet.js      # Core state controller hook
│   ├── services/
│   │   ├── wallet.js         # Freighter API wrapper
│   │   └── stellar.js        # Horizon connection & Stellar SDK helper
│   ├── utils/
│   │   └── validators.js     # Field & threshold checks
│   ├── App.jsx               # Page layout
│   ├── main.jsx              # React mounting point
│   └── index.css             # Tailwind CSS custom themes
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation

### Navigate to the Project
```bash
cd RISE
```

### Install Dependencies
```bash
npm install
```

### Start the Development Server
```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

---

## 🧑💻 How to Use

1. Install the [Freighter Wallet](https://www.freighter.app/) browser extension.
2. Open Freighter settings and switch the active network to **Stellar Testnet**.
3. Fund your address using the [Stellar Friendbot](https://laboratory.stellar.org/#account-creator?network=testnet).
4. Launch the StellarPay local server.
5. Click **Connect Wallet** in the top bar.
6. Verify your address and XLM balance.
7. Enter a recipient's Stellar address and payment amount.
8. Click **Send XLM** and approve the transaction prompt inside the Freighter extension.
9. Track confirmation status and view the final receipt on StellarExpert.

---

## ⚠️ Error Handling

The application gracefully handles and displays:
* Freighter Wallet not installed.
* Incorrect wallet network selected (requires Testnet).
* Invalid public key input formatting.
* Zero or negative amounts.
* Insufficient funds (checking against balance and fees).
* User-rejected transaction signatures.
* Horizon network connection timeouts.

---

## 🔮 Future Improvements
* Multi-Asset support (USDC, custom Stellar tokens).
* QR Code generator for quick address sharing.
* Local storage transaction history log.
* Dynamic base fee estimation.
* Automatic periodic balance refresh.

---

## 📸 Screenshots

### 1. Wallet Connected State
![Wallet Connected](./screenshots/Wallet%20Connected.png)

### 2. Balance Displayed
![Balance Displayed](./screenshots/Balance%20Displayed.png)

### 3. Successful Testnet Transaction
![Successful Testnet Transaction](./screenshots/Successful%20Testnet%20Transaction.png)

### 4. Transaction Result Screen
![Transaction Result](./screenshots/Transaction%20Result%20Screen.png)

---

## 📄 License

This project is licensed under the MIT License.
