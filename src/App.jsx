import { useState } from 'react'
import LeadForm from "./pages/leadForm";
import DashBoard from "./pages/homepage-dashboard";
import LeadManagement from "./pages/lead-management";
import Footer from "./header-footer/footer";
import Header from "./header-footer/header";

import './App.css'

function App() {

  return (
    <div className="app-wrapper">
      <Header/>
      {/* <LeadForm /> */}
      <LeadManagement/>
      {/* <DashBoard /> */}
      <Footer/>
    </div>
  )
}

export default App;

