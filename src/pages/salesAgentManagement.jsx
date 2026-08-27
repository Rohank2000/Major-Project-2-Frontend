import useAxios from "../hooks/useAxiosGET";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AgentModalContext } from "../context/AgentModalContext";

const SalesAgentManagement = ()=> {

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getSalesAgentUrl = `${BASE_URL}/agents`;

const {data:agentData, loading:agentLoading, error:agentError} = useAxios(getSalesAgentUrl,[]);
const agent = agentData?.allAgents;

const {setIsModalOpen} = useContext(AgentModalContext);

    return(
        <div className="dashboard-wrapper">
            <main className="sales-agent-container">
<h2 className="sales-management-heading">Sales Agent Management</h2>
<section className="section-Body-d-flex">
    <aside className="sidebar-style">
<h3>Sidebar</h3>
<div className="sales-management-back-to-dashboard-outer-border">
<Link to="/">
<button className="sales-management-back-to-dashboard-button">
<svg xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="white"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
</svg>    
<p>Back To Dashboard</p>
</button>
</Link>
</div>
    </aside>
    <div className="sales-agent-list-style">
        <h2>Sales Agent List</h2>
        <div className="sales-agent-unOrdered-list-style">
            <ul>
                {agentLoading ? "Loading..." : agent?.map((item, index)=>(
                 <Link key={index} to={`/leadsBySalesAgent/${item._id}`}>
                <li>Agent : {item.name} - {item.email}</li>                 
                 </Link>   
                ))}
            </ul>
        </div>
        <div className="Add-New-Agent">
            <button onClick={()=>setIsModalOpen(true)}>Add New Agent</button>
        </div>
    </div>
</section>
</main>
        </div>
    )
}

export default SalesAgentManagement;
