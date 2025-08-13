require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",

  networks: {
    // 🌐 Avalanche Fuji Testnet
    fuji: {
      url: process.env.AVALANCHE_FUJI_RPC || "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 43113,
    },

    // 🌍 Avalanche Mainnet
    avalanche: {
      url: process.env.AVALANCHE_MAINNET_RPC || "https://api.avax.network/ext/bc/C/rpc",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 43114,
    },

    // 🔬 Local Hardhat Network (for testing)
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },

  // 📡 Etherscan-like Block Explorer Verification (Snowtrace)
  etherscan: {
    // Use 'fuji' for testnet, 'snowtrace' for mainnet
    apiKey: {
      avalanche: process.env.SNOWTRACE_API_KEY,
      fuji: process.env.SNOWTRACE_API_KEY,
    },
    // Custom URLs for Snowtrace API
    customChains: [
      {
        network: "avalanche",
        chainId: 43114,
        urls: {
          apiURL: "https://api.snowtrace.io/api",
          browserURL: "https://snowtrace.io",
        },
      },
      {
        network: "fuji",
        chainId: 43113,
        urls: {
          apiURL: "https://api-testnet.snowtrace.io/api",
          browserURL: "https://testnet.snowtrace.io",
        },
      },
    ],
  },

  // Optional: Mocha config
  mocha: {
    timeout: 30000,
  },
};