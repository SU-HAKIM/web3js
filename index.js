let Book = require('./build/contracts/Book.json');
let { Transaction } = require('@ethereumjs/tx');
let Web3 = require('web3');
let web3 = new Web3('http://localhost:7545');
require('dotenv').config();

async function contract_code() {
    // let addresses = await web3.eth.getAccounts();

    let address_1 = '0x990613fE0e92D1CA6Ce04ed3F21fc28df1B3704d';
    let address_2 = '0x3970399C4C6e109371289f6f02CA4027fDcef632';
    let private_key_1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex');
    let private_key_2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex');

    let id = await web3.eth.net.getId()
    let network_address = Book.networks[id].address;
    let contract = new web3.eth.Contract(Book.abi, network_address);

    let txCount = await web3.eth.getTransactionCount(address_1);
    //build the transaction
    let txObject = {
        nonce: web3.utils.toHex(txCount),
        to: address_2,
        value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }
    //sign the transaction
    const tx = Transaction.fromTxData(txObject)
    let signedTx = tx.sign(private_key_1);

    const serialized_transaction = signedTx.serialize();
    const raw = `0x${serialized_transaction.toString('hex')}`;
    //Broadcast the Transaction 
    console.log(raw);
}

contract_code();

async function get_balance_in_ether() {
    let balance_1 = await web3.eth.getBalance(address_1);
    let balance_1_in_ether = web3.utils.fromWei(balance_1, 'ether')
    let balance_2 = await web3.eth.getBalance(address_1);
    let balance_2_in_ether = web3.utils.fromWei(balance_2, 'ether')

    console.log(balance_1_in_ether, balance_2_in_ether);
}