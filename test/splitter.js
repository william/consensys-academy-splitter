var Splitter = artifacts.require("./Splitter.sol");

contract('Splitter', function(accounts) {

  var splitter;

  var alice = accounts[0];
  var bob = accounts[1];
  var carol = accounts[2];

  beforeEach(function() {
    return Splitter.new()
    .then(function(instance) {
      splitter = instance;
    });
  });

  it("should return the balalance of the contract", function() {
    return splitter.getBalance.call().then(function(balance) {
      assert.equal(balance.valueOf(), 0, "Contract should contain 0 ETH");
    });
  });

  it("should have no users to begin with", function() {
    return splitter.getNumParticipants.call()
    .then(function (numParticipants) {
      assert.equal(numParticipants.valueOf(), 0, "Not working");
    });
  });

  it("should allow a user to register", function() {
    return splitter.registerUser.call('Alice', {from: alice}).then(function(numParticipants) {
      assert.equal(numParticipants.toNumber(), 1);
    });
  });

  it("should allow more users to register", function() {
    return splitter.registerUser('Alice', {from: alice})
    .then(function(numParticipants) {
      return splitter.registerUser('Bob', {from: bob})
      .then(function(numParticipants) {
        return splitter.registerUser.call('Carol', {from: carol})
        //.call on the final one to get numParticipants
        .then(function(numParticipants) {
          assert.equal(numParticipants.toNumber(), 3);
        });
      });
    });
  });

  it("should get the user name", function() {
    return splitter.registerUser('Alice', {from: alice})
    .then(function(numParticipants) {
      return splitter.getUser.call(0)
      .then(function (userName) {
          assert.equal(userName.valueOf(),'Alice');
      });
    });
  });

  it("should get the user address", function() {
    return splitter.registerUser('Alice', {from: alice})
    .then(function(numParticipants) {
      return splitter.getAccount.call(0)
      .then(function (address) {
          assert.equal(address, alice);
      });
    });
  });

  it("should get the number of users", function() {
    return splitter.registerUser('Alice', {from: alice}).then(function(numParticipants) {
      splitter.getNumParticipants.call().then(function(numParticipants) {
        assert.equal(numParticipants.valueOf(), 1);
      });
    })
  });

  it("should allow alice to send money which gets split", function() {
    var sendAmount = web3.toBigNumber(web3.toWei(1, 'ether'));
    return splitter.registerUser('Alice', {from: alice})
    .then(function(result) {
      return splitter.registerUser('Bob', {from: bob})
      .then(function(result) {
        return splitter.registerUser('Carol', {from: carol})
        .then(function(result) {
          var tx = {from: alice, to: splitter.address, value: sendAmount};
          var gas = web3.toBigNumber(web3.eth.estimateGas(tx) - 1).times(web3.toBigNumber(web3.eth.gasPrice));
          var bobBalance = web3.eth.getBalance(bob);
          var carolBalance = web3.eth.getBalance(carol);
          return splitter.sendTransaction(tx)
          .then(function(result) {
            var bobNewBalance = web3.eth.getBalance(bob);
            var carolNewBalance = web3.eth.getBalance(carol);
            var splitterBalance = web3.eth.getBalance(splitter.address);
            assert.equal(bobNewBalance.toString(), bobBalance.plus(sendAmount.dividedBy(2)).toString());
            assert.equal(carolNewBalance.toString(), carolBalance.plus(sendAmount.dividedBy(2)).toString());
          });
        });
      });
    });
  });

});
