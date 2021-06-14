// URL of the Vega API endpoint
const vegaRestUrl = "https://lb.testnet.vega.xyz";
const vegaGraphUrl = "https://lb.testnet.vega.xyz/query";

// validNetworks is a list of Ethereum network compatible with Vega
const validNetworks = ['Ethereum Testnet Ropsten'];

// An object containing Vega bridge smart contract details
const vegaBridge = {
    address: "0x47613C3F18BD1172efF3bC2AdC2210C2c2624883",
    abiUrl: "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0x47613C3F18BD1172efF3bC2AdC2210C2c2624883",
    abi: [{ "inputs": [{ "internalType": "address", "name": "erc20_asset_pool", "type": "address" }, { "internalType": "address", "name": "multisig_control", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset_source", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "new_maximum", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "nonce", "type": "uint256" }], "name": "Asset_Deposit_Maximum_Set", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset_source", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "new_minimum", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "nonce", "type": "uint256" }], "name": "Asset_Deposit_Minimum_Set", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user_address", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset_source", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "bytes32", "name": "vega_public_key", "type": "bytes32" }], "name": "Asset_Deposited", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset_source", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "vega_asset_id", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "nonce", "type": "uint256" }], "name": "Asset_Listed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset_source", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "nonce", "type": "uint256" }], "name": "Asset_Removed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user_address", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset_source", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "nonce", "type": "uint256" }], "name": "Asset_Withdrawn", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes32", "name": "vega_public_key", "type": "bytes32" }], "name": "deposit_asset", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "vega_asset_id", "type": "bytes32" }], "name": "get_asset_source", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }], "name": "get_deposit_maximum", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }], "name": "get_deposit_minimum", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "get_multisig_control_address", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }], "name": "get_vega_asset_id", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }], "name": "is_asset_listed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }, { "internalType": "bytes32", "name": "vega_asset_id", "type": "bytes32" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "list_asset", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "remove_asset", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }, { "internalType": "uint256", "name": "maximum_amount", "type": "uint256" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "set_deposit_maximum", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }, { "internalType": "uint256", "name": "minimum_amount", "type": "uint256" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "set_deposit_minimum", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "address", "name": "target", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "withdraw_asset", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
}

// GraphQL query
const getCollateralQuery = (pubkey) => `
query getCollateral { 
    party(id: "${pubkey}"){ 
        accounts(type:General){
            asset {
                symbol
            }
            type
            balance
        }        
    }
     
}
`;

const prepareWithdrawal = () => `
mutation prepareWithdrawal($amount: String!, $assetId: String!, $erc20Details: Erc20WithdrawalDetailsInput!) {
    prepareWithdrawal(amount: $amount, asset: $assetId, erc20Details: $erc20Details){
        blob
        __typename
    }
}
`;