<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
    <div class="content">这是content</div>
  </div>
</template>

<script>
import vHeader  from './components/header/header.vue'

export default {
  name: 'app',
  components:{
    vHeader
  }
}
</script>

<style lang='scss'>
  .tab{
    display: flex;
    width: 100%;
  }
  
</style>
