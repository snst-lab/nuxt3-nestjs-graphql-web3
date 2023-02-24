//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IShareToken is IERC20 {
  // function name() external view returns (string memory);

  // function symbol() external view returns (string memory);

  // function decimals() external pure returns (uint8);

  // function totalSupply() external view override returns (uint256);

  // function balanceOf(address account) external view override returns (uint256);

  // function transfer(address recipient, uint256 amount) external override returns (bool);

  // function allowance(address owner, address spender) external view override returns (uint256);

  // function approve(address spender, uint256 amount) external override returns (bool);

  // function transferFrom(
  //     address sender,
  //     address recipient,
  //     uint256 amount
  // ) external override returns (bool);

  /**
   *  @dev Additional interfaces;
   */
  function setMeetingRoom(string[] calldata args) external;

  function getMeetingRoom() external view returns (address);

  function getProvided() external view returns (uint256);
}
