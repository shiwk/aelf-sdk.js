/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file formatters.js
 * @author Marek Kotewicz <marek@ethdev.com>
 * @date 2015
 */

var protobuf = require('@aelfqueen/protobufjs');
var proto = require('../proto.js');

/**
 * Formats input bool to bytes
 *
 * @method formatInputBool
 * @param {Boolean}
 * @returns {Buffer}
 */
var formatInputBool = function (value, fieldNumber) {
    var w = new protobuf.BufferWriter();
    // Tag
    w.uint32(fieldNumber << 3);
    // Data
    w.bool(value);
    return w.finish();
};

/**
 * Formats input int to bytes
 *
 * @method formatInputInt
 * @param {number} value that needs to be formatted
 * @returns {Buffer}
 */
var formatInputInt = function (value, fieldNumber) {
    var w = new protobuf.BufferWriter();
    // Tag
    w.uint32(fieldNumber << 3);
    // Data
    w.sint32(value);
    return w.finish();
};

/**
 * Formats input uint32 to bytes
 *
 * @method formatInputUInt
 * @param {number}
 * @returns {BigNumeber}
 */
var formatInputUInt = function (value, fieldNumber) {
    var w = new protobuf.BufferWriter();
    // Tag
    w.uint32(fieldNumber << 3);
    // Data
    w.uint32(value);
    return w.finish();
};

/**
 * Formats input int64 to bytes
 *
 * @method formatInputLong
 * @param {Long|number} value
 * @returns {Buffer}
 */
var formatInputLong = function (value, fieldNumber) {
    var w = new protobuf.BufferWriter();
    // Tag
    w.uint32(fieldNumber << 3);
    // Data
    w.int64(value);
    return w.finish();
};

/**
 * Formats input uint64 to bytes
 *
 * @method formatInputULong
 * @param {Long|number} value
 * @returns {Buffer}
 */
var formatInputULong = function (value, fieldNumber) {
    var w = new protobuf.BufferWriter();
    // Tag
    w.uint32(fieldNumber << 3);
    // Data
    w.uint64(value);
    return w.finish();
};

/**
 * Formats input value to byte representation of string
 *
 * @method formatInputString
 * @param {String}
 * @returns {Buffer}
 */
var formatInputString = function (value, fieldNumber) {
    var bytes = Buffer.from(value, "utf8")
    var w = new protobuf.BufferWriter();
    // Tag
    w.uint32(fieldNumber << 3 | 2);
    // Data
    w.bytes(bytes);
    return w.finish();
};

/**
 * Formats input bytes to bytes
 *
 * @method formatInputBytes
 * @param {String} hex
 * @returns {Buffer}
 */
var formatInputBytes = function (hex, fieldNumber) {
    var bytes = Buffer.from(hex, "hex");
    var w = new protobuf.BufferWriter();
    // Tag
    w.uint32(fieldNumber << 3 | 2);
    // Data
    w.bytes(bytes);
    return w.finish();
};

/**
 * Formats input hash to bytes
 *
 * @method formatInputHash
 * @param {String} hex
 * @returns {Buffer}
 */
var formatInputHash = function (hex, fieldNumber) {
    var hash = proto.getHashFromHex(hex);
    var value = proto.Hash.encode(hash).finish();
    var w = new protobuf.BufferWriter();
    // Tag
    w.uint32(fieldNumber << 3 | 2);
    // Data
    w.bytes(value);
    return w.finish();
};


// /**
//  * Formats input authorization info to bytes
//  * @param auth
//  * @param fieldNumber
//  * @returns {Buffer}
//  */
// var formatInputAuthorization =function (auth, fieldNumber) {
//
//     var reviewers = new Array(auth.Reviewers.length);
//     for(var i = 0; i < auth.Reviewers.length; i++)
//     {
//         reviewers[i] = proto.getReviewer(auth.Reviewers[i]);
//     }
//     var a = proto.getAuthorization(auth.ExecutionThreshold, auth.ProposerThreshold, reviewers);
//     var value = proto.Authorization.encode(a).finish();
//     var w = new protobuf.BufferWriter();
//     // Tag
//     w.uint32(fieldNumber << 3 | 2);
//     // Data
//     w.bytes(value);
//     return w.finish();
// };
//

// /**
//  * Formats input proposal info to bytes
//  * @param proposal
//  * @param fieldNumber
//  * @returns {Buffer}
//  */
// var formatInputProposal = function (proposal, fieldNumber) {
//     var types = proposal.TxnData.MethodAbi.Params.map(function (i) {
//         return i.Type;
//     });
//     var coder = require('./coder');
//     var args = Array.prototype.slice.call(proposal.TxnData.Params).filter(function (a) {return a !== undefined; });
//     var raw_txn = proto.getMsigTransaction(proposal.TxnData.From, proposal.TxnData.To, proposal.TxnData.MethodName, coder.encodeParams(types, args));
//     var p = proto.getProposal(proposal.MultiSigAccount, proposal.Name, raw_txn, proposal.ExpiredTime, proposal.Proposer);
//     return proto.encodeProposal(p, fieldNumber);
// };
//
// var formatInputApproval = function(approval, fieldNumber){
//     var raw_approval = proto.getApproval(approval.ProposalHash, approval.Signature);
//     return proto.encodeApproval(raw_approval, fieldNumber);
// };


