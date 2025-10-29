
/*
  This file is auto-generated.
  Command: 'npm run genabi'
*/
export const ConfidentialOtcEscrowABI = {
  "abi": [
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
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "cancelOrder",
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
      "name": "getOrder",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "maker",
              "type": "address"
            },
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
              "internalType": "euint64",
              "name": "amountIn",
              "type": "bytes"
            },
            {
              "internalType": "euint64",
              "name": "amountOut",
              "type": "bytes"
            },
            {
              "internalType": "eaddress",
              "name": "taker",
              "type": "bytes"
            },
            {
              "internalType": "uint64",
              "name": "deadline",
              "type": "uint64"
            },
            {
              "internalType": "bool",
              "name": "isFilled",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isCancelled",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isRevealed",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "takerAddress",
              "type": "address"
            },
            {
              "internalType": "uint64",
              "name": "revealedAmountIn",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "revealedAmountOut",
              "type": "uint64"
            }
          ],
          "internalType": "struct ConfidentialOtcEscrow.Order",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nextOrderId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gateway",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
} as const;

