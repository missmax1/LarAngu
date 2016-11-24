homeApp.controller("CartController", function ($scope,$http,API,$window ) {
        
    // dùng để chứa các sản phẩm đã bỏ vào giỏ hàng
    var selectedItems = JSON.parse($window.sessionStorage["cart"]);
    $scope.selectedItems = selectedItems;

    // route
 //    Route::get('/cart/item/{id}', function($id){
	// 	return Product::where('id',$id)->first()->inventory;
	// });

	$scope.update = function(id, soluong)
	{
		var xxx = function (i) {
			$http.get(API + 'cart/item/' + $scope.selectedItems[i].id).success(function (response) {
				// kiểm tra số lượng mua có lớn hơn số lượng trong CSDL
				// console.log("response " + response);
				// console.log("soluong trong http " + soluong);
				// console.log("typeof soluong " + typeof soluong );
				// console.log("typeof response " + typeof parseInt(response) );
				if(soluong > parseInt(response)){
					// nếu lớn hơn thì số lượng mua bằng với số lượng trong CSDL
					soluong = parseInt(response);
					alert("số lượng sản phẩn " + $scope.selectedItems[i].name + " đã vượt quá số lượng trong kho");
				}
				// console.log("soluong trong http sau khi so sánh với response " + soluong);
				// số lượng sản phẩm trong giỏ hàng ở sessionStorage bằng với số lượng mua
				// console.log("selectedItems[i] " + $scope.selectedItems[i].quantity);
				selectedItems[i].quantity = soluong;
				// console.log("selectedItems[i].quantity " + $scope.selectedItems[i].quantity);
				// console.log("typeof selectedItems[i].quantity " + typeof selectedItems[i].quantity );
			});
		}

		if($scope.selectedItems.length > 0)
		{
			for (var i = 0; i < $scope.selectedItems.length ; i++) {

				if($scope.selectedItems[i].id == id)
				{
					xxx(i);
					// console.log($scope.selectedItems[i]);
				}
			}
		}

		///
		$window.sessionStorage["cart"] = JSON.stringify($scope.selectedItems);
		//thanh toan thi gan cai nay $window.sessionStorage["cart"]=null;
		

		//$scope.TotalMoney =   $scope.getTotalMoney(selectedItems);
	}

    //decode lai
    $scope.getTotalMoney = function (data) {
        var total = 0;
        angular.forEach(data, function (item) {
           total += (item.price * item.quantity);
        })
        return total;
    }

    $scope.remove = function (cartItem) {
        var index = $scope.selectedItems.indexOf(cartItem);
        $scope.selectedItems.splice(index, 1);
        $window.sessionStorage["cart"] = JSON.stringify($scope.selectedItems);
    };

    $scope.removeall = function() {
        // alert(1);
    	$scope.selectedItems = '';
    	$window.sessionStorage["cart"]=null;
    };

    $scope.Purchase = function () {

    	var addItemToDatabase = function(item){
    		var url = API + 'cart';
			var data = $.param(item);
			console.log(data);
			$http({
				method : 'POST',
				url : url,
				data : data,
				headers : {'Content-Type':'application/x-www-form-urlencoded'}
			})
    	}

    	var addTotalMoney = function(total){
    		var url = API + 'carttotal';
    		// var total = $scope.getTotalMoney;
    		var data = '';
    		data += 'total='+total;
			console.log(data);
			$http({
				method : 'POST',
				url : url,
				data : data,
				headers : {'Content-Type':'application/x-www-form-urlencoded'}
			}).success(function (response) {
				alert("Các mặt hàng của bạn đã được mua thành công");
				location.reload();
			})
    	}
        // alert(1);
        $scope.byItem = [];
        var total = 0;
        angular.forEach($scope.selectedItems, function (item, index) {
           	
           	total += (item.price * item.quantity);

           	$scope.byItem.push(item);
           	console.log(item);

           	addItemToDatabase(item);

        })
        console.log(total);
        console.log("typeof total " + typeof total.toString() );
        addTotalMoney(total.toString());

        $scope.selectedItems = '';
    	$window.sessionStorage["cart"]=null;
    }
});