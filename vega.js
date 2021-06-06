const vegaBridge = {
    address: "0x47613C3F18BD1172efF3bC2AdC2210C2c2624883",
    abiUrl: "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0x47613C3F18BD1172efF3bC2AdC2210C2c2624883",
    abi: [{ "inputs": [{ "internalType": "address", "name": "erc20_asset_pool", "type": "address" }, { "internalType": "address", "name": "multisig_control", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset_source", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "new_maximum", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "nonce", "type": "uint256" }], "name": "Asset_Deposit_Maximum_Set", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset_source", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "new_minimum", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "nonce", "type": "uint256" }], "name": "Asset_Deposit_Minimum_Set", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user_address", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset_source", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "bytes32", "name": "vega_public_key", "type": "bytes32" }], "name": "Asset_Deposited", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset_source", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "vega_asset_id", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "nonce", "type": "uint256" }], "name": "Asset_Listed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset_source", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "nonce", "type": "uint256" }], "name": "Asset_Removed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user_address", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset_source", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "nonce", "type": "uint256" }], "name": "Asset_Withdrawn", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes32", "name": "vega_public_key", "type": "bytes32" }], "name": "deposit_asset", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "vega_asset_id", "type": "bytes32" }], "name": "get_asset_source", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }], "name": "get_deposit_maximum", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }], "name": "get_deposit_minimum", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "get_multisig_control_address", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }], "name": "get_vega_asset_id", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }], "name": "is_asset_listed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }, { "internalType": "bytes32", "name": "vega_asset_id", "type": "bytes32" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "list_asset", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "remove_asset", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }, { "internalType": "uint256", "name": "maximum_amount", "type": "uint256" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "set_deposit_maximum", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }, { "internalType": "uint256", "name": "minimum_amount", "type": "uint256" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "set_deposit_minimum", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset_source", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "address", "name": "target", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "withdraw_asset", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
}

const vegaTokensAddress = {
    tDAI: "0x65e92e892Fbb489ea263c8E52bb11D1c9b67C54d",
    tBTC: "0xc6A622C2bbCA2645f941eDEEE6f2611971b6870c",
    tUSDC: "0xbc2ab6Cdeeff966F8E8fE136460A49e46a72D4b9",
    tEURO: "0x8218996E51a807Caa94B815a8e144fd5229f07A8",
    tVOTE: "0x7e503d51E18bF3d5825682A54B363799D4a8e344",
}


var wallet = {
    url: "",
    host: "localhost",
    port: "",
    name: "",
    pwd: "",
    jwt: "",
    keys: null,
}

async function connectWallet(e) {
    e.preventDefault();
    $("#vega-wallet-danger").hide();

    wallet.port = document.getElementById("input-port").value;
    wallet.host = document.getElementById("input-host").value;
    wallet.url = "http://" + wallet.host + ":" + wallet.port
    wallet.name = document.getElementById("input-wallet").value;
    wallet.pwd = document.getElementById("input-password").value;

    try {
        const walletResp = await axios.post(wallet.url + "/api/v1/auth/token", {
            wallet: wallet.name,
            passphrase: wallet.pwd
        });
        console.log(walletResp);
        console.log(walletResp.data.token);
        wallet.jwt = walletResp.data.token;

    } catch (error) {
        showVegaError(error);
    }
    await updateVegaKeys()
}

async function updateVegaKeys() {
    try {
        wallet.keys = await getVegaKeys(wallet);
    } catch (error) {
        showVegaError(error);
    }

    console.log(wallet.keys)

    setVegaKeysSelect(wallet.keys);

    // hide form and show keys
    $(".vega-div").hide();
    $("#vega-keys-form").show();
    $("#vega-wallet-box").removeClass("invalid-box").addClass("valid-box");
}

function setVegaKeysSelect(keys) {
    $('#vega-keys-select').find('option').remove();
    for (var i = 0; i < keys.length; i++) {
        $("#vega-keys-select").append(new Option(keys[i].pub, "0x" + keys[i].pub));
    }
}

async function getVegaKeys(w) {
    var httpConfig = {
        headers: {
            Authorization: "Bearer " + w.jwt
        }
    }
    var keyResp;

    try {
        keyResp = await axios.get(w.url + "/api/v1/keys", httpConfig);

    } catch (error) {
        throw error;
    }
    return keyResp.data.keys;
}

function showVegaError(error) {
    var message = ""
    if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        message = error.response.data.error + ". Response status: " + error.response.status.toString();
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        message = "The request was made but no response was received. Check if the wallet service is running."
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        message = "Invalid request. " + error.message;
    }

    $("#vega-wallet-danger").text(message);
    $("#vega-wallet-danger").show();
}

function loadTokens() {
    $('#input-token').find('option').remove();
    for (const [key, value] of Object.entries(vegaTokensAddress)) {
        console.log(`${key}: ${value}`);
        $("#input-token").append(new Option(key, value));
    }
}

async function submitTransaction(e) {
    e.preventDefault();
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();

    const vegaBridgeContract = new web3.eth.Contract(vegaBridge.abi, vegaBridge.address);

    console.log(vegaBridgeContract);

    vegaBridgeContract.methods.deposit_asset($("#input-token").val(), $("#input-quantity").val(), $("#vega-keys-select").val()).send({ from: ethWallet.address });
}

loadTokens();