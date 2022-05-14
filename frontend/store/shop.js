import Axios from '~/services/Axios'
// import Encrypt from '~/services/Encrypt'
// import * as Cookies from 'js-cookie'
export const $axios = new Axios(process.env.argv)

export default {
  state: _ => ({
    StateProcessProductDialog:false ,
    StateProcessTankDialog:false ,
    selectProduct: {},
    transactionID: "",
    total: 0,
  }),

  mutations: {
    setSelectProduct(state,data){
      state.selectProduct = data;
    },
    setProcessProductDialog(state,data){
      state.StateProcessProductDialog = data;
    },
    setProcessTankDialog(state,data){
      state.StateProcessTankDialog = data;
    },
    setTransactionID(state,data){
      state.transactionID = data;
    },
    setTotal(state,data){
      state.total = data;
    },
  },
  actions: {
    async getProductAll(_,payload){
      const currentData = await $axios.get('/product/lists?page=0',payload)
      return currentData
    },
    async getTransactionOrder({commit},payload){
      const currentData = await $axios.post('/transaction-order',payload)
      commit('setTransactionID',currentData.data)
      commit('setTotal',0)
      return currentData
    },
    async getTransactionOrderBalance({commit},payload){
      const currentData = await $axios.get(`/transaction-order/balance?id=${payload.id}`)
      commit('setTotal',currentData.data.balance)
      return currentData
    },
    async getRefund(_,payload){
      await $axios.post(`/withdraw/refund`,payload)
      return true
    },
  }
}



