//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IMeetingRoom} from "./interfaces/IMeetingRoom.sol";
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

contract ShareToken is IERC20, Policy {
  // -------------------------------------
  // parameters
  // -------------------------------------
  mapping(address => uint256) public _balances;
  mapping(address => mapping(address => uint256)) private _allowances;

  // -------------------------------------
  // constants
  // -------------------------------------
  string private _name;
  string private _symbol;
  uint256 private _totalSupply;

  // -------------------------------------
  // parameters
  // -------------------------------------
  uint256 private provided = 0;

  /**
   * @dev Sets the values for {name} and {symbol}.
   *
   * The defaut value of {decimals} is 18. To select a different value for
   * {decimals} you should overload it.
   *
   * All three of these values are immutable: they can only be set once during
   * construction.
   */
  constructor(
    string memory name_,
    string memory symbol_,
    //======================================
    address meetingRoom_ //====================
  ) {
    _name = name_;
    _symbol = symbol_;
    //======================================
    _totalSupply = 10000000;
    meetingRoom = meetingRoom_;
    //======================================
  }

  /**
   * @dev Returns the name of the token.
   */
  function name() external view returns (string memory) {
    return _name;
  }

  /**
   * @dev Returns the symbol of the token, usually a shorter version of the
   * name.
   */
  function symbol() external view returns (string memory) {
    return _symbol;
  }

  /**
   * @dev Returns the number of decimals used to get its user representation.
   * For example, if `decimals` equals `2`, a balance of `505` tokens should
   * be displayed to a user as `5,05` (`505 / 10 ** 2`).
   *
   * Tokens usually opt for a value of 18, imitating the relationship between
   * Ether and Wei. This is the value {ERC20} uses, unless this function is
   * overloaded;
   *
   * NOTE: This information is only used for _display_ purposes: it in
   * no way affects any of the arithmetic of the contract, including
   * {IERC20-balanceOf} and {IERC20-transfer}.
   */
  function decimals() external pure returns (uint8) {
    return 18;
  }

  /**
   * @dev See {IERC20-totalSupply}.
   */
  function totalSupply() external view override returns (uint256) {
    return _totalSupply;
  }

  /**
   * @dev See {IERC20-balanceOf}.
   */
  function balanceOf(address account) external view override returns (uint256) {
    return _balances[account];
  }

  /**
   * @dev See {IERC20-transfer}.
   *
   * Requirements:
   *
   * - `recipient` cannot be the zero address.
   * - the caller must have a balance of at least `amount`.
   */
  function transfer(address recipient, uint256 amount) public override withAgreement returns (bool) {
    _transfer(msg.sender, recipient, amount);
    return true;
  }

  /**
   * @dev See {IERC20-allowance}.
   */
  function allowance(address owner, address spender) external view override returns (uint256) {
    return _allowances[owner][spender];
  }

  /**
   * @dev See {IERC20-approve}.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   */
  function approve(address spender, uint256 amount) public override withAgreement returns (bool) {
    _approve(msg.sender, spender, amount);
    return true;
  }

  /**
   * @dev See {IERC20-transferFrom}.
   *
   * Emits an {Approval} event indicating the updated allowance. This is not
   * required by the EIP. See the note at the beginning of {ERC20}.
   *
   * Requirements:
   *
   * - `sender` and `recipient` cannot be the zero address.
   * - `sender` must have a balance of at least `amount`.
   * - the caller must have allowance for ``sender``'s tokens of at least
   * `amount`.
   */
  function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) public override withAgreement returns (bool) {
    _transfer(sender, recipient, amount);

    uint256 currentAllowance = _allowances[sender][msg.sender];
    require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
    _approve(sender, msg.sender, currentAllowance - amount);

    return true;
  }

  /**
   * @dev Moves tokens `amount` from `sender` to `recipient`.
   *
   * This is internal function is equivalent to {transfer}, and can be used to
   * e.g. implement automatic token fees, slashing mechanisms, etc.
   *
   * Emits a {Transfer} event.
   *
   * Requirements:
   *
   * - `sender` cannot be the zero address.
   * - `recipient` cannot be the zero address.
   * - `sender` must have a balance of at least `amount`.
   */
  function _transfer(address sender, address recipient, uint256 amount) internal {
    require(sender != address(0), "ERC20: transfer from the zero address");
    require(recipient != address(0), "ERC20: transfer to the zero address");

    _beforeTokenTransfer(sender, recipient, amount);

    //============================================================================
    if (sender != meetingRoom) {
      //============================================================================
      uint256 senderBalance = _balances[sender];
      require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
      _balances[sender] = senderBalance - amount;
      //============================================================================
    } else {
      provided += amount;
    }
    //============================================================================
    _balances[recipient] += amount;

    emit Transfer(sender, recipient, amount);
  }

  /**
   * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
   *
   * This internal function is equivalent to `approve`, and can be used to
   * e.g. set automatic allowances for certain subsystems, etc.
   *
   * Emits an {Approval} event.
   *
   * Requirements:
   *
   * - `owner` cannot be the zero address.
   * - `spender` cannot be the zero address.
   */
  function _approve(address owner, address spender, uint256 amount) internal {
    require(owner != address(0), "ERC20: approve from the zero address");
    require(spender != address(0), "ERC20: approve to the zero address");

    _allowances[owner][spender] = amount;
    emit Approval(owner, spender, amount);
  }

  /**
   * @dev Hook that is called before any transfer of tokens. This includes
   * minting and burning.
   *
   * Calling conditions:
   *
   * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
   * will be to transferred to `to`.
   * - when `from` is zero, `amount` tokens will be minted for `to`.
   * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
   * - `from` and `to` are never both zero.
   *
   * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
   */
  function _beforeTokenTransfer(address from, address to, uint256 amount) internal {
    //======================================
    require(validate.isContract(to) == false, "Recipient must be EOA address.");
    require(_balances[to] + amount <= _totalSupply, "Recipient's balance will exceeds the total supply.");
    IMeetingRoom(meetingRoom).transferShare(from, amount);
    //======================================
  }

  //======================================
  //--------------------------------------
  // getters
  //--------------------------------------
  function getMeetingRoom() external view returns (address) {
    return meetingRoom;
  }

  function getProvided() external view returns (uint256) {
    return provided;
  }
  //======================================
}
