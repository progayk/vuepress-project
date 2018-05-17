var exercise = new Vue({
  el: '#exercise',
  data: {
  	isShrinked: false,
  	big: 3,
  	red: 'red',
  	userStyle: 'green',
  	userBool: false,
  	blue: 'blue',
  	width: 1,
  	cont: 1
  },
  methods: {
    startEffect: function() {
    	var vm = this;
    	setInterval(function(){
    		vm.isShrinked = !vm.isShrinked;
    	}, 3000)
    },
    startProgress: function() {
    	var vm = this;
    	setInterval(function() {
    		vm.width += vm.cont;
    		if (vm.width >= 400 || vm.width <= 0) {
    			vm.cont = -vm.cont;
    		}
    	}, 6)
    }
  },
  computed: {
  	changeStyle: function() {
  		return {
  			shrink: this.isShrinked,
  			highlight: !this.isShrinked
  		}
  	},
  	fullWidth: function () {
  		return {
  			width: 300 + 'px',
  			height: 200 +  'px'
  		}
  	}
  }
});
