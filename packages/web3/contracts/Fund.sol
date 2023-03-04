//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IPancakeRouter.sol";
import "./interfaces/IBallot.sol";

contract Fund is Ownable {
  /** ===============================================
  *  @dev Variables
  =================================================*/
  address public routerAddress;
  address public baseTokenAddress;
  address public ballotAddress;

  IPancakeRouter02 private router;
  IERC20 private baseToken;
  IBallot private ballot;

  /** ===============================================
  *  @dev Events
  =================================================*/
  event Log(string _string, uint _uint);

  /** ===============================================
  *  @dev Constructor
  =================================================*/
  constructor(address _routerAddress, address _baseTokenAddress) {
    routerAddress = _routerAddress;
    router = IPancakeRouter02(_routerAddress);
    baseTokenAddress = _baseTokenAddress;
    baseToken = IERC20(_baseTokenAddress);
  }

  /** ===============================================
  *  @dev Methods
  =================================================*/
  /** ---------------------------------------------
  *  @dev User action by admin
  ------------------------------------------------*/
  function setRouter(address _address) public onlyOwner {
    routerAddress = _address;
    router = IPancakeRouter02(_address);
  }

  /** ---------------------------------------------
  *  @dev User action by admin
  ------------------------------------------------*/
  function setBaseToken(address _address) public onlyOwner {
    baseTokenAddress = _address;
    baseToken = IERC20(_address);
  }

  /** ---------------------------------------------
  *  @dev User action by admin
  ------------------------------------------------*/
  function setBallot(address _address) public onlyOwner {
    ballotAddress = _address;
    ballot = IBallot(_address);
  }

  /** ---------------------------------------------
  *  @dev User action by supporter
  ------------------------------------------------*/
  function deposit(address[] calldata _pathA, address[] calldata _pathB, uint _amount) public {
    require(routerAddress != address(0), "Router must be configured");

    uint swapAmount = _amount / 2;

    if (_pathA[0] != _pathB[0]) {
      IERC20(_pathA[0]).transferFrom(msg.sender, address(this), swapAmount);
      IERC20(_pathB[0]).transferFrom(msg.sender, address(this), swapAmount);
    } else {
      IERC20(_pathA[0]).transferFrom(msg.sender, address(this), _amount);
    }

    IERC20(_pathA[0]).approve(routerAddress, swapAmount);
    IERC20(_pathB[0]).approve(routerAddress, swapAmount);

    if (_pathA[0] != _pathA[1]) {
      router.swapExactTokensForTokens(swapAmount, 1, _pathA, address(this), block.timestamp + 1 hours);
    }
    if (_pathB[0] != _pathB[1]) {
      router.swapExactTokensForTokens(swapAmount, 1, _pathB, address(this), block.timestamp + 1 hours);
    }

    uint balanceA = IERC20(_pathA[1]).balanceOf(address(this));
    uint balanceB = IERC20(_pathB[1]).balanceOf(address(this));

    IERC20(_pathA[1]).approve(routerAddress, balanceA);
    IERC20(_pathB[1]).approve(routerAddress, balanceB);

    router.addLiquidity(_pathA[1], _pathB[1], balanceA, balanceB, 1, 1, owner(), block.timestamp + 1 hours);
  }

  /** ---------------------------------------------
  *  @dev User action by supporter
  ------------------------------------------------*/
  function depositByEth(address[] calldata _pathA, address[] calldata _pathB, uint _amountEth) public payable {
    require(routerAddress != address(0), "Router must be configured");

    router.swapExactETHForTokens{value: _amountEth}(1, _pathA, address(this), block.timestamp + 1 hours);
    router.swapExactETHForTokens{value: _amountEth}(1, _pathB, address(this), block.timestamp + 1 hours);

    uint balanceA = IERC20(_pathA[1]).balanceOf(address(this));
    uint balanceB = IERC20(_pathB[1]).balanceOf(address(this));

    IERC20(_pathA[1]).approve(routerAddress, balanceA);
    IERC20(_pathB[1]).approve(routerAddress, balanceB);

    router.addLiquidity(_pathA[1], _pathB[1], balanceA, balanceB, 1, 1, owner(), block.timestamp + 1 hours);
  }

  /** ---------------------------------------------
  *  @dev User action by anyone
  ------------------------------------------------*/
  function estimateIncome(uint _projectId) public view returns (uint) {
    uint totalCredit = ballot.getTotalCredit();
    uint projectCredit = ballot.getCreditByProjectId(_projectId);
    uint tokenBalance = baseToken.balanceOf(address(this));

    require(totalCredit > 0, "Total credit must be greater than zero");

    return (tokenBalance * projectCredit) / totalCredit;
  }

  /** ---------------------------------------------
  *  @dev Batch by admin
  ------------------------------------------------*/
  function claim(uint _projectId) public onlyOwner {
    uint totalCredit = ballot.getTotalCredit();
    uint projectCredit = ballot.getCreditByProjectId(_projectId);
    uint tokenBalance = baseToken.balanceOf(address(this));

    require(projectCredit > 0, "Insufficient project credit");
    require(totalCredit > 0, "Total credit must be greater than zero");

    uint claimableToken = (tokenBalance * projectCredit) / totalCredit;

    require(claimableToken > 0, "Claimable token amount is zero");
    require(claimableToken <= tokenBalance, "Insufficient balance of base token in contract");

    baseToken.transfer(msg.sender, claimableToken);
  }
}
