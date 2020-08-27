<template>
    <div>
      <h1>Product List</h1>
      <img
        v-if="loading"
        src="https://i.imgur.com/JfPpwOA.gif"
      >
      <ul v-else>
        <li v-for="product in products" :key="product">
          {{product.title}} - {{product.price | currency}} - {{product.inventory}}
          <button
            :disabled="!productIsInStock(product)"
            @click="addProductToCart(product)"
          >Add to cart</button>
        </li>
      </ul>
    </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  export default {

    // this.state에 정의
    data () { 
      return {
        loading: false,
        productIndex: 1
      }
    },

    //내부 함수, 변수들.
    computed: { 
      ...mapState({
        //...mapState는 connect의 첫번째 인자가 된다
        //vuex에서 아래의 값들을 가져온다. 
        products: state => state.products.items
      }),

      // vuex에서 값을 가져오기위해 'productIsInStock' ->이 함수를 부른다
      ...mapGetters('products', { // products는 store > modules 이름..
        productIsInStock: 'productIsInStock'
      })
    },

    //최초에 한번 호출된다. 
    methods: { 
      ...mapActions({
        //...mapActions는 connect의 두번째 인자가 된다

        //내가 정의한 액션 이름 : 액션의 경로(모듈이름/함수이름)
        fetchProducts: 'products/fetchProducts',
        addProductToCart: 'cart/addProductToCart'
      })
    },

    //돔이 그려지고 나서 불려짐. 
    created () {
      this.loading = true
      this.fetchProducts()// 내가 methods에서 정의한 액션 이름.
        .then(() => this.loading = false)
    }
  }
</script>

<style scoped>
</style>