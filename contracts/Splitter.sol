pragma solidity ^0.4.4;

contract Splitter {
    string[] names;
    address[] accounts;

    function Splitter() {
        //Constructor - does nothing
    }

    function registerUser(string name) returns(uint numParticipants) {
        //Participants use this to register their addresses (msg.sender).
        names.push(name);
        accounts.push(msg.sender);
        return names.length;
    }

    function() payable {
        //Fallback function to support payment to the contract
        uint numSplits = accounts.length - 1;
        uint splitAmount = msg.value / numSplits;
        for (uint i = 0; i < accounts.length; i++) {
            if (accounts[i] != msg.sender) {
                accounts[i].transfer(splitAmount);
            }
        }
    }

    function getUser(uint _index) returns(string) {
        //Get the name of the user at _index
        return names[_index];
    }

    function getAccount(uint _index) returns(address) {
        //Get the account address of the user at _index
        return accounts[_index];
    }

    function getNumParticipants() returns(uint) {
        //Get the number of participants
        return names.length;
    }

    function getBalance() returns(uint) {
        //Get the balance of the contract
        //Per spec but not really useful based on interpretation
        return this.balance;
    }

}
