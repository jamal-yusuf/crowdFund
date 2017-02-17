<template>
    <div class="container">
    Welcome to {{ pageName }}
    </div>
</template>

<script>
    export default {
        data() { return { pageName: '' }        
    			},

        mounted() { this.showName()}, 

        methods: {
        	showName: function(){ this.pageName=this.$route.path }
        },

        watch: {  '$route' (to, from) { this.showName() } }

    }
</script>


<style scoped lang="scss">
    
</style>
