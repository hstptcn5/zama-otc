# 🔐 Confidential OTC Escrow Demo

A demonstration frontend for confidential over-the-counter (OTC) trading using **Zama FHEVM** and **OpenZeppelin ERC-7984** confidential tokens.

## ✨ Features

- **🔐 Confidential Trading**: All order amounts and terms are encrypted using FHEVM
- **📝 Order Creation**: Makers create orders with encrypted amounts and optional taker restrictions
- **✅ Order Filling**: Takers fill orders with encrypted payment amounts
- **🔍 Transparency**: Optional terms revelation for auditing and compliance
- **🎨 Modern UI**: Beautiful, responsive interface with improved user experience
- **🔗 Wallet Integration**: MetaMask integration for transaction signing
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

### Smart Contract

- **Contract**: `ConfidentialOtcEscrow.sol`
- **Address**: `0x8750304ab739c43e93dDA3950f57D51B5e9FeA3c`
- **Gateway**: `0x8d30010878d95C7EeF78e543Ee2133db846633b8`
- **TokenIn**: `0x55333a880b14eeCF996799Fd9c91a388af613a61`
- **TokenOut**: `0x68FfE8fF91f8a2742E37f2D7012a43e19DC797a0`
### Frontend Components

- **CreateOrder**: Form for makers to create new OTC orders
- **FillOrder**: Form for takers to fill existing orders
- **Orders**: Display order history and status
- **RevealAndAudit**: Tools for transparency and auditing

### Hooks and Utilities

- **useFhevm**: FHEVM instance management
- **useOrderEvents**: Order event handling and state management
- **useMetaMaskEthersSigner**: MetaMask wallet integration

## 🚀 Setup

### 1. Install Dependencies

```bash
cd packages/site
npm install
```

### 2. Configure FHEVM

The demo uses the existing FHEVM infrastructure from `fhevm.ts`. Ensure your FHEVM configuration is properly set up.

### 3. Update Contract Addresses

Edit `config/demo.ts` to use your deployed contract addresses:

```typescript
export const DEMO_CONFIG = {
  otcAddress: "0x8750304ab739c43e93dDA3950f57D51B5e9FeA3c",
  gatewayAddress: "0x8d30010878d95C7EeF78e543Ee2133db846633b8",
  // Token addresses - Deployed on Sepolia
  tokenIn: "0x55333a880b14eeCF996799Fd9c91a388af613a61",
  tokenOut: "0x68FfE8fF91f8a2742E37f2D7012a43e19DC797a0",
};
```

### 4. Run the Demo

```bash
npm run dev
```

## 💡 Usage Flow

### 1. Create Order (Maker)

1. Connect MetaMask wallet
2. Enter token addresses (user input)
3. Set amounts (encrypted)
4. Optionally restrict to specific taker
5. Set deadline
6. Submit order

### 2. Fill Order (Taker)

1. Connect MetaMask wallet
2. Enter order ID
3. Set payment amount (encrypted)
4. Submit fill request

### 3. View Orders

- See all order events
- Track order status
- View transaction hashes

### 4. Reveal & Audit

- Makers can reveal order terms
- Anyone can audit revealed terms
- Provides transparency and compliance

## 🔒 Security Features

- **FHE Encryption**: All sensitive data encrypted using FHEVM
- **Attestation**: FHEVM validates encrypted inputs
- **Gateway Validation**: Only authorized gateway can execute trades
- **Optional Transparency**: Terms can be revealed for auditing

## 🎨 UI Improvements

### Design System

- **Modern Cards**: Rounded corners, shadows, and hover effects
- **Color Coding**: Different colors for different actions (blue for create, green for fill, purple for reveal)
- **Responsive Grid**: Adapts to different screen sizes
- **Status Indicators**: Clear visual feedback for all states

### User Experience

- **Form Validation**: Required field indicators and helpful hints
- **Loading States**: Clear feedback during transactions
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation of completed actions

### Navigation

- **Tabbed Interface**: Clean separation of different functions
- **Contract Info**: Prominent display of contract addresses
- **Status Overview**: FHEVM status and connection state

## 🛠️ Technical Implementation

### FHEVM Integration

- Uses existing `useFhevm` hook
- Proper encryption/decryption patterns
- Status monitoring and error handling

### State Management

- React hooks for local state
- Event-driven order updates
- Persistent order history

### Wallet Integration

- MetaMask provider detection
- Transaction signing and confirmation
- Network and account management

## 🔧 Configuration

### Environment Variables

```bash
# Add to .env.local if needed
NEXT_PUBLIC_OTC_ADDRESS=0x8750304ab739c43e93dDA3950f57D51B5e9FeA3c
NEXT_PUBLIC_GATEWAY_ADDRESS=0x8d30010878d95C7EeF78e543Ee2133db846633b8
```

### Network Support

- **Sepolia Testnet**: Primary test network
- **Hardhat Local**: For development and testing
- **Mainnet**: Production deployment ready

## 🐛 Common Issues

### FHEVM Initialization Failed

- Check network connectivity
- Verify FHEVM configuration
- Ensure proper provider setup

### Transaction Failures

- Verify wallet connection
- Check network compatibility
- Ensure sufficient gas fees

### UI Not Loading

- Check browser console for errors
- Verify all dependencies installed
- Clear browser cache if needed

## 🚧 Development Notes

### Mock Data

- Orders component shows mock events for demonstration
- Replace with real blockchain event listening in production
- Implement proper event indexing and storage

### Production Considerations

- Add proper error boundaries
- Implement retry mechanisms
- Add comprehensive logging
- Consider event streaming for real-time updates

## 📚 Resources

- [Zama FHEVM Documentation](https://docs.zama.ai/)
- [OpenZeppelin ERC-7984](https://docs.openzeppelin.com/)
- [Ethereum Development](https://ethereum.org/developers/)
- [MetaMask Integration](https://docs.metamask.io/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

**Note**: This is a demonstration interface. For production use, implement proper security measures, error handling, and event listening.
