new Vue({
  el: '#exercise',
  data: {
      value: ''
  },
  methods: {
  	showAlert: function () {
  		alert("HEy ALert!!");
  	},
  	updateValue: function (event) {
  		this.value = event.target.value;
  	}
  }
});