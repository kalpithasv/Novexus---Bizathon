const CONTRACT_ADDRESS = '0x35E25D2377a3F5eDe95C2382bE128820C7268B43';

const CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "AadhaarToEmail",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "EmailToAadhaar",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "Aadhaar",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            }
        ],
        "name": "KYC",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            }
        ],
        "name": "Pay",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "Redirection",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "chainID",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "TokenID",
                "type": "address"
            }
        ],
        "name": "SetPreferences",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "SetRedirection",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "WalletToPreferences",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "chainID",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "TokenAddress",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "mailToWallet",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "pendingPayments",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const Tokens = [
    {
        name: 'Uniswap (UNI)',
        val: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d'
    },
    {
        name: 'Aave (AAVE)',
        val: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d'
    },
    {
        name: 'Compound (COMP)',
        val: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    },
    {
        name: 'Chainlink (LINK)',
        val: '0x514910771af9ca656af840dff83e8264ecf986ca'
    },
    {
        name: 'Maker (MKR)',
        val: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d'
    },
    {
        name: 'OMG Network (OMG)',
        val: '0x6b175474e89094c44da98b954eedeac495271d0f'
    },
    {
        name: 'Wrapped Bitcoin (WBTC)',
        val: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
    },
    {
        name: 'Wrapped Matic (WMatic)',
        val: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
    },
    {
        name: 'ETH',
        val: '0x2a2CcD157C4Ed8485CF9385fd9460117cE717bBB'
    }
];

const chains = [
    {
        name: 'Ethereum (ETH)',
        val: '0x1'
    },
    {
        name: 'Binance Smart Chain (BNB)',
        val: '0x38'
    },
    {
        name: 'Polygon (MATIC)',
        val: '0x89'
    },
    {
        name: 'Avalanche (AVAX)',
        val: '0xa86a'
    },
];

export { CONTRACT_ADDRESS, CONTRACT_ABI, Tokens, chains }