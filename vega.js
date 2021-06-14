const web3 = new Web3(window.ethereum);
const vegaBridgeContract = new web3.eth.Contract(vegaBridge.abi, vegaBridge.address);

var vegaTokens = {}
var vegaCollaterals = {}

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
    await updateVegaKeys();
    getWalletCollaterals();
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

function showWithdrawError(error) {
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
        message = "The request was made but no response was received."
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        message = "Invalid request. " + error.message;
    }

    $("#vega-withdraw-danger").text(message);
    $("#vega-withdraw-danger").show();
}

function loadTokens() {
    $('#input-token').find('option').remove();
    $('#withdraw-input-token').find('option').remove();
    for (const [key, value] of Object.entries(vegaTokens)) {
        console.log(`${key}: ${value.address}`);
        var option = new Option(key, value.address);
        option.setAttribute('decimal', value.decimal);
        var withdrawOption = new Option(key, value.address);
        withdrawOption.setAttribute('decimal', value.decimal);
        $("#input-token").append(option);
        $("#withdraw-input-token").append(withdrawOption);
    }
}

async function submitTransaction(e) {
    e.preventDefault();
    await window.ethereum.enable();

    var decimal = $("#input-token").find(':selected').attr('decimal');
    var quantity = parseFloat($("#input-quantity").val()) * 10 ** parseFloat(decimal);
    vegaBridgeContract.methods.deposit_asset($("#input-token").val(), quantity, $("#vega-keys-select").val()).send({ from: ethWallet.address });
}

async function submitWithdraw(e) {
    e.preventDefault();
    await window.ethereum.enable();

    var decimal = $("#withdraw-input-token").find(':selected').attr('decimal');
    var quantity = parseFloat($("#withdraw-input-quantity").val()) * 10 ** parseFloat(decimal);
    vegaBridgeContract.methods.withdraw_asset($("withdraw-#input-token").val(), quantity, $("#vega-keys-select").val()).send({ from: ethWallet.address });
}


// Get balance for a given public key
async function getWalletCollaterals() {
    $("#vega-accounts").html("");
    $("#vega-wallet-danger").hide();
    try {
        var httpConfig = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const walletResp = await axios.post(vegaGraphUrl, {
            query: getCollateralQuery($("#vega-keys-select option:selected").text())
        }, httpConfig);
        console.log(walletResp);
        console.log(walletResp.data.data.party.accounts);
        showVegaCollateral(walletResp.data.data.party.accounts);
    } catch (error) {
        showVegaError(error);
    }
    $("#vega-connected").show();
}

function showVegaCollateral(collaterals) {
    // Purge UI elements any previously loaded accounts
    const template = document.querySelector("#template-balance");

    for (var i = 0; i < collaterals.length; i++) {
        const clone = template.content.cloneNode(true);
        vegaCollaterals[collaterals[i].asset.symbol] = collaterals[i].balance / (10 ** vegaTokens[collaterals[i].asset.symbol].decimal);
        clone.querySelector(".address").textContent = collaterals[i].asset.symbol;
        clone.querySelector(".balance").textContent = collaterals[i].balance / (10 ** vegaTokens[collaterals[i].asset.symbol].decimal);
        $("#vega-accounts").append(clone);
    }
}

async function getVegaAssets() {
    //assets = await vegaBridgeContract.getPastEvents("Asset_Listed", { fromBlock: 1 }).then(console.log);
    // console.log(JSON.stringify(assets));

    try {
        assets = await axios.get(vegaRestUrl + "/assets");

    } catch (error) {
        throw error;
    }

    for (var i = 0; i < assets.data.assets.length; i++) {
        var asset = assets.data.assets[i];
        if (asset.details.erc20 != null) {
            vegaTokens[asset.details.symbol] = {};
            vegaTokens[asset.details.symbol]["address"] = asset.details.erc20.contractAddress;
            vegaTokens[asset.details.symbol]["id"] = asset.id;
            vegaTokens[asset.details.symbol]["decimal"] = asset.details.decimals;
        }
    };

    loadTokens();
}

