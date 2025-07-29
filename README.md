# 🏠 CatMapper - Real Estate NFT Marketplace

A decentralized real estate marketplace built on Ethereum blockchain that allows users to tokenize, buy, sell, and trade real estate properties as NFTs with integrated escrow functionality.

### Key Features

- **NFT Property Tokenization**: Convert real estate properties into tradeable NFTs
- **Escrow Services**: Secure transaction handling with multi-party approval system
- **Decentralized Marketplace**: Peer-to-peer property trading without intermediaries
- **Modern Web Interface**: Responsive design with search and exploration capabilities
- **Smart Contract Integration**: Automated and transparent transaction processing

## 🛠 Technology Stack

### Frontend

- **Next.js 15.4.4** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript interface for Ethereum

### Blockchain & Smart Contracts

- **Solidity** - Smart contract development
- **Hardhat** - Ethereum development environment
- **OpenZeppelin** - Secure smart contract libraries
- **Ethers.js** - Ethereum library for JavaScript

### Development Tools

- **ESLint** - Code linting
- **Turbopack** - Fast bundler for development

## 📁 Project Structure

```
catmapper/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── components/        # React components
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── contracts/            # Smart contracts
│   ├── consts/               # Constants and configurations
│   └── scripts/              # Deployment scripts
├── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- MetaMask or another Web3 wallet
- Access to an Ethereum network (mainnet, testnet, or local)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd catmapper
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Compile smart contracts**

   ```bash
   npx hardhat compile
   ```

5. **Deploy contracts (optional)**
   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
