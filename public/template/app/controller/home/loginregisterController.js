homeApp.controller('loginregisterController' ,function ($scope,$http,API) {

	$scope.modalRegister = function () {
		$("#myModalRegister").modal('show');
	}

	$scope.saveRegister = function () {
		var url = API + 'register';
		var data = $.param($scope.userRegister);
		$http({
			method : 'POST',
			url : url,
			data : data,
			headers : {'Content-Type':'application/x-www-form-urlencoded'}
		})
		.success(function (response) {
			// console.log(response);
			location.reload();
		})
		.error(function (response) {
			// console.log(response);
			alert('Xảy ra lỗi vui lòng kiểm tra log');
		});
	}

	$scope.modalLogin = function () {
		$("#myModalLogin").modal('show');
	}

	$scope.Login = function () {
		var url = API + 'login';
		var data = $.param($scope.userLogin);
		$http({
			method : 'POST',
			url : url,
			data : data,
			headers : {'Content-Type':'application/x-www-form-urlencoded'}
		})
		.success(function (response) {
			// console.log(response);
			location.reload();
		})
		.error(function (response) {
			// console.log(response);
			alert('Xảy ra lỗi vui lòng kiểm tra log');
		});
	}
});