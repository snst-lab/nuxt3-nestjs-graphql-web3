//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

interface IPool {
  function setMeetingRoom(string[] calldata args) external;

  function getMeetingRoom() external view returns (address);

  function getBalance(address _asset) external view returns (uint256);

  function withdraw(address _claimer, address _asset, uint256 _amount) external;
}
