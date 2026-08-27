import useAxios from "../hooks/useAxiosGET";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AgentModalContext } from "../context/AgentModalContext";
import { LeadModalContext } from "../context/LeadModalContext";

const DashBoard = () => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const getLeadsData = `${BASE_URL}/leads`;
    const { data: LeadsData, loading: LeadsLoading, error: LeadsError } = useAxios(getLeadsData, []);

    const filterLeadForNew = LeadsData?.lead?.filter((item) => item.status === "New") ?? [];
    const filterLeadForNewTotalCount = filterLeadForNew.length;

    const filterLeadForContacted = LeadsData?.lead?.filter((item) => item.status === "Contacted") ?? [];
    const filterLeadForContactedTotalCount = filterLeadForContacted.length;

    const filterLeadForQualified = LeadsData?.lead?.filter((item) => item.status === "Qualified") ?? [];
    const filterLeadForQualifiedTotalCount = filterLeadForQualified.length;

    const last3LeadsData = LeadsData?.lead?.slice(-3);

    const { setIsModalOpen } = useContext(AgentModalContext);
    const { setIsLeadModalOpen } = useContext(LeadModalContext);

    return (
        <div className="dashboard-wrapper">
            <main className="homepage-container">
                <h2 className="homepage-h2">Anvaya CRM Dashboard</h2>
                <div className="homepage-sidebar-and-body">
                    <aside className="homepage-sidebar">
                        <h3>Sidebar</h3>
                        <ul>
                            <Link to="/leadList"><li>
                                Leads
                            </li></Link>
                            <Link to="/salesAgentManagement">
                                <li>Sales</li>
                            </Link>
                            <Link onClick={() => setIsModalOpen(true)}>
                                <li>Agents</li>
                            </Link>                            <Link to="/report-screen">
                                <li>Reports</li>
                            </Link>
                            <li>Settings</li>
                        </ul>
                    </aside>
                    <section className="homepage-section-body">
                        <h3>Main Content</h3>
                        <div className="homepage-recent-leads-styles">
                            {LeadsLoading ? " Loading..." : last3LeadsData?.map((item, index) => (
                                <Link key={index} to={`/lead-management/${item._id}`} className="homepage-recent-lead-button">{item.name}</Link>
                            ))}

                        </div>
                        <div className="homepage-align-status-center">
                            <ul>
                                <p>Lead Status:</p>
                                {LeadsLoading ? " Loading..." : (
                                    <div>
                                        <li> - New: [{filterLeadForNewTotalCount}] Leads </li>
                                        <li>- Contacted: [{filterLeadForContactedTotalCount}] Leads</li>
                                        <li>- Qualified: [{filterLeadForQualifiedTotalCount}] Leads </li>
                                    </div>
                                )}
                            </ul>
                        </div>
                        <div className="homepage-quickFilter-Button-card">
                            <div className="homepage-align-filter-center">
                                <p>Quick Filters:</p>
                                <Link className="homepage-button-filter-status" to="/leadStatusView/New">
                                    <div>New</div>
                                </Link>
                                <Link className="homepage-button-filter-status" to="/leadStatusView/Contacted">
                                    <div>Contacted</div>
                                </Link>
                                <Link className="homepage-button-filter-status" to="/leadStatusView/Qualified">
                                    <div>Qualified</div>
                                </Link>
                                <Link className="homepage-button-filter-status" to="/leadStatusView/Proposal Sent">
                                    <div>Proposal Sent</div>
                                </Link>
                                <Link className="homepage-button-filter-status" to="/leadStatusView/Closed">
                                    <div>Closed</div>
                                </Link>
                            </div>
                            <div className="homepage-add-new-lead-button">
                                <button onClick={() => setIsLeadModalOpen(true)}>
                                    Add New Lead
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default DashBoard;