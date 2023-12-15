pragma solidity ^0.8.0;

contract PayContract {
    struct Preferences{
        uint256 chainID;
        address TokenAddress;
    }
    mapping(string => address payable) public mailToWallet;
    mapping(string => uint) public pendingPayments;
    mapping(string => string) public AadhaarToEmail;
    mapping(string => string) public EmailToAadhaar;
    mapping(address => Preferences) public WalletToPreferences;
    mapping(address => address payable) public Redirection;

    function KYC(string memory Aadhaar, string memory email) public {
        AadhaarToEmail[Aadhaar] = email;
        EmailToAadhaar[email] = Aadhaar;
        mailToWallet[email] = payable(msg.sender);
    }

    function SetPreferences(uint256 chainID, address TokenID) public{
        WalletToPreferences[msg.sender] = Preferences(chainID,TokenID);
    }

    function SetRedirection(address recipient) public{
        Redirection[msg.sender] = payable(recipient);
    }

    function Pay(string memory email) public payable {
        require(msg.value > 0, "Not enough Ether provided.");
        address payable tempAddress;
        if(Redirection[mailToWallet[email]]==address(0)){
            tempAddress = payable(msg.sender);
            if(mailToWallet[email] == address(0)){
                pendingPayments[email] += msg.value;
            } else {
                mailToWallet[email].transfer(msg.value);
            }
        }
        else{
            tempAddress = payable(Redirection[mailToWallet[email]]);
            tempAddress.transfer(msg.value);
        }
    }
}
