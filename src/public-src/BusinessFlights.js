const React = require('react');
const common = require('./common')

class BusinessFlights extends React.Component {
  constructor(props) {
    super(props);
  }
 
    getBusinessFlightsProportion(flights, segments){
        let flightsWithoutSegments = common.getFlightsWithoutSegments(flights, segments);
        
        //count the total number of flights
        function countTotalFlights (){
            countOfFlightsWithoutSegments = 0;
            countOfFlightsWithSegments = 0;

            for (i=0; i < flightsWithoutSegments.length; i++){
                countOfFlightsWithoutSegments++;
            }
            
            for (i=0; i < flights.length; i++){
                countOfFlightsWithSegments++;
            }

            totalFlightCount = countOfFlightsWithSegments + countOfFlightsWithoutSegments;
            return totalFlightCount;
        }

        //count the number of business flights from 'flighdata_B_segments'
        // Loop through segments and increment count value when manchester day
        function countBusinessFlights(){
            businessFlightCountWithoutSegments = 0;
            businessFlightCountSegments = 0;
            
            for (i = 0; i < segments.length; i++){
                if (segments[i].class== "Business"){
                    businessFlightCountSegments++;
                }
            }

            for (i=0; i < flightsWithoutSegments.length; i++){
                if (segments[i].outflightclass == "Business" || segments[i].inflightclass == "Business"){
                    businessFlightCountWithoutSegments++;
                }
            }

            totalBusinessFlightCount = businessFlightCountSegments + businessFlightCountWithoutSegments;
            return totalBusinessFlightCount;
        }
        
        function calculateBusinessClassProportion(){
            return totalBusinessFlightCount / totalFlightCount * 100;
        }

        countTotalFlights();
        countBusinessFlights();
        return calculateBusinessClassProportion();
  }

  render() {
      
    if (this.props.data == null || this.props.segments == null){
        return "Loading"
    } else {
      const result = this.getBusinessFlightsProportion(this.props.data, this.props.segments);
      return <div>{result} % of all flights are business flights.</div>
    }


  }
}


module.exports = BusinessFlights;
