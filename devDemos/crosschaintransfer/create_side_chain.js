var Aelf = require('../lib/aelf.js');var wal = require('../lib/aelf/wallet');var sha256 = require('js-sha256').sha256;var ContractMethod = require('../lib/aelf/shims/method1');
var wallet = wal.getWalletByPrivateKey('0fb4557bae294c18a41d2fd4c9809db1249c41110968167b5a3e32888857cec6'); var wallet_bp1 = wal.getWalletByPrivateKey('90dc4f9e3f869dbe83c65cace9e8dd7e8f5d1f8cab35b7791002227e5e257df8'); var wallet_bp2 = wal.getWalletByPrivateKey('3e1aa05ba8f6506c98f57dd736f30e3d0fa8e81238e56aa7856826fe484ec2ef');
var aelf = new Aelf(new Aelf.providers.HttpProvider("http://localhost:8000/chain")); aelf.chain.getChainInformation();

var contractZero = aelf.chain.contractAt('2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8', wallet);
var tokenSystemName = sha256(Buffer.from('AElf.ContractNames.Token', 'utf8'));
contractZero.GetContractAddressByName({"value": Buffer.from(tokenSystemName, 'hex')});
var tokenContract = aelf.chain.contractAt('25CecrU94dmMdbhC3LWMKxtoaL4Wv8PChGvVJM6PxkHAyvXEhB', wallet);

var crossChainSystemName = sha256(Buffer.from('AElf.ContractNames.CrossChain', 'utf8'));
contractZero.GetContractAddressByName({"value": Buffer.from(crossChainSystemName, 'hex')});

var crossChainContractAddress ='R8nWLhsyLsY9Di4ULKQ41ddV8j1HbLikT3RjbLBDPGxnJFCv3'; var crossChainContract = aelf.chain.contractAt(crossChainContractAddress, wallet);
tokenContract.Approve({'symbol':'ELF', 'amount': 1000000, 'spender': crossChainContractAddress});


var parliamentSystemName = sha256(Buffer.from('AElf.ContractNames.Parliament', 'utf8')); contractZero.GetContractAddressByName({"value": Buffer.from(parliamentSystemName, 'hex')});
var parliamentContractAddress = '29RDBXTqwnpWPSPHGatYsQXW2E17YrQUCj7QhcEZDnhPb6ThHW'; var parliamentContract = aelf.chain.contractAt(parliamentContractAddress, wallet); var parliamentContract_1 = aelf.chain.contractAt(parliamentContractAddress, wallet_bp1); var parliamentContract_2 = aelf.chain.contractAt(parliamentContractAddress, wallet_bp2);

parliamentContract.GetGenesisOwnerAddress();

var sideChainInfo = {
    'indexingPrice' : 1,
    'lockedTokenAmount' : 20000,
    'resourceBalances' : [{"Type":"CPU","Amount":1},{"Type":"Ram","Amount":1},{"Type":"Net","Amount":1}],
    'contractCode' : '4d5a90000300'
};
var method = crossChainContract.services[0].methodsArray.find(function (method) {return method.name === 'CreateSideChain';}); var create_sidechain_method = new ContractMethod(aelf.chain, method, crossChainContractAddress, wallet); var params = create_sidechain_method.packInput(sideChainInfo); var expiredTime = 3600; var time = new Date(); time.setSeconds(new Date().getSeconds() + expiredTime); var expired_time = {seconds: Math.floor(time/1000),    nanos: (time % 1000) * 1000};
var organizationAddress = 'BkcXRkykRC2etHp9hgFfbw2ec1edx7ERBxYtbC97z3Q2bNCwc';
var sidechain_creation_proposal = {'contractMethodName' : 'CreateSideChain', 'toAddress' : crossChainContractAddress, 'params' : params, 'expiredTime' : expired_time, 'organizationAddress' : organizationAddress};
parliamentContract.CreateProposal(sidechain_creation_proposal);

var proposalId = 'c364adb8765cdd62a6c3dca11e1975711192a525c899db87e58cbb582e5327ed'; var approveInput = {'proposalId' : proposalId}; parliamentContract.Approve(approveInput);
parliamentContract_1.Approve(approveInput);
parliamentContract_2.Approve(approveInput);
parliamentContract.GetProposal(proposalId);

parliamentContract.Release(proposalId);

crossChainContract.GetChainStatus({'value':2750978});
crossChainContract.GetChainStatus({'value':2816514});