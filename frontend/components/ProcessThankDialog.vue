<template>
  <v-dialog v-model="StateProcessTankDialog" persistent width="400">
    <v-card class="pa-5 text-center" elevation="0" >
      <v-progress-circular
        :size="50"
        color="primary"
        class="mb-2"
        indeterminate
      ></v-progress-circular>
      <h4>ขอขอบคุณที่ใช้บริการ</h4>
      <h5 class="mb-8">แวะมาอุดหนุนอีกนะครับ</h5>
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
    ...mapState('shop',['StateProcessTankDialog']),
  },
})
</script>
