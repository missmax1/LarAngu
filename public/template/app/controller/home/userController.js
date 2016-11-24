myApp.controller('UserController', function($scope,User) {
	$scope.users = new User();
});
myApp.factory('User', function($http){
	var User = function(){
		this.items = [];
		this.busy = false;
		this.page = 1;
	}
	User.prototype.nextPage = function() {
		if(this.busy) return;
		this.busy = true;
		var url = 'http://localhost/e/public/user/list?page=' + this.page;
		$http.get(url).success(function(data){
			console.log(this.page);
			console.log(data);
			for(var i = 0; i < data.length; i++){
				this.items.push(data[i]);
			}
			this.page++;
			this.busy = false;
		}.bind(this));
	};
	return User;
	// User.prototype.nextPage = function() {
	// 	if(this.busy) return;
	// 	this.busy = true;
	// 	var url = 'http://localhost/e/public/user/list?page=1';
	// 	$http.get(url).success(function(data){
	// 		console.log(this.page);
	// 		console.log(data);
	// 		console.log(data.length);
	// 		for(var i = 0; i < data.length; i++){
	// 			this.items.push(data[i]);
	// 		}
	// 		// this.page++;
	// 		this.busy = true;
	// 	}.bind(this));
	// };
	// return User;
});