function checkValidBalance() {
    let token = $("#input-token option:selected").text();
    let value = $('#input-quantity').val();

    if (value > 0 && walletBalance[token] && walletBalance[token] > value) {
        console.log("Valid transaction. Quantity: " + value + ". Available: " + walletBalance[token]);

        // check if vega wallet is set
        if ($("#vega-keys-select").val()) {
            $("#vega-send-transaction").prop('disabled', false);
            $("#vega-transaction-danger").hide();
            $("#vega-transaction-danger").text();
            $("#transaction-info-box").removeClass("invalid-box").addClass("valid-box");
        } else {
            $("#vega-transaction-danger").show();
            $("#vega-transaction-danger").text("Please connect a vega wallet");
            $("#transaction-info-box").removeClass("valid-box").addClass("invalid-box");
        }
    } else {
        let message = "Invalid transaction. Quantity: " + value + ". Available: " + walletBalance[token]
        console.log(message);
        $("#vega-send-transaction").prop('disabled', true);
        $("#transaction-info-box").removeClass("valid-box").addClass("invalid-box");
        $("#vega-transaction-danger").show();
        $("#vega-transaction-danger").text(message);
    }
}

function checkValidBalanceWithdraw() {
    let token = $("#withdraw-input-token option:selected").text();
    let value = $('#withdraw-input-quantity').val();
    if (ethWallet.address != "" && value > 0 && vegaCollaterals[token] && vegaCollaterals[token] > value) {
        console.log("Valid transaction. Quantity: " + value + ". Available: " + vegaCollaterals[token]);
        // check if vega wallet is set
        if ($("#vega-keys-select").val()) {
            $("#vega-send-withdraw").prop('disabled', false);
            $("#vega-withdraw-danger").hide();
            $("#vega-withdraw-danger").text();
            $("#withdraw-info-box").removeClass("invalid-box").addClass("valid-box");
        } else {
            $("#vega-withdraw-danger").show();
            $("#vega-withdraw-danger").text("Please connect a vega wallet");
            $("#withdraw-info-box").removeClass("valid-box").addClass("invalid-box");

        }
    } else {
        let message = "Invalid transaction. Quantity: " + value + ". Available: " + vegaCollaterals[token]
        if (ethWallet.address == "") {
            message = "Please connect your ETH wallet"
        }
        if (value == 0) {
            message = "Value has to be greater than 0"
        }

        console.log(message);
        $("#vega-send-withdraw").prop('disabled', true);
        $("#withdraw-info-box").removeClass("valid-box").addClass("invalid-box");
        $("#vega-withdraw-danger").show();
        $("#vega-withdraw-danger").text(message);
    }
}

async function submitWithdraw() {
    //e.preventDefault();
    var asset = $("#withdraw-input-token option:selected").text();
    var assetName = $("#withdraw-input-token option:selected").text();
    var assetId = vegaTokens[assetName]["id"];
    var amount = $("#withdraw-input-quantity").val();
    try {
        var httpConfig = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const withdrawResp = await axios.post(vegaGraphUrl, {
            operationName: "prepareWithdrawal",
            query: prepareWithdrawal(),
            variables: {
                amount: (amount * (10 ** vegaTokens[asset].decimal)).toString(),
                assetId: assetId,
                erc20Details: { receiverAddress: vegaBridge.address },
            }
        }, httpConfig);

        console.log("withdrawal: " + withdrawResp.data.data.prepareWithdrawal.blob + " " + ethWallet.address);
        var transaction = withdrawResp.data.data.prepareWithdrawal.blob;
        await signTransaction(transaction);
    } catch (error) {
        showWithdrawError(error);
    }
}

async function sendMessage(m) {
    try {
        var tx = m.signedTx;
        console.log(JSON.stringify(tx));
        const sendResp = await axios.post(vegaRestUrl + "/transaction", { tx: tx });
        console.log(sendResp.data);

    } catch (error) {
        showWithdrawError(error);
    }
}

async function signTransaction(transaction) {
    try {

        var httpConfig = {
            headers: {
                Authorization: "Bearer " + wallet.jwt
            }
        }

        console.log($("#vega-keys-select option:selected").text());
        const pubkey = $("#vega-keys-select option:selected").text();

        const signResp = await axios.post(wallet.url + "/api/v1/messages", {
            tx: transaction,
            pubKey: pubkey,
            propagate: true,
        }, httpConfig);
        console.log(signResp.data);
        return signResp.data;

    } catch (error) {
        showWithdrawError(error);
    }
}

async function sendMessage(m) {
    try {
        var tx = m.signedTx;
        console.log(JSON.stringify(tx));
        const sendResp = await axios.post(vegaRestUrl + "/transaction", { tx: tx, type: "TYPE_COMMIT" });
        console.log(sendResp.data);

    } catch (error) {
        showWithdrawError(error);
    }
}

getVegaAssets();