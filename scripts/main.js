var busScheduleApp = angular.module('busScheduleApp', []);

busScheduleApp.controller('ScheduleCtrl', function($scope, $timeout) {

    $scope.noBusTodayText = "Сегодня автобусов больше не будет";
    $scope.moreButtonText = "еще...";

    $scope.departuresLimit = 3;
    $scope.departures = JSON.parse(localStorage.getItem('departure'));

    $scope.increaseDeparturesLimit = function() {
        $scope.departuresLimit++;
    };

    $scope.$watch('departures', function() {
        $timeout(function() {
            $scope.departures = JSON.parse(localStorage.getItem('departure'));
        }, 1000);
    });
});