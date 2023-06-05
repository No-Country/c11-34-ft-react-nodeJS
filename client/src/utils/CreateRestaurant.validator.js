export function createRestaurantValidate (data) {

    const {photos, descrip, daysTime, diners, foodType, chars, firstData} = data


    const toArrLength = (data) => Object.values(data).length


    const validate = {
        field_photos : photos !== undefined   && toArrLength(photos) <= 0,
        field_descrip : descrip !== undefined && toArrLength(descrip) <= 0,
        field_daysTime : daysTime  !== undefined  && toArrLength(daysTime) <= 0,
        field_diners : diners !== undefined  && toArrLength(diners) <= 0,
        field_foodType : foodType !== undefined  && toArrLength(foodType) <= 0,
        fieldChars : chars !== undefined  && toArrLength(chars) <= 0,
        fieldFirstData : firstData !== undefined  && toArrLength(firstData) <= 0
    }

    for(let key in validate) {
        if(validate[key] === true) return false
    }

    return true

} 