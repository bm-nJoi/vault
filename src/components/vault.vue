<template>
  <div class="vault container">
    <h1>Vault</h1>
    <h3>Vault Contract Address: {{ address }} </h3>
    <h3>Vault Contract Balance: {{ balance }} </h3>
    <h2>User's Vault Balance: {{ userBalance }} </h2>
    <h4>Would you like to withdraw from your vault?</h4>
    Amount to withdraw: <input type="number" min="0.00" step="0.01" v-model="amount" placeholder="0 Ether">
    <ul>
      <li v-on:click="clickWithdraw">Withdraw</li>
    </ul>
    <img v-if="pending" id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">
    <div class="event" v-if="withdrawEvent">
        <p>Here's your withdrawal of {{ withdrawEvent._amount }}!</p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {vaultAddress} from '../util/constants/vaultContract'

export default {
  name: 'vault',
  data () {
    return {
      amount: null,
      pending: false,
      withdrawEvent: null,
      address: vaultAddress
    }
  },
  computed: mapState({
    balance: state => state.vaultContractBalance,
    userBalance: state => state.vaultUserBalance
  }),
  methods: {
    clickWithdraw (event) {
      console.log('Withdrawing:' + this.amount)
      this.withdrawEvent = null
      this.pending = true
      this.$store.state.vaultContractInstance().withdraw(this.$store.state.web3.web3Instance().toWei(this.amount, 'ether'), {
        gas: 300000,
        from: this.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          this.pending = false
        } else {
          console.log(result)
          this.pending = false
        }
      })
    }
  },
  mounted () {
    console.log('dispatching getVaultContractInstance')
    this.$store.dispatch('getVaultContractInstance')
  }
}
</script>

<style scoped>
.vault {
     margin-top: 50px;
     text-align:center;
}
#loader {
  width:150px;
}
ul {
    margin: 25px;
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap:25px;
    grid-row-gap:25px;
}
li{
    padding: 20px;
    margin-right: 5px;
    border-radius: 50%;
    cursor: pointer;
    background-color:#fff;
    border: -2px solid #bf0d9b;
    color: #bf0d9b;
    box-shadow:3px 5px #bf0d9b;
}
li:hover{
    background-color:#bf0d9b;
    color:white;
    box-shadow:0px 0px #bf0d9b;
}
li:active{
    opacity: 0.7;
}
*{
   color: #444444;
}
</style>
