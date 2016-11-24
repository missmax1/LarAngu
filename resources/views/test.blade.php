<!DOCTYPE html>
<html >
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
	<script src="<?php echo asset('template/app/lib/angular.min.js'); ?>" type="text/javascript" charset="utf-8" async defer></script>
</head>
<body>
	<div ng-app="">
  <p>Name : <input type="text" ng-model="name"></p>
  <h1>Hello @{{name}}</h1>
</div>
</body>
</html>