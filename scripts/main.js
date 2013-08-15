var busScheduleApp = angular.module('busScheduleApp', []);

busScheduleApp.factory("Schedule", function() {
    var BusSchedule = {};
    BusSchedule.departures = [
        {
            "direction": {
                "from": "БЦ Атлантик-Сити",
                "to": "с.м. Черная речка"
            },
            "type": "Yota Bus(Микроавтобус)",
            "time": {
                "hours": 22,
                "minutes": 15
            }
        },
        {
            "direction": {
                "from": "БЦ Атлантик-Сити",
                "to": "с.м. Черная речка"
            },
            "type": "Yota Bus(Автобус на 50 мест)",
            "time": {
                "hours": 13,
                "minutes": 15
            }
        },
        {
            "direction": {
                "from": "БЦ Атлантик-Сити",
                "to": "с.м. Черная речка"
            },
            "type": "Yota Bus(Микроавтобус)",
            "time": {
                "hours": 23,
                "minutes": 58
            }
        },
        {
            "direction": {
                "from": "БЦ Атлантик-Сити",
                "to": "с.м. Черная речка"
            },
            "type": "Yota Bus(Автобус на 50 мест)",
            "time": {
                "hours": 23,
                "minutes": 59
            }
        },
        {
            "direction": {
                "from": "БЦ Атлантик-Сити",
                "to": "с.м. Черная речка"
            },
            "type": "Yota Bus(Микроавтобус)",
            "time": {
                "hours": 17,
                "minutes": 40
            }
        },
        {
            "direction": {
                "from": "БЦ Атлантик-Сити",
                "to": "с.м. Черная речка"
            },
            "type": "Yota Bus(Автобус на 50 мест)",
            "time": {
                "hours": 18,
                "minutes": 15
            }
        },
        {
            "direction": {
                "from": "БЦ Атлантик-Сити",
                "to": "с.м. Черная речка"
            },
            "type": "Yota Bus(Автобус на 50 мест)",
            "time": {
                "hours": 16,
                "minutes": 12
            }
        }
    ];
    return BusSchedule;
});

busScheduleApp.controller('ScheduleCtrl', function($scope, $timeout, Schedule) {

    var MINUTES_IN_HOUR = 60;
    var BADGE_COLOR = '#049cdb';

    var compareDeparture = function(departureA, departureB) {

        if(departureA.time.hours > departureB.time.hours){
            return 1;
        }
        if(departureA.time.hours == departureB.time.hours) {
            if(departureA.time.minutes > departureB.time.minutes) {
                return 1;
            }
            if(departureA.time.minutes == departureB.time.minutes) {
                return 0;
            }
            return -1;
        }
        return -1;
    };

    var getMinutesToNearestDeparture = function(nearestDeparture ,currentHours, currentMinutes) {

        var nearestDepartureHours = nearestDeparture.time.hours;
        var nearestDepartureMinutes = nearestDeparture.time.minutes;
        var minutesToNearestDeparture;

        if((currentHours > nearestDepartureHours)) {
            minutesToNearestDeparture = 0;
        }
        if((currentHours == nearestDepartureHours) && (currentMinutes < nearestDepartureMinutes)) {
            minutesToNearestDeparture = nearestDepartureMinutes - currentMinutes;
        }
        if((currentHours == nearestDepartureHours) && (currentMinutes >= nearestDepartureMinutes)) {
            minutesToNearestDeparture = 0;
        }
        if((currentHours < nearestDepartureHours)) {
            minutesToNearestDeparture = ((nearestDepartureHours - currentHours) - 1)*MINUTES_IN_HOUR + (MINUTES_IN_HOUR - currentMinutes) + nearestDepartureMinutes
        }
        return minutesToNearestDeparture;
    };

    var setBadge = function(minutesToNearestDeparture) {

        chrome.browserAction.setBadgeText({text: "" + minutesToNearestDeparture});
        chrome.browserAction.setBadgeBackgroundColor({color: BADGE_COLOR});
    };

    var getActualDepartures = function(departures, currentHours, currentMinutes) {

        var actualDepartures = [];

        for(var i=0; i < departures.length; i++) {
            if(departures[i].time.hours > currentHours) {
                actualDepartures.push(departures[i]);
            }
            if(departures[i].time.hours == currentHours) {
                if(departures[i].time.minutes >= currentMinutes) {
                    actualDepartures.push(departures[i]);
                }
            }
        }
        return actualDepartures
    };

    var departures = Schedule.departures.sort(compareDeparture);

    $scope.$watch('departures', function() {
        $timeout(function() {

            //current time
            var now = new Date(), currentHours = now.getHours(), currentMinutes = now.getMinutes();

            $scope.departures = getActualDepartures(departures, currentHours, currentMinutes);

            $scope.minutesToNearestDeparture = getMinutesToNearestDeparture($scope.departures[0], currentHours, currentMinutes);

            setBadge($scope.minutesToNearestDeparture);

        }, 1000);
    });
});
