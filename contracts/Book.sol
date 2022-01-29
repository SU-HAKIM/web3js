//SPDX-License-Identifier:GPL-3.0

pragma solidity 0.8.11;

contract Book{
   uint  age=100;


    function set_age(uint _age) external {
        age=_age;
    }
   function get_age() external view returns(uint){
       return age;
   }
   function get_eth() public payable{
       
   }
}