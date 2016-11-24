app.controller('ExhibitionController' ,function ($scope,$http,API) {
	//lấy danh sách user từ http://localhost/e/public/admin/user/list
	$http.get(API + 'admin/exhibition/list').success(function (response) {

		$scope.Exhibitions = response;
		console.log(response);
	});

	
});

app.controller('ExhibitionDetailController' ,function ($scope,$http,API,$location) {
	
	var url = $location.$$absUrl;
	var spliturl = url.split("/");
	var id = spliturl[spliturl.length-1];

	$http.get(API + 'admin/exhibition/detail/' + id + '/a').success(function (response) {
		$scope.ExhibitionDetail = response;
		console.log(response);
	});

	$scope.Delivery = function() {
		var url = $location.$$absUrl;
		var spliturl = url.split("/");
		var id = spliturl[spliturl.length-1];
		var url = API + '/admin/exhibition/detail/stt/' + id;
		var data = "";
		data += 'status = 2';
		$http({
			method : 'POST',
			url : url,
			headers : {'Content-Type':'application/x-www-form-urlencoded'}
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

	}
});