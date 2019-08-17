/**
 * @file proto.js
 * @author gldeng, swk, hzz780
 */

/**
 * wallet module.
 * @module AElf/pbUtils
 */
'use strict';

var utils = require('../utils/utils');
var protobuf = require('@aelfqueen/protobufjs');
var coreDescriptor = require('./proto/core.proto.json');
var aelfRoot = protobuf.Root.fromJSON(coreDescriptor.nested.aelf);

// var authDescriptor = require('./proto/auth.proto.json');
// var auth = protobuf.Root.fromJSON(authDescriptor);
//
// var crossChainDescriptor = require('./proto/crosschain.proto.json');
// var crosschain = protobuf.Root.fromJSON(crossChainDescriptor);

/**
 * arrayBuffer To Hex
 *
 * @alias module:AElf/pbUtils
 * @param {Buffer} arrayBuffer arrayBuffer
 * @return {string} hex string
 */
var arrayBufferToHex = function (arrayBuffer) {
    return Array.prototype.map.call(
        new Uint8Array(arrayBuffer),
        n => ("0" + n.toString(16)).slice(-2)
    ).join("");
};

/**
 * get hex rep From Address
 *
 * @alias module:AElf/pbUtils
 * @param {protobuf} address kernel.Address
 * @return {string} hex rep of address
 */
var getRepForAddress = function (address) {
    var message = aelfRoot.Address.fromObject(address);
    var hex = '';
    if (message.Value instanceof Buffer) {
        hex = message.Value.toString('hex');
    }
    else {
        // Uint8Array
        hex = arrayBufferToHex(message.Value);
    }

    return utils.encodeAddressRep(hex);
};

/**
 * get address From hex rep
 *
 * @alias module:AElf/pbUtils
 * @param {string} rep address
 * @return {protobuf} address kernel.Address
 */
var getAddressFromRep = function (rep) {
    var hex = utils.decodeAddressRep(rep);
    return aelfRoot.Address.create({'value': Buffer.from(hex.replace('0x', ''), 'hex')});
};

/**
 * get address From hex rep
 *
 * @alias module:AElf/pbUtils
 * @param {string} rep address
 * @return {protobuf} address kernel.Address
 */
var getAddressObjectFromRep = function (rep) {
    var output = aelfRoot.Address.toObject(getAddressFromRep(rep));
    return output;
};

/**
 * get hex rep From hash
 *
 * @alias module:AElf/pbUtils
 * @param {protobuf} hash kernel.Hash
 * @return {string} hex rep
 */
var getRepForHash = function (hash) {
    var message = aelfRoot.Address.fromObject(hash);
    var hex = '';
    if (message.Value instanceof Buffer) {
        hex = message.Value.toString('hex');
    }
    else {
        // Uint8Array
        hex = arrayBufferToHex(message.Value);
    }

    return hex;
};

/**
 * get Hash From Hex
 *
 * @alias module:AElf/pbUtils
 * @param {string} hex string
 * @return {protobuf} kernel.Hash
 */
var getHashFromHex = function (hex) {
    return aelfRoot.Hash.create({'value': Buffer.from(hex.replace('0x', ''), 'hex')});
};

/**
 * get Hash Object From Hex
 *
 * @alias module:AElf/pbUtils
 * @param {string} hex string
 * @return {Object} kernel.Hash Hash ot Object
 */
var getHashObjectFromHex = function (hex) {
    return aelfRoot.Hash.toObject(getHashFromHex(hex));
};

/**
 * encode Transaction to protobuf type
 *
 * @alias module:AElf/pbUtils
 * @param {Object} tx object
 * @return {protobuf} kernel.Transaction
 */
var encodeTransaction = function (tx) {
    return aelfRoot.Transaction.encode(tx).finish();
};

/**
 * get Transaction
 *
 * @alias module:AElf/pbUtils
 * @param {string} from
 * @param {string} to
 * @param {string} methodName
 * @param {string} params
 * @return {protobuf} kernel.Transaction
 */
var getTransaction = function (from, to, methodName, params) {
    var txn = {
        "from": getAddressFromRep(from),
        "to": getAddressFromRep(to),
        "methodName": methodName,
        "params": params
    };
    return aelfRoot.Transaction.create(txn);
};

// /**
//  * get MultiSign Transaction
//  *
//  * @alias module:AElf/pbUtils
//  * @param {string} from
//  * @param {string} to
//  * @param {string} methodName
//  * @param {string} params
//  * @return {protobuf} kernel.Transaction
//  */
// var getMsigTransaction = function (from, to, methodName, params) {
//     var txn = {
//         "from": getAddressFromRep(from),
//         "to": getAddressFromRep(to),
//         "methodName": methodName,
//         "params": params,
//         "type" : aelfRoot.TransactionType.MsigTransaction
//     };
//     return aelfRoot.Transaction.create(txn);
// };

// /**
//  * get Reviewer
//  *
//  * @alias module:AElf/pbUtils
//  * @param {Object} reviewer
//  * @param {string} to
//  * @param {string} methodName
//  * @param {string} params
//  * @return {protobuf} auth.Reviewer
//  */
// var getReviewer = function (reviewer) {
//     var value = {
//         'PubKey': Buffer.from(reviewer.PubKey.replace('0x', ''), 'hex'),
//         'Weight': reviewer.Weight
//     };
//     return auth.Reviewer.create(value);
// };

