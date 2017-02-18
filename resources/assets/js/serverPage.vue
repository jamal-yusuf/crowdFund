<template>

    <div v-show='false'>
        <slot></slot>
    </div>

</template>

<script>
    export default {
        data() { return { path: '', html:'', status:'' } },

        mounted() { this.$parent.currentPageHtml=( this.$slots.default[0].elm.outerHTML), this.showHTML()}, 

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
                    my.$parent.currentPageHtml=my.html;
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
