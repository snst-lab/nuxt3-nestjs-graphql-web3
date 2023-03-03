//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

interface IBallot {
  function getTotalCredit() external view returns (uint);

  function getCreditByProjectId(uint _projectId) external view returns (uint);

  function getSupporterListByProjectId(uint _projectId) external view returns (address[] memory, uint[] memory);

  function getSupporterNumber(uint _projectId, address _supporter) external view returns (uint supporterNumber);

  function vote(uint _projectId, uint _amountIn) external;

  function unvote(uint _projectId, uint _amountOut) external;

  function getPendingAirdropList(uint _projectId) external view returns (address[] memory, uint[] memory);
}
