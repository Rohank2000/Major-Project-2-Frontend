import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxiosGET";
import LeadClosedPipelinePieChart from "../components/leadClosedPieChart";
import LeadClosedBySalesAgentBarChart from "../components/leadClosedBySalesAgentbarChart";
import GroupedLeadStatusByCategory from "../components/groupedLeadStatusPieChart";

const ReportScreen = ()=>{

const BASE_URL = import.meta.env.VITE_BASE_URL;    

const getLeadDataUrl = `${BASE_URL}/leads`

const getleadsInPipelineUrl = `${BASE_URL}/report/pipeline`;

const getLeadClosedBySalesAgentUrl = `${BASE_URL}/report/closed-by-agent`;

const getLeadsClosedByLastWeekUrl = `${BASE_URL}/report/last-week`;

const {data:leadData,loading:leadLoading,error:leadError} = useAxios(getLeadDataUrl,[]);

const {data:totalLeadsInPipelineData,loading:totalLeadsInPipelineLoading,error:totalLeadsInPipelineError} = useAxios(getleadsInPipelineUrl,[]);

const {data:closedBySalesAgentData,loading:closedBySalesAgentLoading,error:closedBySalesAgentError} = useAxios(getLeadClosedBySalesAgentUrl,[])

const {data:leadsClosedByLastWeekData, loading:leadsClosedByLastWeekLoading, error:leadsClosedByLastWeekError} = useAxios(getLeadsClosedByLastWeekUrl,[]);

const totalLeadsClosedByLastWeek = leadsClosedByLastWeekData?.leadsClosedLastWeek ?? [];

const totalLeadsClosedByLastWeekCount = totalLeadsClosedByLastWeek?.length;

const totalLeadsInPipelineCount = totalLeadsInPipelineData?.totalLeadsInPipeline;    

const leadClosedBySalesAgent = closedBySalesAgentData?.closedLeadsByAgent;

const groupedStatusCount = totalLeadsInPipelineData?.byStatus;

return(
        <div className="dashboard-wrapper">
            <main className="report-screen-container-style">
                <h2 className="centering-the-heading">Anvaya CRM Reports</h2>
<section className="sidebar-report-overview-aligner">
<aside className="report-sidebar-screen">
<h3>Sidebar</h3>
<div className="report-screen-sidebar-back-to-dashboard-outer-card">
    <Link to="/">
    <button className="report-screen-sidebar-back-to-dashboard-button-style">
<svg xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="white"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
</svg>    
<p>Back To Dashboard</p>
    </button>
    </Link>
</div>
</aside>

<div className="report-overview-column">
<h2 className="centering-the-heading">Report Overview</h2>
<div className="centering-the-heading">
    <h3>Total Leads closed and in Pipeline: </h3>
    <div>
{<LeadClosedPipelinePieChart closedCount={totalLeadsClosedByLastWeekCount} pipelineCount={totalLeadsInPipelineCount} />}
    </div>
</div>
<div className="centering-the-heading-2">
    <h3>
Leads Closed by Sales Agent:   
    </h3>
    <div>
    {<LeadClosedBySalesAgentBarChart data={leadClosedBySalesAgent?.map((agent)=>agent.agentName)} options={leadClosedBySalesAgent?.map((agent)=>agent.closedLeads)}/>}
    </div>
</div>
<div className="centering-the-heading-3">
    <h3>
Lead Status Distribution:
    </h3>
    <div>
{<GroupedLeadStatusByCategory data={Object.entries(groupedStatusCount ?? {}).map(([k,v])=>k) ?? ['No Data']} options={Object.entries(groupedStatusCount ?? {}).map(([k,v])=>v) ?? [0]}/>}
    </div>
</div>
</div>
</section>
            </main>
        </div>
    )
}

export default ReportScreen;