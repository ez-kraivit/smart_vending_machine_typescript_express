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
      <h5 class="mb-8" v-if="price > 0">เงินทอนทั้งหมด {{price}} บาท</h5>
      <h5 class="mb-8" v-else>ไม่พบเงินทอนของท่าน</h5>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({

  data() {
    return {
      price:0,
    }
  },
  computed: {
    ...mapState('shop',['StateProcessTankDialog','SelectChangeMoney']),
  },
  watch:{
    SelectChangeMoney(val){
      this.price = 0
      if(val){
        Object.keys(val).forEach((item)=>{
          this.renderChangeMoney(item,val[item])
        })
      }
    }
  },
  methods:{
    renderChangeMoney(key,number){
      if(number > 0){
        switch (true) {
          case key === "one_coin":
            this.price += number*1
            break;
          case key === "two_coin":
            this.price += number*2
            break;
          case key === "five_coin":
            this.price += number*5
            break;
          case key === "ten_coin":
            this.price += number*10
            break;
          case key === "twenty_coin":
            this.price += number*20
            break;
          case key === "fifty_coin":
            this.price += number*50
            break;
          case key === "one_hundred_coin":
            this.price += number*100
            break;
          case key === "five_hundred_coin":
            this.price += number*500
            break;
          case key === "one_thosand_coin":
            this.price += number*1000
            break;
        }
      }
    }
  }
})
</script>
