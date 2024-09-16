//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract Transactions{
    uint256 transactionCount = 0;
    
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct [] transactions;

    function addToBlockchain(address _receiver, uint _amount, string memory _message, string memory _keyword) public {
        transactions.push(TransferStruct(msg.sender, _receiver, _amount, _message, block.timestamp, _keyword));
        transactionCount++;
        emit Transfer(msg.sender, _receiver, _amount, _message, block.timestamp, _keyword);
    }

    function getALLTransactions() public view returns(TransferStruct [] memory){
        return transactions;
    }

    function getTransactionCount() public view returns(uint256){
        return transactionCount;
    }
}