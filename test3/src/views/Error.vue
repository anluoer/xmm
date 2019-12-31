<template>
    <div>
        <h3>404页面，哎呦~~~~~走丢了</h3>
        <button @click="goback">返回主页面</button>
    </div>
</template>

<script>
    export default {
        methods:{
            goback(){
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>