//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {IPool} from "./interfaces/IPool.sol";
import {IShareToken} from "./interfaces/IShareToken.sol";
import {cast} from "./libraries/cast.sol";
import {validate} from "./libraries/validate.sol";
import "./includes/Project.sol";
import "./includes/Bill.sol";
import "./includes/Holder.sol";

/** ===============================================
 *  @dev MeetingRoom itself also restricted by policy
 =================================================*/
abstract contract Policy {
  modifier withAgreement() {
    require(msg.sender == address(this), "Policies can execute with agreement of meeting room");
    _;
  }
}

/** ===============================================
 *  @dev Bylaws of MeetingRoom
 =================================================*/
abstract contract ByLaws is Policy {
  // --------------------------
  // instants
  // --------------------------
  Projects public projects = new Projects();
  Bills public bills = new Bills();
  Holders public holders = new Holders();

  // --------------------------
  // adress
  // --------------------------
  address public fundPool;
  address public devidendPool;
  address public shareToken;
  address public founder;

  // --------------------------
  // constants
  // --------------------------
  uint256 public maxShare = 1000000;
  uint256 public quorum = 5000000;

  // --------------------------
  // policies
  // --------------------------
  function setFundPool(string[] calldata args) public withAgreement {
    address _contract = cast.stringToAddress(args[0]);
    require(validate.isContract(_contract), "Must be a contract address");
    fundPool = _contract;
  }

  function setDevidendPool(string[] calldata args) public withAgreement {
    address _contract = cast.stringToAddress(args[0]);
    require(validate.isContract(_contract), "Must be a contract address");
    devidendPool = _contract;
  }

  function setShareToken(string[] calldata args) public withAgreement {
    address _contract = cast.stringToAddress(args[0]);
    require(validate.isContract(_contract), "Must be a contract address");
    shareToken = _contract;
  }

  function setMaxShare(string[] calldata args) public withAgreement {
    uint256 _amount = cast.stringToUint(args[0]);
    require(0 < _amount && _amount <= IShareToken(shareToken).totalSupply(), "Amount is out of range");
    maxShare = _amount;
  }

  function setQuorum(string[] calldata args) public withAgreement {
    uint256 _amount = cast.stringToUint(args[0]);
    require(0 < _amount && _amount <= IShareToken(shareToken).totalSupply(), "Amount is out of range");
    quorum = _amount;
  }
}

/** ===============================================
 *  @dev MeetingRoom is core contract
 =================================================*/
