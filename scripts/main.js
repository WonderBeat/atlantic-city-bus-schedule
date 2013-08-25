var busScheduleApp = angular.module('busScheduleApp', []);

busScheduleApp.config(function($routeProvider) {
    $routeProvider.
        when('/',
        {
            controller: 'ActualScheduleCtrl',
            templateUrl: 'views/actual-schedule.html'
        }).
        when('/fullschedule',
        {
            controller: 'FullScheduleCtrl',
            templateUrl:'views/full-schedule.html'
        });
});

busScheduleApp.controller('ActualScheduleCtrl', function($scope, $timeout) {

    $scope.noBusTodayText = "Сегодня автобусов больше не будет";
    $scope.moreButtonText = "еще...";

    $scope.departuresLimit = 3;
    $scope.departures = JSON.parse(localStorage.getItem('actualDepartures'));

    $scope.increaseDeparturesLimit = function() {
        $scope.departuresLimit++;
    };

    $scope.$watch('departures', function() {
        $timeout(function() {
            $scope.departures = JSON.parse(localStorage.getItem('actualDepartures'));
        }, 1000);
    });
});

busScheduleApp.controller('FullScheduleCtrl', function($scope) {

    $scope.departures = JSON.parse(localStorage.getItem('allDepartures'))

});

/**
 * Number padding filter
 * Example: <h1>{{53 | pad 6}}</h1> -> <h1>000053</h1>
 */
busScheduleApp.filter('pad', function() {
	return function(input, paddingSize) {
		var str = input+"";
		while (str.length < paddingSize) str = "0" + str;
		return str;
	};
});
