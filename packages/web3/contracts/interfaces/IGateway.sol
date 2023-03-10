// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

// pragma experimental ABIEncoderV2;

interface IGateway {
    function deposit(
        address _baseAsset,
        address _lpAsset,
        address _rewardAsset,
        address _pool,
        address _farm,
        uint256 _baseAmount,
        string[] calldata _metadata
    ) external payable;

    function snapshotReward(
        address _baseAsset,
        address _lpAsset,
        address _rewardAsset,
        address _pool,
        address _farm,
        string[] calldata _metadata
    ) external payable;

    function getCurrentRewardBalance(address _rewardAsset) external view returns (uint256);

    function getDiffRewardAmount(address _rewardAsset) external view returns (uint256);

    function claimReward(address _rewardAsset, uint256 _claimRewardAmount) external payable;

    function getFarmingLpAmount(
        address _lpAsset,
        address _farm,
        string[] calldata _metadata
    ) external view returns (uint256);

    function withdrawLpFromFarm(
        address _baseAsset,
        address _lpAsset,
        address _rewardAsset,
        address _pool,
        address _farm,
        string[] calldata _metadata
    ) external payable;

    function getPoolingLpAmount(
        address _lpAsset,
        address _pool,
        string[] calldata _metadata
    ) external view returns (uint256);

    function withdrawBase(
        address _baseAsset,
        address _lpAsset,
        address _rewardAsset,
        address _pool,
        address _farm,
        uint256 _baseAmount,
        address _recipient,
        string[] calldata _metadata
    ) external payable;
}
