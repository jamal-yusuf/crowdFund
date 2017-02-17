<template>

    <div v-html='html'>
    	<slot></slot>
    </div>

</template>

<script>
    export default {
        data() { return { page: '', path: '', html:'', status:'' } },

        mounted() { this.html=( this.$slots.default[0].elm.outerHTML)}, 

        methods: {
		
        	showHTML: function(){ 
	       		var my=this;
        		let target=my.$route.target || my.$route.path;
        		let parts=target.match(/.*\/page\/(.*)$/);
        		let page='home'
        		if (parts && parts.length>1) {
        			page =parts[1];
        		}
        		var OK=reply=>{
	        		my.path=my.$route.path 
	        		my.status=reply.status; 
	        		my.html=reply.data;
	        	};
        		var BAD=error=> {
					console.log(error);
					my.path=my.$route.path 
					my.status='  OOPS !'
	        		my.html=error.response.data;
	        		my.status=error.response.status; 
	        	};
        		axios.get('/api/page/'+page, { 
    					params : { 
    						page_to_load: my.$route.path
    					}
    			}).then(OK).catch(BAD)
	        }
        },

        watch: {  '$route' (to, from) { this.showHTML() } }
    }
</script>


<style scoped lang="scss">
    
</style>
