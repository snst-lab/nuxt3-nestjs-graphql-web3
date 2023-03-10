//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

struct Bill {
  address submitter;
  address project;
  string policy;
  string[] arguments;
  uint256 deadline;
  bool isNewProject;
  uint256 signed;
  bool approved;
}

contract Bills {
  // ---------------------
  //  parameters
  // ---------------------
  uint256 public length;
  mapping(uint256 => Bill) public array;
  mapping(address => mapping(uint256 => uint256)) public indexFrom_signer;
  mapping(address => uint256) public signCountFrom_signer;

  // --------------------------
  // functions
  // --------------------------
  function submit(
    address _submitter,
    address _project,
    string memory _policy,
    string[] memory _arguments,
    uint256 _deadline
  ) public {
    length += 1;
    array[length].submitter = _submitter;
    array[length].project = _project;
    array[length].policy = _policy;
    array[length].arguments = _arguments;
    array[length].deadline = _deadline;
    array[length].signed = 0;
    array[length].approved = false;
  }

  function cancelSubmit(address _canceller, uint256 _index) public {
    require(0 < _index && _index <= length, "Index is out of range");
    require(_canceller == array[_index].submitter, "Only submitter can cancel bill");
    for (uint256 i = _index; i <= length; i++) {
      array[i] = array[i + 1];
    }
    length -= 1;
  }

  function sign(address _signer, uint256 _index, uint256 _amount) public {
    array[_index].signed += _amount;
    signCountFrom_signer[_signer] += 1;
    indexFrom_signer[_signer][signCountFrom_signer[_signer]] = _index;
  }

  function cancelSign(address _signer, uint256 _amount) public {
    uint256 signCount = signCountFrom_signer[_signer];

    for (uint256 i = 1; i <= signCount; i++) {
      uint256 index = indexFrom_signer[_signer][i];
      if (!array[index].approved) {
        array[index].signed -= _amount;
      }
    }
  }

  function approve(uint256 _index) public {
    array[_index].approved = true;
  }

  // --------------------------
  // getters
  // --------------------------
  function fetch(uint256 _index) public view returns (Bill memory) {
    require(0 < _index && _index <= length, "Index is out of range");
    return array[_index];
  }

  function fetchRange(uint256 _indexFrom, uint256 _indexTo) public view returns (Bill[] memory array_) {
    require(0 < _indexFrom && _indexFrom <= _indexTo && _indexTo <= length, "Index is out of range");
    for (uint256 i = _indexFrom; i <= _indexTo; i++) {
      array_[i] = array[i];
    }
  }

  function getLength() public view returns (uint256) {
    return length;
  }
}
