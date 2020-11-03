const React = require('react');
const AverageJourneyTime = require('./AverageJourneyTime.js');
const FlightData = require('./FlightData.js');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      data: null 
    };
  }
  
  componentDidMount() {
    fetch("/flights")
    .then((data) => {
      // change data type to object
      let promise = data.json();
      return promise;
    })
    .then((text) => {
      this.setState({
          data: text
      })
    })
    .catch((error) => {
      console.error("Error");
    }); 
  }


  render() {
    return <div>
      {/* <FlightData data={this.state.data}></FlightData> */}
      <AverageJourneyTime data={this.state.data}></AverageJourneyTime>
    </div>;
  }
}


module.exports = App;
