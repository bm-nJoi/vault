<template>
  <div>
    <user-wallet />
    <vault />
    <event-monitor />
  </div>
</template>
<script>
import UserWallet from '@/components/user-wallet'
import Vault from '@/components/vault'
import EventMonitor from '@/components/event-monitor'

export default {
  name: 'vault-dapp',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from vault-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'user-wallet': UserWallet,
    'vault': Vault,
    'event-monitor': EventMonitor
  }
}
</script>
<style scoped>

</style>
