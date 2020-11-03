const React = require('react');

class FlightData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div id="flightDataDiv">
        { this.props.data === null ?
            "Loading" :
            this.props.data
        }
        
    </div>;
  }
}

module.exports = FlightData;