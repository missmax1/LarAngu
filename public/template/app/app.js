
// Khai báo angularjs với tên là my-app

// API là đường dẫn web
var app = angular.module('my-app',['datatables'])

.directive('ckEditor', function() {
    return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
            
            var config = {
                toolbar:[[ 'Bold', 'Italic', 'Underline', 'Strike', 'TextColor', 'FontSize', '-', 'JustifyLeft', 'JustifyRight' ]]
            };
            config.removeButtons = '';
            config.fontSize_sizes = 'petit/12px;normal/14px;grand/16px;';
            config.language = 'es';
            config.uiColor = '#F7B42C';
            config.height = 300;
            config.toolbarCanCollapse = true;

            var ck = CKck.replace(element[0], config);
            if (!ngModel) return;
            
            ck.on('instanceReady', function () {
                ck.setData(ngModel.$viewValue);
            });
            function updateModel() {
                scope.$apply(function () {
                ngModel.$setViewValue(ck.getData());
            });
        };
        ck.on('change', updateModel);
        ck.on('dataReady', updateModel);
        ck.on('key', updateModel);
        ck.on('paste', updateModel);
        ck.on('selectionChange', updateModel);
        return ngModel.$render = function(value) {
            return ck.setData(ngModel.$viewValue);
        };
      }
    };
});
// app.value('datatables','infinite-scroll');
app.config(['$interpolateProvider', function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }
]);
app.constant('API', 'http://localhost:8888/www/e/public/');

// var app = angular.module('my-app',['datatables'], function($interpolateProvider) {
//     $interpolateProvider.startSymbol('<%');
//     $interpolateProvider.endSymbol('%>');
// }).constant('API', 'http://localhost/e/public/');

// var app = angular.module('my-app',['datatables']).config(function($interpolateProvider) {
//     $interpolateProvider.startSymbol('%%');
//     $interpolateProvider.endSymbol('%%');
//   }).constant('API', 'http://localhost/e/public/');
var myApp = angular.module('myApp',['infinite-scroll']);
myApp.config(['$interpolateProvider', function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }
]);




	 //  $http.get('http://localhost/e/public/user').success(function (response) {
	 //  		console.log(response);
	 //  		$scope.users = response;
		// });
	 //  $scope.loadMore = function() {
	 //    var last = $scope.users[$scope.users.length - 1];
	 //    for(var i = 1; i <= 5; i++) {
	 //      $scope.users.push(last + i);
	 //    }
	 //  };
var loginapp = angular.module('login-app',[]);
// app.value('datatables','infinite-scroll');
loginapp.config(['$interpolateProvider', function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }
]);
loginapp.constant('API', 'http://localhost:8888/www/e/public/');


var homeApp = angular.module('home-app',['infinite-scroll']);
// app.value('datatables','infinite-scroll');
homeApp.config(['$interpolateProvider', function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }
]
);

homeApp.constant('API', 'http://localhost:8888/www/e/public/');
