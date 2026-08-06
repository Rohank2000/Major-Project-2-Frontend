import useAxios from "../hooks/useAxiosGET"

const LeadManagement = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL

    const agentList = `${BASE_URL}/agents`;
    const { data: agentData, loading: loadingAgent, error: agentError } = useAxios(agentList, []);
    const filteredAgentData = agentData?.allAgents;
    return (
        <div>
            <main className="lead-management-container">
                <div className="lead-management-border-around-h2">
                    <h2>Lead Management: [Lead Name]</h2>
                    <div className="lead-management-sidebar-and-body">
                        <aside className="lead-management-aside">
                            <h3>Sidebar</h3>
                            <div className="lead-management-sidebar-border">
                                <button className="back-to-dashboard-design">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                                    </svg>
                                    <p>Back to Dashboard</p>
                                </button>
                            </div>
                        </aside>
                        <section className="lead-management-section-body">
                            <h2>Lead Details</h2>
                            <div className="lead-management-lead-details-border">
                                <div className="lead-management-lead-details-paragraph-card">
                                    <p>Lead Name: [Lead Name]</p>
                                    <p>Sales Agent: [John Doe]</p>
                                    <p>Sales Agent: [John Doe]</p>
                                    <p>Lead Status: [New]</p>
                                    <p>Priority: [High]</p>
                                    <p> Time to Close: [30 Days]</p>
                                </div>
                            </div>
                            <div className="lead-management-edit-details-styles">
                                <button>
                                    [Edit Lead Details Button]
                                </button>
                            </div>
                            <h2>Comments Section</h2>
                            <div className="lead-management-comment-horizontal-lines">
                                <div className="lead-management-comment-green-container">
                                    <div className="lead-management-comment-white-container">
                                        <p className="lead-management-comment-date-time">
                                            <small>  [Author] - [Date/Time]
                                            </small>
                                        </p>
                                        <p className="lead-management-comment-main-content">
                                            Comment: [Reached out, waiting...]
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="lead-management-comment-button-blue-styles">
                                <textarea name="comment" id="" maxLength={1000} placeholder="Write a comment..." className="lead-management-comment-button-styles-1"></textarea>
                                <div className="lead-management-comment-select-and-label">
                                    <label htmlFor="" className="lead-management-comment-label">SalesAgent</label>
                                    <select name="" id="" className="lead-management-comment-select">
                                        {filteredAgentData?.map((item, index) => (
                                            <option key={index} value={item.name} className="lead-management-comment-select-option">{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="lead-management-comment-button-styles">
                                    <button>[Submit Comment Button]</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default LeadManagement;