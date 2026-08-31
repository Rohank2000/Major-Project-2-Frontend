import useAxios from "../hooks/useAxiosGET";
import { Link, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SortLeads2 from "../hooks/sortLeads2";
import useToast from "../hooks/useToast";

const LeadStatusView = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [filter, setFilter] = useState({
        salesAgent: searchParams.get("salesAgent") || "",
        priority: searchParams.get("priority") || "",
    });

    const [timeToClose, setTimeToClose] = useState("");

    const { statusCategory } = useParams();

    const { toastMessage, showToast, triggerToast } = useToast(null);

    useEffect(() => {
        if (!statusCategory) {
            triggerToast("Status Category is missing.");
            return
        }
    }, [statusCategory]);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const getLeadsQueryDataUrl = `${BASE_URL}/leads?salesAgent=${filter.salesAgent}&priority=${filter.priority}`;

    const { data: leadData, loading: leadLoading, error: leadError } = useAxios(getLeadsQueryDataUrl, []);

    const filteredLeadsData = leadData?.lead?.filter(
        (item) => item.status === statusCategory
    );

    const getSalesAgentUrl = `${BASE_URL}/agents`;

    const { data: agentData, loading: agentLoading, error: agentError } = useAxios(getSalesAgentUrl, []);

    useEffect(() => {
        setFilter({
            salesAgent: searchParams.get("salesAgent") || "",
            priority: searchParams.get("priority") || "",
        });
    }, [searchParams]);

    const handleFilterValue = (event) => {
        const { name, value } = event.target;
        
        const filterValue = { ...filter, [name]: value };

        setFilter(filterValue);
        const NonEmptyFilterValue = Object.fromEntries(Object.entries(filterValue).filter(([, value]) => value));
        setSearchParams(NonEmptyFilterValue);
    }

    const handleFilterClear = () => {
        setFilter({
            salesAgent: "",
            priority: ""
        });
        setTimeToClose("");
        setSearchParams({});
    }

    const finalFilteredLeadData = SortLeads2(filteredLeadsData, timeToClose);

    return (
        <div className="dashboard-wrapper">
            {showToast && (
                <div className={String(toastMessage).toLowerCase().includes("error") || String(toastMessage).toLowerCase().includes("invalid") || String(toastMessage).toLowerCase().includes("missing") ? "toast-red-style" : "toast-green-style"}>{toastMessage}</div>
            )}
            <main className="lead-status-view-container">
                <h2 className="lead-status-view-main-heading">Leads By Status</h2>
                <section className="lead-status-view-alignment">
                    <aside className="lead-status-view-sidebar-style">
                        <h3>Sidebar</h3>
                        <div className="lead-status-view-border-card">
                            <Link to="/">
                                <button className="lead-status-view-sidebar-button-style">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="white"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                                    </svg>
                                    <p>Back To Dashboard</p>
                                </button>
                            </Link>
                        </div>
                    </aside>
                    <div className="lead-status-view-column">
                        <div className="lead-status-view-heading-2">
                            <h3>Lead List By Status</h3>
                        </div>
                        <div className="lead-status-view-status-category-button-style">
                            <p>
                                Status: {statusCategory}
                            </p>
                        </div>
                        <div className="lead-status-view-details-aligner">
                            {leadLoading ? " Loading..." : leadError ? "Error Occured" : finalFilteredLeadData?.length === 0 || !finalFilteredLeadData ? (
                                <div className="lead-status-view-No-lead-style">
                                    <p>
                                        No leads found matching the criteria
                                    </p>
                                </div>
                            ) : (
                                finalFilteredLeadData?.map((lead, index) => (
                                    <Link className="lead-status-view-details-pills" key={index} to={`/lead-management/${lead._id}`}>
                                        <div>{lead.name} - [Sales Agent: {lead?.salesAgent?.name ?? "Unassigned"}]</div>
                                    </Link>
                                ))
                            )}
                        </div>
                        <div className="lead-status-view-filter-sortBy-divider-line">
                            <div className="lead-status-view-filter-sortBy-aligner">
                                <button className="lead-status-view-clear-filter-button" onClick={handleFilterClear}>Clear filter</button>
                                <div className="lead-status-view-field-style">
                                    <label htmlFor="lead-filter">Filters:</label>
                                    <select name="salesAgent" id="lead-filter" value={filter.salesAgent} onChange={handleFilterValue}>
                                        <option value="" disabled>Select Sales Agent</option>
                                        {agentLoading ? "Loading..." : agentError ? "Error Occured..." : (
                                            agentData?.allAgents?.map((item, index) => (
                                                <option key={index} value={item._id}>{item.name}</option>
                                            ))
                                        )}
                                    </select>
                                    <select name="priority" id="lead-filter" value={filter.priority} onChange={handleFilterValue}>
                                        <option value="" disabled>Select Priority</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                                <div className="lead-status-view-sortBy-style">
                                    <label htmlFor="lead-sort-by">Sort by:</label>
                                    <select name="timeToClose" id="lead-sort-by" value={timeToClose} onChange={(event) => setTimeToClose(event.target.value)}>
                                        <option value="" disabled>Select Time To Close</option>
                                        {Array.from({ length: 120 }, (_, days) => days + 1).map((days, index) => (
                                            <option key={index} value={days}>{days} Days</option>
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

export default LeadStatusView;