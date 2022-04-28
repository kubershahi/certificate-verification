// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

contract Certificate {
  address owner;
  mapping(string => string) merkleRoot;
  event OwnerSet(address indexed oldOwner, address indexed newOwner);
  event log(string s);

  modifier isOwner() {
    require(msg.sender == owner, "Caller is not owner");
    _;
  }

  constructor() {
    owner = msg.sender;
    emit OwnerSet(address(0), owner);
  }

  function changeOwner(address newOwner) public isOwner {
    emit OwnerSet(owner, newOwner);
    owner = newOwner;
  }

  function getOwner() external view returns (address) {
    return owner;
  }

  function addRoot(string memory batch, string memory root) public returns (string memory){
    string memory s;
    if (bytes(merkleRoot[batch]).length == 0) {
        merkleRoot[batch] = root;
        s = "merkleRoot Added";
        emit log(s);
    } else {
        delete merkleRoot[batch];
        merkleRoot[batch] = root;
        s = "merkleRoot Added";
        emit log(s);
    }

    return s;
  }

  function getRoot(string memory batch) public view returns (string memory) {
      string memory root = merkleRoot[batch];
      return root;
  }
}
