//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ballot is Ownable {
  /** ===============================================
  *  @dev Variables
  =================================================*/
  struct Supporter {
    address walletAddress;
    uint creditAmount;
  }

  mapping(uint => uint) public projectIdCredit;
  // Array of supporters
  mapping(uint => uint) public projectIdSupporterListLength;
  mapping(uint => mapping(uint => Supporter)) public projectIdSupporterList;
  // Array of pending airdrop
  address[] public pendingAirdropSupporterArray;
  mapping(address => uint) public pendingAirdropList;

  address public ballotTokenAddress;
  IERC20 private ballotToken;

  /** ===============================================
  *  @dev Events
  =================================================*/
  event Log(string _string, uint _uint);

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
  function getTotalCredit() public view returns (uint) {
    return ballotToken.totalSupply();
  }

  /** ---------------------------------------------
  *  @dev UI action by anyone / Batch by admin / Internal
  ------------------------------------------------*/
  function getCreditByProjectId(uint _projectId) public view returns (uint) {
    return projectIdCredit[_projectId];
  }

  /** ---------------------------------------------
  *  @dev UI action by anyone / Batch by admin / Internal
  ------------------------------------------------*/
  function getSupporterListByProjectId(uint _projectId) public view returns (address[] memory, uint[] memory) {
    uint length = projectIdSupporterListLength[_projectId];

    address[] memory walletAddress = new address[](length);
    uint[] memory creditAmount = new uint[](length);

    for (uint i = projectIdSupporterListLength[_projectId]; i > 0; i--) {
      walletAddress[i - 1] = projectIdSupporterList[_projectId][i].walletAddress;
      creditAmount[i - 1] = projectIdSupporterList[_projectId][i].creditAmount;
    }

    return (walletAddress, creditAmount);
  }

  /** ---------------------------------------------
  *  @dev UI action by anyone / Batch by admin / Internal
  ------------------------------------------------*/
  function getSupporterNumber(uint _projectId, address _supporter) public view returns (uint supporterNumber) {
    supporterNumber = type(uint256).max;
    for (uint i = projectIdSupporterListLength[_projectId]; i > 0; i--) {
      if (projectIdSupporterList[_projectId][i].walletAddress == _supporter) {
        supporterNumber = i;
      }
    }
  }

  /** ---------------------------------------------
  *  @dev Internal
  ------------------------------------------------*/
  function upsertSupporterListByVote(uint _projectId, address _supporter, uint _diffCredit) internal {
    uint supporterNumber = getSupporterNumber(_projectId, _supporter);
    if (supporterNumber == type(uint256).max) {
      projectIdSupporterListLength[_projectId] += 1;
      require(
        projectIdSupporterListLength[_projectId] < type(uint256).max,
        "Count of supporter for a project must be less than 2**256 - 1"
      );
      uint newSupporterNumber = projectIdSupporterListLength[_projectId];
      projectIdSupporterList[_projectId][newSupporterNumber].walletAddress = _supporter;
      projectIdSupporterList[_projectId][newSupporterNumber].creditAmount = _diffCredit;
    } else {
      projectIdSupporterList[_projectId][supporterNumber].creditAmount += _diffCredit;
    }
  }

  /** ---------------------------------------------
  *  @dev Internal
  ------------------------------------------------*/
  function updateSupporterListByUnvote(uint _projectId, address _supporter, uint _diffCredit) internal {
    uint supporterNumber = getSupporterNumber(_projectId, _supporter);
    require(supporterNumber < type(uint256).max, "Given address is not found in supporters list of the project");
    require(
      projectIdSupporterList[_projectId][supporterNumber].creditAmount >= _diffCredit,
      "Unvote amount must be less than current credit amount by supporter"
    );
    projectIdSupporterList[_projectId][supporterNumber].creditAmount -= _diffCredit;
  }

  /** ---------------------------------------------
  *  @dev UI action by supporter
  ------------------------------------------------*/
  function vote(uint _projectId, uint _amount) public {
    require(ballotToken.balanceOf(msg.sender) >= _amount, "Insufficient balance of ballot token");

    ballotToken.transferFrom(msg.sender, owner(), _amount);
    projectIdCredit[_projectId] += _amount;

    upsertSupporterListByVote(_projectId, msg.sender, _amount);
  }

  /** ---------------------------------------------
  *  @dev UI action by supporter
  ------------------------------------------------*/
  function unvote(uint _projectId, uint _amount) public {
    require(ballotToken.balanceOf(owner()) >= _amount, "Insufficient balance of owner");
    require(projectIdCredit[_projectId] >= _amount, "Unvote amount must be less than current credit amount");

    uint length = pendingAirdropSupporterArray.length;
    bool isExist;
    if (length > 0) {
      for (uint i = length; i > 0; i--) {
        if (msg.sender == pendingAirdropSupporterArray[i - 1]) {
          isExist = true;
        }
      }
    }
    if (pendingAirdropList[msg.sender] == 0 && !isExist) {
      pendingAirdropSupporterArray.push(msg.sender);
    }
    pendingAirdropList[msg.sender] += _amount;
    projectIdCredit[_projectId] -= _amount;

    updateSupporterListByUnvote(_projectId, msg.sender, _amount);
  }

  /** ---------------------------------------------
  *  @dev UI action by anyone
  ------------------------------------------------*/
  function getPendingAirdropList() public view returns (address[] memory, uint[] memory) {
    uint length = pendingAirdropSupporterArray.length;

    address[] memory walletAddress = new address[](length);
    uint[] memory pendingAmount = new uint[](length);

    if (length > 0) {
      for (uint i = length; i > 0; i--) {
        address supporter = pendingAirdropSupporterArray[i - 1];
        walletAddress[i - 1] = supporter;
        pendingAmount[i - 1] = pendingAirdropList[supporter];
      }
    }

    return (walletAddress, pendingAmount);
  }

  /** ---------------------------------------------
  *  @dev UI / Batch action by admin
  ------------------------------------------------*/
  function reconcileAirdrop(address _supporter, uint _amount) public onlyOwner {
    require(ballotToken.balanceOf(owner()) >= _amount, "Insufficient balance of owner");
    require(pendingAirdropList[_supporter] >= _amount, "Reconcile amount must be less than pending amount");

    pendingAirdropList[_supporter] -= _amount;
    if (pendingAirdropList[_supporter] == 0) {
      uint length = pendingAirdropSupporterArray.length;
      if (length > 0) {
        for (uint i = length; i > 0; i--) {
          if (pendingAirdropSupporterArray[i - 1] == _supporter) {
            pendingAirdropSupporterArray[i - 1] = pendingAirdropSupporterArray[length - 1];
            pendingAirdropSupporterArray.pop();
          }
        }
      }
    }
    ballotToken.transferFrom(msg.sender, _supporter, _amount);
  }
}
