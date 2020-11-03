const React = require('react');
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
      let promise = data.text();
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
      <FlightData data={this.state.data}></FlightData>
    </div>;
  }
}


module.exports = App;
