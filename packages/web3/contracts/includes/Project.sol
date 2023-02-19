//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.17;

struct Project {
  address contract_;
  address founder;
  address[] requestAsset;
  uint256[] requestAmount;
  address[] devidendAssets;
  bool approved;
}

contract Projects {
  // ---------------------
  //  parameters
  // ---------------------
  uint256 public length;
  mapping(uint256 => Project) public array;
  mapping(address => uint256) public indexFrom_address;

  // --------------------------
  // functions
  // --------------------------
  function add(
    address _contract,
    address _founder,
    address[] calldata _requestAsset,
    uint256[] calldata _requestAmount,
    address[] calldata _devidendAssets
  ) public {
    bool exist;
    for (uint256 i = 1; i <= length; i++) {
      if (array[i].contract_ == _contract) {
        exist = true;
      }
    }
    require(!exist, "The project which has same contract address already exists");
    length += 1;
    array[length].contract_ = _contract;
    array[length].founder = _founder;
    array[length].requestAsset = _requestAsset;
    array[length].requestAmount = _requestAmount;
    array[length].devidendAssets = _devidendAssets;
    array[length].approved = false;
    indexFrom_address[_contract] = length;
  }

  function approve(address _contract) public {
    uint256 index = indexFrom_address[_contract];
    require(0 < index && index <= length, "Index is out of range");
    array[index].approved = true;
  }

  // --------------------------
  // getters
  // --------------------------
  function fetch(uint256 _index) public view returns (Project memory) {
    require(0 < _index && _index <= length, "Index is out of range");
    return array[_index];
  }

  function fetchByAddress(address _contract) public view returns (Project memory) {
    uint256 index = indexFrom_address[_contract];
    require(0 < index && index <= length, "Index is out of range");
    return array[index];
  }

  function fetchRange(uint256 _indexFrom, uint256 _indexTo) public view returns (Project[] memory array_) {
    require(0 < _indexFrom && _indexFrom <= _indexTo && _indexTo <= length, "Index is out of range");
    for (uint256 i = _indexFrom; i <= _indexTo; i++) {
      array_[i] = array[i];
    }
  }

  function getLength() public view returns (uint256) {
    return length;
  }
}
