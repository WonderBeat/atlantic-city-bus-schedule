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
                "hours": 13,
                "minutes": 25
            }
        },
        {
            "direction": {
                "from": "БЦ Атлантик-Сити",
                "to": "с.м. Черная речка"
            },
            "type": "Yota Bus(Автобус на 50 мест)",
            "time": {
                "hours": 9,
                "minutes": 30
            }
        },
        {
            "direction": {
                "from": "БЦ Атлантик-Сити",
                "to": "с.м. Черная речка"
            },
            "type": "Yota Bus(Микроавтобус)",
            "time": {
                "hours": 20,
                "minutes": 30
            }
        },
        {
            "direction": {
                "from": "БЦ Атлантик-Сити",
                "to": "с.м. Черная речка"
            },
            "type": "Yota Bus(Автобус на 50 мест)",
            "time": {
                "hours": 20,
                "minutes": 10
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
                "hours": 17,
                "minutes": 10
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

    var getMinutesToNearestDeparture = function(currentHours, currentMinutes, nearestDepartureHours, nearestDepartureMinutes) {
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

    var departures = Schedule.departures.sort(compareDeparture);

    $scope.$watch('departures', function() {
        $timeout(function() {

            //current time
            var now = new Date();
            var currentHours = now.getHours();
            var currentMinutes = now.getMinutes();

            var departuresFromNow = [];

            for(var i=0; i < departures.length; i++) {
                if(departures[i].time.hours > currentHours) {
                    departuresFromNow.push(departures[i]);
                }
                if(departures[i].time.hours == currentHours) {
                    if(departures[i].time.minutes >= currentMinutes) {
                        departuresFromNow.push(departures[i]);
                    }
                }
            }

            $scope.departures = departuresFromNow;

            var nearestDeparture = $scope.departures[0].time;
            var minutesToNearestDeparture = getMinutesToNearestDeparture(currentHours, currentMinutes, nearestDeparture.hours, nearestDeparture.minutes);

            $scope.minutesToNearestDeparture = minutesToNearestDeparture;

            console.log('Schedule was updated');
            console.log('Nearest departure is ' + nearestDeparture.hours + ':' + nearestDeparture.minutes);
            console.log('Minutes to nearest departure: ' + minutesToNearestDeparture);

        }, 5000);
    });
});
