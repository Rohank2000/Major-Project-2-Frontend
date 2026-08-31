import { useState } from 'react'
import { ModalProvider } from "./context/ModalContext";
import DashBoard from "./pages/homepage-dashboard";
import LeadManagement from "./pages/lead-management";
import SalesAgentManagement from "./pages/salesAgentManagement";
import LeadStatusView from "./pages/leadStatusView";
import ReportScreen from "./pages/report-Screen";
import LeadsOfSalesAgent from "./pages/leadsBySalesAgent";
import LeadList from "./pages/leadList";
import Footer from "./header-footer/footer";
import Header from "./header-footer/header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './CSS/dashboard-homepage.css';
import './CSS/lead-management.css';
import './CSS/salesAgentManagement.css';
import './CSS/report-Screen.css';
import './CSS/leadStatusView.css';
import './CSS/leadsBySalesAgent.css';
import './CSS/leadList.css';
import './CSS/useToast.css';
import './CSS/ModalStyle.css'
import './CSS/totalLeadClosedPieChartStyle.css';
import './CSS/leadClosedBySalesAgentBarChart.css';
import './CSS/groupedLeadStatus.css';
import './CSS/header.css';
import './CSS/footer.css';

function App() {

  return (
    <div className="app-wrapper">
      <Router>
          <ModalProvider>
            <Header />
            <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/lead-management/:leadId" element={<LeadManagement />} />
            <Route path="/leads" element={<LeadList />} />
            <Route path="/salesAgentManagement" element={<SalesAgentManagement />} />
            <Route path="/report-screen" element={<ReportScreen />}/>
            <Route path="/leadStatusView/:statusCategory" element={<LeadStatusView />} />
            <Route path="/leadsBySalesAgent/:salesAgentId" element={<LeadsOfSalesAgent />} />
          </Routes>
          <Footer />
          </ModalProvider>
      </Router>
    </div>
  );
}

export default App;

