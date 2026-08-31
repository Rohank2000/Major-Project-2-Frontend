import useAxios from "../hooks/useAxiosGET";
import { Link } from "react-router-dom";
import useAddNewLead from "../hooks/useAddNewLead";
import useAddNewSalesAgent from "../hooks/useAddNewSalesAgent";

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

    const filterLeadForProposalSent = LeadsData?.lead?.filter((item) => item.status === "Proposal Sent") ?? [];
    const filterLeadForProposalSentTotalCount = filterLeadForProposalSent.length;

    const filterLeadForClosed = LeadsData?.lead?.filter((item) => item.status === "Closed") ?? [];
    const filterLeadForClosedTotalCount = filterLeadForClosed.length;

    const last3LeadsData = LeadsData?.lead?.slice(-3);

    const {setIsAgentModalOpen} = useAddNewSalesAgent();

    const {setIsLeadModalOpen} = useAddNewLead();
    
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
                            <Link onClick={() =>setIsAgentModalOpen(true)}>
                                <li>Agents</li>
                            </Link>                            <Link to="/report-screen">
                                <li>Reports</li>
                            </Link>
                        </ul>
                    </aside>
                    <section className="homepage-section-body">
                        <h3>Main Content</h3>
                        <div className="homepage-recent-leads-styles">
                            {LeadsLoading ? " Loading..." : LeadsError ? "Error Occured" : last3LeadsData?.map((item, index) => (
                                <Link key={index} to={`/lead-management/${item._id}`} className="homepage-recent-lead-button">{item.name}</Link>
                            ))}

                        </div>
                        <div className="homepage-align-status-center">
                            <ul>
                                <p>Lead Status:</p>
                                {LeadsLoading ? " Loading..." : LeadsError ? "Error Occured" : (
                                    <div>
                                        <li> - New: [{filterLeadForNewTotalCount}] Leads </li>
                                        <li>- Contacted: [{filterLeadForContactedTotalCount}] Leads</li>
                                        <li>- Qualified: [{filterLeadForQualifiedTotalCount}] Leads </li>
                                        <li>- Proposal Sent: [{filterLeadForProposalSentTotalCount}] Leads </li>
                                        <li>- Closed: [{filterLeadForClosedTotalCount}] Leads </li>
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