/**
 * @file basic.js
 * @author huangzongzhe
 */
/* eslint-disable fecs-camelcase */
const Aelf = require('../../lib/aelf.js');
const Wallet = require('../../lib/aelf/wallet');
// address: 65dDNxzcd35jESiidFXN5JV8Z7pCwaFnepuYQToNefSgqk9
const defaultPrivateKey = 'bdb3b39ef4cd18c2697a920eb6d9e8c3cf1a930570beb37d04fb52400092c42b';
// address: 58h3RwTfaE8RDpRNMAMiMv8jUjanCeYHBzKuQfHbrfSFTCn
// 286izE4MsFWdGZn2xCcPSBaRqwXFB95xu5Urfki3q5xmmCc
const privateKey = '097fc2e1eea2bfe258e7962c644f6d87ac58bfbd80301e10740baf52f45141c1';

const wallet = Wallet.getWalletByPrivateKey(defaultPrivateKey);

const aelf = new Aelf(new Aelf.providers.HttpProvider(
    // 'http://192.168.197.56:8101/chain',
    // 'http://34.212.171.27:8000/chain',
    'http://192.168.197.56:8101/chain',
    null,
    null,
    null,
    [{
        name: 'Accept',
        value: 'text/plain;v=1.0'
    }]
));

// aelf.chain.getChainInformation();

// aelf.chain.getChainInformation((err, result) => {
//     console.log(err, result);
// });

const tokenC = aelf.chain.contractAt('4rkKQpsRFt1nU6weAHuJ6CfQDqo6dxruU3K3wNUFr6ZwZYc', wallet);

tokenC.GetBalance.call({
    symbol: 'ELF',
    owner: '58h3RwTfaE8RDpRNMAMiMv8jUjanCeYHBzKuQfHbrfSFTCn'
}, (err, result) => {
    console.log(err, result);
});

tokenC;

// var test;
// aelf.chain.contractAtAsync('4rkKQpsRFt1nU6weAHuJ6CfQDqo6dxruU3K3wNUFr6ZwZYc', wallet, (err, result) => {
//     test = result;
//     console.log(err, result);
// });

// tokenC.GetBalance({
//     symbol: 'AELF',
//     owner: '65dDNxzcd35jESiidFXN5JV8Z7pCwaFnepuYQToNefSgqk9'
// });
// console.log(11111);
// tokenC.GetBalance.call({
//     symbol: 'ELF',
//     owner: '58h3RwTfaE8RDpRNMAMiMv8jUjanCeYHBzKuQfHbrfSFTCn'
// }, (err, result) => {

//     console.log(err, result);
// })
// /* eslint-enable */
// tokenC.Transfer({
//     symbol: 'ELF',
//     to: '58h3RwTfaE8RDpRNMAMiMv8jUjanCeYHBzKuQfHbrfSFTCn',
//     amount: '1000'
// });

// // 不再使用 aelf.chain.connectChain();
// let chainInformation = aelf.chain.getChainInformation();

// let zeroContract = aelf.chain.contractAt(chainInformation.GenesisContractAddress, wallet);

// zeroContract.GetContractAddressByName.call('41456c662e436f6e7472616374732e4d756c7469546f6b656e');

// aelf.chain.getTxsResult('2e82822fbf38dd64d51d648a8254ee70c1a282ce67c1a58baf949f665aaa6a93', 0, 10, (err, result) => {
//     console.log(err, result);
// });
