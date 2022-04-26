// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

contract certificate {
    address private owner;
    mapping(string => string) private merkleRoot;

    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    constructor() {
        // set the contract deployer as the owner
        owner = msg.sender;
        emit OwnerSet(address(0), owner); // log the change in the onership
    }

    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function addRoot(string memory batch, string memory root)
        public
        returns (string memory)
    {
        string memory s;
        if (bytes(merkleRoot[batch]).length == 0) {
            merkleRoot[batch] = root;
            s = "merkleRoot Added";
        } else {
            delete merkleRoot[batch];
            merkleRoot[batch] = root;
            s = "merkleRoot Added";
        }
        return s;
    }

    function verifyRoot(string memory batch, string memory root)
        public
        view
        returns (bool)
    {
        bool veriState;
        if (keccak256(bytes(merkleRoot[batch])) == keccak256(bytes(root))) {
            veriState = true;
        } else {
            veriState = false;
        }
        return veriState;
    }
}
