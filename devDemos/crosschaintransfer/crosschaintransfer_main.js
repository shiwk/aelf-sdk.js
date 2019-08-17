var Aelf = require('../lib/aelf.js');var wal = require('../lib/aelf/wallet');var sha256 = require('js-sha256').sha256;var ContractMethod = require('../lib/aelf/shims/method1');
var wallet = wal.getWalletByPrivateKey('0fb4557bae294c18a41d2fd4c9809db1249c41110968167b5a3e32888857cec6'); var wallet_bp1 = wal.getWalletByPrivateKey('90dc4f9e3f869dbe83c65cace9e8dd7e8f5d1f8cab35b7791002227e5e257df8'); var wallet_bp2 = wal.getWalletByPrivateKey('3e1aa05ba8f6506c98f57dd736f30e3d0fa8e81238e56aa7856826fe484ec2ef');
var aelf = new Aelf(new Aelf.providers.HttpProvider("http://localhost:8000/chain")); aelf.chain.getChainInformation();
var contractZero_address = '2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8';
var contractZero = aelf.chain.contractAt(contractZero_address, wallet);
var proto = require('../lib/aelf/proto');
 // token contract
var tokenSystemName = sha256(Buffer.from('AElf.ContractNames.Token', 'utf8'));
var token_address = 'WnV9Gv3gioSh3Vgaw8SSB96nV8fWUNxuVozCf6Y14e7RXyGaM';
var tokenContract = aelf.chain.contractAt(token_address, wallet);

// cross chain contract
var crossChainSystemName = sha256(Buffer.from('AElf.ContractNames.CrossChain', 'utf8'));
contractZero.GetContractAddressByName({"value": Buffer.from(crossChainSystemName, 'hex')});
var crossChainContractAddress ='25CecrU94dmMdbhC3LWMKxtoaL4Wv8PChGvVJM6PxkHAyvXEhB'; var crossChainContract = aelf.chain.contractAt(crossChainContractAddress, wallet);

// parliament contract
var parliamentSystemName = sha256(Buffer.from('AElf.ContractNames.Parliament', 'utf8')); contractZero.GetContractAddressByName({"value": Buffer.from(parliamentSystemName, 'hex')});
var parliamentContractAddress = 'R8nWLhsyLsY9Di4ULKQ41ddV8j1HbLikT3RjbLBDPGxnJFCv3'; var parliamentContract = aelf.chain.contractAt(parliamentContractAddress, wallet); var parliamentContract_1 = aelf.chain.contractAt(parliamentContractAddress, wallet_bp1); var parliamentContract_2 = aelf.chain.contractAt(parliamentContractAddress, wallet_bp2);
var organizationAddress = '2uWZrwCqoqaz611CTvrFr3FgaxbZheLkqT9gVrsY8iHbBfWgzU';


// validate main chain token address
var address_validation_input ={
    'systemContractHashName' : tokenSystemName.toString('hex'),
    'address': token_address
};

contractZero.ValidateSystemContractAddress(address_validation_input);


// cross chain validte address
var address_validation_tx = {
    "from": proto.getAddressFromRep("x6kmAZy7CUm1zwUBG6MMawBSkteiJte7tkJt4G9GuWxx6aYQj"),
    "to": proto.getAddressFromRep("2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8"),
    "refBlockNumber": "2250",
    "refBlockPrefix": "yExG7w==",
    "methodName": "ValidateSystemContractAddress",
    "params": "CiIKIKKgD4WDwI2qALgLC7rEaEOW/pZraD6pVqY72IRe7mrnEiIKIEOg9KYf1Zeu6F0V4Tv6lucLgqcHHKJeYsMXaoC4Ixri",
    "signature": "5jBclq96JanxD3szZUBsXq3r7eal0osWiexBildQOQp3IMbhd+BVC11vH1Fq3cD5Zcx0+ngnaQhEYYb0vaVMHgE="
};

var address_Validation_txInHex = aelf.chain.transactionPayload(address_validation_tx);
var address_Validation_tx_bytes = Buffer.from(address_Validation_txInHex, 'hex');

var address_validation_tx_id = '1a38a0142859fe999a08137a569ada0a90b3818fa514460cd405ec30849b61ad';
var address_validation_tx_main_height = 2253;
var address_validation_tx_merklePath_main_chain = aelf.chain.getMerklePath(address_validation_tx_id , address_validation_tx_main_height);
address_validation_tx_merklePath_main_chain.forEach(function (path) {
    console.log(path.toString('hex'));
});

var register_main_chain_token_address_input = {
    'fromChainId' : 9992731,
    'parentChainHeight' : address_validation_tx_main_height,
    'transactionBytes' : address_Validation_tx_bytes,
    'merklePath' : ['001551b9923083c758345a28fc16b93c861669541fd5a2dec4eb7d36ba82f613'],
    'tokenContractAddress' : token_address
};


// create token on main chain
tokenContract.Create({
    'symbol' : 'ETH',
    'tokenName' : 'Ethereum',
    'totalSupply' : 10000,
    'decimals' : 2,
    'issuer' : 'x6kmAZy7CUm1zwUBG6MMawBSkteiJte7tkJt4G9GuWxx6aYQj',
    'is_burnable' : true
});

