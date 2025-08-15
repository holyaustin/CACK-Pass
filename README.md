# 🎟️ CACK-PASS — Blockchain-Powered Event Ticketing Platform

**CACK-PASS** is a decentralized event ticketing platform built on the **Avalanche Fuji Testnet**, leveraging smart contracts to eliminate fraud, scalping, and double-spending in event ticket distribution. Built with **Next.js** and powered by blockchain transparency, CACK-PASS ensures secure, verifiable, and tamper-proof ticket ownership.

🚀 **Live Demo**: [https://cackpass.vercel.app](https://cackpass.vercel.app)  
📄 **Smart Contract (Avalanche Fuji)**: [`0xDBc97b18999EF0F02720868Bc09563dBCcb9e8B4`](https://testnet.avascan.info/blockchain/c/address/0xDBc97b18999EF0F02720868Bc09563dBCcb9e8B4/transactions)  
🎥 **Project Demo Video**: [Watch on YouTube](https://youtube.com) <!-- Update with actual video link -->

---

## 🔧 Features

✅ **Decentralized Ticket Minting**  
Mint non-transferable or transferable NFT tickets directly from the blockchain.

✅ **Anti-Fraud & Anti-Scalping**  
Each ticket is uniquely tied to a wallet or identity, preventing duplication and unauthorized resale.

✅ **Real-Time Verification**  
Event organizers can verify ticket authenticity in real time using on-chain data.

✅ **Gas-Efficient on Avalanche**  
Built on Avalanche Fuji Testnet for fast, low-cost transactions.

✅ **Modern & Responsive UI**  
Next.js frontend with seamless wallet integration (e.g., MetaMask).

✅ **Event Management Dashboard**  
Organizers can create, manage, and monitor events and ticket sales.

---

## 📦 Tech Stack

| Layer        | Technology                             |
|------------|----------------------------------------|
| **Frontend** | Next.js, React, Tailwind CSS, Ethers.js |
| **Smart Contract** | Solidity, Hardhat, OpenZeppelin         |
| **Blockchain** | Avalanche Fuji Testnet                  |
| **Deployment** | Vercel (Frontend), Hardhat (Contract)   |
| **Wallet** | MetaMask, WalletConnect                 |

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/holyaustin/cack-pass.git
cd cack-pass
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xDBc97b18999EF0F02720868Bc09563dBCcb9e8B4
NEXT_PUBLIC_NETWORK=avalanche_fuji
NEXT_PUBLIC_EXPLORER_URL=https://testnet.avascan.info
```

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 📄 Smart Contract

- **Deployed on**: Avalanche Fuji Testnet
- **Contract Address**: [`0xDBc97b18999EF0F02720868Bc09563dBCcb9e8B4`](https://testnet.avascan.info/blockchain/c/address/0xDBc97b18999EF0F02720868Bc09563dBCcb9e8B4/transactions)
- **ABI**: Available in `artifacts/` after compilation or via explorer.

### Interact with the Contract
Use Ethers.js or Remix to interact with the deployed contract. Key functions:
- `createEvent()` – Create a new event with ticket supply and price.
- `mintTicket()` – Mint a ticket (payable).
- `verifyTicket()` – Verify ticket ownership on-chain.
- `pause()/unpause()` – Admin controls.

---

## 🎥 Demo Video
See how CACK-PASS works from end to end:  
👉 [Watch Demo on YouTube](https://youtube.com) <!-- Update with real link -->

---

## 🏆 Contributors

This project was made possible by the following team members:

| Name                | GitHub / X (Twitter)       | Role                     |
|---------------------|----------------------------|--------------------------|
| Augustine Onuora     | [@holyaustin](https://github.com/holyaustin) | Lead Developer, Smart Contracts |
| Ibeaka Godson        | [@warmarth](https://github.com/warmarth) | Frontend & Integration |
| Kosbaar Mgmt         | [@kosbaarmgmt](https://github.com/kosbaarmgmt) | Product & Strategy |
| Cedar Nwanganga      | [@ozjerry](https://github.com/ozjerry) | UI/UX & Frontend Dev |

---

## 📜 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgments

- Built for the future of trustless event management.
- Inspired by the need for transparency in ticketing.
- Powered by the speed and scalability of the Avalanche ecosystem.

---

## 📬 Feedback & Support

Have questions, suggestions, or want to collaborate?  
Open an [issue](https://github.com/holyaustin/cack-pass/issues) or reach out to the team!

🌟 **Star this repo if you love decentralized innovation!**
```

---

### ✅ Notes:
- Replace the placeholder banner URL with an actual image (e.g., Figma design or screenshot).
- Update the YouTube link with the real demo video.
- Add a `LICENSE` file if not already present (MIT recommended for open-source).
- Consider adding screenshots or a `/public/demo.gif` for visual impact.

Let me know if you'd like a **short version** for social sharing or a **Twitter/X thread** to announce the launch!

