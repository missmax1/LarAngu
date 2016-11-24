app.directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);
app.service('fileUpload', ['$http', function ($http) {
	this.uploadFileToUrl = function(file, uploadUrl){
		var fd = new FormData();
			fd.append('file', file);

		$http.post(uploadUrl, fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		}).success(function (response) {
            callback(response);
        });
	}
}]);

app.controller('ProductController', ['$scope', '$http', 'API', 'fileUpload', function($scope, $http, API, fileUpload) {
	
	$http.get(API + 'admin/product/list').success(function (response) {
		$scope.products = response;
		console.log(response);
	});

	$scope.modal = function (state,id) {
		$scope.state = state
		if (state == "add") {
				$scope.frmTitle = "Thêm mới sản phẩm";
		} else if(state == "edit"){
			console.log(id);
			$scope.frmTitle = "Sửa sản phẩm";
			$scope.id = id;
			$http.get(API + 'admin/product/edit/' + id).success(function (response) {
				$scope.product = response;
				console.log($scope.product);
			});
		}

		$http.get(API + 'admin/provider/list').success(function (response) {
			$scope.providers = response;
		});
		$http.get(API + 'admin/category/list').success(function (response) {
			$scope.categorys = response;
		});
		$("#myModaladd").modal('show');
	}

	$scope.save = function (state,id) {
		if (state == "add") {
			var url = API + 'admin/product/add';
			var data = $.param($scope.product);
			// console.log(data);

			// var file = $scope.myFile;
			// console.log('file is ' );
			console.dir($scope.myFile);
			// console.log($scope.myFile);

			// console.log($scope.myFile.name);

			// var data = {
			// 	name : $scope.product.name,
		 //        price : $scope.product.price,
		 //        provider_id : $scope.product.provider_id,
		 //        category_id : $scope.product.category_id,
		 //        inventory : $scope.product.inventory,
		 //        decription : $scope.product.decription,
		 //        status : $scope.product.status,
   //      		img : $scope.product.myFile
			// };
			console.log(data);
			data += '&anhbia=' + $scope.myFile.name;
			console.log(data);

			var uploadUrl = API + "/image";
            fileUpload.uploadFileToUrl($scope.myFile, uploadUrl);

			$http({	
				method : 'POST',
				url : url,
				data : data,
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function (response) {
				swal({
					title: "Success",
					type: 'success',
					text: "Success.",
					showConfirmButton: false
				});
				console.log(response);
				location.reload();
			})
			.error(function (response) {
				console.log(response);
				alert('Xảy ra lỗi vui lòng kiểm tra log');
			});
		}

		if (state == "edit") {
			console.log(id);
			var url = API + 'admin/product/edit/' + id;
			var data = $.param($scope.product);
			if($scope.myFile) {
				data += '&anhbia=' + $scope.myFile.name;
			}
			
			console.log(data);
			$http({
				method : 'POST',
				url : url,
				data : data,
				headers : {'Content-Type':'application/x-www-form-urlencoded'}
			})
			.success(function (response) {
				swal({
					title: "Success",
					type: 'success',
					text: "Product has been update.",
					showConfirmButton: false
				});
				console.log(response);
				location.reload();
			})
			.error(function (response) {
				console.log(response);
				alert('Xảy ra lỗi vui lòng kiểm tra log');
			});
		}
	}


	$scope.delete = function (id) {
		swal({
			title: 'Are you sure?',
			text: 'You will not be able to recover this data!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			confirmButtonText: 'Yes, delete it!',
			closeOnConfirm: false,
			showLoaderOnConfirm: true,
			html: false
			}, function () {
				$http.get(API + 'admin/product/delete/' + id)
					.success(function (response) {
						swal({
						title: 'Deleted!',
						text: 'Provider has been deleted.',
						type: 'success',
						confirmButtonText: 'OK',
						closeOnConfirm: true
						}, function () {
							console.log(response);
							location.reload();
					})
				})
			})
				
	}
	
}]);