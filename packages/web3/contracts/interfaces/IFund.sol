pragma solidity 0.8.19;

interface IFund {
  function deposit(address[] calldata _pathA, address[] calldata _pathB, uint _amount) external;

  function depositByEth(address[] calldata _pathA, address[] calldata _pathB, uint _amountEth) external payable;

  function estimateIncome(uint _projectId) external view returns (uint);
}
