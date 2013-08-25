var DEPARTURES = [
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
var MINUTES_IN_HOUR = 60;
var NORMAL_BADGE_COLOR = '#049cdb';
var ALARM_BADGE_COLOR = '#d10d00';

var compareDeparture = function(departureA, departureB) {
    if(departureA.time.hours > departureB.time.hours) {
        return 1;
    } else if(departureA.time.hours == departureB.time.hours) {
        if(departureA.time.minutes > departureB.time.minutes) {
            return 1;
        }
        if(departureA.time.minutes == departureB.time.minutes) {
            return 0;
        }
    }
    return -1;
};

var getMinutesToNearestDeparture = function(nearestDeparture ,currentHours, currentMinutes) {

    var nearestDepartureHours = nearestDeparture.time.hours;
    var nearestDepartureMinutes = nearestDeparture.time.minutes;
    var minutesToNearestDeparture;

    if((currentHours > nearestDepartureHours)) {
        minutesToNearestDeparture = 0;
    } else if(currentHours == nearestDepartureHours) {
        if(currentMinutes < nearestDepartureMinutes) {
            minutesToNearestDeparture = nearestDepartureMinutes - currentMinutes;
        } else if((currentHours == nearestDepartureHours) && (currentMinutes >= nearestDepartureMinutes)) {
            minutesToNearestDeparture = 0;
        }
    } else if(currentHours < nearestDepartureHours) {
        minutesToNearestDeparture = ((nearestDepartureHours - currentHours) - 1)*MINUTES_IN_HOUR + (MINUTES_IN_HOUR - currentMinutes) + nearestDepartureMinutes
    }
    return minutesToNearestDeparture;
};

var setBadge = function(minutesToNearestDeparture) {

    var badgeText = "";
    var badgeColor = NORMAL_BADGE_COLOR;

    if(minutesToNearestDeparture <= 30) {
        badgeText = minutesToNearestDeparture;
        if(minutesToNearestDeparture <= 5) {
            badgeColor = ALARM_BADGE_COLOR;
        }
        if(minutesToNearestDeparture == -1) {
            badgeText = "";
        }
    }

    chrome.browserAction.setBadgeText({text: "" + badgeText});
    chrome.browserAction.setBadgeBackgroundColor({color: badgeColor});
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

var updateSchedule = function(departures) {

    var now = new Date(), currentHours = now.getHours(), currentMinutes = now.getMinutes();

    var actualDepartures = getActualDepartures(departures, currentHours, currentMinutes);

    var minutesToNearestDeparture = (actualDepartures.length == 0) ? -1 : getMinutesToNearestDeparture(actualDepartures[0], currentHours, currentMinutes);

    setBadge(minutesToNearestDeparture);

    localStorage.setItem('actualDepartures', JSON.stringify(actualDepartures));
};

var departures = DEPARTURES.sort(compareDeparture);

localStorage.setItem('allDepartures', JSON.stringify(departures));

setInterval(function() {
    updateSchedule(departures);
}, 1000);
