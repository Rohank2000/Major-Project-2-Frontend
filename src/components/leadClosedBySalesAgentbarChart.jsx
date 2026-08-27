import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import {Bar} from 'react-chartjs-2';

export default function LeadClosedBySalesAgentBarChart ({data,options}) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

const leadClosedBySalesAgentData = {
    labels: data ?? ['No Data'],
    datasets: [
        {
            label: 'Leads Closed',
            data: options ?? [0],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        },
    ],
};

const leadClosedBySalesAgentOptions = {
    responsive: true,
    plugins : {
    legend: {
     position: 'top',   
    },
    title : {
    display: true,
    text:'Total Lead Closed By Each Sales Agent',    
    },    
    },
    scales: {
        y: {
            beginAtZero:true,
        },
    },
};

return (
    <div className="leadClosedBySalesAgentBarChart">
            <Bar data={leadClosedBySalesAgentData} options={leadClosedBySalesAgentOptions} />
    </div>
);

}