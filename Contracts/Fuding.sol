//SPDX-License-Identifier:MIT

pragma solidity ^0.8.9;

contract Funding {


    struct Request{
        address receiver;
        
        uint amount;
        string description;
        bool isApproved;
        mapping (address => bool) approvals;
        uint approvalCount;
       
    }
    //variables
    address public manager;
    address [] public approvers;
    Request [] public requests;
    uint public minContributions;
    


    //functions

    constructor (uint _minContribution) {
        minContributions = _minContribution;
        manager = msg.sender;

    }

    modifier ismanager() {
        require(msg.sender == manager, "The sender must be contract manager");
        _;
    }
    modifier isApprover(address _approver) {
        require(msg.sender == _approver, "The sender must be approver");
        _;
    }

    function contribute() public payable  {
        require( minContributions >= msg.value,"Minimum contribution is required");
        approvers.push(msg.sender);

    }


    function createRequest(address receiver, uint amount, string memory purpose) public ismanager {
        Request memory newRequest = Request(receiver, amount, purpose, false, );
        requests.push(newRequest);
    }

    function approveRequest() public isApprover(msg.sender) {
        Request memory newRequest ;

    }

    function finalizeRequest() public ismanager {

    }

    

    



}