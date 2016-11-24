homeApp.controller('ProductController', 
	function($scope,$http,API,$location,Product,$interval,$window,orderByFilter) {
	// console.log(Product);

	// $window.onload = function() {
	// 	alert("Called on page load..");
	// };

	$scope.productView = "'productTable'";
	

	$http.get(API + 'loaixe').success(function (response) {
		$scope.loaixes = response;
		//console.log("Menu");
		// console.log(response);
	});

	$http.get(API + 'provider').success(function (response) {
		$scope.providers = response;
		//console.log(response);
	});

	$http.get(API + 'sanphammoi').success(function (response) {
		$scope.sanphammoi = response;
		//console.log(response);
	});

	$http.get(API + 'sanphamyeuthich').success(function (response) {
		$scope.sanphamyeuthich = response;
		//console.log(response);
	});

	$http.get(API + 'sanphamgiamgia').success(function (response) {
		$scope.sanphamgiamgia = response;
		//console.log(response);
	});


	if(!$window.sessionStorage["cart"])// kiem tra xem co chua, neu chua co thi khoi tao gia tri null va nguoc lai
		$window.sessionStorage["cart"] = null;
		
	// dùng để chứa các sản phẩm đã bỏ vào giỏ hàng
	var selectedItems = [];

    $scope.selectedItems = selectedItems;

	// anh tao 1 cai obj ao? thu nha
	$scope.obj;

	$scope.TotalMoney=0;

  	var increaseCounter = function () {
        $scope.abcd = JSON.parse($window.sessionStorage["cart"]);
        if($scope.abcd!=null)
        {
        	$scope.TotalMoney = $scope.getTotalMoney($scope.abcd)
        	console.log("abcd",$scope.TotalMoney)
        }
    }
    $interval(increaseCounter, 200);
    //500 = 1 s nha


//
    // Sự kiện click: chọn sản phẩm bỏ vào giỏ hàng
    $scope.addToCart = function (product) {
    	//console.log("product");
    	//console.log(product);

        var existItem = {};
        // Kiểm tra sự tồn tại của sản phẩm trong giỏ hàng (selectedItems)
        angular.forEach($scope.selectedItems, function (item, index) {
            // console.log("11");
        // console.log(product.id);
        //console.log(item);
        //console.log(index);
        if (item.id === product.id) {
            existItem = item; // đối tượng existItem = item
            return false; // break loop
        }
            // console.log(existItem);
        });
        // console.log(existItem);

        // Nếu tồn tại thì tăng quantity thêm 1
        if (existItem.id !== undefined) {
            existItem.quantity++;
        }
        // ngược lại thì thêm mới vào giỏ hàng
        else {

            var cartItem = angular.copy(product);
            cartItem.quantity = 1;
            $scope.selectedItems.push(cartItem);
        }
        console.log("cartItem",cartItem);
        //console.log(cartItem);
        console.log("selectedItems",$scope.selectedItems);
        //console.log(selectedItems);
        	$scope.obj=$scope.selectedItems;

        	//ghi su kien them loacal session
        	$window.sessionStorage["cart"] = JSON.stringify($scope.selectedItems);
    };// cai nay dang xuat trong cai add cart
        //console.log("selectedItems");
        //console.log(selectedItems);

    // remove cart item
    $scope.remove = function (cartItem) {

        var index = $scope.selectedItems.indexOf(cartItem);
        $scope.selectedItems.splice(index, 1);
        $window.sessionStorage["cart"] = JSON.stringify($scope.selectedItems)
	}

    $scope.getTotal = function () {
        var total = 0;
        angular.forEach($scope.selectedItems, function (item, index) {
           total += (item.price * item.quantity);
        })

        return total;
    }


    $scope.getTotalMoney = function (data) {
        var total = 0;
        angular.forEach(data, function (item) {
           total += (item.price * item.quantity);
        })

        return total;
    }


	$scope.Products = new Product();

	$scope.like = function(product){
		var url = API + 'like/' + product.name + '/' + product.id;
		var data = "";
		data += 'like = 1';
		$http({
			method : 'POST',
			url : url,
			headers : {'Content-Type':'application/x-www-form-urlencoded'}
		})
		console.log(product);
		console.log($http);
	};

});


homeApp.factory('Product', function($http,$location){
	var Product = function(){
		this.items = [];
		this.busy = false;
		this.page = 1;
	}
	Product.prototype.nextPage = function() {
		if(this.busy) return;
		this.busy = true;
		// console.log("1");
		var url = $location.$$absUrl + '/aaa?page=' + this.page;
		console.log(url);
		$http.get(url).success(function(data){
			// console.log(this.page);
			// console.log(data);
			for(var i = 0; i < data.length; i++){
				this.items.push(data[i]);
			}
			this.page++;
			this.busy = false;
		}.bind(this),50000);
	};
	return Product;
});