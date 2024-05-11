pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string description,
        uint value,
        address recipient
    ) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }
} // //SPDX-License-Identifier:MIT

// pragma solidity ^0.8.9;

// contract CampaignFactory {
//     // variables
//     address[] deployedContracts;

//     // functions
//     function createCampaign(uint minContributions) public {
//         Campaign contractAddress = new Campaign(minContributions,msg.sender);
//         deployedContracts.push(address(contractAddress));
//             }

//     function getDeployedCampaigns() public view  returns(address[] memory){
//         return deployedContracts;

//     }
// }

// contract Campaign {

//     struct Request{
//         address payable receiver;
//          uint approvalCount;
//         uint amount;
//         string description;
//         bool isApproved;
//         mapping (address => bool) approvals;

//     }
//     //variables
//     address public manager;
//     mapping(address => bool) public approvers;
//     Request [] public requests;
//     uint public minContributions;
//     uint public approversCount;

//     //functions

//     constructor (uint _minContribution, address creator) {
//         minContributions = _minContribution;
//         manager = creator;

//     }

//     modifier ismanager() {
//         require(msg.sender == manager, "The sender must be contract manager");
//         _;
//     }

//     modifier isApprover(address _approver) {
//         require(approvers[msg.sender], "The sender must be approver");
//         _;
//     }

//     function contribute() public payable  {
//         require( minContributions <= msg.value,"Minimum contribution is required");

//         if(approvers[msg.sender] == false){
//             approversCount ++;
//         }
//         approvers[msg.sender] = true;

//     }

//     function createRequest(address receiver, uint amount, string memory purpose) public ismanager {

//         Request storage newRequest = requests.push();
//         newRequest.description = purpose;
//     newRequest.amount = amount;
//     newRequest.receiver = payable(receiver);
//     newRequest.isApproved = false;
//     newRequest.approvalCount = 0;
//         newRequest.description = purpose;

//     }

//     function approveRequest(uint index) public isApprover(msg.sender) {
//         Request storage request = requests[index];
//         require(!request.approvals[msg.sender]);
//         request.approvals[msg.sender] = true;
//         request.approvalCount ++;

//     }

//     function finalizeRequest( uint index) public ismanager payable{

//          Request storage request = requests[index];
//          require(!request.isApproved);
//          require(request.approvalCount > uint(approversCount /2));
//          request.receiver.transfer(request.amount);
//         request.isApproved = true;
//     }
// }
