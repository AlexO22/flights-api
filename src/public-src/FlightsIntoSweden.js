const React = require('react');
const common = require('./common')

class BusinessFlights extends React.Component {
  constructor(props) {
    super(props);
  }
 
    getFlightsIntoSwedenPercentage(flights, segments){
        let flightsWithoutSegments = common.getFlightsWithoutSegments(flights, segments);
        let totalFlightCount = common.countTotalFlights(flights, segments);

        //count the number of business flights from 'flighdata_B_segments'
        // Loop through segments and increment count value when manchester day
        function countFlightsIntoSweden(){
            flightsIntoSwedenCountWithoutSegments = 0;
            flightsIntoSwedenCountSegments = 0;
            
            for (i = 0; i < segments.length; i++){
                if (segments[i].arrcode == "ARN" || segments[i].arrcode == "GOT"){
                    flightsIntoSwedenCountSegments++;
                }
            }

            for (i=0; i < flightsWithoutSegments.length; i++){
                if (flightsWithoutSegments[i].destair == "ARN" || flightsWithoutSegments[i].destair == "GOT"){
                    flightsIntoSwedenCountWithoutSegments++;
                }
            }

            totalFlightsIntoSwedenCount = flightsIntoSwedenCountSegments + flightsIntoSwedenCountWithoutSegments;
            return totalFlightsIntoSwedenCount;
        }
        
        function calculateFlightsIntoSwedenPercentage(){
            //rounded to 2dp as shown here: https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
            return Math.round((totalFlightsIntoSwedenCount/ totalFlightCount * 100 + Number.EPSILON) * 100) / 100;
        }

        common.countTotalFlights(flights, segments);
        countFlightsIntoSweden();
        return calculateFlightsIntoSwedenPercentage();
  }

  render() {
      
    if (this.props.data == null || this.props.segments == null){
        return "Loading"
    } else {
      const result = this.getFlightsIntoSwedenPercentage(this.props.data, this.props.segments);
      return <div><p><i>What percentage of the total set of flights fly into Sweden?</i></p><p>{result}% of all flights are flights flying into Sweden.</p></div>
    }
  }
}


module.exports = BusinessFlights;
