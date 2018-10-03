<template>
  <div class="userwallet container">
    <h1>Your Wallet</h1>
    <h3>Ethereum Address: {{ coinbase }} </h3>
    <h3>Ethereum Balance: {{ balance }} </h3>
    <h4>Would you like to deposit into your vault?</h4>
    Amount to deposit: <input type="number" min="0.00" step="0.01" v-model="amount" placeholder="0 Ether">
    <ul>
      <li v-on:click="clickDeposit">Deposit</li>
    </ul>
    <img v-if="pending" id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">
    <div class="event" v-if="depositEvent">
        <p>Thanks for the deposit of {{ depositEvent._amount }}!</p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'userwallet',
  data () {
    return {
      amount: null,
      pending: false,
      depositEvent: null
    }
  },
  computed: mapState({
    coinbase: state => state.web3.coinbase,
    balance: state => {
      if (state.web3.web3Instance !== null) return state.web3.web3Instance().fromWei(state.web3.balance, 'ether')
    }
  }),
  methods: {
    clickDeposit (event) {
      console.log('Depositing:' + this.amount)
      this.depositEvent = null
      this.pending = true
      this.$store.state.vaultContractInstance().deposit({
        gas: 300000,
        value: this.$store.state.web3.web3Instance().toWei(this.amount, 'ether'),
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
  }
}
</script>

<style scoped>
.userwallet {
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
