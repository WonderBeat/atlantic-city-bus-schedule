var busScheduleApp = angular.module('busScheduleApp', []);

busScheduleApp.controller('ScheduleCtrl', function($scope, $timeout) {

    $scope.$watch('departures', function() {
        $timeout(function() {
            $scope.departures = JSON.parse(localStorage.getItem('departure'));
        }, 100);
    });
});