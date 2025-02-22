// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

 import "hardhat/console.sol";  

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);
    event Deposit(address indexed from, uint amount, uint when);
    event Transfer(address indexed to, uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");

        emit Deposit(msg.sender, msg.value, block.timestamp);
    }

    function transferEthTo(address payable _to, uint _amount) public {
        require(msg.sender == owner, "Only the owner can transfer funds");
        require(_amount > 0, "Transfer amount must be greater than zero");
        require(address(this).balance >= _amount, "Insufficient balance in contract");

        emit Transfer(_to, _amount, block.timestamp);

        _to.transfer(_amount);
    }
}