import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("🚀 Starting deployment to Sepolia...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  if (balance === 0n) {
    throw new Error("❌ Insufficient balance. Please fund your account with Sepolia ETH.");
  }

  // Deploy ConfidentialToken contracts
  console.log("\n📦 Deploying ConfidentialTokenIn...");
  const ConfidentialToken = await ethers.getContractFactory("ConfidentialTokenExample");
  const tokenIn = await ConfidentialToken.deploy(
    1000, // initial amount
    "Token In",
    "TIN",
    "https://example.com/tokenin"
  );
  await tokenIn.waitForDeployment();
  const tokenInAddress = await tokenIn.getAddress();
  console.log("✅ ConfidentialTokenIn deployed to:", tokenInAddress);

  console.log("\n📦 Deploying ConfidentialTokenOut...");
  const tokenOut = await ConfidentialToken.deploy(
    1000, // initial amount
    "Token Out", 
    "TOUT",
    "https://example.com/tokenout"
  );
  await tokenOut.waitForDeployment();
  const tokenOutAddress = await tokenOut.getAddress();
  console.log("✅ ConfidentialTokenOut deployed to:", tokenOutAddress);

  // Deploy ConfidentialOtcEscrow
  console.log("\n📦 Deploying ConfidentialOtcEscrow...");
  const ConfidentialOtcEscrow = await ethers.getContractFactory("ConfidentialOtcEscrowWithOZ");
  
  // Use deployer as gateway for now (can be changed later)
  const gatewayAddress = process.env.GATEWAY_ADDRESS || deployer.address;
  console.log("Gateway address:", gatewayAddress);
  
  const otcEscrow = await ConfidentialOtcEscrow.deploy(gatewayAddress);
  await otcEscrow.waitForDeployment();
  const otcEscrowAddress = await otcEscrow.getAddress();
  console.log("✅ ConfidentialOtcEscrow deployed to:", otcEscrowAddress);


  // Save deployment info
  const deploymentInfo = {
    network: "sepolia",
    chainId: 11155111,
    deployer: deployer.address,
    gateway: gatewayAddress,
    contracts: {
      ConfidentialTokenIn: tokenInAddress,
      ConfidentialTokenOut: tokenOutAddress,
      ConfidentialOtcEscrow: otcEscrowAddress
    },
    timestamp: new Date().toISOString(),
    blockNumber: await ethers.provider.getBlockNumber()
  };

  // Save to file
  const outputPath = path.join(__dirname, "../deployments/sepolia-deployment.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(deploymentInfo, null, 2));
  
  console.log("\n📄 Deployment info saved to:", outputPath);

  // Display summary
  console.log("\n🎉 Deployment Summary:");
  console.log("====================");
  console.log(`Network: Sepolia (${deploymentInfo.chainId})`);
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Gateway: ${gatewayAddress}`);
  console.log(`Block: ${deploymentInfo.blockNumber}`);
  console.log("\nContract Addresses:");
  console.log(`- ConfidentialTokenIn: ${tokenInAddress}`);
  console.log(`- ConfidentialTokenOut: ${tokenOutAddress}`);
  console.log(`- ConfidentialOtcEscrow: ${otcEscrowAddress}`);

  console.log("\n🔍 Next steps:");
  console.log("1. Verify contracts on Etherscan:");
  console.log(`   npx hardhat verify --network sepolia ${otcEscrowAddress} "${gatewayAddress}"`);
  console.log("2. Update frontend config with new addresses");
  console.log("3. Test the contracts on Sepolia");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
