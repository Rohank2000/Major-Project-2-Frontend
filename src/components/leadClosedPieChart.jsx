import {Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,} from 'chart.js';

import {Pie} from 'react-chartjs-2';

export default function LeadClosedPipelinePieChart ({closedCount, pipelineCount}) {

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);  

const totalLeadsClosedData = {
    labels: ['Total Leads Closed', 'Leads In Pipeline'],
    datasets:[
    {
     label:'Number Of Leads CLOSED and in PIPELINE',
     data:[closedCount ?? 0, pipelineCount ?? 0],
     backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ],
      borderColor: [
        'rgb(14, 13, 13)',
      ],
      borderWidth: 1,   
    },    
    ],
};

const totalLeadsClosedOptions = {
responsive:true,
plugins: {
legend:{
position:'bottom',    
},
title:{
display:true,
text: 'Total Leads closed and in Pipeline',   
},    
},    
};    

return (
<div className="totalLeadClosedPieChart">
      <Pie data={totalLeadsClosedData} options={totalLeadsClosedOptions} />
    </div>
    );
}
