//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "hardhat/console.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {cast} from "./libraries/cast.sol";
import {validate} from "./libraries/validate.sol";

abstract contract Policy {
  modifier withAgreement() {
    require(msg.sender == meetingRoom, "Policies can execute with agreement of meeting room");
    _;
  }
  address public meetingRoom;

  function setMeetingRoom(string[] calldata args) public withAgreement {
    address _contract = cast.stringToAddress(args[0]);
    require(validate.isContract(_contract), "Must be a contract address");
    meetingRoom = _contract;
  }
}

contract DevidendPool is Policy {
  constructor(address _meetingRoom) {
    meetingRoom = _meetingRoom;
  }

  //-----------------------
  // events
  //-----------------------
  event Withdraw(address _sender, address _recipient, address _asset, uint256 _amount);

  //-----------------------
  // functions
  //-----------------------
  function withdraw(address _claimer, address _asset, uint256 _amount) public withAgreement {
    this.callWithdraw(_claimer, _asset, _amount);
  }

  //-----------------------
  // callees
  //-----------------------
  function callWithdraw(address _claimer, address _asset, uint256 _amount) public {
    require(msg.sender == address(this), "Can execute only from the contract itself");
    SafeERC20.safeTransfer(IERC20(_asset), _claimer, _amount);
    emit Withdraw(msg.sender, _claimer, _asset, _amount);
  }

  //-----------------------
  // getters
  //-----------------------
  function getMeetingRoom() public view returns (address) {
    return meetingRoom;
  }

  function getBalance(address _asset) public view returns (uint256) {
    return IERC20(_asset).balanceOf(address(this));
  }
}
