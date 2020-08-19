import shop from "@/api/shop";

export default {
  namespaced: true,

  state: {
    items: []
  },

  /* action에서 dispatch로 mutations을 호출해서 처리를 했어. 
  근데 거기서 state에 저장해. 그럼 여기서는 그걸 이렇게하면 쓸수있어!라고 선언해놓는거야.
  availableProducts..얘네를 부르면 state에있는걸 쓸수 있다는거야.
  */
  getters: { 
    availableProducts (state, getters) {
      return state.items.filter(product => product.inventory > 0)
    },

    productIsInStock () {
      return (product) => {
        return product.inventory > 0
      }
    }
  },

  mutations: {
    setProducts (state, products) {
      // update products
      state.items = products
    },

    decrementProductInventory (state, product) {
      product.inventory--
    }
  },

  actions: {
    fetchProducts({commit}) {
      return new Promise((resolve, reject) => {
        // make the call
        // call setProducts mutation
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
    }
  }
}