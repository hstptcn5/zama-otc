# 🚀 Hướng dẫn Deploy OTC-with-FHE lên Sepolia Testnet

## 📋 Tổng quan

Dự án này sử dụng **Zama FHEVM** và **OpenZeppelin ERC-7984** để tạo ra một hệ thống giao dịch OTC bảo mật và riêng tư.

## 🛠️ Chuẩn bị môi trường

### 1. Cài đặt dependencies

```bash
# Cài đặt dependencies cho toàn bộ project
npm install

# Cài đặt dependencies cho hardhat template
cd packages/fhevm-hardhat-template
npm install
```

### 2. Tạo file .env

Tạo file `.env` trong thư mục `packages/fhevm-hardhat-template/`:

```bash
# Sepolia Testnet Configuration
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
# Hoặc sử dụng Alchemy: https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

# Private Key của wallet deployer (không có 0x prefix)
PRIVATE_KEY=your_private_key_here_without_0x_prefix

# Etherscan API Key để verify contracts
ETHERSCAN_API_KEY=your_etherscan_api_key_here

# Gateway address (có thể để trống, sẽ dùng deployer address)
GATEWAY_ADDRESS=
```

### 3. Lấy Sepolia ETH

1. Truy cập [Sepolia Faucet](https://sepoliafaucet.com/)
2. Nhập địa chỉ wallet của bạn
3. Nhận Sepolia ETH (cần ít nhất 0.1 ETH để deploy)

## 🚀 Deploy Contracts

### Bước 1: Compile contracts

```bash
cd packages/fhevm-hardhat-template
npx hardhat compile
```

### Bước 2: Deploy lên Sepolia

```bash
# Deploy tất cả contracts lên Sepolia
npm run deploy:sepolia
```

Hoặc chạy trực tiếp:

```bash
npx hardhat run scripts/deploy-sepolia.ts --network sepolia
```

### Bước 3: Verify contracts (tùy chọn)

```bash
# Verify từng contract (thay ADDRESS bằng địa chỉ thực tế)
npx hardhat verify --network sepolia ADDRESS_OF_FHECOUNTER
npx hardhat verify --network sepolia ADDRESS_OF_OTC_ESCROW "GATEWAY_ADDRESS"
```

## 🔧 Cập nhật Frontend

### Bước 1: Cập nhật config tự động

```bash
cd packages/fhevm-hardhat-template
npm run update-frontend
```

### Bước 2: Cập nhật config thủ công

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

## 🎯 Chạy Frontend

```bash
cd packages/site
npm run dev
```

Truy cập `http://localhost:3000` để xem ứng dụng.

## 📊 Cấu trúc Contracts

### Contracts được deploy:

1. **ConfidentialTokenIn** - Token đầu vào (ERC-7984)
2. **ConfidentialTokenOut** - Token đầu ra (ERC-7984)
3. **ConfidentialOtcEscrow** - Contract chính cho OTC trading

### Quy trình giao dịch:

1. **Maker** tạo order với encrypted amounts
2. **Taker** fill order với encrypted payment
3. **Gateway** validate và finalize trade
4. **Optional**: Maker có thể reveal terms để audit

## 🔒 Bảo mật

- **FHE Encryption**: Tất cả dữ liệu nhạy cảm được mã hóa
- **Attestation**: FHEVM xác thực encrypted inputs
- **Gateway Validation**: Chỉ gateway được ủy quyền mới có thể thực thi giao dịch
- **Optional Transparency**: Có thể tiết lộ điều khoản để audit

## 🐛 Troubleshooting

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

## 📚 Tài liệu tham khảo

- [Zama FHEVM Documentation](https://docs.zama.ai/)
- [OpenZeppelin ERC-7984](https://docs.openzeppelin.com/)
- [Ethereum Development](https://ethereum.org/developers/)
- [MetaMask Integration](https://docs.metamask.io/)

## 🎉 Kết quả

Sau khi deploy thành công, bạn sẽ có:

- ✅ Contracts được deploy trên Sepolia testnet
- ✅ Frontend được cấu hình với địa chỉ contract mới
- ✅ Hệ thống OTC trading bảo mật hoạt động
- ✅ Có thể test các tính năng FHEVM

---

**Lưu ý**: Đây là dự án demo. Để sử dụng production, cần thêm các biện pháp bảo mật và audit kỹ lưỡng.
