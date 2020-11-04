//a function to get all flights from 'flighdata_B_segments' and flights without segments from 'flighdata_B'
//this is done to avoid duplication

function getFlightsWithoutSegments(flights, segments){
    flightsIds = [];
    segmentsIds = [];
    manchesterDates=[];

    //get ids of flights
    for (i = 0; i < flights.length; i++){
        flightsIds.push(flights[i].id);
    }

    //get ids of flight segments
    for (i = 0; i < segments.length; i++){
        segmentsIds.push(segments[i].flightid);
    }

    //filter flights where id is not in the flightIds array
    //to get all flights without segments
    let flightIdsWithoutSegments = flightsIds.filter(function(item) {
        return !segmentsIds.includes(item);
        },
    );

    let flightsWithoutSegments = flights.filter(function(item){
        return flightIdsWithoutSegments.includes(item.id)
    }
    )

    return flightsWithoutSegments;
}

module.exports = {
    getFlightsWithoutSegments: getFlightsWithoutSegments
};