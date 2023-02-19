//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/IPancakeRouter.sol";

contract AstarApp is Ownable {
  /** ===============================================
  *  @dev Variables
  =================================================*/
  address public routerAddress;
  address public baseTokenAddress;

  uint public totalCreditAmount;
  mapping(uint => uint) public projectIdCreditAmount;
  mapping(uint => address) public projectIdManagerAddress;

  IPancakeRouter02 private router;
  IERC20 private baseToken;

  /** ===============================================
  *  @dev Logs
  =================================================*/
  event Log(string _string, uint _uint);

  /** ===============================================
  *  @dev Constructor
  =================================================*/
  constructor() {}

  /** ===============================================
  *  @dev Methods
  =================================================*/

  function setRouter(address _router) external {
    routerAddress = _router;
    router = IPancakeRouter02(_router);
  }

  function setBaseToken(address _token) external onlyOwner {
    baseTokenAddress = _token;
    baseToken = IERC20(_token);
  }

  function setProjectManager(uint _projectId, address _manager) external onlyOwner {
    projectIdManagerAddress[_projectId] = _manager;
  }

  function getCreditsBalance(uint _projectId) external view returns (uint) {
    return projectIdCreditAmount[_projectId];
  }

  function invest(uint _projectId, address[] calldata _path, uint _amountIn) external {
    require(routerAddress != address(0), "Router must be configured");

    IERC20(_path[0]).transferFrom(msg.sender, address(this), _amountIn);

    uint swapAmount = _amountIn / 2;

    IERC20(_path[0]).approve(routerAddress, swapAmount);

    router.swapExactTokensForTokens(swapAmount, 1, _path, address(this), block.timestamp + 1 hours);
    (1, _path, address(this), block.timestamp + 1 hours);

    uint balanceA = IERC20(_path[0]).balanceOf(address(this));
    uint balanceB = IERC20(_path[1]).balanceOf(address(this));

    IERC20(_path[0]).approve(routerAddress, balanceA);
    IERC20(_path[1]).approve(routerAddress, balanceB);

    router.addLiquidity(_path[0], _path[1], balanceA, balanceB, 1, 1, owner(), block.timestamp + 1 hours);

    uint diffCreditAmount = _amountIn;
    totalCreditAmount = totalCreditAmount + diffCreditAmount;
    projectIdCreditAmount[_projectId] = projectIdCreditAmount[_projectId] + diffCreditAmount;

    emit Log("Total credit amount after deposit", totalCreditAmount);
    emit Log("Project credit amount after deposit", projectIdCreditAmount[_projectId]);
  }

  function investByEther(
    uint _projectId,
    address[] calldata _pathA,
    address[] calldata _pathB,
    uint _amountEth
  ) external payable {
    require(routerAddress != address(0), "Router must be configured");

    router.swapExactETHForTokens{value: _amountEth}(1, _pathA, address(this), block.timestamp + 1 hours);
    router.swapExactETHForTokens{value: _amountEth}(1, _pathB, address(this), block.timestamp + 1 hours);

    uint balanceA = IERC20(_pathA[1]).balanceOf(address(this));
    uint balanceB = IERC20(_pathB[1]).balanceOf(address(this));

    IERC20(_pathA[1]).approve(routerAddress, balanceA);
    IERC20(_pathB[1]).approve(routerAddress, balanceB);

    router.addLiquidity(_pathA[1], _pathB[1], balanceA, balanceB, 1, 1, owner(), block.timestamp + 1 hours);

    uint diffCreditAmount = uint(msg.value);
    totalCreditAmount = totalCreditAmount + diffCreditAmount;
    projectIdCreditAmount[_projectId] = projectIdCreditAmount[_projectId] + diffCreditAmount;

    emit Log("Total credit amount after deposit", totalCreditAmount);
    emit Log("Project credit amount after deposit", projectIdCreditAmount[_projectId]);
  }

  function claim(uint _projectId, uint _amount) external {
    require(msg.sender == projectIdManagerAddress[_projectId], "Only project Manager claim reward");
    uint tokenBalance = baseToken.balanceOf(address(this));

    emit Log("Reward token balance in contract", tokenBalance);
    emit Log("Total credit amount before claim", totalCreditAmount);
    emit Log("Project credit amount before claim", projectIdCreditAmount[_projectId]);

    require(_amount > 0, "Credit amount claimed must be greater than 0");
    require(_amount <= totalCreditAmount, "Insufficient total credit");
    require(_amount <= projectIdCreditAmount[_projectId], "Insufficient project credit");

    uint claimedTokenBalance = (tokenBalance * _amount) / totalCreditAmount;
    require(claimedTokenBalance <= tokenBalance, "Insufficient balance of reward");

    totalCreditAmount -= _amount;
    projectIdCreditAmount[_projectId] -= _amount;

    baseToken.transfer(msg.sender, claimedTokenBalance);
  }
}
