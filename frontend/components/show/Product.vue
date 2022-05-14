<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card class="mx-auto pa-3" max-width="344" elevation="0">
        <v-row class="ml-n2" style="z-index:9999;position: absolute;" no-gutters>
            <v-chip class="ma-2" color="primary"> {{selling_price}} THB </v-chip>
        </v-row>
        <v-img height="200" :src="`http://localhost:5230${image_path}`" style="cursor: pointer;"></v-img>
        <v-row no-gutters  class="m-0 p-0 justify-center">
          <a class="dg1--text overline"> {{topic}} </a>
        </v-row>
        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#while">
            <v-btn color="primary" @click="selectd()">เลือก</v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import { mapMutations } from 'vuex'
  export default {
    props: [ '_pid', 'topic', 'image_path', 'selling_price','item' ],
    data: () => ({
      overlay: false,
    }),
    methods:{
      ...mapMutations('shop',['setSelectProduct','setProcessProductDialog']),
      selectd(){
        this.setSelectProduct(this.item)
        this.setProcessProductDialog(true)
      }
    }
  }
</script>
