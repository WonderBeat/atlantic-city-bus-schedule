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
                "hours": 18,
                "minutes": 20
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
                "hours": 19,
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
                "hours": 20,
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
                "hours": 21,
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
                "hours": 22,
                "minutes": 10
            }
        }
    ];
    return BusSchedule;
});

busScheduleApp.filter('fromNow', function() {
    return function(departures) {
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

        return departuresFromNow
    }
});

busScheduleApp.controller('ScheduleCtrl', function($scope, Schedule) {
    $scope.departures = Schedule.departures;
});
