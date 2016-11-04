angular.module("monitoramento").controller("main", function($scope, $http, $window){ 
	
	$scope.load = false;

	var getContainer = function(url, machineName){
		$http.get(url).success(function(data) {
			$scope.cloudRedmine = data;
			var machine = {
				name: machineName,
				containers: data
			}
			$scope.machines.push(machine);
			console.log($scope.machines);
		});
	}

	var boot = function(){

		$scope.machines = [];
		var machinesUrl = [
			{ name: "Cloud do Redmine", url: "http://web.cloud.lsd.ufcg.edu.br:42183/docker"}, 
			{ name: "Cloud do Jenkins", url: "http://web.cloud.lsd.ufcg.edu.br:43163/docker"},
			{ name: "Cloud do ReviewBoard", url: "http://web.cloud.lsd.ufcg.edu.br:42178/docker"},
			{ name: "ePol", url: "http://epol.splab.ufcg.edu.br/docker" },
			{ name: "ePol05", url: "http://epol05.splab.ufcg.edu.br/docker"}
		]

		for(i in machinesUrl){
			getContainer(machinesUrl[i].url, machinesUrl[i].name);
		}

	}

	boot();
    
});