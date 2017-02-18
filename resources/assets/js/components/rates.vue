/* 

	Expects a property named ratesdata in the form { base: baseCCY, date: date, rates: {ccy1:rate1, cc2:rate2 ...} }


*/

<template>
<div class='tickerWrap' v-show='ratesData'>
	<div v-if='ratesData.date' class='ratesTable'>  
		<div>{{ratesData.base}} Rates as of : {{ratesData.date}}   </div> 
		<div class='ccyRecord' v-for='(rate,ccy) in ratesData.rates'>
			<div> {{ccy}} : </div> 
			<div> {{rate}}  </div>
		</div>
	</div>
</div>

</template>


<script >
export default {
 data() {return {ratesData : {}}} ,
 name:'vue-rates',
 mounted() { axios.get('https://api.fixer.io/latest?base=EUR&symbols=GBP,USD,EUR').then(  (ret) => { this.ratesData=ret.data} ) }
}
</script>


<style scoped lang="scss">

.tickerWrap{
}

.ccyRecord{
	display:flex;
	flex-direction: row;
	justify-content: space-between;
	&:not(last-child) {
		padding-left: 35px;
	}
	div:last-child {
		padding-left: 3px;
	}
}

.ratesTable{
	display:inline-flex;
	position:absolute;
	flex-direction: row;
	white-space: nowrap;
	justify-content:left;
	color:darken(darkblue,20%);
	margin:0px;
	left:100%;
	animation: mymove 60s 1s infinite linear;
}

@keyframes mymove{
    0% {left: 100%;}   
    100% { transform:translateX(-100%);left:0%;}
}

	
</style>