// /**
//  * get Authorization
//  *
//  * @alias module:AElf/pbUtils
//  * @param {string} decided_threshold
//  * @param {string} proposer_threshold
//  * @param {string} reviewers
//  * @return {protobuf} auth.Authorization
//  */
// var getAuthorization = function (decided_threshold, proposer_threshold, reviewers) {
//     var authorization = {
//         "ExecutionThreshold" : decided_threshold,
//         "ProposerThreshold" : proposer_threshold,
//         "Reviewers" : reviewers
//     };
//     return auth.Authorization.create(authorization);
// };

// /**
//  * get Proposal
//  *
//  * @alias module:AElf/pbUtils
//  * @param {string} multisig_account
//  * @param {string} proposal_name
//  * @param {string} raw_txn
//  * @param {string} expired_time
//  * @param {protobuf} proposer kernel.Address
//  * @return {protobuf} auth.Proposal
//  */
// var getProposal = function (multisig_account, proposal_name, raw_txn, expired_time, proposer) {
//     var txn_data = encodeTransaction(raw_txn);
//     var proposal = {
//         "MultiSigAccount" : getAddressFromRep(multisig_account),
//         "Name" : proposal_name,
//         "TxnData" : txn_data,
//         "ExpiredTime" : (new Date(expired_time).getTime())/ 1000,
//         "Status" : auth.ProposalStatus.ToBeDecided,
//         "Proposer" : getAddressFromRep(proposer)
//     };
//     return auth.Proposal.create(proposal);
// };

// /**
//  * get Approval
//  *
//  * @alias module:AElf/pbUtils
//  * @param {string} proposalHash
//  * @param {string} signature
//  * @return {protobuf} auth.Approval
//  */
// var getApproval = function (proposalHash, signature) {
//     var approval = {
//         'ProposalHash' : getHashFromHex(proposalHash),
//         'Signature' : signature
//     };
//
//     return auth.Approval.create(approval);
// };

// /**
//  * get Side Chain Info
//  *
//  * @alias module:AElf/pbUtils
//  * @param {string} locked_token_amount
//  * @param {string} indexing_price
//  * @param {string} indexing_price
//  * @param {string} code
//  * @param {string} proposer hex string
//  * @return {protobuf} crosschain.SideChainInfo
//  */
// var getSideChainInfo = function (locked_token_amount, indexing_price, pairs, code, proposer) {
//     var sideChainInfo ={
//         'IndexingPrice': indexing_price,
//         'LockedTokenAmount': locked_token_amount,
//         'ResourceBalances': pairs,
//         'ContractCode': code,
//         'Proposer': getAddressFromRep(proposer),
//         'SideChainStatus': crosschain.SideChainStatus.Apply
//     };
//     return crosschain.SideChainInfo.create(sideChainInfo);
// };

// /**
//  * get balance
//  *
//  * @alias module:AElf/pbUtils
//  * @param {object} resource_balance
//  * @return {protobuf} crosschain.ResourceTypeBalancePair
//  */
// var getBalance = function (resource_balance) {
//     var pair = {
//         'Type' : resource_balance.Type,
//         'Amount' : resource_balance.Amount
//     };
//     return crosschain.ResourceTypeBalancePair.create(pair);
// };

// /**
//  * encode Proposal
//  *
//  * @alias module:AElf/pbUtils
//  * @param {object} proposal
//  * @param {number} fieldNumber
//  * @return {Buffer} buffer
//  */
// var encodeProposal = function (proposal, fieldNumber) {
//     var value = auth.Proposal.encode(proposal).finish();
//     var w = new protobuf.BufferWriter();
//     // Tag
//     w.uint32(fieldNumber << 3 | 2);
//     // Data
//     w.bytes(value);
//     return w.finish();
// };

// /**
//  * encode Side Chain Info
//  *
//  * @alias module:AElf/pbUtils
//  * @param {object} sideChainInfo
//  * @param {number} fieldNumber
//  * @return {Buffer} buffer
//  */
// var encodeSideChainInfo = function (sideChainInfo, fieldNumber) {
//     var value = crosschain.SideChainInfo.encode(sideChainInfo).finish();
//     var w = new protobuf.BufferWriter();
//     // Tag
//     w.uint32(fieldNumber << 3 | 2);
//     // Data
//     w.bytes(value);
//     return w.finish();
// };

// /**
//  * encode Approval
//  *
//  * @alias module:AElf/pbUtils
//  * @param {object} approval
//  * @param {number} fieldNumber
//  * @return {Buffer} buffer
//  */
// var encodeApproval = function (approval, fieldNumber) {
//     var value = auth.Approval.encode(approval).finish();
//     var w = new protobuf.BufferWriter();
//     // Tag
//     w.uint32(fieldNumber << 3 | 2);
//     // Data
//     w.bytes(value);
//     return w.finish();
// };

module.exports = {
    getRepForAddress: getRepForAddress,
    getAddressFromRep: getAddressFromRep,
    getAddressObjectFromRep: getAddressObjectFromRep,
    getRepForHash: getRepForHash,
    getHashFromHex: getHashFromHex,
    getHashObjectFromHex: getHashObjectFromHex,
    getTransaction: getTransaction,
    Transaction: aelfRoot.Transaction,
    Hash: aelfRoot.Hash,
    Address: aelfRoot.Address
};
