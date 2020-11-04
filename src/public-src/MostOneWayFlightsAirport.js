const React = require('react');
const common = require('./common')

class MostOneWayFlightsAirport extends React.Component {
    constructor(props) {
        super(props);
    }
 
    getAirportWithMostOneWayFlights(flights) {

        function getOneWayFlights() {
            const oneWayFlights = [];
            for (i = 0; i < flights.length; i++) {
                if (flights[i].oneway == 1) {
                    oneWayFlights.push(flights[i]);
                }
            }
            return oneWayFlights;
        }

        function countOneWayFlights() {
            //map to store airports and counts
            let airportsToCountMap = {};
            const oneWayFlights = getOneWayFlights();

            for (i = 0; i < oneWayFlights.length; i++){
                //if the airport and count does not yet exist in map, create a new object
                if(airportsToCountMap[oneWayFlights[i].depair] === undefined) {
                    airportsToCountMap[oneWayFlights[i].depair] = 1;
                    //otherwise increment the value representing count
                } else {
                    airportsToCountMap[oneWayFlights[i].depair] ++;
                }
            }
            return airportsToCountMap;
        }

        function findHighestCount(airportsToCountMap) {
            //get airport with highest number of one way flights
            let highestCountAirport = {airport: '', count: 0}
            for (const [airport, count] of Object.entries(airportsToCountMap)){
                if (count > highestCountAirport.count){
                    highestCountAirport = {airport: airport, count: count}
                }
                return highestCountAirport;
            }
        }

        const airportsToCountMap = countOneWayFlights();
        return findHighestCount(airportsToCountMap);
    }


  render() {
      
    if (this.props.data == null){
        return "Loading"
    } else {
      const result = this.getAirportWithMostOneWayFlights(this.props.data);
      return <div> <p><i>Which airport do most one way flights leave from?</i></p> <p>{result.airport} is the airport with most one way flights</p></div>
    }
  }
}


module.exports = MostOneWayFlightsAirport;
