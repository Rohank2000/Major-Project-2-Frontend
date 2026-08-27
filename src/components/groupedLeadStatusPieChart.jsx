import {Chart as ChartJS,
ArcElement,
Tooltip,
Legend,
} from 'chart.js';

import {Pie} from 'react-chartjs-2';

export default function GroupedLeadStatusByCategory ({data,options}) {
    ChartJS.register(
ArcElement,
Tooltip,
Legend,
);

const groupedStatusData = {
    labels:data ?? ['No Data'],
    datasets:[
        {
            label:'Lead Status Grouped by Their Status Category and Count',
            data: options ?? [0],
     backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(7, 242, 26, 0.6)',
        'rgba(132, 6, 216, 0.6)',
      ],
      borderColor: [
'rgba(6, 6, 6, 0.6)',
      ],
      borderWidth: 1,
        },
    ], 
};

const groupedStatusOptions = {
    responsive:true,
    plugins:{
    legend: {
    position:'bottom',    
    },    
    title:{
    display:true,
    text:'Total Lead Grouped By Status',    
    },
    },
};

return (
    <div className="groupedLeadStatus">
        <Pie data={groupedStatusData} options={groupedStatusOptions}/>
    </div>
);    
}