const SortLeads = (filteredLeadData, selectedPriority, selectedTimeToClose)=>{
return filteredLeadData?.sort((current, next)=>{
if (current.priority===selectedPriority&&next.priority!==selectedPriority) {
 return -1;   
}

if (next.priority===selectedPriority&&current.priority!==selectedPriority) {
 return 1;   
}

// If for both 'next' and 'current' Lead Data priority is same then shift to 'timetoClose' value.

const distanceOFCurrent = Math.abs(current.timeToClose - selectedTimeToClose);
const distanceoFNext = Math.abs(next.timeToClose - selectedTimeToClose);

return distanceOFCurrent - distanceoFNext;
});
}

export default SortLeads;