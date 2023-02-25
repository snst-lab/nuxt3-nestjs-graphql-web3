//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/IPancakeRouter.sol";

contract Fund is Ownable {
  /** ===============================================
  *  @dev Variables
  =================================================*/
  address public routerAddress;
  address public baseTokenAddress;

  struct Supporter {
    address walletAddress;
    uint creditAmount;
  }

  uint public totalCredit;
  mapping(string => uint) public projectIdCredit;
  // Array of supporters
  mapping(string => uint) public projectIdSupporterListLength;
  mapping(string => mapping(uint => Supporter)) public projectIdSupporterList;

  IPancakeRouter02 private router;
  IERC20 private baseToken;

  /** ===============================================
  *  @dev Logs
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
  function setRouter(address _router) public {
    routerAddress = _router;
    router = IPancakeRouter02(_router);
  }

  /** ---------------------------------------------
  *  @dev User action by admin
  ------------------------------------------------*/
  function setBaseToken(address _token) public onlyOwner {
    baseTokenAddress = _token;
    baseToken = IERC20(_token);
  }

  /** ---------------------------------------------
  *  @dev User action by anyone / Batch by admin
  ------------------------------------------------*/
  function getTotalCredit() public view returns (uint) {
    return totalCredit;
  }

  /** ---------------------------------------------
  *  @dev User action by anyone / Batch by admin
  ------------------------------------------------*/
  function getCreditByProjectId(string calldata _projectId) public view returns (uint) {
    return projectIdCredit[_projectId];
  }

  /** ---------------------------------------------
  *  @dev User action by anyone / Batch by admin
  ------------------------------------------------*/
  function getSupporterListByProjectId(
    string calldata _projectId
  ) public view returns (address[] memory, uint[] memory) {
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
  *  @dev Internal
  ------------------------------------------------*/
  function getSupporterNumber(
    string calldata _projectId,
    address _supporter
  ) internal view returns (uint supporterNumber) {
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
  function upsertSupporterListByDeposit(string calldata _projectId, address _supporter, uint _diffCredit) internal {
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
  function updateSupporterListByWithdraw(string calldata _projectId, address _supporter, uint _diffCredit) internal {
    uint supporterNumber = getSupporterNumber(_projectId, _supporter);
    require(supporterNumber < type(uint256).max, "Given address is not found in supporters list of the project");
    require(
      projectIdSupporterList[_projectId][supporterNumber].creditAmount >= _diffCredit,
      "Diff credit amount must be greater than current credit amount"
    );
    projectIdSupporterList[_projectId][supporterNumber].creditAmount -= _diffCredit;
  }

  /** ---------------------------------------------
  *  @dev User action by supporter
  ------------------------------------------------*/
  function deposit(
    string calldata _projectId,
    address[] calldata _pathA,
    address[] calldata _pathB,
    uint _amountIn
  ) public {
    require(routerAddress != address(0), "Router must be configured");

    uint swapAmount = _amountIn / 2;

    if (_pathA[0] != _pathB[0]) {
      IERC20(_pathA[0]).transferFrom(msg.sender, address(this), swapAmount);
      IERC20(_pathB[0]).transferFrom(msg.sender, address(this), swapAmount);
    } else {
      IERC20(_pathA[0]).transferFrom(msg.sender, address(this), _amountIn);
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

    uint diffCredit = _amountIn;
    totalCredit = totalCredit + diffCredit;
    projectIdCredit[_projectId] = projectIdCredit[_projectId] + diffCredit;
    upsertSupporterListByDeposit(_projectId, msg.sender, diffCredit);
  }

  /** ---------------------------------------------
  *  @dev User action by supporter
  ------------------------------------------------*/
  function depositByEth(
    string calldata _projectId,
    address[] calldata _pathA,
    address[] calldata _pathB,
    uint _amountEth
  ) public payable {
    require(routerAddress != address(0), "Router must be configured");

    router.swapExactETHForTokens{value: _amountEth}(1, _pathA, address(this), block.timestamp + 1 hours);
    router.swapExactETHForTokens{value: _amountEth}(1, _pathB, address(this), block.timestamp + 1 hours);

    uint balanceA = IERC20(_pathA[1]).balanceOf(address(this));
    uint balanceB = IERC20(_pathB[1]).balanceOf(address(this));

    IERC20(_pathA[1]).approve(routerAddress, balanceA);
    IERC20(_pathB[1]).approve(routerAddress, balanceB);

    router.addLiquidity(_pathA[1], _pathB[1], balanceA, balanceB, 1, 1, owner(), block.timestamp + 1 hours);

    uint diffCredit = balanceA + balanceB;
    totalCredit = totalCredit + diffCredit;
    projectIdCredit[_projectId] = projectIdCredit[_projectId] + diffCredit;
    upsertSupporterListByDeposit(_projectId, msg.sender, diffCredit);
  }

  /** ---------------------------------------------
  *  @dev User action by anyone
  ------------------------------------------------*/
  function estimateReward(string calldata _projectId) public view returns (uint) {
    uint tokenBalance = baseToken.balanceOf(address(this));
    return (tokenBalance * projectIdCredit[_projectId]) / totalCredit;
  }

  /** ---------------------------------------------
  *  @dev Batch by admin
  ------------------------------------------------*/
  function claim(string calldata _projectId) public onlyOwner {
    uint tokenBalance = baseToken.balanceOf(address(this));

    require(projectIdCredit[_projectId] > 0, "Insufficient project credit");

    uint claimedTokenBalance = (tokenBalance * projectIdCredit[_projectId]) / totalCredit;
    require(claimedTokenBalance <= tokenBalance, "Insufficient balance of reward");

    baseToken.transfer(msg.sender, claimedTokenBalance);
  }
}
