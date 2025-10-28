import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("🚀 Starting deployment to localhost...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy ConfidentialOtcEscrow
  console.log("\n📦 Deploying ConfidentialOtcEscrow...");
  const ConfidentialOtcEscrow = await ethers.getContractFactory("ConfidentialOtcEscrowWithOZ");
  const otcEscrow = await ConfidentialOtcEscrow.deploy(deployer.address); // Use deployer as gateway
  await otcEscrow.waitForDeployment();
  const otcEscrowAddress = await otcEscrow.getAddress();
  console.log("✅ ConfidentialOtcEscrow deployed to:", otcEscrowAddress);

  // Create deployment directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, "../deployments/localhost");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  // Save deployment info
  const deploymentInfo = {
    address: otcEscrowAddress,
    abi: [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "gateway_",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "maker",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "tokenIn",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "tokenOut",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint64",
            "name": "deadline",
            "type": "uint64"
          }
        ],
        "name": "OrderCreated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "taker",
            "type": "address"
          }
        ],
        "name": "FillRequested",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "taker",
            "type": "address"
          }
        ],
        "name": "OrderFinalized",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "OrderCancelled",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint64",
            "name": "amountIn",
            "type": "uint64"
          },
          {
            "indexed": false,
            "internalType": "uint64",
            "name": "amountOut",
            "type": "uint64"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "taker",
            "type": "address"
          }
        ],
        "name": "TermsRevealed",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "tokenIn",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "tokenOut",
            "type": "address"
          },
          {
            "internalType": "externalEuint64",
            "name": "amountInExt",
            "type": "bytes"
          },
          {
            "internalType": "externalEuint64",
            "name": "amountOutExt",
            "type": "bytes"
          },
          {
            "internalType": "externalEaddress",
            "name": "takerExt",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "attestation",
            "type": "bytes"
          },
          {
            "internalType": "uint64",
            "name": "deadline",
            "type": "uint64"
          },
          {
            "internalType": "bool",
            "name": "doTransferOut",
            "type": "bool"
          }
        ],
        "name": "createOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "externalEuint64",
            "name": "takerPayExt",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "attestation",
            "type": "bytes"
          },
          {
            "internalType": "bool",
            "name": "doTransferIn",
            "type": "bool"
          }
        ],
        "name": "fillOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "taker",
            "type": "address"
          }
        ],
        "name": "finalizeFill",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "revealTerms",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000000"
  };

  // Save to file
  const outputPath = path.join(deploymentsDir, "ConfidentialOtcEscrow.json");
  fs.writeFileSync(outputPath, JSON.stringify(deploymentInfo, null, 2));
  
  console.log("📄 Deployment info saved to:", outputPath);
  console.log("✅ Localhost deployment completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
