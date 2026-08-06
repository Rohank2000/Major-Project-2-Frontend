const DashBoard = () => {
    return (
        <div className="dashboard-wrapper">
            <main className="homepage-container">
                <div className="homepage-border-around-h2">
                    <h2 className="homepage-h2">Anvaya CRM Dashboard</h2>
                    <div className="homepage-sidebar-and-body">
                        <aside className="homepage-sidebar">
                            <h3>Sidebar</h3>
                            <ul>
                                <li>Leads</li>
                                <li>Sales</li>
                                <li>Agents</li>
                                <li>Reports</li>
                                <li>Settings</li>
                            </ul>
                        </aside>
                        <section className="homepage-section-body">
                            <h3>Main Content</h3>
                            <div className="homepage-recent-leads-styles">
                                <div className="homepage-recent-lead-button"><p>[Lead 1]</p></div>
                                <div className="homepage-recent-lead-button"><p>[Lead 2]</p></div>
                                <div className="homepage-recent-lead-button"><p>[Lead 3]</p></div>
                            </div>
                            <div className="homepage-align-status-center">
                                <ul>
                                    <p>Lead Status:</p>

                                    <li> - New: [5] Leads </li>
                                    <li>- Contacted: [3] Leads</li>
                                    <li>- Qualified: [2] Leads </li>
                                </ul>
                            </div>
                            <div className="homepage-quickFilter-Button-card">
                                <div className="homepage-align-filter-center">
                                    <p>Quick Filters:</p>
                                    <div className="homepage-button-filter-status">New</div>
                                    <div className="homepage-button-filter-status">Contacted</div>
                                    <div className="homepage-button-filter-status">Qualified</div>
                                </div>
                                <div className="homepage-add-new-lead-button">
                                    Add New Lead Button
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DashBoard;