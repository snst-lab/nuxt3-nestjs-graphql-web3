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
  function vote(uint _projectId, uint _amountIn) public {
    require(ballotToken.balanceOf(msg.sender) >= _amountIn, "Insufficient balance of ballot token");

    ballotToken.transferFrom(msg.sender, owner(), _amountIn);
    projectIdCredit[_projectId] = projectIdCredit[_projectId] + _amountIn;
    upsertSupporterListByVote(_projectId, msg.sender, _amountIn);
  }

  /** ---------------------------------------------
  *  @dev UI action by supporter
  ------------------------------------------------*/
  function unvote(uint _projectId, uint _amountOut) public {
    require(ballotToken.balanceOf(owner()) >= _amountOut, "Insufficient balance of owner");
    require(projectIdCredit[_projectId] >= _amountOut, "Unvote amount must be less than current credit amount");

    ballotToken.transferFrom(owner(), msg.sender, _amountOut);
    projectIdCredit[_projectId] = projectIdCredit[_projectId] - _amountOut;
    updateSupporterListByUnvote(_projectId, msg.sender, _amountOut);
  }
}
