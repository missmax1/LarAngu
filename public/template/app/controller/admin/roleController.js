app.controller('RoleController' ,function ($scope,$http,API) {
	//lấy danh sách user từ http://localhost/e/public/admin/user/list
	$http.get(API + 'admin/role/list').success(function (response) {

		$scope.roles = response;
		// console.log(response);
	});

	$scope.modal = function (state,id) {
		$scope.state = state
		if (state == "add") {
				$scope.frmTitle = "Thêm mới sản phẩm";
		} else if(state == "edit"){
			console.log(id);
			$scope.frmTitle = "Sửa sản phẩm";
			$scope.id = id;
			$http.get(API + 'admin/role/edit/' + id).success(function (response) {
				$scope.role = response;
			});
		
		}
		$("#myModal").modal('show');
	}

	$scope.save = function (state,id) {
		if (state == "add") {
			var url = API + 'admin/role/add';
			var data = $.param($scope.role);
			$http({
				method : 'POST',
				url : url,
				data : data,
				headers : {'Content-Type':'application/x-www-form-urlencoded'}
			})
			.success(function (response) {
				console.log(response);
				swal({
					title: "Success!",
					type: 'success',
					text: "success.",
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
			var url = API + 'admin/role/edit/' + id;
			var data = $.param($scope.role);
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
					text: "Role has been update.",
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
		// var isConfirmDelete = confirm('Bạn có chắc muốn xóa quyền này hay không');
		// if (isConfirmDelete) {
		// 	$http.get(API + 'admin/role/delete/' + id)
		// 		.success(function (response) {
		// 			console.log(response);
		// 			location.reload();
		// 			alert('Xóa thành công');
		// 		})
		// 		.error(function(response) {
		// 			console.log(response);
		// 			alert('Xảy ra lỗi vui lòng kiểm tra log');
		// 		});
		// } else {
		// 	return false;
		// }
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
				$http.get(API + 'admin/role/delete/' + id)
				.success(function (response) {
					swal({
						title: 'Deleted!',
						text: 'Role has been deleted.',
						type: 'success',
						confirmButtonText: 'OK',
						closeOnConfirm: true
					}, function () {
						location.reload();
					})
				})
			})
				
	}
	
});