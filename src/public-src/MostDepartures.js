const React = require('react');

class MostDepatures extends React.Component {
  constructor(props) {
    super(props);
  }

    getMostDepartures(flights, segments){
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

        let datesToCountMap = {};

        // Loop through segments and increment count value when manchester day
        for (i = 0; i < segments.length; i++){
            if (segments[i].depair == "MAN"){
                if(datesToCountMap[segments[i].outdepartdate] === undefined) {
                    datesToCountMap[segments[i].outdepartdate] = 1;
                } else {
                    datesToCountMap[segments[i].outdepartdate] ++;
                }
            }
        }

        // - loop through flights without segments
        // - increment day when manchester day
        for (i = 0; i < flightsWithoutSegments.length; i++){

            if (flightsWithoutSegments[i].depair == "MAN"){
                //if the date does not exist,  create a new one with the count of 1
                if(datesToCountMap[flightsWithoutSegments[i].outdepartdate] === undefined) {
                    datesToCountMap[flightsWithoutSegments[i].outdepartdate] = 1;
                } else {
                    //otherwise increment count on existing date 
                    datesToCountMap[flightsWithoutSegments[i].outdepartdate] ++;
                }
            }
        }

        let highestCountDate = {date: '', count: 0}
        for (const [date, count] of Object.entries(datesToCountMap)){
            if (count > highestCountDate.count){
                highestCountDate = {date: date, count: count}
            }
        }
    
    return highestCountDate;
  }

  render() {
      if (this.props.data == null || this.props.segments == null){
          return "Loading"
      } else {
        const result = this.getMostDepartures(this.props.data, this.props.segments);
        return <div>The day {result.date} has the most departures from Manchester.</div>
      }
  }
}


module.exports = MostDepatures;
