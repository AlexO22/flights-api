const React = require('react');

class AverageJourneyTime extends React.Component {
    constructor(props) {
        super(props);
    }
    
    getAverageJourneyTime(data){
        relevantFlights = [];
        journeyTimes= [];
        for (i = 0; i < data.length; i++){
            if (data[i].depair == "LHR" && data[i].destair == "DXB" || data[i].depair == "DXB" && data[i].destair == "LHR"){
                relevantFlights.push(data[i]);
            }
        }
        
        for (i=0; i < relevantFlights.length; i++){
            //get outbound flight data
            let outboundDepartureTime = relevantFlights[i].outdeparttime //08:35:00
            let outboundArrivalTime = relevantFlights[i].outarrivaltime 
            let outboundDepartureDateUnformatted = relevantFlights[i].outdepartdate //01/01/2018
            let outboundArrivalDateUnformatted = relevantFlights[i].outarrivaldate
            
            //convert to js data format 
            let outboundDepartureDateFormatted = outboundDepartureDateUnformatted.split("/").reverse().join("-");
            let outboundArrivalDateFormatted = outboundArrivalDateUnformatted.split("/").reverse().join("-");
            
            //create full outbound departure date time 
            let fullOutboundDepartureDateTime = new Date(Date.parse(outboundDepartureDateFormatted + "T" + outboundDepartureTime + "+00:00"));
            let fullOutboundArrivalDateTime = new Date(Date.parse(outboundArrivalDateFormatted + "T" + outboundArrivalTime + "+00:00"));
            
            //calculate difference between times (in ms)
            let journeyLength = fullOutboundArrivalDateTime.getTime() - fullOutboundDepartureDateTime.getTime();
            
            journeyTimes.push(journeyLength);
        }

        
        
        //loop through all journey times to get total time
        let totalJourneyTimes = 0
        for (i = 0; i < journeyTimes.length; i++){
            totalJourneyTimes += journeyTimes[i];
        }
        
        //calculate average journey time by dividing the total by length 
        let averageJourneyTime = totalJourneyTimes / journeyTimes.length;
        
        //convert average journey time from ms to hours and minutes
        //https://www.techstack4u.com/javascript/convert-milliseconds-to-hours-min-sec-format-in-javascript/
        let seconds = (averageJourneyTime / 1000).toFixed(0);
        let minutes = Math.floor(Number(seconds) / 60).toString();
        let hours;
        if (Number(minutes) > 59) {
            hours = Math.floor(Number(minutes) / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = (Number(minutes) - (hours * 60)).toString();
            minutes = (Number(minutes) >= 10) ? minutes : "0" + minutes;
        }
        
        seconds = Math.floor(Number(seconds) % 60).toString();
        seconds = (Number(seconds) >= 10) ? seconds : "0" + seconds;
        if (!hours) {
            hours = "00";
        }
        if (!minutes) {
            minutes = "00";
        }
        if (!seconds) {
            seconds = "00";
        }
        
        console.log(totalJourneyTimes);
        console.log(AverageJourneyTime);
        let averageJourneyTimeHoursMinsSecs  = hours + ":" + minutes + ":" + seconds;
        return averageJourneyTimeHoursMinsSecs;
        
    }
    
    
    
    render() {
        return <div id="averageJourneyTimeDiv">
        {/* go through all arrival and destinations 
            select LHR and DXB only 
            select DXB and LHR 
            
            add all journey times together
        divide by number of flights */}
        {/* renders 'Loading' if data is not yet available */}
        { this.props.data === null ?
            "Loading" :
            <div>The average journey time between LHR and DXB is {this.getAverageJourneyTime(this.props.data)}</div>
        }

        
        </div>;
    }
}


module.exports = AverageJourneyTime;