import "@fhevm/hardhat-plugin";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import type { HardhatUserConfig } from "hardhat/config";
import { vars } from "hardhat/config";
import "solidity-coverage";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

import "./tasks/accounts";
import "./tasks/FHECounter";

// Run 'npx hardhat vars setup' to see the list of variables that need to be set

// Environment variables with fallbacks
const MNEMONIC: string = process.env.MNEMONIC || vars.get("MNEMONIC", "test test test test test test test test test test test junk");
const INFURA_API_KEY: string = process.env.INFURA_API_KEY || vars.get("INFURA_API_KEY", "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
const PRIVATE_KEY: string = process.env.PRIVATE_KEY || "";
const SEPOLIA_RPC_URL: string = process.env.SEPOLIA_RPC_URL || `https://sepolia.infura.io/v3/${INFURA_API_KEY}`;
const ETHERSCAN_API_KEY: string = process.env.ETHERSCAN_API_KEY || vars.get("ETHERSCAN_API_KEY", "");
const GATEWAY_ADDRESS: string = process.env.GATEWAY_ADDRESS || "";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 31337,
    },
    anvil: {
      accounts: {
        mnemonic: MNEMONIC,
        path: "m/44'/60'/0'/0/",
        count: 10,
      },
      chainId: 31337,
      url: "http://localhost:8545",
    },
    // Base Sepolia (test)
    baseSepolia: {
      url:"https://sepolia.base.org",
      chainId: 84532,
      accounts: {
        mnemonic: MNEMONIC,
        path: "m/44'/60'/0'/0/",
        count: 10,
      },
    },

    // Base mainnet (prod)
    base: {
      url: "https://mainnet.base.org",
      chainId: 8453,
      accounts: {
        mnemonic: MNEMONIC,
        path: "m/44'/60'/0'/0/",
        count: 10,
      },
    },
    sepolia: {
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : {
        mnemonic: MNEMONIC,
        path: "m/44'/60'/0'/0/",
        count: 10,
      },
      chainId: 11155111,
      url: SEPOLIA_RPC_URL,
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.27",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/hardhat-template/issues/31
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
      evmVersion: "cancun",
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

export default config;
