app.controller('ProviderController' ,function ($scope,$http,API) {
	//lấy danh sách user từ http://localhost/e/public/admin/user/list
	$http.get(API + 'admin/provider/list').success(function (response) {

		$scope.providers = response;
		// console.log(response);
	});

		$scope.modal = function (state,id) {
		$scope.state = state
		if (state == "add") {
			$scope.frmTitle = "Thêm mới";
		} else if(state == "edit"){
			console.log(id);
			$scope.frmTitle = "Sửa";
			$scope.id = id;
			$http.get(API + 'admin/provider/edit/' + id).success(function (response) {
				$scope.provider = response;
			});
		
		}
		$("#myModal").modal('show');
	}

	$scope.save = function (state,id) {
		if (state == "add") {
			var url = API + 'admin/provider/add';
			var data = $.param($scope.provider);
			$http({
				method : 'POST',
				url : url,
				data : data,
				headers : {'Content-Type':'application/x-www-form-urlencoded'}
			})
			.success(function (response) {
				console.log(response);
				swal({
					title: "Success",
					type: 'success',
					text: "Success.",
					showConfirmButton: false
				});
				location.reload();
			})
			.error(function (response) {
				console.log(response);
				alert('Xảy ra lỗi vui lòng kiểm tra log');
			});
		}

		if (state == "edit") {
			console.log(id);
			var url = API + 'admin/provider/edit/' + id;
			var data = $.param($scope.provider);
			$http({
				method : 'POST',
				url : url,
				data : data,
				headers : {'Content-Type':'application/x-www-form-urlencoded'}
			})
			.success(function (response) {
				console.log(response);
				swal({
					title: "Success",
					type: 'success',
					text: "Provider has been update.",
					showConfirmButton: false
				});
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
				$http.get(API + 'admin/provider/delete/' + id)
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
	
});