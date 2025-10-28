import * as fs from "fs";
import * as path from "path";

interface DeploymentInfo {
  network: string;
  chainId: number;
  deployer: string;
  gateway: string;
  contracts: {
    ConfidentialTokenIn: string;
    ConfidentialTokenOut: string;
    ConfidentialOtcEscrow: string;
  };
  timestamp: string;
  blockNumber: number;
}

async function updateFrontendConfig() {
  try {
    // Read deployment info
    const deploymentPath = path.join(__dirname, "../deployments/sepolia-deployment.json");
    
    if (!fs.existsSync(deploymentPath)) {
      console.log("❌ Deployment file not found. Please deploy contracts first.");
      return;
    }

    const deploymentData: DeploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
    
    // Read current frontend config
    const frontendConfigPath = path.join(__dirname, "../../site/config/demo.ts");
    
    if (!fs.existsSync(frontendConfigPath)) {
      console.log("❌ Frontend config file not found.");
      return;
    }

    let configContent = fs.readFileSync(frontendConfigPath, "utf8");
    
    // Update contract addresses
    configContent = configContent.replace(
      /otcAddress: "0x[^"]*"/,
      `otcAddress: "${deploymentData.contracts.ConfidentialOtcEscrow}"`
    );
    
    configContent = configContent.replace(
      /gatewayAddress: "0x[^"]*"/,
      `gatewayAddress: "${deploymentData.gateway}"`
    );
    
    configContent = configContent.replace(
      /tokenIn: "0x[^"]*"/,
      `tokenIn: "${deploymentData.contracts.ConfidentialTokenIn}"`
    );
    
    configContent = configContent.replace(
      /tokenOut: "0x[^"]*"/,
      `tokenOut: "${deploymentData.contracts.ConfidentialTokenOut}"`
    );
    
    // Write updated config
    fs.writeFileSync(frontendConfigPath, configContent);
    
    console.log("✅ Frontend config updated successfully!");
    console.log("Updated addresses:");
    console.log(`- OTC Address: ${deploymentData.contracts.ConfidentialOtcEscrow}`);
    console.log(`- Gateway Address: ${deploymentData.gateway}`);
    console.log(`- Token In: ${deploymentData.contracts.ConfidentialTokenIn}`);
    console.log(`- Token Out: ${deploymentData.contracts.ConfidentialTokenOut}`);
    
  } catch (error) {
    console.error("❌ Error updating frontend config:", error);
  }
}

updateFrontendConfig();