// var formatInputSideChainInfo = function (sideChainInfo, fieldNumber) {
//     var pairs = new Array(sideChainInfo.ResourceBalances.length);
//     for(var i = 0; i < sideChainInfo.ResourceBalances.length; i++)
//     {
//         pairs[i] = proto.getBalance(sideChainInfo.ResourceBalances[i]);
//     }
//     var code = Buffer.from(sideChainInfo.ContractCode.replace('0x', ''), 'hex');
//     var raw_sideChainInfo = proto.getSideChainInfo(sideChainInfo.LockedTokenAmount, sideChainInfo.IndexingPrice, pairs, code, sideChainInfo.Proposer);
//     return proto.encodeSideChainInfo(raw_sideChainInfo, fieldNumber);
// };

// var formatInputMerklePath = function (merklepath, fieldNumber){
//     var w = new protobuf.BufferWriter();
//     // Tag
//     w.uint32(fieldNumber << 3 | 2);
//     // Data
//     w.bytes(Buffer.from(merklepath.replace('0x', ''), 'hex'));
//     return w.finish();
// };


/**
 * Formats input Address to bytes
 *
 * @method formatInputAddress
 * @param {String} rep
 * @returns {Buffer}
 */
var formatInputAddress = function (rep, fieldNumber) {
    var address = proto.getAddressFromRep(rep);
    var value = proto.Address.encode(address).finish();
    var w = new protobuf.BufferWriter();
    // Tag
    w.uint32(fieldNumber << 3 | 2);
    // Data
    w.bytes(value);
    return w.finish();
};

/**
 * Formats output bytes to bool
 *
 * @method formatOutputBool
 * @param {Buffer} bytes
 * @returns {Boolean}
 */
var formatOutputBool = function (bytes) {
    var r = new protobuf.BufferReader(bytes);
    // Tag
    r.uint32();
    return r.bool();
};

/**
 * Formats output bytes to int
 *
 * @method formatOutputInt
 * @param {Buffer} bytes
 * @returns {number}
 */
var formatOutputInt = function (bytes) {
    var r = new protobuf.BufferReader(bytes);
    // Tag
    r.uint32();
    return r.sint32();
};

/**
 * Formats output bytes to uint
 *
 * @method formatOutputUInt
 * @param {Buffer} bytes
 * @returns {number}
 */
var formatOutputUInt = function (bytes) {
    var r = new protobuf.BufferReader(bytes);
    // Tag
    r.uint32();
    return r.uint32();
};

/**
 * Formats output bytes to int64
 *
 * @method formatOutputLong
 * @param {Buffer} bytes
 * @returns {Long}
 */
var formatOutputLong = function (bytes) {
    var r = new protobuf.BufferReader(bytes);
    // Tag
    r.uint32();
    return r.sint64();
};

/**
 * Formats output bytes to uint64
 *
 * @method formatOutputULong
 * @param {Buffer} bytes
 * @returns {Long}
 */
var formatOutputULong = function (bytes) {
    var r = new protobuf.BufferReader(bytes);
    // Tag
    r.uint32();
    return r.uint64();
};



/**
 * Formats output bytes to bytes
 *
 * @method formatOutputBytes
 * @param {Buffer} bytes
 * @returns {Buffer}
 */
var formatOutputBytes = function (bytes) {
    var r = new protobuf.BufferReader(bytes);
    // Tag
    r.uint32();
    return r.bytes();
};

/**
 * Formats output Address to bytes
 *
 * @method formatOutputAddress
 * @param {Buffer} bytes
 * @returns {Address}
 */
var formatOutputAddress = function (bytes) {
    var r = new protobuf.BufferReader(bytes);
    // Tag
    r.uint32();
    return proto.Address.decode(r.bytes());
};

/**
 * Formats output Hash to bytes
 *
 * @method formatOutputHash
 * @param {Buffer} bytes
 * @returns {Hash}
 */
var formatOutputHash = function (bytes) {
    var r = new protobuf.BufferReader(bytes);
    // Tag
    r.uint32();
    return proto.Hash.decode(r.bytes());
};


/**
 * Formats output bytes to authorization
 * @param bytes
 */
var formatOutputAuthorization = function (bytes) {
    var r = new protobuf.BufferReader(bytes);
    // Tag
    r.uint32();
    return proto.Authorization.decode(r.bytes());
};

/**
 * Formats output bytes to authorization
 * @param bytes
 */
var formatOutputProposal = function (bytes) {
    var r = new protobuf.BufferReader(bytes);
    // Tag
    r.uint32();
    return proto.Proposal.decode(r.bytes());
};


/**
 * Formats output bytes to string
 *
 * @method formatOutputString
 * @param {Buffer} bytes
 * @returns {String}
 */
var formatOutputString = function (bytes) {
    var r = new protobuf.BufferReader(bytes);
    // Tag
    r.uint32();
    return r.string();
};

module.exports = {
    formatInputBool: formatInputBool,
    formatInputInt: formatInputInt,
    formatInputUInt: formatInputUInt,
    formatInputLong: formatInputLong,
    formatInputULong: formatInputULong,
    formatInputBytes: formatInputBytes,
    formatInputString: formatInputString,
    formatInputAddress: formatInputAddress,
    formatInputHash: formatInputHash,
    formatOutputBool: formatOutputBool,
    formatOutputInt: formatOutputInt,
    formatOutputUInt: formatOutputUInt,
    formatOutputLong: formatOutputLong,
    formatOutputULong: formatOutputULong,
    formatOutputBytes: formatOutputBytes,
    formatOutputString: formatOutputString,
    formatOutputAddress: formatOutputAddress,
    formatOutputHash: formatOutputHash,
    // formatInputAuthorization: formatInputAuthorization,
    // formatOutputAuthorization: formatOutputAuthorization,
    // formatInputProposal: formatInputProposal,
    // formatOutputProposal: formatOutputProposal,
    // formatInputApproval: formatInputApproval,
    // formatInputSideChainInfo: formatInputSideChainInfo,
    // formatInputMerklePath : formatInputMerklePath
};