var create_token_tx =  {
    "from": proto.getAddressFromRep("x6kmAZy7CUm1zwUBG6MMawBSkteiJte7tkJt4G9GuWxx6aYQj"),
    "to": proto.getAddressFromRep("WnV9Gv3gioSh3Vgaw8SSB96nV8fWUNxuVozCf6Y14e7RXyGaM"),
    "refBlockNumber": "338",
    "refBlockPrefix": "KsNRXQ==",
    "methodName": "Create",
    "params": "CgNFVEgSCEV0aGVyZXVtGKCcASAEKiIKIH0cCNI3z/NfVSaH44nEEowJoxGy62zNv71CDYR9t/vm",
    "signature": "1DNd0OWxpAQ/6fryN5Z9Fttbf8JS8Vcn15hXChNMhPBTJmVHsaefh7Z6Q13xtuaqxcrLK31Mhxjb/cy60J4i2wA="
};

var txInHex = aelf.chain.transactionPayload(create_token_tx);
var bytes = Buffer.from(txInHex, 'hex');

// console.log(create_token_tx_payload);
var create_token_tx_id = 'b5a0856276fec4ddae9c36ab0a4c865945765c7b5458b0d1b8df5f5a30e612dd';
var main_height = 341;
var merklePath_main_chain = aelf.chain.getMerklePath(create_token_tx_id , main_height);

merklePath_main_chain.forEach(function (path) {
    console.log(path.toString('hex'));
});

var create_token_verification_input = {
    'transactionBytes' : bytes,
    'merklePath' : ['53ebc670c5f6d45917e6eec55eab75a8d8c4bc7bb8321fd04600e5aa3fbcf1b1'],
    'parentChainHeight' : main_height,
    'fromChainId' : 9992731
};




// register main chain token contract address
var register_token_address_method = tokenContract.services[2].methodsArray.find(function (method) {return method.name === 'RegisterCrossChainTokenContractAddress';});
var register_cross_chain_token_contract_address_method = new ContractMethod(aelf.chain, register_token_address_method, token_address, wallet);

var token_contract_register_params = register_cross_chain_token_contract_address_method.packInput(register_side_1_token_address_input);
var expiredTime = 3600;
var time = new Date(); time.setSeconds(new Date().getSeconds() + expiredTime);
var expired_time = {seconds: Math.floor(time/1000),    nanos: (time % 1000) * 1000};
var register_address_creation_proposal = {'contractMethodName' : 'RegisterCrossChainTokenContractAddress', 'toAddress' : token_address, 'params' : token_contract_register_params, 'expiredTime' : expired_time, 'organizationAddress' : organizationAddress};

parliamentContract.CreateProposal(register_address_creation_proposal);
var register_address_creation_proposal_id = 'a3dab7db5a71011fdbec135d680929e54ab41d10e7b844060efe9dc3337870f0';  var approveInput = {'proposalId' : register_address_creation_proposal_id}; parliamentContract.Approve(approveInput);

parliamentContract.Release(register_address_creation_proposal_id);







// cross transfer elf
tokenContract.GetBalance({'symbol': 'ELF', 'owner' : "x6kmAZy7CUm1zwUBG6MMawBSkteiJte7tkJt4G9GuWxx6aYQj"});

var crossChainTransferInput = {
    'to' : 'x6kmAZy7CUm1zwUBG6MMawBSkteiJte7tkJt4G9GuWxx6aYQj',
    'symbol' : 'ELF',
    'amount' : 10,
    'toChainId' : 2750978,
    'issueChainId' : 9992731
};

tokenContract.CrossChainTransfer(crossChainTransferInput);
var transfer_tx = {
    "from": proto.getAddressFromRep("x6kmAZy7CUm1zwUBG6MMawBSkteiJte7tkJt4G9GuWxx6aYQj"),
    "to": proto.getAddressFromRep("WnV9Gv3gioSh3Vgaw8SSB96nV8fWUNxuVozCf6Y14e7RXyGaM"),
    "refBlockNumber": "8443",
    "refBlockPrefix": "6A6xgA==",
    "methodName": "CrossChainTransfer",
    "params": "CiIKIH0cCNI3z/NfVSaH44nEEowJoxGy62zNv71CDYR9t/vmEgNFTEYYFCiC9KcBMJv04QQ=",
    "signature": "EneLLL2/8RpY2ZgAQDwuvePq/Lrj0jSOUOv+YMWxP10fAERWXi0gHZKSgtVVGGaRN2KO1AR04FyoYjTBza5KyQE="
};

var transfer_txIHex = aelf.chain.transactionPayload(transfer_tx);
var transfer_txBytes = Buffer.from(transfer_txIHex, 'hex');

var transfer_tx_id = 'd27e44c67f55af501df3803d8ba5c09b1b0ed902f3439c14be28bdf136b27d38';
var transfer_tx_height = 8446;
var transfer_merklePath_main_chain = aelf.chain.getMerklePath(transfer_tx_id , transfer_tx_height);
transfer_merklePath_main_chain.forEach(function (path) {
    console.log(path.toString('hex'));
});

var transfer_verification_input_main_chain = {
    'fromChainId' : 9992731,
    'parentChainHeight' : 8446,
    'transferTransactionBytes' : transfer_txBytes,
    'merklePath' : ['96dd37145ef4ee30e4c708bce8954364d1ea04029d7c696d320c43627fd65ac3']
};