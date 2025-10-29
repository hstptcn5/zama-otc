import { useState, useEffect } from "react";
import CreateOrder from "./CreateOrder";
import { Orders } from "./Orders";
import { RevealAndAudit } from "./RevealAndAudit";
import { useOrderEvents } from "@/hooks/useOrderEvents";
import { useMetaMaskEthersSigner } from "@/hooks/metamask/useMetaMaskEthersSigner";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Props = {
    otcAddress: `0x${string}`;
    gatewayAddress: `0x${string}`;
    tokenIn: `0x${string}`;
    tokenOut: `0x${string}`;
};

export default function OTCDemo({ otcAddress, gatewayAddress, tokenIn, tokenOut }: Props) {
    const [activeTab, setActiveTab] = useState<"create" | "orders" | "audit">("create");
    const [showHowItWorks, setShowHowItWorks] = useState(false);
    const { orders, onOrderCreated, onOrderFilled, onTermsRevealed } = useOrderEvents();
    const { chainId, isConnected, connect } = useMetaMaskEthersSigner();

    // Prevent background scrolling when modals are open
    useEffect(() => {
        if (activeTab === "orders" || showHowItWorks) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [activeTab, showHowItWorks]);

    const tabs = [
        { id: "create", label: "Create Order", icon: "📝" },
        { id: "orders", label: "View Orders", icon: "📋" },
        { id: "audit", label: "Reveal & Audit", icon: "🔍" },
    ] as const;

    // Check if current network supports FHEVM
    const isNetworkSupported = chainId && [11155111, 31337].includes(chainId);
    const getNetworkName = (chainId: number) => {
        switch (chainId) {
            case 1: return "Ethereum Mainnet";
            case 11155111: return "Sepolia Testnet";
            case 84532: return "Base Sepolia";
            case 31337: return "Hardhat Local";
            default: return `Chain ID ${chainId}`;
        }
    };

    return (
        <div className="min-h-screen animated-gradient p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-left mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                        <div>
                            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                                Confidential OTC Trading
                            </h1>
                            <p className="text-xl text-white/90 max-w-3xl drop-shadow-md">
                                Trade confidential tokens with complete privacy using FHEVM technology
                            </p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-6 lg:mt-0">
                            <button
                                onClick={() => setActiveTab("orders")}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                            >
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                View All Orders
                            </button>
                            <button
                                onClick={() => setShowHowItWorks(true)}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                            >
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                How It Works
                            </button>
                        </div>
                    </div>
                    
                    {/* Contract Info - Compact in Header */}
                    <div className="gradient-card rounded-2xl p-10 mx-auto shadow-2xl border border-white/30">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
                            <div className="text-center">
                                <div className="text-white font-bold mb-3 text-base drop-shadow-md">OTC Contract</div>
                                <code className="text-gray-900 font-mono text-xs break-all bg-white/50 px-3 py-2 rounded-lg backdrop-blur-sm block border border-white/40 shadow-sm">{otcAddress}</code>
                            </div>
                            <div className="text-center">
                                <div className="text-white font-bold mb-3 text-base drop-shadow-md">Gateway</div>
                                <code className="text-gray-900 font-mono text-xs break-all bg-white/50 px-3 py-2 rounded-lg backdrop-blur-sm block border border-white/40 shadow-sm">{gatewayAddress}</code>
                            </div>
                            <div className="text-center">
                                <div className="text-white font-bold mb-3 text-base drop-shadow-md">Token In</div>
                                <code className="text-gray-900 font-mono text-xs break-all bg-white/50 px-3 py-2 rounded-lg backdrop-blur-sm block border border-white/40 shadow-sm">{tokenIn}</code>
                            </div>
                            <div className="text-center">
                                <div className="text-white font-bold mb-3 text-base drop-shadow-md">Token Out</div>
                                <code className="text-gray-900 font-mono text-xs break-all bg-white/50 px-3 py-2 rounded-lg backdrop-blur-sm block border border-white/40 shadow-sm">{tokenOut}</code>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Network Status */}
                {!isConnected ? (
                    <Card className="mb-8 shadow-2xl border-0 gradient-card rounded-3xl border border-white/20">
                        <CardContent className="p-12 text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 gradient-secondary rounded-3xl mb-6 shadow-2xl">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-4">Connect Your Wallet</h3>
                            <p className="text-gray-700 mb-8 text-xl">Connect your MetaMask wallet to start confidential trading</p>
                            <button
                                onClick={connect}
                                className="btn-gradient text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl"
                            >
                                Connect MetaMask
                            </button>
                        </CardContent>
                    </Card>
                ) : !isNetworkSupported ? (
                    <Card className="mb-8 shadow-2xl border-0 bg-red-500/10 backdrop-blur-md rounded-3xl border border-red-300/30">
                        <CardContent className="p-12 text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl mb-6 shadow-2xl">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">Unsupported Network</h3>
                            <p className="text-white/90 mb-4 text-xl">Please switch to Sepolia testnet or localhost</p>
                            <p className="text-sm text-white/80 bg-white/10 px-6 py-3 rounded-xl inline-block backdrop-blur-sm">Current: {chainId ? getNetworkName(chainId) : "Unknown"}</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-8">
                        {/* Create Order - Main Focus */}
                        <Card className="shadow-2xl border-0 gradient-card rounded-3xl border border-white/20">
                            <CardContent className="p-10">
                                <CreateOrder
                                    otcAddress={otcAddress}
                                    tokenIn={tokenIn}
                                    tokenOut={tokenOut}
                                    onOrderCreated={onOrderCreated}
                                />
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Orders Modal/Overlay */}
                {activeTab === "orders" && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col border-0">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-3xl">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                <div>
                                        <h2 className="text-3xl font-bold text-gray-900">All Orders</h2>
                                        <p className="text-gray-600 text-lg">View and fill existing confidential orders</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveTab("create")}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Close
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-8">
                                <Orders otcAddress={otcAddress} />
                            </div>
                        </div>
                    </div>
                )}

                {/* How It Works Modal */}
                {showHowItWorks && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col border-0">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-3xl">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
                                        <p className="text-gray-600 text-lg">Understanding Confidential OTC Trading with FHEVM</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowHowItWorks(false)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Close
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-8">
                                <div className="space-y-8">
                                    {/* Overview */}
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Confidential OTC Trading Process</h3>
                                        <p className="text-lg text-gray-700 max-w-4xl mx-auto">
                                            Our system uses FHEVM (Fully Homomorphic Encryption Virtual Machine) to enable completely private token trading 
                                            where trade amounts and participants remain encrypted throughout the entire process.
                                        </p>
                                    </div>

                                    {/* Process Flow Diagram */}
                                    <div className="bg-gray-50 rounded-2xl p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Process Flow</h3>
                                        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                                            {/* Step 1 */}
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-gray-600 rounded-xl flex items-center justify-center mb-3">
                                                    <span className="text-white font-bold text-lg">1</span>
                                                </div>
                                                <div className="text-center">
                                                    <h4 className="font-bold text-gray-900 mb-2">Create Order</h4>
                                                    <p className="text-sm text-gray-700 max-w-32">Maker creates encrypted order with hidden amounts</p>
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <div className="hidden md:block">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>

                                            {/* Step 2 */}
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-gray-600 rounded-xl flex items-center justify-center mb-3">
                                                    <span className="text-white font-bold text-lg">2</span>
                                                </div>
                                                <div className="text-center">
                                                    <h4 className="font-bold text-gray-900 mb-2">Transfer Tokens</h4>
                                                    <p className="text-sm text-gray-700 max-w-32">Confidential transfer to OTC contract</p>
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <div className="hidden md:block">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>

                                            {/* Step 3 */}
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-gray-600 rounded-xl flex items-center justify-center mb-3">
                                                    <span className="text-white font-bold text-lg">3</span>
                                                </div>
                                                <div className="text-center">
                                                    <h4 className="font-bold text-gray-900 mb-2">Fill Order</h4>
                                                    <p className="text-sm text-gray-700 max-w-32">Taker fills with encrypted payment</p>
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <div className="hidden md:block">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>

                                            {/* Step 4 */}
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-gray-600 rounded-xl flex items-center justify-center mb-3">
                                                    <span className="text-white font-bold text-lg">4</span>
                                                </div>
                                                <div className="text-center">
                                                    <h4 className="font-bold text-gray-900 mb-2">Finalize</h4>
                                                    <p className="text-sm text-gray-700 max-w-32">Gateway validates and completes trade</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Technical Details */}
                                    <div className="bg-gray-50 rounded-2xl p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Key Features</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-800 mb-3">FHEVM Technology</h4>
                                                <ul className="text-sm text-gray-700 space-y-2">
                                                    <li>• Fully Homomorphic Encryption for private computations</li>
                                                    <li>• Encrypted amounts remain hidden during validation</li>
                                                    <li>• Zero-knowledge proofs for transaction integrity</li>
                                                    <li>• Compatible with Ethereum and Sepolia testnet</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-800 mb-3">Security Features</h4>
                                                <ul className="text-sm text-gray-700 space-y-2">
                                                    <li>• End-to-end encryption of trade parameters</li>
                                                    <li>• Gateway validation without revealing amounts</li>
                                                    <li>• Optional post-trade audit capabilities</li>
                                                    <li>• Immutable smart contract execution</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}