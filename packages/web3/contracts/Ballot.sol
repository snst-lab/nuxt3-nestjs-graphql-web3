//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ballot is Ownable {
  /** ===============================================
  *  @dev Variables
  =================================================*/
  struct Voter {
    address walletAddress;
    uint votedAmount;
  }

  mapping(uint => uint) public projectIdVotedAmount;
  // Array of voters
  mapping(uint => uint) public projectIdVoterListLength;
  mapping(uint => mapping(uint => Voter)) public projectIdVoterList;
  // Array of pending airdrop
  address[] public pendingReconcileVoterArray;
  mapping(address => uint) public pendingReconcileList;

  address public ballotTokenAddress;
  IERC20 private ballotToken;

  /** ===============================================
  *  @dev Events
  =================================================*/
  event Log(string _string, uint _uint);
  event Vote(address _sender, uint _projectId, uint _amount);
  event Unvote(address _sender, uint _projectId, uint _amount);

  /** ===============================================
  *  @dev Constructor
  =================================================*/
  constructor() {}

  /** ===============================================
  *  @dev Methods
  =================================================*/
  /** ---------------------------------------------
  *  @dev UI action by admin
  ------------------------------------------------*/
  function setBallotToken(address _address) public onlyOwner {
    ballotTokenAddress = _address;
    ballotToken = IERC20(_address);
  }

  /** ---------------------------------------------
  *  @dev UI action by anyone / Batch by admin / Internal
  ------------------------------------------------*/
  function getTotalVotedAmount() public view returns (uint) {
    return ballotToken.totalSupply();
  }

  /** ---------------------------------------------
  *  @dev UI action by anyone / Batch by admin / Internal
  ------------------------------------------------*/
  function getVotedAmountByProjectId(uint _projectId) public view returns (uint) {
    return projectIdVotedAmount[_projectId];
  }

  /** ---------------------------------------------
  *  @dev UI action by anyone / Batch by admin / Internal
  ------------------------------------------------*/
  function getVoterListByProjectId(uint _projectId) public view returns (address[] memory, uint[] memory) {
    uint length = projectIdVoterListLength[_projectId];

    address[] memory walletAddress = new address[](length);
    uint[] memory votedAmount = new uint[](length);

    for (uint i = projectIdVoterListLength[_projectId]; i > 0; i--) {
      walletAddress[i - 1] = projectIdVoterList[_projectId][i].walletAddress;
      votedAmount[i - 1] = projectIdVoterList[_projectId][i].votedAmount;
    }

    return (walletAddress, votedAmount);
  }

  /** ---------------------------------------------
  *  @dev UI action by anyone / Batch by admin / Internal
  ------------------------------------------------*/
  function getVoterNumber(uint _projectId, address _voter) public view returns (uint voterNumber) {
    voterNumber = type(uint256).max;
    for (uint i = projectIdVoterListLength[_projectId]; i > 0; i--) {
      if (projectIdVoterList[_projectId][i].walletAddress == _voter) {
        voterNumber = i;
      }
    }
  }

  /** ---------------------------------------------
  *  @dev Internal
  ------------------------------------------------*/
  function upsertVoterListByVote(uint _projectId, address _voter, uint _diffVotedAmount) internal {
    uint voterNumber = getVoterNumber(_projectId, _voter);
    if (voterNumber == type(uint256).max) {
      projectIdVoterListLength[_projectId] += 1;
      require(
        projectIdVoterListLength[_projectId] < type(uint256).max,
        "Count of voter for a project must be less than 2**256 - 1"
      );
      uint newVoterNumber = projectIdVoterListLength[_projectId];
      projectIdVoterList[_projectId][newVoterNumber].walletAddress = _voter;
      projectIdVoterList[_projectId][newVoterNumber].votedAmount = _diffVotedAmount;
    } else {
      projectIdVoterList[_projectId][voterNumber].votedAmount += _diffVotedAmount;
    }
  }

  /** ---------------------------------------------
  *  @dev Internal
  ------------------------------------------------*/
  function updateVoterListByUnvote(uint _projectId, address _voter, uint _diffVotedAmount) internal {
    uint voterNumber = getVoterNumber(_projectId, _voter);
    require(voterNumber < type(uint256).max, "Given address is not found in voters list of the project");
    require(
      projectIdVoterList[_projectId][voterNumber].votedAmount >= _diffVotedAmount,
      "Unvote amount must be less than current voted amount by voter"
    );
    projectIdVoterList[_projectId][voterNumber].votedAmount -= _diffVotedAmount;
  }

  /** ---------------------------------------------
  *  @dev UI action by voter
  ------------------------------------------------*/
  function vote(uint _projectId, uint _amount) public {
    require(ballotToken.balanceOf(msg.sender) >= _amount, "Insufficient balance of ballot token");

    ballotToken.approve(owner(), _amount);
    ballotToken.transferFrom(msg.sender, owner(), _amount);
    projectIdVotedAmount[_projectId] += _amount;

    upsertVoterListByVote(_projectId, msg.sender, _amount);

    emit Vote(msg.sender, _projectId, _amount);
  }

  /** ---------------------------------------------
  *  @dev UI action by voter
  ------------------------------------------------*/
  function unvote(uint _projectId, uint _amount) public {
    require(ballotToken.balanceOf(owner()) >= _amount, "Insufficient balance of owner");
    require(projectIdVotedAmount[_projectId] >= _amount, "Unvote amount must be less than current voted amount");

    uint length = pendingReconcileVoterArray.length;
    bool isExist;
    if (length > 0) {
      for (uint i = length; i > 0; i--) {
        if (msg.sender == pendingReconcileVoterArray[i - 1]) {
          isExist = true;
        }
      }
    }
    if (pendingReconcileList[msg.sender] == 0 && !isExist) {
      pendingReconcileVoterArray.push(msg.sender);
    }

    pendingReconcileList[msg.sender] += _amount;
    projectIdVotedAmount[_projectId] -= _amount;

    updateVoterListByUnvote(_projectId, msg.sender, _amount);
    emit Unvote(msg.sender, _projectId, _amount);
  }

  /** ---------------------------------------------
  *  @dev UI action by anyone
  ------------------------------------------------*/
  function getPendingReconcileList() public view returns (address[] memory, uint[] memory) {
    uint length = pendingReconcileVoterArray.length;

    address[] memory walletAddress = new address[](length);
    uint[] memory pendingAmount = new uint[](length);

    if (length > 0) {
      for (uint i = length; i > 0; i--) {
        address voter = pendingReconcileVoterArray[i - 1];
        walletAddress[i - 1] = voter;
        pendingAmount[i - 1] = pendingReconcileList[voter];
      }
    }

    return (walletAddress, pendingAmount);
  }

  /** ---------------------------------------------
  *  @dev UI action by anyone
  ------------------------------------------------*/
  function getPendingReconcileByVoterAddress(address _voter) public view returns (uint) {
    uint length = pendingReconcileVoterArray.length;
    uint pendingAmount;

    if (length > 0) {
      for (uint i = length; i > 0; i--) {
        address voter = pendingReconcileVoterArray[i - 1];
        if (voter == _voter) {
          pendingAmount = pendingReconcileList[voter];
        }
      }
    }
    return pendingAmount;
  }

  /** ---------------------------------------------
  *  @dev UI / Batch action by admin
  ------------------------------------------------*/
  function reconcile(address _voter, uint _amount) public onlyOwner {
    require(ballotToken.balanceOf(owner()) >= _amount, "Insufficient balance of owner");
    require(pendingReconcileList[_voter] >= _amount, "Reconcile amount must be less than pending amount");

    pendingReconcileList[_voter] -= _amount;

    if (pendingReconcileList[_voter] == 0) {
      uint length = pendingReconcileVoterArray.length;
      if (length > 0) {
        for (uint i = length; i > 0; i--) {
          if (pendingReconcileVoterArray[i - 1] == _voter) {
            pendingReconcileVoterArray[i - 1] = pendingReconcileVoterArray[length - 1];
            pendingReconcileVoterArray.pop();
          }
        }
      }
    }
    ballotToken.transferFrom(msg.sender, _voter, _amount);
  }
}
