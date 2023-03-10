//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

interface IBallot {
  function getTotalVotedAmount() external view returns (uint);

  function getVotedAmountByProjectId(uint _projectId) external view returns (uint);

  function getVoterListByProjectId(uint _projectId) external view returns (address[] memory, uint[] memory);

  function getVoterNumber(uint _projectId, address _voter) external view returns (uint voterNumber);

  function vote(uint _projectId, uint _amount) external;

  function unvote(uint _projectId, uint _amount) external;

  function getPendingReconcileList() external view returns (address[] memory, uint[] memory);

  function getPendingReconcileByVoterAddress(address _voter) external view returns (uint);
}
