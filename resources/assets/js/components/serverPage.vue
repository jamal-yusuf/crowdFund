<template>

    <div>
        <div v-show="html==''">
            <slot></slot>
        </div>
        <dynamic-server-page-component v-if='html' :html='html' :data="contextData"></dynamic-server-page-component> 
    </div>
    </div>
</template>

<script>

    var Loading = {
        template: `<div></div>`
    }

    var render= function(h, context) {
            var html=context.props.html ;
            const dynComponent = {
                name:'dynamic-server-page-component',
                template:html,
                data() { return context.props.data },
            }
            const component = html ? dynComponent : Loading;
            return h(component);
        }

    var DynamicServerPageComponent= {
        functional: true,
        name:'dynamic-server-page-component',
        props: {
            html: String,
            data: { type: Object, default: () => {} }
        },
        render
    }


    export default {
        data() { return { path: '', html:'', scripts: '', status:'' } },
        name:'server-page',
        computed: {
            contextData() { 
                return  this.$parent._data
            }
        },

        components: { DynamicServerPageComponent },
        mounted() { 
            if( ! this.$slots['default']){
                this.showPage()
            } 
        },
        methods: {
		
        	showPage: function(){ 
	       		var my=this;
                my.path=my.$route.path 
        		let target=my.$route.target || my.$route.path;
        		var OK=reply=>{
	        		my.status=reply.status; 
                    let pageDOM=this.parsePage(reply.data);
                    my.html=pageDOM.html ;
                    my.scripts=pageDOM.scripts ;
                    $("html, body").animate({
                        scrollTop : 0
                    }, 1);
                    if(my.scripts){
                        eval(my.scripts);
                    }
	        	};
        		var BAD=error=> {
					console.log(error);
	        		my.html=error.response.data;
	        		my.status=error.response.status; 
	        	};
        		axios.get(target).then(OK).catch(BAD)
	        },

            parsePage: function(html){
                let page=$.parseHTML($.trim(html),null,true);
                let pureHTML='';
                let scripts='';
                var elements=0;
                $.each(page, (i,el) => { 
                    if (el.nodeName.toLowerCase()=='script' ) {
                        scripts=scripts + el.innerHTML + '\n';
                    } else { 
                        if (el.outerHTML) {
                            pureHTML= pureHTML + el.outerHTML ;
                            elements++;
                        }
                    }
                });
                if (elements!=1) pureHTML='<div>'+pureHTML+'</div>';
                return { html:pureHTML , scripts:scripts};
            }

        },

        watch: {  '$route' (to, from) { this.showPage() } }
    }
</script>
