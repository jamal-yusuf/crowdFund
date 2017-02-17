<template>

    <div v-html='html'>
    	<slot></slot>
    </div>

</template>

<script>
    export default {
        data() { return { page: '', path: '', html:'', status:'' }        
    			},
        mounted() { this.html=( this.$slots.default[0].elm.outerHTML)}, 

        methods: {
		
        	showHTML: function(){ 
        		let target=this.$route.path;
        		let parts=target.match(/.*\/page\/(.*)$/);
        		if (parts && parts.length>1) {
        			let page =parts[1];
	        		var OK=reply=>{
	        					console.log(reply);
				        		this.path=this.$route.path 
				        		this.status=reply.status; 
				        		this.html=reply.data;
				        	};
	        		var BAD=error=> {
	        					console.log(error);
	        					this.path=this.$route.path 
								this.status='  OOPS !'
				        		this.html=error.response.data;
				        		this.status=error.response.status; 
				        	};
	        						console.log(this.$route)

	        		axios.get('/api/page/'+page, { 
	        					params : { 
	        						page_to_load: this.$route.path
	        					}
	        				}).then(OK).catch(BAD)
	        	}
        	}
        },

        watch: {  '$route' (to, from) { this.showHTML() } }

    }
</script>


<style scoped lang="scss">
    
</style>
