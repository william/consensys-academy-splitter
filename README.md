# ConsenSys Academy: Splitter

## Overview

The contract Splitter.sol allows any number of users to register their name and address. When a registered user sends ether to the contract, it is split evenly amongst the other registered participants.

Only the contract and truffle test suite exist. The web interface has not been implemented.


### Requirements

* Implemented
    * There are 3 people: Alice, Bob and Carol
    * **Whenever Alice sends ether to the contract, half of it goes to Bob and the other half to Carol**
        * "Goes to" implies a transfer to the users address. This introduces a
          risk that a malicious user registers with a contract address that
          depletes the transaction's available gas before other transfers can
          occur. It is assumed the users know each other and are not trying to
          subvert the contract. A contract used by untrusted parties should use
          the withdrawal pattern.

          It is also (poorly) assumed that the user sends evenly divisible
          amounts to the contract!

* Partially Implemented
    * **We can see the balance of the Splitter contract on the web page**
        * The getBalance function can retrieve the contract's balance. However,
          based on the implementation, the balance should always be zero. The
          web view is not implemented.
    * **We can see the balances of Alice, Bob and Carol on the web page**
        * The web view is not implemented, but the users of the contract could
          be retrieved through getUser and getAccount. The balances of their
          individual accounts can be queried directly.

* Not Implemented
    * **We can send ether to it from the web page**
    * Orphaned contract balance cannot be retrieved


### Stretch goals

* Implemented
    * **Make the contract a utility that can be used by David, Emma and anybody with an address**
        * The contract accepts an arbitrary number of users.

* Not Implemented
    * **Add a kill switch to the whole contract**
    * **Cover potentially bad input data**
