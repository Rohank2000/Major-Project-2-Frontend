import { Link } from "react-router-dom";
import useAddNewLead from "../hooks/useAddNewLead";
import useAddNewSalesAgent from "../hooks/useAddNewSalesAgent";
import Select from "react-select";

const Header = () => {

const {toastMessage, showToast, triggerToast, isModalOpen, setIsModalOpen, agentFormData, setAgentFormData, agentFormLoading, handleAgentFormData, handleAgentFormSubmit} = useAddNewSalesAgent();

    const {
        leadFormData, isLeadModalOpen, setIsLeadModalOpen,
        agentList, agentLoading, tagOptions,
        handleLeadFormFields, handleLeadFormSubmit, formLoading: leadFormLoading
    } = useAddNewLead(triggerToast);

    return (
        <div>
            <div className="header-bg-color">
                <header className="header-align-inline">
                    <Link to="/">
                        <img src="http://i.ibb.co/G310JwRG/Gemini-Generated-Image-5e356q5e356q5e35.png" alt="avanya-crm-logo" className="header-img-style" />
                    </Link>
                    <div className="header-nav-link">
                        <ul>
                            <Link to="/leadList">
                                <li>Leads</li>
                            </Link>
                            <Link to="/salesAgentManagement">
                                <li>Sales</li>
                            </Link>
                            <Link onClick={()=>setIsModalOpen(true)}>
                                <li>Agents</li>
                            </Link>
                            <Link to="/report-screen">
                                <li>Reports</li>
                            </Link>
                        </ul>
                    </div>
                </header>
            </div>
            {showToast && (
                <div className={String(toastMessage).toLowerCase().includes("error") || String(toastMessage).toLowerCase().includes("invalid") ? "toast-red-style" : "toast-green-style"}>{toastMessage}</div>
            )}
            {isModalOpen && (
<div className="sales-agent-List-Modal-Overlay" onClick={()=>setIsModalOpen(false)}>
    <div className="sales-agent-List-Modal-Content" onClick={(event)=>event.stopPropagation()}>
        <form className="sales-agent-list-form" onSubmit={handleAgentFormSubmit}>
                <button className="sales-agent-cross-cancel-button-style" onClick={()=>setIsModalOpen(false)}>
                    &times;
                </button>
            <h2>Add New Sales Agent</h2>
<div className="agent-details-aligner">
                <label htmlFor="agent-name">Agent Name : </label>
                <input maxLength={20} type="text" name="name" id="agent-name" value={agentFormData.name} onChange={handleAgentFormData}
  onInput={(event) => {
 event.target.value = event.target.value.replace(/[0-9@=\[\];,.$%^&*#()_+{}|:"<>\\/?'-]/g, "");
}} required/>
            </div>
            <div className="agent-details-aligner">
                <label htmlFor="email-address">Email Address : </label>
                <input maxLength={30} type="text" name="email" id="email-address" value={agentFormData.email} onChange={handleAgentFormData} 
                onInput={(event) => {
 event.target.value = event.target.value.replace(/[A-Z=\[\];,$%^&*#()+{}|:"<>\\/?']/g, "");
}} required/>
            </div>
<div className="sales-agent-form-button-align">
                <button type="submit" className="form-submit-button">{agentFormLoading ? "Loading..." : "Submit"}</button>
                <button type="button" className="cancel-form-button" onClick={()=>setIsModalOpen(false)}>Cancel</button>
            </div>
        </form>
    </div>
</div>
    )}
            {isLeadModalOpen && (
<div className="leadList-Form-Modal-Overlay" onClick={()=>setIsLeadModalOpen(false)}>
    <div className="leadList-Form-Modal-Content" onClick={(event)=>event.stopPropagation()}>
        <button className="leadList-Form-Modal-Cancel-button" onClick={()=>setIsLeadModalOpen(false)}>
            &times;
        </button>
        <form className="leadList-Form-Style" onSubmit={handleLeadFormSubmit}>
            <h2>Add New Lead</h2>
            <div className="leadForm-Element-horizontal-Aligner">
                <div className="leadForm-Element-Vertical-Aligner">
                    <label htmlFor="lead-name">Lead Name</label>
                    <textarea maxLength={20} onInput={(event)=>{
                        event.target.value = event.target.value.replace(/[0-9]/g, "");
                    }} className="vertical-stacking-leadForm-fields-textArea-style" type="text" name="name" id="lead-name" value={leadFormData.name} onChange={handleLeadFormFields} placeholder="Green Earth Landscaping" required></textarea>
                </div>
                <div className="leadForm-Element-Vertical-Aligner">
                    <label htmlFor="lead-source">Lead Source</label>
                    <select className="vertical-stacking-leadForm-fields-input-style" name="source" id="lead-source" value={leadFormData.source} onChange={handleLeadFormFields} required>
                        <option value="" disabled>Select Source</option>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Cold Call">Cold Call</option>
                        <option value="Advertisement">Advertisement</option>
                        <option value="Email">Email</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="leadForm-Element-Vertical-Aligner">
                    <label htmlFor="lead-sales-agent">Sales Agent</label>
                    <select className="vertical-stacking-leadForm-fields-input-style" name="salesAgent" id="lead-sales-agent" value={leadFormData.salesAgent} onChange={handleLeadFormFields} required>
                        <option value="" disabled>Select SalesAgent</option>
                        {agentLoading ? "Loading..." : agentList?.map((item, index)=>(
                         <option key={index} value={item._id}>{item.name}</option>   
                        ))}
                    </select>
                </div>
            </div>
            <div className="leadForm-Element-horizontal-Aligner">
                <div className="leadForm-Element-Vertical-Aligner">
                    <label htmlFor="lead-status">Lead Status</label>
                    <select className="vertical-stacking-leadForm-fields-input-style" name="status" id="lead-status" value={leadFormData.status} onChange={handleLeadFormFields} required>
                        <option value="" disabled>Select Lead Status</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                <div className="leadForm-Element-Vertical-Aligner">
                    <label htmlFor="lead-priority">Priority</label>
                    <select className="vertical-stacking-leadForm-fields-input-style" name="priority" id="lead-priority" value={leadFormData.priority} onChange={handleLeadFormFields} required>
                        <option value="" disabled>Select Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className="leadForm-Element-Vertical-Aligner">
                    <label htmlFor="lead-timeToClose">Time To Close</label>
                    <input type="num" maxLength={3} inputMode="numeric"
                    onInput={(event)=>{
                     event.target.value = event.target.value.replace(/\D/g,"")}}
                    className="vertical-stacking-leadForm-fields-input-style" type="text" name="timeToClose" id="lead-timeToClose" value={leadFormData.timeToClose} onChange={handleLeadFormFields} placeholder="Days" required />
                </div>
            </div>
            <div className="leadForm-Element-Vertical-Aligner">
                <label htmlFor="lead-tags">Tags</label>
                <Select className="vertical-stacking-leadForm-fields-input-style" isMulti name="tags" id="lead-tags" options={tagOptions} value={tagOptions?.filter(option => leadFormData.tags.includes(option.value))} onChange={(selected) => handleLeadFormFields({ target: { name: "tags", value: selected?.map(option => option.value) } })} classNamePrefix="tags" placeholder="select tags...." required></Select>
            </div>
            <div className="button-aligner">
                <button className="button-styling-submit" type="submit">{leadFormLoading ? "Loading..." : "Submit"}</button>
                <button className="button-styling-cancel" type="button" onClick={()=>setIsLeadModalOpen(false)}>Cancel</button>
            </div>
        </form>
    </div>
</div>
    )}
        </div>
    )
}

export default Header;
