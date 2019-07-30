<template>
    <div class="info-block">
        <transition name="fade" v-for="(el,key) in info" :key="key">
            <div class="info-wrapper">
                <div class="info-body" :class="el.class">
                    {{el.text}}
                </div>
            </div>
        </transition>
    </div>
 </template>
    
<script>

export default {
    data: function() {
        return {
            info: []
        }
    },
    created () {
        this.$root.$on('show-info', (data) => {
            this.info.push(data)
            setTimeout(() => {
                this.info.splice(this.info.indexOf(data), 1)
            }, 2000)
        })
    }
}
</script>    

<style lang="less">
.info-block {
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: 20000;
    .info-wrapper {
        margin: 10px;
        .info-body {
            padding: 20px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 300px;
            color: #fff;
            border-radius: 15px;
            background: #008000A6;
            &.alert {
                background: rgba(255, 0, 0, 0.7);
            }
            &.info {
                background: rgba(0, 0, 255, 0.7);
            }
        }
    }
}
</style>
