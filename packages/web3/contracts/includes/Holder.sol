//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

struct Holder {
  address addr;
  uint256 devided;
  uint256 claimed;
}

contract Holders {
  // ---------------------
  //  parameters
  // ---------------------
  uint256 length;
  mapping(uint256 => Holder) public array;
  mapping(address => uint256) public indexFrom_address;

  // --------------------------
  // functions
  // --------------------------
  function add(address _address) public {
    length += 1;
    array[length].addr = _address;
    indexFrom_address[_address] = length;
  }

  function remove(address _address) public {
    uint256 index = indexFrom_address[_address];
    require(0 < index && index <= length, "Index is out of range");
    for (uint256 i = index; i <= length; i++) {
      array[i] = array[i + 1];
    }
    length -= 1;
  }

  function devide(uint256 _index, uint256 _amount) public {
    require(0 < _index && _index <= length, "Index is out of range");
    array[_index].devided += _amount;
  }

  function claim(address _holder, uint256 _amount) public {
    uint256 index = indexFrom_address[_holder];
    require(0 < index && index <= length, "Index is out of range");
    array[index].claimed += _amount;
  }

  // --------------------------
  // getters
  // --------------------------
  function fetch(uint256 _index) public view returns (Holder memory) {
    require(0 < _index && _index <= length, "Index is out of range");
    return array[_index];
  }

  function fetchByAddress(address _holder) public view returns (Holder memory) {
    uint256 index = indexFrom_address[_holder];
    require(0 < index && index <= length, "Index is out of range");
    return array[index];
  }

  function fetchRange(uint256 _indexFrom, uint256 _indexTo) public view returns (Holder[] memory array_) {
    require(0 < _indexFrom && _indexFrom <= _indexTo && _indexTo <= length, "Index is out of range");
    for (uint256 i = _indexFrom; i <= _indexTo; i++) {
      array_[i] = array[i];
    }
  }

  function getLength() public view returns (uint256) {
    return length;
  }
}
