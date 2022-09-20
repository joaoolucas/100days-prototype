// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Contract is ReentrancyGuard{

    address public owner;
    
    struct accountData {
        uint balance;
        uint releaseTime;
    }

    constructor () {
        owner = msg.sender;
    }

    mapping (address => accountData) accounts;

    event depositMade(uint value, address player);
    event withdrawMade(uint value, address player);

    // Deposit value is fixed in 0.1 

    function deposit() external payable returns (uint) {
        require(msg.value == 0.1 ether);
        accounts[msg.sender].balance += msg.value;
        accounts[msg.sender].releaseTime = block.timestamp + 100 days;
        emit depositMade(msg.value, msg.sender);
        return accounts[msg.sender].balance;

    }

    // Can only withdraw after 100 days

    function withdraw() external nonReentrant {
        require(accounts[msg.sender].releaseTime < block.timestamp, "The challenge isn't over!");
        require(accounts[msg.sender].balance > 0, "You don't have balance");
        accounts[msg.sender].releaseTime = 0;
        accounts[msg.sender].balance = 0;
        emit withdrawMade(accounts[msg.sender].balance, msg.sender);
        (bool success, ) = msg.sender.call{value: accounts[msg.sender].balance}("");
        require(success, "MATIC not sent");

        
    }

    function balance(address yourAddress) public view returns (uint) {
        return (accounts[yourAddress].balance);
    }

    function releaseTime(address yourAddress) public view returns (uint) {
	    return (accounts[yourAddress].releaseTime - block.timestamp)/86400;
    }
}
