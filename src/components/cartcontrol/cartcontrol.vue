<template>
    <div class="cartcontrol">
        <transition name="fadeRatate">
            <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click.stop="decreaseCart"></div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart(event) {
            if(!event._constructed){
                return;
            }
            if(!this.food.count){
                Vue.set(this.food, 'count', 1);
            }else{
                this.food.count++;
            }
            this.$emit('addBall',event.target);
        },
        decreaseCart() {
            if(!event._constructed){
                return;
            }
            this.food.count--;
        }
    }
}
</script>

<style lang="scss">
.cartcontrol{
    font-size: 0;
    .cart-decrease{
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0,160,220);
        transition: all 0.4s ease;
        &.fadeRotate-enter-active,&.fadeRatate-leave{
            opacity: 1;
            transform: translate3d(0,0,0) rotate(0);
        }
        &.fadeRatate-enter,&.fadeRatate-leave-active{
            opacity: 0;
            transform: translate3d(24px,0,0) rotate(180deg);
        }
    }
    .cart-count{
        display: inline-block;
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 14px;
        color: #000;
    }
    .cart-add{
        display: inline-block;
        vertical-align: top;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0,160,220);
    }
}
</style>
