import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Token is ERC20, Ownable, AccessControl {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  constructor(string memory _name, string memory _symbol, uint _decimals) ERC20(_name, _symbol) {
    _grantRole(MINTER_ROLE, owner());
    _mint(owner(), 1 * 10 ** _decimals);
  }

  function addMinterRole(address _to) public onlyOwner {
    _grantRole(MINTER_ROLE, _to);
  }

  function mint(address _to, uint256 _amount) public onlyRole(MINTER_ROLE) {
    _mint(_to, _amount);
  }
}
