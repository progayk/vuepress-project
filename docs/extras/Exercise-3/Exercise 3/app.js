new Vue({
    el: '#exercise',
    data: {
        value: 0,
        timeoutTime: 5
    },
    computed: {
    	result: function() {
    		return this.value > 37 ? "Done" : "";
    	}
    },
    watch: {
    	result: function() {
    		var vm = this;
    		var time = vm.timeoutTime * 1000
    		setTimeout(function() {
    			vm.value = 0;
    		}, time)
    	}
    }
});