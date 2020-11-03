const React = require('react');

class FlightData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div id="flightDataDiv">
      {/* renders 'Loading' if data is not yet available */}
        { this.props.data === null ?
            "Loading" :
            JSON.stringify(this.props.data)
        }
        
    </div>;
  }
}

module.exports = FlightData;