// myApp.controller('ProductController', function($scope,Product) {
// 	$scope.Products = new Product();
// });
// myApp.factory('Product', function($http){
// 	var Product = function(){
// 		this.items = [];
// 		this.busy = false;
// 		this.page = 1;
// 	}
// 	Product.prototype.nextPage = function() {
// 		if(this.busy) return;
// 		this.busy = true;
		
// 		// console.log(urlall);
// 		// var url = 'http://localhost/e/public/product/list?page=' + this.page;
// 		// $http.get(url).success(function(data){
// 		// 	console.log(this.page);console.log(data.length);console.log(this.busy);
// 		// 	console.log(data);
// 		// 	// console.log(count);
// 		// 	for(var i = 0; i < data.length; i++){
// 		// 		this.items.push(data[i]);
// 		// 	}
// 		// 	this.page++;
// 		// 	this.busy = false;
			
// 		// }.bind(this));
// 		var urlall = 'http://localhost/e/public/product/listall';
// 		$http.get(urlall).then((count) => {
// 			// var Count = count.length;
// 			console.log(count.length);
// 			var url = 'http://localhost/e/public/product/list?page=' + this.page;
// 			$http.get(url).success(function(data){
// 				console.log(this.page);console.log(data.length);
// 				// console.log(data);
// 				// console.log(count);
// 				for(var i = 0; i < data.length; i++){
// 					this.items.push(data[i]);
// 				}
// 				this.page++;
// 				this.busy = false;
// 				// if(this.page > Count/data.length + 1){
// 				// 	this.busy = true;
// 				// }
// 				console.log(this.busy);
// 			}.bind(this));
// 		});
		
// 	};
// 	return Product;
// });

