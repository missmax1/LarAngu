
// truyền duwxw liệu từ angular sang view dùng $scope

app.controller('UserController' ,function ($scope,$http,API,$location) {
	
	//lấy danh sách user từ http://localhost/e/public/admin/user/list
	$http.get(API + 'admin/user/list').success(function (response) {

		$scope.users = response;
		// console.log(response);

	});

	var uu = $location.$$absUrl;
	var spliturl = uu.split("/");
	var id = spliturl[spliturl.length-1];

	$http.get(API + 'admin/user/detail/' + id + '/a').success(function (response) {

		$scope.userdetail = response;
		console.log(response);

	});

	$scope.modal = function (id) {
		$scope.id = id;
		$http.get(API + 'admin/user/edit/' + id).success(function (response) {
			$scope.user = response;
			// console.log(response);
		});
		$http.get(API + 'admin/role/list').success(function (response) {
			$scope.roles = response;
			// console.log(response);
		});
		$("#myModal").modal('show');
	}

	$scope.save = function (id) {
		var url = API + 'admin/user/edit/' + id;
		console.log(id);
		var data = $.param($scope.user);
		$http({
			method : 'POST',
			url : url,
			data : data,
			headers : {'Content-Type':'application/x-www-form-urlencoded'}
		})
		.success(function (response) {
			console.log(response);
			location.reload();
		})
		.error(function (response) {
			console.log(response);
			alert('Xảy ra lỗi vui lòng kiểm tra log');
		});
	}

	$scope.lock = function (id) {
		var islock = confirm('Bạn có chắc muốn khóa thành viên này hay không ???');
		if (islock) {
			$http.get(API + 'admin/user/lock/' + id)
				.success(function (response) {
					console.log(response);
					location.reload();
					alert('Complete');
				})
				.error(function(response) {
					console.log(response);
					alert('Xảy ra lỗi vui lòng kiểm tra log');
				});
		} else {
			return false;
		}
	}
	$scope.unlock = function (id) {
		var isUnlock = confirm('Bạn có chắc muốn mở khóa thành viên này hay không ???');
		if (isUnlock) {
			$http.get(API + 'admin/user/unlock/' + id)
				.success(function (response) {
					console.log(response);
					location.reload();
					alert('Complete');
				})
				.error(function(response) {
					console.log(response);
					alert('Xảy ra lỗi vui lòng kiểm tra log');
				});
		} else {
			return false;
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
				$http.get(API + 'admin/user/delete/' + id)
					.success(function (response) {
						swal({
							title: 'Deleted!',
							text: 'User has been deleted.',
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

	$scope.back = function() {
		window.history.back();
	}
	
});