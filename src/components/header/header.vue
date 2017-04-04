<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="support-content" v-if="seller.supports" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%">
        </div>
        <transition name="fade">
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <div class="name">{{seller.name}}</div>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul class="supports" v-if="seller.supports">
                            <li class="support-item" v-for="(item,$index) in seller.supports">
                                <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                                <span class="text">{{seller.supports[$index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import star from '../star/star';
export default {
    data() {
        return {
            detailShow : false
        }
    },
    props:{
        seller: {
            type : Object
        }
    },
    methods: {
        showDetail() {
            this.detailShow = true;
        },
        hideDetail() {
            this.detailShow = false;
        }
    },
    components: {
        star
    },
    created() {
        this.classMap = ['decrease','discount','special','invoice','guarantee'];
    }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin";
.header{
    position: relative;
    color:#FFF;
    background: rgba(7,17,27,0.5);
    overflow: hidden;
    .content-wrapper{
        position: relative;
        padding: 24px 12px 18px 24px;
        letter-spacing: -20px;
        .avatar{
            display: inline-block;
            img{
                border-radius: 2px;
            }
        }
        .content{
            display: inline-block;
            vertical-align: top;
            margin-left: 16px;
            letter-spacing: 0;
            .title{
                margin: 2px 0 8px 0;
                letter-spacing: -20px;
                .brand{
                    display: inline-block;
                    vertical-align: top;
                    width: 30px;
                    height: 18px;
                    @include bg-image("brand");
                    background-size:cover;
                }
                .name{
                    letter-spacing: 0;
                    margin-left: 6px;
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 18px;
                }
            }
            .description{
                font-size: 12px;
                line-height: 12px;
                margin-bottom: 10px;
            }
            .supports{
                vertical-align: top;
                font-size: 0;
                .icon{
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    background-size: cover;
                    &.decrease{
                        @include bg-image("decrease_1");
                    }
                    &.discount{
                        @include bg-image("discount_1");
                    }
                    &.guarantee{
                        @include bg-image("guarantee_1");
                    }
                    &.invoice{
                        @include bg-image("invoice_1");
                    }
                    &.special{
                        @include bg-image("special_1");
                    }
                }
                .text{
                    font-size: 10px;
                    line-height: 14px;
                }
            }
        }
        .support-content{
            letter-spacing: 0;
            position: absolute;
            right: 12px;
            bottom: 14px;
            padding: 0 8px;
            font-size: 10px;
            height: 24px;
            line-height: 26px;
            border-radius: 14px;
            background: rgba(0,0,0,0.2);
            text-align: center;
            .count{
                font-size: 10px;
                vertical-align: top;
            }
        }
    }
    .bulletin-wrapper{
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: rgba(7,17, 27,0.2);
        .bulletin-title{
            display: inline-block;
            vertical-align: middle;
            width: 22px;
            height: 12px;
            @include bg-image("bulletin")
            background-size: cover;
        }
        .bulletin-text{
            font-size: 10px;
            font-weight: 200;
            margin: 0 4px;
        }
        .icon-keyboard_arrow_right{
            position: absolute;
            right: 12px;
            bottom:4px;
        }
    }
    .background{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
    }
    .detail{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: auto;
        transition: all 0.5s ease;
        background: rgba(7,17,27,0.8);
        -webkit-backdrop-filter: blur(10px);
        &.fade-enter{
            opacity: 0;
            transform: translateX(10px);
        }
        &.fade-leave-active{
            opacity: 0;
            transform: translateX(10px);
        }
        .detail-wrapper{
            width: 100%;
            min-height: 100%;
            .detail-main{
                margin-top: 64px;
                padding-bottom: 64px;
                .name{
                    font-size: 16px;
                    line-height: 16px;
                    font-weight: 700;
                    text-align: center;
                }
                .star-wrapper{
                    margin-top: 16px;
                    padding: 2px 0;
                    text-align: center;
                }
                .title{
                    display: flex;
                    width: 80%;
                    margin: 28px auto 24px auto;
                    .line{
                        flex: 1;
                        position: relative;
                        top: -8px;
                        border-bottom: 1px solid rgba(255,255,255,0.2);
                    }
                    .text{
                        padding: 0 12px;
                        font-size: 14px;
                        font-weight: 700;
                    }
                }
                .supports{
                    width: 80%;
                    margin: 0 auto;
                    .support-item{
                        padding: 0 12px;
                        margin-bottom: 12px;
                        font-size: 0;
                        &:last-child{
                            margin-bottom: 0;
                        }
                        .icon{
                            display: inline-block;
                            vertical-align: top;
                            width: 16px;
                            height: 16px;
                            margin-right: 6px;
                            background-size: cover;
                            &.decrease{
                                @include bg-image("decrease_2");
                            }
                            &.discount{
                                @include bg-image("discount_2");
                            }
                            &.guarantee{
                                @include bg-image("guarantee_2");
                            }
                            &.invoice{
                                @include bg-image("invoice_2");
                            }
                            &.special{
                                @include bg-image("special_2");
                            }
                        }
                        .text{
                            font-size: 12px;
                            line-height: 16px;
                        }
                    }
                }
                .bulletin{
                    width: 80%;
                    margin: 0 auto;
                    .content{
                        padding: 0 12px;
                        line-height: 24px;
                        font-size: 12px;
                    }
                }
            }
        }
        .detail-close{
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0 auto;
            font-size: 32px;
            color: rgba(255,255,255,0.5);
        }
    }
}
</style>
