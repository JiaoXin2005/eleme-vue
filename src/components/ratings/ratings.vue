<template>
    <div class="ratings">
        这是ratings
        <div>
            <button>{{time | change}}</button>
        </div>
    </div>
</template>

<script>
let flag = false;
export default {
    data() {
        return {
            time : '获取验证码'
        }
    },
    props: ['start'],
    methods: {
        countdown() {
            this.time  = 60;
            let timer = setInterval( () => {
                this.time--;
                if(this.time == 0){
                    this.$emit('countdown');
                    this.time = '获取验证码';
                    flag = true;
                    clearInterval(timer);
                }
            },10)
        }
    },
    watch: {
        start(newV,oldV) {
            if(newV == true){
                this.countdown();
            }
        }
    },
    filters: {
        change(value) {
            if(!value) return '';
            if(!isNaN(value)){
                if(flag){
                    return `重新发送${value}S`
                }
                return value+'S'
            }else {
                return value;
            }
        }
    }
}
</script>

<style>

</style>
