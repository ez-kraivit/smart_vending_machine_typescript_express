<template>
  <v-dialog v-model="StateProcessRefundDialog" persistent width="400">
    <v-card class="pa-5 text-center" elevation="0" >
      <v-progress-circular
        :size="50"
        color="primary"
        class="mb-2"
        indeterminate
      ></v-progress-circular>
      <h4>ระบบกำลังคืนเงินของท่าน</h4>
      <h5 class="mb-8">โปรดรอสักครู่ ระบบได้ทำการคืนเงินของท่าน</h5>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({

  data() {
    return {}
  },
  computed: {
    ...mapState('shop',['StateProcessRefundDialog']),
  },
})
</script>
