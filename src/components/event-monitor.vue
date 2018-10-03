<template>
  <div class="eventmonitor">
    <ul>
    {{ eventList }}
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'eventmonitor',
  computed: mapState({
    lastEventBlock: state => state.vaultLastEventBlock,
    eventList: state => state.vaultEvents
  })
}
</script>

<style>
</style>
