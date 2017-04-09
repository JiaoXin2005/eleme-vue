<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span class="positive block" @click="select(2,$event)" :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span class="positive block" @click="select(0,$event)" :class="{'active':selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span class="negative block" @click="select(1,$event)" :class="{'active':selectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="switch" @click="toggleContent($event)" :class="{'on':onlyContent}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props: {
        ratings: {
            type: Array,
            default() {
                return []
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        }
    },
    computed: {
        positives() { // 过滤评论数组
            return this.ratings.filter((rating) => {
                return rating.rateType === POSITIVE;
            })
        },
        negatives(){
            return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVE;
            })
        }
    },
    methods: {
        select(type,event) {
            if(!event._constructed){
                return;
            }
            // this.selectType = type;
            this.$emit('select',type);
        },
        toggleContent(event) {
            if(!event._constructed){
                return;
            }
            // this.onlyContent = !this.onlyContent;
            this.$emit('toggle',this.onlyContent);
        }
    }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin";

.ratingselect{
    .rating-type{
        padding: 18px 0;
        margin: 0 18px;
        @include border-1px(rgba(7,17,27,0.1));
        font-size: 0;
        .block{
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            line-height: 16px;
            border-radius: 2px;
            font-size: 12px;
            color: rgb(77, 85, 93);
            &.positive{
                background: rgba(0,160,220,0.2);
                &.active{
                    background: rgb(0,160,220);
                }
            }
            &.negative{
                background: rgba(77, 85, 93, 0.2);
                &.active{
                    background: rgb(77, 85, 93);
                }
            }
            &.active{
                color: #fff;
            }
        }
        .count{
            margin-left: 2px;
            font-size: 8px;
        }
    }
    .switch{
        padding: 12px 18px;
        line-height: 24px;
        color: rgb(147, 153, 159);
        border-bottom: 1px solid rgba(7,17,27,0.1);
        font-size: 0;
        &.on{
            .icon-check_circle{
                color: #00c850;
            }
        }
        .icon-check_circle{
            display: inline-block;
            vertical-align: top;
            font-size: 24px;
            margin-right: 4px;
        }
        .text{
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
        }
    }
}
</style>
