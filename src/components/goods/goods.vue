<template>
<div>
    <div class="goods">
        <div class="meau-wrapper" ref="meauWrapper">
            <ul>
                <li v-for="(item,$index) in goods" class="meau-item border-1px" :class="{'current' : currentIndex === $index}"
                @click="selectMeau($index,$event)">
                    <span class="text">
                        <span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}</span>
                                </div>
                                <div class="price">
                                    <span class="now">¥&nbsp;{{food.price}}</span><span class="old" v-if="food.oldPrice">¥&nbsp;{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food" @addBall="addBall"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopcart"></shopcart>
    </div>
    <food :food="selectedFood" @addBall="addBall" ref="food"></food>
</div>
</template>

<script>
import Vue from 'vue';
import shopcart from 'components/shopcart/shopcart';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import food from 'components/food/food'
import BScroll from 'better-scroll';
import {goodsData} from '../../service/getData';
const ERR_OK = 0;
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedFood: {}
        }
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i+1];
                if ( !height2 || (this.scrollY >= height1 && this.scrollY < height2) ){
                    return i;
                }
            }
            return 0;
        },
        selectFoods() {
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if(food.count){
                        foods.push(food);
                    }
                })
            })
            return foods;
        }
    },
    created() {
        this.classMap = ['decrease','discount','special','invoice','guarantee'];
        goodsData().then((res) => {
            if(res.errorno == ERR_OK){
                console.log(res);
                this.goods = res.data;
                this.$nextTick( () => {
                    this._initScroll();
                    this._caculateHeight();
                })
            }
        })
    },
    methods: {
        _initScroll() {
            this.meauScroll = new BScroll(this.$refs.meauWrapper,{
                click: true
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
                click: true,
                probeType:3
            });
            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            })
        },
        _caculateHeight() {
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                 height += foodList[i].clientHeight;
                 this.listHeight.push(height);
            }
        },
        selectMeau($index,$event) {
            if(!$event._constructed){// pc下不派发点击
                return;
            }
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let el = foodList[$index];
            this.foodsScroll.scrollToElement(el,400);
        },
        addBall(target) {
            // 从子组件shopcart传过来的事件
            this.$nextTick( () => {
                // 优化体验
                this.$refs.shopcart.drop(target); // shopcart组件上的方法
            })
        },
        selectFood(food,event) {
            if(!event._constructed){// pc下不派发点击
                return;
            }
            this.selectedFood = food;
            this.$refs.food.show();
        }
    },
    components: {
        shopcart,
        cartcontrol,
        food
    }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin";

.goods{
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
    .meau-wrapper{
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        .meau-item{
            display: table;
            height: 54px;
            width: 56px;
            line-height: 14px;
            padding: 0 12px;
            &.current{
                position: relative;
                z-index: 10;
                font-weight: 700;
                margin-top: -1px;
                background: #fff;
                border-left:3px solid #3190E8;
                .text{
                    @include border-none();
                }
            }
            .icon{
                display: inline-block;
                vertical-align: top;
                width: 12px;
                height: 12px;
                margin-right: 2px;
                background-size: cover;
                &.decrease{
                    @include bg-image("decrease_3");
                }
                &.discount{
                    @include bg-image("discount_3");
                }
                &.guarantee{
                    @include bg-image("guarantee_3");
                }
                &.invoice{
                    @include bg-image("invoice_3");
                }
                &.special{
                    @include bg-image("special_3");
                }
            }
            .text{
                display: table-cell;
                vertical-align: middle;
                width: 56px;
                font-size: 12px;
                @include border-1px(rgba(7,17,27,0.1));
            }
        }
    }
    .foods-wrapper{
        flex: 1;
        .title{
            padding-left: 14px;
            height: 24px;
            line-height: 24px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: rgb(147,153,159);
            background: #f3f5f7;
        }
        .food-item{
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            @include border-1px(rgba(7,17,27,0.1));
            &:last-child{
                @include border-none();
                margin-bottom: 0;
            }
            .icon{
                flex: 0 0 57px;
                margin-right: 10px;
            }
            .content{
                flex: 1;
                .name{
                    margin: 2px 0 8px 0;
                    height: 14px;
                    line-height: 14px;
                    font-size: 14px;
                    color: rgb(7,17,27);
                }
                .desc, .extra{
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
                .desc{
                    margin-bottom: 8px;
                    line-height: 12px;
                }
                .extra{
                    line-height: 10px;
                    &.count{
                        margin-right: 12px;
                    }
                }
                .price{
                    font-weight: 700;
                    line-height: 24px;
                    .now{
                        margin-right: 8px;
                        font-size: 14px;
                        color: rgb(240, 20, 20);
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 10px;
                        color: rgb(147,153,159);
                    }
                }
                .cartcontrol-wrapper{
                    position: absolute;
                    right: 0;
                    bottom: 12px;
                }
            }
        }
    }
}
</style>
