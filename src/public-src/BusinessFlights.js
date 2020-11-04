const React = require('react');
const common = require('./common')

class BusinessFlights extends React.Component {
  constructor(props) {
    super(props);
  }
 
    getBusinessFlightsProportion(flights, segments){
        let flightsWithoutSegments = common.getFlightsWithoutSegments(flights, segments);
        let totalFlightCount = common.countTotalFlights(flights, segments);

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
                if (flightsWithoutSegments[i].outflightclass == "Business" || flightsWithoutSegments[i].inflightclass == "Business"){
                    businessFlightCountWithoutSegments++;
                }
            }

            totalBusinessFlightCount = businessFlightCountSegments + businessFlightCountWithoutSegments;
            return totalBusinessFlightCount;
        }
        
        function calculateBusinessClassProportion(){
            //get percentage
            return Math.round(totalBusinessFlightCount / totalFlightCount * 100) + "/100" 
        }

        common.countTotalFlights(flights, segments);
        countBusinessFlights();
        return calculateBusinessClassProportion();
  }

  render() {
      
    if (this.props.data == null || this.props.segments == null){
        return "Loading"
    } else {
      const result = this.getBusinessFlightsProportion(this.props.data, this.props.segments);
      return <div>{result} of the flights are business flights.</div>
    }


  }
}


module.exports = BusinessFlights;
