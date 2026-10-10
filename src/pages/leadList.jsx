import useAxios from "../hooks/useAxiosGET";
import { useState, useEffect } from "react";
import SortLeads from "../hooks/sortLeads";
import { Link, useSearchParams } from "react-router-dom";
import useAddNewLead from "../hooks/useAddNewLead";

const LeadList = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filter, setFilter] = useState({
        status: searchParams.get("status") || "",
        salesAgent: searchParams.get("salesAgent") || "",
        tags: searchParams.get("tags") || "",
        source: searchParams.get("source") || ""
    });

    const [priority, setPriority] = useState("");
    const [timeToClose, setTimeToClose] = useState("");

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const getLeadUrl = `${BASE_URL}/leads?status=${filter.status}&salesAgent=${filter.salesAgent}&tags=${filter.tags}&source=${filter.source}`;
    const getSalesAgentUrl = `${BASE_URL}/agents`;
    const getLeadTagUrl = `${BASE_URL}/tags`;

    const { data: agentData, loading: agentLoading, error: agentError } = useAxios(getSalesAgentUrl, []);
    const { data: leadData, loading: leadLoading, error: leadError } = useAxios(getLeadUrl, []);
    const { data: TagData, loading: TagLoading, error: TagError } = useAxios(getLeadTagUrl, []);

    const agent = agentData?.allAgents;
    const fetchedLeadData = leadData?.lead;
    const Tag = TagData?.tag;

    const { setIsLeadModalOpen } = useAddNewLead();

    useEffect(() => {
        setFilter({
            status: searchParams.get("status") || "",
            salesAgent: searchParams.get("salesAgent") || "",
            tags: searchParams.get("tags") || "",
            source: searchParams.get("source") || ""
        });
    }, [searchParams]);

    const handleFilter = (event) => {
        const { name, value } = event.target;
        const filterValue = { ...filter, [name]: value };
        setFilter(filterValue);
        const NonEmptyFilterValue = Object.fromEntries(Object.entries(filterValue).filter(([,value])=>value));
        setSearchParams(NonEmptyFilterValue);
    }

    const handleClearFilter = () => {
        setFilter({
            status: "", salesAgent: "", tags: "",
            source: ""
        });
        setPriority("");
        setTimeToClose("");
        setSearchParams({});
    }

    const sortedLeadData = SortLeads(fetchedLeadData, priority, timeToClose);

    return (
        <div className="dashboard-wrapper">
            <main className="leadList-container">
                <h2 className="heading-centre">Lead List</h2>
                <section className="d-flex">
                    <aside className="sidebar">
                        <h3>Sidebar</h3>
                        <div className="back-to-dashboard-border">
                            <Link to="/">
                                <button className="back-to-dashboard-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="white"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                                    </svg>
                                    <p>Back To Dashboard</p>
                                </button>
                            </Link>
                        </div>
                    </aside>
                    <div className="lead-overview-column">
                        <h2 className="Lead-Overview-heading">Lead Overview</h2>
                        <div className="lead-overview-details">
                            <div>
                                <ul>
                                    {leadLoading ? "Loading..." : sortedLeadData?.length === 0 || !sortedLeadData ? (
                                        <div className="No-lead-style">
                                            <p>No leads found matching the criteria</p>
                                        </div>
                                    ) : (
                                        sortedLeadData?.map((item, index) => (
                                            <Link to={`/lead-management/${item._id}`} key={index}>
                                                <li>{item.name} - {item.status} - {item.salesAgent?.name}</li>
                                            </Link>
                                        ))
                                    )}
                                </ul>
                            </div>
                            <div className="filter-upper-divider-line">
                                <div className="d-flex-horizontally-outer-border">
                                    <button className="clear-filter-button" onClick={handleClearFilter}>Clear Filter</button>
                                    <div className="d-flex-horizontally-1">
                                        <label htmlFor="filter">Filters:</label>

                                        <select name="status" id="filter" value={filter.status} onChange={handleFilter}>
                                            <option value="" disabled>Select Status</option>
                                            <option value="New">New</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Qualified">Qualified</option>
                                            <option value="Proposal Sent">Proposal Sent</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                        <select name="salesAgent" id="filter" value={filter.salesAgent} onChange={handleFilter}>
                                            <option value="" disabled>Select Sales Agent</option>
                                            {agentLoading ? "Loading..." : agentError ? "Error Occured" : agent?.map((item, index) => (
                                                <option key={index} value={item._id}>{item.name}</option>
                                            ))}
                                        </select>

                                        <select name="tags" id="filter" value={filter.tags} onChange={handleFilter}>
                                            <option value="" disabled>Select Tag</option>
                                            {TagLoading ? "Loading..." : TagError ? "Error Occured" : Tag?.map((item, index) => (
                                                <div key={index}>
                                                    <option value={item.name}>{item.name}</option>
                                                </div>
                                            ))}
                                        </select>
                                        <select name="source" id="filter" value={filter.source} onChange={handleFilter}>
                                            <option value="" disabled>Select Source</option>
                                            <option value="Website">Website</option>
                                            <option value="Referral">Referral</option>
                                            <option value="Cold Call">Cold Call</option>
                                            <option value="Advertisement">Advertisement</option>
                                            <option value="Email">Email</option>
                                            <option value="Other">Other</option>
                                        </select>


                                    </div>
                                    <div className="d-flex-horizontally-2">
                                        <label htmlFor="sort-by">Sort By:</label>
                                        <select id="sort-by" value={priority} onChange={(event) => setPriority(event.target.value)}>
                                            <option value="" disabled>Select Priority</option>
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                        <select id="sort-by" value={timeToClose} onChange={(event) => setTimeToClose(event.target.value)}>
                                            <option value="" disabled>
                                                Select Time to Close
                                            </option>
                                            {Array.from({ length: 120 }, (_, days) => days + 1).map((days) => (
                                                <option key={days} value={days}>{days} Days</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="add-new-lead">
                                        <button onClick={() => setIsLeadModalOpen(true)}>Add New Lead</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default LeadList;
