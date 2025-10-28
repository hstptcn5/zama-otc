# 🚀 Hướng dẫn Deploy lên Sepolia Testnet

## 1. Chuẩn bị môi trường

### Tạo file .env
Tạo file `.env` trong thư mục `packages/fhevm-hardhat-template/` với nội dung:

```bash
# Sepolia Testnet Configuration
# Get your API key from https://infura.io/ or https://alchemy.com/
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
# Hoặc sử dụng Alchemy: https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

# Private Key của wallet deployer (không có 0x prefix)
# Lấy từ MetaMask: Settings > Security & Privacy > Reveal Private Key
PRIVATE_KEY=your_private_key_here_without_0x_prefix

# Etherscan API Key để verify contracts
# Lấy từ https://etherscan.io/apis
ETHERSCAN_API_KEY=your_etherscan_api_key_here

# Gateway address (có thể để trống, sẽ dùng deployer address)
# Đây là địa chỉ được ủy quyền để finalize trades
GATEWAY_ADDRESS=

# Optional: Gas price (để trống để tự động)
GAS_PRICE=
```

### Lấy Sepolia ETH
1. Truy cập [Sepolia Faucet](https://sepoliafaucet.com/)
2. Nhập địa chỉ wallet của bạn
3. Nhận Sepolia ETH (cần ít nhất 0.1 ETH để deploy)

## 2. Cài đặt dependencies

```bash
# Cài đặt dependencies cho toàn bộ project
npm install

# Cài đặt dependencies cho hardhat template
cd packages/fhevm-hardhat-template
npm install
```

## 3. Compile contracts

```bash
cd packages/fhevm-hardhat-template
npx hardhat compile
```

## 4. Deploy lên Sepolia

```bash
cd packages/fhevm-hardhat-template
npx hardhat run scripts/deploy-sepolia.ts --network sepolia
```

## 5. Verify contracts trên Etherscan

```bash
# Verify từng contract (thay ADDRESS bằng địa chỉ thực tế)
npx hardhat verify --network sepolia ADDRESS_OF_FHECOUNTER
npx hardhat verify --network sepolia ADDRESS_OF_OTC_ESCROW "GATEWAY_ADDRESS"
```

## 6. Cập nhật frontend config

Sau khi deploy thành công, cập nhật file `packages/site/config/demo.ts`:

```typescript
export const DEMO_CONFIG = {
    // Thay bằng địa chỉ contract thực tế từ deployment
    otcAddress: "0x...", // Địa chỉ ConfidentialOtcEscrow
    gatewayAddress: "0x...", // Địa chỉ Gateway
    tokenIn: "0x...", // Địa chỉ ConfidentialTokenIn
    tokenOut: "0x...", // Địa chỉ ConfidentialTokenOut
};
```

## 7. Chạy frontend

```bash
cd packages/site
npm run dev
```

## Lưu ý quan trọng

- **Bảo mật**: Không bao giờ commit file `.env` vào git
- **Gas fees**: Sepolia có gas fees thấp, nhưng vẫn cần ETH để deploy
- **Network**: Đảm bảo MetaMask đang kết nối với Sepolia testnet
- **Gateway**: Có thể sử dụng địa chỉ deployer làm gateway cho testing

## Troubleshooting

### Lỗi "Insufficient balance"
- Kiểm tra wallet có đủ Sepolia ETH
- Sử dụng faucet để lấy thêm ETH

### Lỗi "Invalid private key"
- Đảm bảo private key không có prefix `0x`
- Kiểm tra private key có đúng 64 ký tự hex

### Lỗi "Network not supported"
- Kiểm tra RPC URL có đúng
- Đảm bảo API key còn hiệu lực

### Lỗi "Contract verification failed"
- Kiểm tra constructor arguments
- Đảm bảo contract đã được deploy thành công
