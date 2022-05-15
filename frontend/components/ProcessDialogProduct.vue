<template>
  <v-dialog v-model="StateProcessProductDialog" persistent width="400" v-on:keydown.esc="closeDialog()">
    <v-card class=" text-center rounded-t-xl" elevation="0">
      <v-carousel cycle height="150" hide-delimiter-background show-arrows-on-hover >
        <v-carousel-item v-for="(slide, i) in slides" :key="i" >
            <v-img height="100%" elevation="0" class="px-2 pa-3" :lazy-src="slide.image" :src="slide.image"></v-img>
        </v-carousel-item>
      </v-carousel>
      <h2 class="mt-2" id="demo" ></h2>
    </v-card>
    <v-card class="pb-5 text-center rounded-b-xl" elevation="0">
      <h2>กรุณาหยอดเงินเข้าตู้</h2>
      <h3 class="mb-1">จำนวนตอนนี้ {{renderNumber(total)}} บาท </h3>
      <v-card-actions class="text-center justify-center">
        <v-btn color="error" outlined text rounded @click="closeDialog()">ยกเลิกรายการ</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="js">
import { mapState,mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
        count:null,
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          { id:1, image: require('assets/product/silder1.png') },
          { id:2, image: require('assets/product/silder2.png') },
        ],
        myInterval: null,
        countDate: null,
    }
  },
  watch:{
    async StateProcessProductDialog(val){
      if(val){
        await this.getTransactionOrder({_mid: "M123",product_order: [this.selectProduct._pid]})
        this.$router.push({path: '/', query: {id: this.transactionID}})
        this.countDownDate()
      }else{
        this.setProcessProductDialog(false);
        // this.setSelectProduct({});
        this.setTransactionID('');
        this.setTotal(0);
        document.getElementById("demo").innerHTML = "";
      }
    },
     async total(val){
        if(Number(val) > Number(this.selectProduct.selling_price)) {
          const currentData =  await this.getTransactionOrderCheck({_tid:this.transactionID})
          this.setSelectChangeMoney(currentData)
          this.setProcessProductDialog(false);
          this.setTransactionID('');
          this.setTotal(0);
          document.getElementById("demo").innerHTML = "";
          clearInterval(this.myInterval);
          this.setProcessTankDialog(true);
          setTimeout(() => {
            this.setProcessTankDialog(false);
            this.setSelectChangeMoney({})
            this.setSelectProduct({});
            this.$router.push({path: '/'})
          }, 10000);
        }
        if(Number(val) === Number(this.selectProduct.selling_price)) {
          this.setProcessProductDialog(false);
          this.setTransactionID('');
          this.setTotal(0);
          document.getElementById("demo").innerHTML = "";
          clearInterval(this.myInterval);
          this.setProcessTankDialog(true);
          setTimeout(() => {
            this.setProcessTankDialog(false);
            this.setSelectProduct({});
            this.$router.push({path: '/'})
          }, 3000);
        }
    },

  },
  computed: {
    ...mapState('shop',['StateProcessProductDialog','selectProduct','transactionID','total']),
  },
  methods: {
    ...mapActions('shop',['getTransactionOrder','getTransactionOrderBalance','getRefund','getTransactionOrderCheck']),
    ...mapMutations('shop',['setProcessProductDialog','setSelectProduct','setTransactionID','setTotal','setProcessTankDialog','setSelectChangeMoney']),
    renderNumber(price){
      return Number.parseInt(price)
    },
    async closeDialog() {
      this.setSelectChangeMoney({})
      if(this.total.length>0) await this.getRefund({_tid:this.transactionID});
      this.setProcessProductDialog(false);
      this.setSelectProduct({});
      this.setTransactionID('');
      this.setTotal(0);
      document.getElementById("demo").innerHTML = "";
      clearInterval(this.myInterval);
      this.$router.push({path: '/'})
    },
    countDownDate(){
      this.countDate = new Date().setTime(new Date().getTime() + (3 * 60 * 1000));
      const Interval = setInterval(this.setDown, 1000);
      this.myInterval = Interval
    },
    setDown(){
      const now = new Date().getTime();
      const distance = this.countDate - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("demo").innerHTML = `${minutes} นาที ${seconds} วินาที`;
      if(this.transactionID.length > 0) this.getTransactionOrderBalance({id: this.transactionID})
      if (distance <=  0) {
        this.closeDialog()
        clearInterval(this.myInterval)
      }
    }
  },
}
</script>

<style scoped>
.v-sheet.v-card {
    border-radius: 0px;
}
</style>