contract MeetingRoom is ByLaws {
  // --------------------------
  // parameters
  // --------------------------
  address[] public devidendAssets; // list of assets using for devidend;
  uint256[] public devided; // devided amount of each assets

  // --------------------------
  // functions
  // --------------------------
  constructor() {
    founder = msg.sender;
  }

  /**
   *
   * @dev Propose new project. Only holders can call this method.
   * @param _contract - contract address of a project include policies
   * @param _founder - the founder of a project which will receive investment
   * @param _requestAsset - ERC20 assets required by the founder of a project
   * @param _requestAmount - amount of ERC20 assets required by the founder of a project
   * @param _devidendAssets - lists of ERC20 assets for profit which the project can provide to devidend pool
   * @param _deadline - holders can sign to the bill approving new project until deadline in UNIX timestamp
   */
  function proposeProject(
    address _contract,
    address _founder,
    address[] calldata _requestAsset,
    uint256[] calldata _requestAmount,
    address[] calldata _devidendAssets,
    uint256 _deadline
  ) public {
    require(_requestAsset.length == _requestAmount.length, "Length of request asset and amount ares not match");

    //  Check right for propose
    require(this.shareBalanceOf(msg.sender) > 0, "Only share token holder can propose a project");

    string[] memory emptyArgs;
    bills.submit(msg.sender, _contract, "", emptyArgs, _deadline);
    projects.add(_contract, _founder, _requestAsset, _requestAmount, _devidendAssets);
  }

  /**
   *
   * @dev Submit new bill. Only holders can call this method.
   * @param _project - contract address of a project include policies
   * @param _policy - function name of the policies in a project
   * @param _arguments - arguments which will be passed to the policies
   * @param _deadline - holders can sign to the submitted bill until deadline in UNIX timestamp
   */
  function submitBill(
    address _project,
    string calldata _policy,
    string[] calldata _arguments,
    uint256 _deadline
  ) public {
    //  Check right for submit
    require(this.shareBalanceOf(msg.sender) > 0, "Only share token holder can submit bill");
    //  Check approved project or not
    require(projects.fetchByAddress(_project).approved, "Project have not approved yet");

    bills.submit(msg.sender, _project, _policy, _arguments, _deadline);
  }

  /**
   *
   * @dev Sign to a submitted bill. Only holders can call this method.
   * @param _billNumber - bill number
   */
  function signBill(uint256 _billNumber) public {
    //  Check expire of bill
    Bill memory bill = bills.fetch(_billNumber);
    require(block.timestamp < bill.deadline, "Deadline of the bill was over");
    uint256 holding = this.shareBalanceOf(msg.sender);
    //  Check right for sign
    require(holding > 0, "Only share token holder can sign bill");

    bills.sign(msg.sender, _billNumber, holding);

    if (bill.signed > quorum) {
      bills.approve(_billNumber);
    }
  }

  /**
   *
   * @dev Execute a approved bill. Everyone can call this method.
   * @param _billNumber - bill number to be
   */
  function executeBill(uint256 _billNumber) public {
    // Check approved bill or not
    Bill memory bill = bills.fetch(_billNumber);
    require(bill.approved == true, "Require agreement of over 50% of shareholders");

    Project memory project = projects.fetchByAddress(bill.project);

    if (project.approved == true) {
      // in case: the projct is already exist
      // string memory methodsName = string(abi.encodePacked(bill.policy, "(string[])"));
      // project.contract_.call(abi.encodeWithSignature(methodsName, bill.arguments));
      //
      //
    } else {
      // in case : new project
      projects.approve(bill.project);
      //  Add assets to list for devidend
      for (uint256 i = 0; i < project.devidendAssets.length; i++) {
        bool found = false;
        for (uint256 j = 0; j < devidendAssets.length; j++) {
          if (project.devidendAssets[i] == devidendAssets[j]) {
            found = true;
          }
        }
        if (found == false) {
          devidendAssets.push(project.devidendAssets[i]);
        }
      }
      // invest for the new project
      for (uint256 i = 0; i < project.requestAsset.length; i++) {
        IPool(fundPool).withdraw(project.founder, project.requestAsset[i], project.requestAmount[i]);
      }
    }
  }

  /**
   *
   * @dev Snapshot for devidend. Everyone can call this method.
   */
  function snapshotForDevidend() public {
    for (uint256 i = 0; i < devidendAssets.length; i++) {
      uint256 devidable = IPool(devidendPool).getBalance(devidendAssets[i]) - devided[i];
      for (uint256 j = 1; j <= holders.getLength(); j++) {
        Holder memory holder = holders.fetch(j);
        uint256 divide = (this.shareBalanceOf(holder.addr) / IShareToken(shareToken).totalSupply()) * devidable;
        holders.devide(i, divide);
      }
      devided[i] += devidable;
    }
  }

  /**
   *
   * @dev After snapshot, holders can claim devidends in specified asset and amount. Only holders can call this method.
   * @param _requestAsset - ERC20 assets required by holder
   * @param _requestAmount - amount of ERC20 assets required by holder
   */
  function claimDevidend(address[] calldata _requestAsset, uint256[] calldata _requestAmount) public {
    require(_requestAsset.length == _requestAmount.length, "Length of request asset and amount is not match");
    uint256 claimTotal = 0;
    for (uint256 i = 0; i < _requestAsset.length; i++) {
      claimTotal += _requestAmount[i];
      holders.claim(msg.sender, _requestAmount[i]);
      IPool(devidendPool).withdraw(msg.sender, _requestAsset[i], _requestAmount[i]);
    }
    Holder memory holder = holders.fetchByAddress(msg.sender);
    require(claimTotal <= holder.devided - holder.claimed, "Insuffient claimable amount remains");
  }

  /**
   *
   * @dev Recalculate sign amount etc. due to transfer of share.
   * @param _from - sender
   * @param _amount - lost amount of sener
   */
  function transferShare(address _from, uint256 _amount) public {
    require(msg.sender == shareToken, "Only share token can call this method");
    bills.cancelSign(_from, _amount);

    if (this.shareBalanceOf(_from) == 0) {
      holders.remove(_from);
    }
  }

  // --------------------------
  // getters
  // --------------------------
  /**
   *  @dev Balance getter considering max share and transfer of rights from founder
   */
  function shareBalanceOf(address account) public view returns (uint256) {
    if (account == founder) {
      uint256 totalSupply = IShareToken(shareToken).totalSupply();
      uint256 provided = IShareToken(shareToken).getProvided();
      require(provided <= totalSupply, "Provided amount must be less than total supply");
      return totalSupply - provided;
    }
    uint256 rawBalance = IShareToken(shareToken).balanceOf(account);
    if (rawBalance > maxShare) {
      return maxShare;
    } else {
      return rawBalance;
    }
  }

  function getFundPool() public view returns (address) {
    return fundPool;
  }

  function getDevidendPool() public view returns (address) {
    return devidendPool;
  }

  function getShareToken() public view returns (address) {
    return shareToken;
  }

  function getMaxShare() public view returns (uint256) {
    return maxShare;
  }

  function getQuorum() public view returns (uint256) {
    return quorum;
  }
}
