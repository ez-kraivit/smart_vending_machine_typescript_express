<template>
    <v-container class="justify-center" fluid fill-height :style="{background: $vuetify.theme.themes['light'].dg5}" >
      <v-row class="ma-5 mx-5" no-gutters >
        <v-col cols="12" lg="3" xl="3" >
          <v-sheet class="pa-5" elevation="0" :height="$vuetify.breakpoint.mdAndUp ? '800' : '100%'" width="100%" :style="{background: $vuetify.theme.themes['light'].while}">
            <v-img height="100%" elevation="0" class="px-2 pa-3" :lazy-src="require('assets/vending_machine.png')" :src="require('assets/vending_machine.png')"></v-img>
          </v-sheet>
        </v-col>
        <v-col cols="12" lg="9" xl="9">
          <v-sheet class="pa-5 overflow-auto" elevation="0" :height="$vuetify.breakpoint.mdAndUp ? '800' : '100%'" width="100%" :style="{background: $vuetify.theme.themes['light'].while}">
            <v-row class="ma-2 p-0">
              <h6  class="overline" style="font-size:14px">รายการสินค้า</h6>
            </v-row>
            <v-row class="ma-2 p-0">
              <v-flex>
                <v-carousel hide-delimiters height="auto" style="box-shadow: 0px 0px">
                  <v-carousel-item v-for="i in 1" :key="i">
                    <v-layout row>
                      <v-flex v-for="(item,index) in products" :key="index" sm2 pl-2 pr-2>
                        <ShowProduct :item="item" :_pid="item._pid" :topic="item.topic" :selling_price="item.selling_price" :image_path="item.image_path"></ShowProduct>
                      </v-flex>
                    </v-layout>
                  </v-carousel-item>
                </v-carousel>
              </v-flex>
            </v-row>
            <v-row class="ma-2 p-0">
              <v-flex>
                <v-carousel hide-delimiters height="auto" style="box-shadow: 0px 0px">
                  <v-carousel-item v-for="i in 1" :key="i">
                    <v-layout row>
                      <v-flex v-for="(item,index) in products" :key="index" sm2 pl-2 pr-2>
                        <ShowProduct :item="item" :_pid="item._pid" :topic="item.topic" :selling_price="item.selling_price" :image_path="item.image_path"></ShowProduct>
                      </v-flex>
                    </v-layout>
                  </v-carousel-item>
                </v-carousel>
              </v-flex>
            </v-row>
            <v-row class="ma-2 p-0">
              <v-flex>
                <v-carousel hide-delimiters height="auto" style="box-shadow: 0px 0px">
                  <v-carousel-item v-for="i in 1" :key="i">
                    <v-layout row>
                      <v-flex v-for="(item,index) in products" :key="index" sm2 pl-2 pr-2>
                        <ShowProduct :item="item" :_pid="item._pid" :topic="item.topic" :selling_price="item.selling_price" :image_path="item.image_path"></ShowProduct>
                      </v-flex>
                    </v-layout>
                  </v-carousel-item>
                </v-carousel>
              </v-flex>
            </v-row>
            <!-- <v-row class="mx-5 mb-2" justify="end"  align="center"  :style="{background: $vuetify.theme.themes['light'].while}">
              <h6 class="overline">จำนวนทั้งหมด {{products.length}} รายการ</h6>
            </v-row> -->
            <!-- <v-row class="mx-5 mb-2" justify="start"  align="center"  :style="{background: $vuetify.theme.themes['light'].while}">
              <v-card outlined width="400"  dark :style="{background: $vuetify.theme.themes['light'].dg2}">
                  <v-list-item three-line>
                    <v-list-item-avatar tile size="100"  color="white">
                      <img :src="selectProduct.images" alt="">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <div class="text-overline mb-4"> {{selectProduct.name || 'ชื่อสินค้าที่เลือกรายการ'}} </div>
                      <v-list-item-title class="text-h5 mb-1"> ส่วนประกอบเงินทอน </v-list-item-title>
                      <v-list-item-subtitle>คำอธิบายการทอนเงินให้กับผู้ใช้งาน</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
              </v-card>
            </v-row> -->
            <!-- <v-row class="mt-0 mb-2" justify="center" align="center"  :style="{background: $vuetify.theme.themes['light'].while}">
              <v-row class="mx-5" no-gutters >
                <v-col v-for="item in products" :key="item.id" cols="6" lg="2" xl="2" md="3" class="pa-2" >
                  <ShowProduct :price="item.price" :images="item.image"></ShowProduct>
                </v-col>
              </v-row>
            </v-row> -->
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
</template>


<script>
import { mapState , mapActions } from 'vuex'
export default {
  data() {
    return {
      products: [],
    }
  },
  async created(){
    const data = await this.getProductAll()
    this.products = data.list
  },
  computed: {
    ...mapState('shop',[ 'selectProduct'])
  },
  methods:{
    ...mapActions('shop',['getProductAll']),
  }
}
</script>


<style scoped>
.fill-width {
  overflow-x: auto;
  flex-wrap: nowrap;
}
.v-input--selection-controls {
    margin-top: 0px;
    padding-top: 0px;
}
.v-messages {
    flex: 1 1 auto;
    font-size: 12px;
    min-height: 0px;
    min-width: 1px;
    position: relative;
}

</style>
