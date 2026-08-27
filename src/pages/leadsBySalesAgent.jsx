import { useState } from "react";

import useAxios from "../hooks/useAxiosGET";

import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import SortLeads2 from "../hooks/sortLeads2";

const LeadsOfSalesAgent = () => {

    const {salesAgentId} = useParams();

    const [filter, setFilter] = useState({
            priority: "",
            status: ""
        });
    
    const [timeToClose, setTimeToClose] = useState("");

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const getAgentUrl = `${BASE_URL}/agents`;

    const {data:agentData,loading:agentLoading,error:agentError} = useAxios(getAgentUrl,[]);

    const filteredAgent = agentData?.allAgents?.find((item)=>item._id===salesAgentId);

    const getLeadsQueryDataUrl = `${BASE_URL}/leads?status=${filter.status}&priority=${filter.priority}`;

    const {data:leadsData, loading:leadsLoading, error:leadsError} = useAxios(getLeadsQueryDataUrl,[]);

    const filteredLeadDataBysalesAgent = leadsData?.lead?.filter((item)=>item.salesAgent._id===salesAgentId);

    const filteredLeadsData = SortLeads2(filteredLeadDataBysalesAgent, timeToClose);

    const handleClearFilter = ()=>{
    setFilter({
    status:"",
    priority:""    
    });
    
setTimeToClose("");    
    }

    return (
        <div className="dashboard-wrapper">
            <main className="leads-By-SalesAgent-container">
                <h2 className="leads-By-SalesAgent-main-heading-style">Leads by Sales Agent</h2>
                <section className="leads-By-SalesAgent-horizontal-aligner">
                    <aside className="leads-By-SalesAgent-sidebar-style">
                        <h3>Sidebar</h3>
                        <div className="leads-By-SalesAgent-sidebar-outer-card">
                            <Link to="/">
                                <button className="leads-By-SalesAgent-back-to-dashboard-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="white"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                                    </svg>
                                    <p>Back To Dashboard</p>
                                </button>
                            </Link>
                        </div>
                    </aside>
                    <div className="leads-By-SalesAgent-column">
                        <div className="leads-By-SalesAgent-second-heading-centering">
                            <h3>Lead List by Agent</h3>
                        </div>
                        <div className="leads-By-SalesAgent-third-heading-centering-outer-card">
                            <div className="leads-By-SalesAgent-third-heading-centering">
                                <h3>Sales Agent: {agentLoading ? "Loading..." : filteredAgent?.name}</h3>
                            </div>
                        </div>
                        <div className="leads-By-SalesAgent-lead-details-centering">
{leadsLoading ? "Loading" :  filteredLeadsData?.length===0||!filteredLeadsData ? (
    <div className="leads-By-SalesAgent-lead-No-lead-style">
<p>No leads found matching the criteria</p>
    </div>
) : filteredLeadsData?.map((item, index)=>(
<Link to={`/lead-management/${item._id}`} className="leads-By-SalesAgent-lead-details-pills" key={index}>
Lead Name: {item.name} - Status: {item.status}
</Link>
))}
                        </div>
                        <div className="leads-By-SalesAgent-upper-divider-line">  
                            <button className="leads-By-SalesAgent-clear-filter" onClick={handleClearFilter}>
Clear filter
                            </button>
                        <div className="leads-By-SalesAgent-filter-sortBy-centering">
                            <div className="leads-By-SalesAgent-filter-style">
                                <label htmlFor="label-filter">Filters: </label>
                                <select name="status" id="label-filter" value={filter.status} onChange={(event) => setFilter({...filter, status: event.target.value})}>
                                    <option value="" disabled>Select Lead Status</option>
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Qualified">Qualified</option>
                                    <option value="Proposal Sent">Proposal Sent</option>
                                    <option value="Closed">Closed</option>
                                </select>
                                <select name="priority" id="label-filter" value={filter.priority} onChange={(event) => setFilter({...filter, priority: event.target.value})}>
                                    <option value="" disabled>Select Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <div className="leads-By-SalesAgent-sort-By-style">
                                <label htmlFor="label-timeToClose">Sort By: </label>
                                <select name="timeToClose" id="label-timeToClose" value={timeToClose} onChange={(event) => setTimeToClose(Number(event.target.value))}>
                                <option value="" disabled>Select Time To Close</option>
                                    {Array.from({ length: 120 }, (_, days) => (days + 1)).map((item, index) => (
                                        <option key={index} value={item}>{item} days</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default LeadsOfSalesAgent;