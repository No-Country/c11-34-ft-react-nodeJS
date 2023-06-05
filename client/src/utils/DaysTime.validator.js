export function daysTimeValidator (data) {

    const {days,hoursTo, hoursFrom, minute, duration, cost } = data
    const valid = {
        field_day : days.length < 0,
        field_hoursTo : hoursTo === '',
        field_hoursFrom : hoursFrom === '',
        field_minute : minute === '',
        field_duration : duration === '',
        field_cost : cost === ''
    }

    for(let key in valid) {
        if(valid[key] === true) return true
    }

    return false
    
}