var aelf_side_1 = new Aelf(new Aelf.providers.HttpProvider("http://localhost:8010/chain")); aelf_side_1.chain.getChainInformation();var ContractMethod = require('../lib/aelf/shims/method1');
var contractZero_side_1_address ='2B9JZgmu8HpMLF68NcJMzQ5mbyFfaddBubZfb4GfhUyrrMTuST';
var contractZero_side_1 = aelf_side_1.chain.contractAt(contractZero_side_1_address, wallet);
var tokenSystemName = sha256(Buffer.from('AElf.ContractNames.Token', 'utf8'));
contractZero_side_1.GetContractAddressByName({"value": Buffer.from(tokenSystemName, 'hex')});

// token contract
var token_address_side_1 = 'ynMmtF39i8cSXspgXpevra6xa4oPuoELWpfBV4uJGXBzoXnLY';
var tokenContract_side_1 = aelf_side_1.chain.contractAt(token_address_side_1, wallet);
tokenContract_side_1.GetNativeTokenInfo();
tokenContract_side_1.GetBalance({'symbol': 'ELF', 'owner' : "x6kmAZy7CUm1zwUBG6MMawBSkteiJte7tkJt4G9GuWxx6aYQj"});

// parliament contract
var parliamentSystemName = sha256(Buffer.from('AElf.ContractNames.Parliament', 'utf8')); contractZero_side_1.GetContractAddressByName({"value": Buffer.from(parliamentSystemName, 'hex')});
var parliamentContractAddress = '2APdAfkFzGpm3Y3MUukz4NKR7c1sHBhrdCLXnPoEFrJV9cs5RK'; var parliamentContract_side_1 = aelf_side_1.chain.contractAt(parliamentContractAddress, wallet); var parliamentContract_side_1_2 = aelf_side_1.chain.contractAt(parliamentContractAddress, wallet_bp1); var parliamentContract_side_1_3 = aelf_side_1.chain.contractAt(parliamentContractAddress, wallet_bp2);
parliamentContract_side_1.GetGenesisOwnerAddress();
var organizationAddress_side_1 = '28PgG6V5aZ1MF2x5u5DAn95RQYrZ6jBryDXZBtHBwBC9KxNSCN';

// cross chain contract
var crossChainSystemName = sha256(Buffer.from('AElf.ContractNames.CrossChain', 'utf8'));
contractZero_side_1.GetContractAddressByName({"value": Buffer.from(crossChainSystemName, 'hex')});
var crossChainContractAddress_side_1 ='2obzM9FPDQDUM2MN9SukLENDAVeA7iukCJAKVFsN1Jw4AExd3Y';
var crossChainContract_side_1 = aelf_side_1.chain.contractAt(crossChainContractAddress_side_1, wallet);


// register main chain token contract address
var register_token_address_method = tokenContract_side_1.services[2].methodsArray.find(function (method) {return method.name === 'RegisterCrossChainTokenContractAddress';});
var register_cross_chain_token_contract_address_method = new ContractMethod(aelf_side_1.chain, register_token_address_method, token_address_side_1, wallet);

var token_contract_register_params = register_cross_chain_token_contract_address_method.packInput(register_main_chain_token_address_input);
var expiredTime = 3600;
var time = new Date(); time.setSeconds(new Date().getSeconds() + expiredTime);
var expired_time = {seconds: Math.floor(time/1000),    nanos: (time % 1000) * 1000};
var register_address_creation_proposal = {'contractMethodName' : 'RegisterCrossChainTokenContractAddress', 'toAddress' : token_address_side_1, 'params' : token_contract_register_params, 'expiredTime' : expired_time, 'organizationAddress' : organizationAddress_side_1};

parliamentContract_side_1.CreateProposal(register_address_creation_proposal);
var register_address_creation_proposal_id = 'ca406b62aa00865a4f9e81dfff4fd30c6ddc5112af0e79616040118173233529';  var approveInput = {'proposalId' : register_address_creation_proposal_id}; parliamentContract_side_1.Approve(approveInput);

parliamentContract_side_1.Release(register_address_creation_proposal_id);






// cross chain create token
tokenContract_side_1.CrossChainCreateToken(verificationInput_main_chain);







// validate token address
var address_validation_input_side_1 ={
    'systemContractHashName' : tokenSystemName.toString('hex'),
    'address': token_address_side_1
};
contractZero_side_1.ValidateSystemContractAddress(address_validation_input_side_1);

var address_validation_tx_id_side_1 = '674f0aed0bf149dba933bf43c056067d9420e5077eeb19af8e030f6da6178827';
var address_validation_tx_height_side_1 = 5272;
var address_validation_tx_merklePath_main_chain_side_1 = aelf_side_1.chain.getMerklePath(address_validation_tx_id_side_1 , address_validation_tx_height_side_1);
address_validation_tx_merklePath_main_chain_side_1.forEach(function (path) {
    console.log(path.toString('hex'));
});

var address_validation_tx_side_1 = {
    "from": proto.getAddressFromRep("x6kmAZy7CUm1zwUBG6MMawBSkteiJte7tkJt4G9GuWxx6aYQj"),
    "to": proto.getAddressFromRep(contractZero_side_1_address),
    "refBlockNumber": "5269",
    "refBlockPrefix": "gxIslg==",
    "methodName": "ValidateSystemContractAddress",
    "params": "CiIKIKKgD4WDwI2qALgLC7rEaEOW/pZraD6pVqY72IRe7mrnEiIKIIDuOVQUy3Wfw6mX8rGj21BqqXeb673vZTrscSH9aB2m",
    "signature": "V4U9gyv4wMr2Qs4sBp9MxtdEaPpzGacO/T9DYxKSO1IRZ6tiXcsNyHln0zyuK4ktihglPGGkEenMSA3PTh9gnAE="
};

var address_Validation_txInHex_side_1 = aelf_side_1.chain.transactionPayload(address_validation_tx_side_1);
var address_Validation_tx_bytes_side_1 = Buffer.from(address_Validation_txInHex_side_1, 'hex');
crossChainContract_side_1.GetBoundParentChainHeightAndMerklePathByHeight({'value': address_validation_tx_height_side_1});

var register_side_1_token_address_input = {
    'fromChainId' : 2750978,
    'parentChainHeight' : 5656,
    'transactionBytes' : address_Validation_tx_bytes_side_1,
    'merklePath' : ['60a7755cf33f574b5d5db8c57c054c0739232e9b6024798616ad1cd4c1001797', "10fd5e366abc7a63c8d8eebf79a82e05098efde36754652c512576b97b7cbfa5", "e66c552491717b4b261244e2b362703663ad8a3638d2cd51117f26d488d1612b", "bd248e07f81e129f61e84b20ce724ceec8b6e51851dd4cca46c12f0a77182cc3"],
    'tokenContractAddress' : token_address_side_1
};






// receive main chain token

tokenContract_side_1.CrossChainReceiveToken(transfer_verification_input_main_chain);







// check token
tokenContract_side_1.GetTokenInfo({'symbol': 'ETH'});
tokenContract_side_1.GetBalance({'symbol': 'ELF', 'owner' : "x6kmAZy7CUm1zwUBG6MMawBSkteiJte7tkJt4G9GuWxx6aYQj"});
