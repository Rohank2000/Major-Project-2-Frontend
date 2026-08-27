const SortLeads2 = (filteredLeadData, selectedTimeToClose)=>{

return filteredLeadData?.sort((current, next)=>{
if (current.timeToClose===selectedTimeToClose&&next.timeToClose!==selectedTimeToClose) {
return -1;    
}

if (next.timeToClose!==selectedTimeToClose&&current.timeToClose===selectedTimeToClose) {
return 1;    
}

// If for both 'next' and 'current' Lead Data Time To Close is same then shift to 'timetoClose' value.

const distanceOFCurrent = Math.abs(current.timeToClose - selectedTimeToClose);
const distanceoFNext = Math.abs(next.timeToClose - selectedTimeToClose);

return distanceOFCurrent - distanceoFNext;
});
}

export default SortLeads2;