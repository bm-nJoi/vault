let state = {
  web3: {
    isInjected: false, // remove soon
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    error: null
  },
  contractInstance: null,
  vaultContractInstance: null,
  vaultContractBalance: null,
  vaultUserBalance: null,
  vaultEvents: []
}
export default state
