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
        
        function convertStringToDate(stringToBeConverted){
            return stringToBeConverted.split("/").reverse().join("-");
        } 

        function createDateTime(date, time){
            return new Date(Date.parse(date + "T" + time + "+00:00"));
        }

        function calculateTimeDifference(arrivalTime, departureTime){
            return arrivalTime.getTime() - departureTime.getTime();
        }

        function calculateAverageJourneyTime(){
            //loop through all journey times to get total time
            let totalJourneyTimes = 0
            for (i = 0; i < journeyTimes.length; i++){
                totalJourneyTimes += journeyTimes[i];
            }

            //calculate average journey time by dividing the total by length
            let averageJourneyTime = totalJourneyTimes / journeyTimes.length;
            return averageJourneyTime;
        }

        function convertMsToTime(){
            //convert average journey time from ms to hours and minutes
            //https://www.techstack4u.com/javascript/convert-milliseconds-to-hours-min-sec-format-in-javascript/
            let seconds = (calculateAverageJourneyTime() / 1000).toFixed(0);
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

            return hours + ":" + minutes + ":" + seconds;            
            } 


        for (i=0; i < relevantFlights.length; i++){
            //get outbound flight data
            let outboundDepartureTime = relevantFlights[i].outdeparttime 
            let outboundArrivalTime = relevantFlights[i].outarrivaltime 
            let outboundDepartureDateUnformatted = relevantFlights[i].outdepartdate 
            let outboundArrivalDateUnformatted = relevantFlights[i].outarrivaldate

            //get inbound flight data
            let inboundDepartureTime = relevantFlights[i].indeparttime 
            let inboundArrivalTime = relevantFlights[i].inarrivaltime 
            let inboundDepartureDateUnformatted = relevantFlights[i].indepartdate 
            let inboundArrivalDateUnformatted = relevantFlights[i].inarrivaldate
            
            //convert date to js date format 
            let outboundDepartureDateFormatted = convertStringToDate(outboundDepartureDateUnformatted);
            let outboundArrivalDateFormatted = convertStringToDate(outboundArrivalDateUnformatted);
            let inboundDepartureDateFormatted = convertStringToDate(inboundDepartureDateUnformatted);
            let inboundArrivalDateFormatted = convertStringToDate(inboundArrivalDateUnformatted);

            //create full outbound & inbound departure date time 
            let fullOutboundDepartureDateTime = createDateTime(outboundDepartureDateFormatted, outboundDepartureTime);
            let fullOutboundArrivalDateTime = createDateTime(outboundArrivalDateFormatted, outboundArrivalTime);
            let fullInboundDepartureDateTime = createDateTime(inboundDepartureDateFormatted, inboundDepartureTime)
            let fullInboundArrivalDateTime = createDateTime(inboundArrivalDateFormatted, inboundArrivalTime)
            
            //calculate difference between times (in ms) and push to array
            let outboundJourneyLength = calculateTimeDifference(fullOutboundArrivalDateTime, fullOutboundDepartureDateTime);
            let inboundJourneyLength = calculateTimeDifference(fullInboundArrivalDateTime, fullInboundDepartureDateTime);
            journeyTimes.push(outboundJourneyLength, inboundJourneyLength);
        }
        return convertMsToTime();
    }
    
    render() {
        return <div id="averageJourneyTimeDiv">
        {/* renders 'Loading' if data is not yet available */}
        { this.props.data === null ?
            "Loading" :
            <div><p><i>What’s the average journey time between London Heathrow (LHR) and Dubai (DXB)?</i></p><p>The average journey time between LHR and DXB is {this.getAverageJourneyTime(this.props.data)}</p></div>
        }
        </div>;
    }
}


module.exports = AverageJourneyTime;