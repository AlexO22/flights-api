const React = require('react');
const AverageJourneyTime = require('./AverageJourneyTime.js');
const MostDepatures = require('./MostDepartures.js')
const FlightData = require('./FlightData.js');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      flights: null,
      segments: null
    };
  }
  
  componentDidMount() {
    fetch("/flights")
    .then((data) => {
      // change data type to object
      let promise = data.json();
      return promise;
    })
    .then((data) => {
      this.setState({
          flights: data
      })
    })
    .catch((error) => {
      console.error("Error");
    }); 

    fetch("/segments")
    .then((data) => {
      // change data type to object
      let promise = data.json();
      return promise;
    })
    .then((data) => {
      this.setState({
          segments: data
      })
    })
    .catch((error) => {
      console.error("Error");
    }); 
  }


  render() {
    return <div>
      {/* <FlightData data={this.state.data}></FlightData> */}
      <AverageJourneyTime data={this.state.flights}></AverageJourneyTime>
      <MostDepatures data={this.state.flights} segments={this.state.segments}></MostDepatures>
    </div>;
  }
}


module.exports = App;
