//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.17;

interface IMeetingRoom {
  function setFundPool(string[] calldata args) external;

  function setDevidendPool(string[] calldata args) external;

  function setShareToken(string[] calldata args) external;

  function setMaxShare(string[] calldata args) external;

  function setQuorum(string[] calldata args) external;

  function proposeProject(
    address _contract,
    address _founder,
    address[] calldata _requestAsset,
    uint256[] calldata _requestAmount,
    address[] calldata _devidendAssets,
    uint256 _deadline
  ) external;

  function submitBill(
    address _project,
    string calldata _policy,
    string[] calldata _arguments,
    uint256 _deadline
  ) external;

  function signBill(uint256 _billNumber) external;

  function executeBill(uint256 _billNumber) external;

  function snapshotForDevidend() external;

  function claimDevidend(address[] calldata _requestAsset, uint256[] calldata _requestAmount) external;

  function transferShare(address _from, uint256 _amount) external;

  function shareBalanceOf(address account) external view returns (uint256);

  function getFundPool() external view returns (address);

  function getDevidendPool() external view returns (address);

  function getShareToken() external view returns (address);

  function getMaxShare() external view returns (uint256);

  function getQuorum() external view returns (uint256);
}
