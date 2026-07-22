import { useState, useMemo } from "react";
import axios from "axios";
import useAxiosGET from "../hooks/useAxiosGET";
import Select from 'react-select';
import useToast from "../hooks/useToast";
import '../App.css'

const LeadForm = () => {

    const BASE_URL = import.meta.env.VITE_BASE_URL

    const [leadForm, setLeadForm] = useState({
        name: "",
        source: "",
        salesAgent: "",
        status: "",
        priority: "",
        timeToClose: "",
        tags: []
    });

    const [formLoading, setFormLoading] = useState(false);

    const fetchAgentUrl = `${BASE_URL}/agents`;
    const fetchTagUrl = `${BASE_URL}/tags`;
    const postNewLeadUrl = `${BASE_URL}/leads`;

    const { data, error, loading } = useAxiosGET(fetchAgentUrl, []);
    const { data: tagData, error: tagError, loading: tagLoading } = useAxiosGET(fetchTagUrl, []);
    const { toastMessage, showToast, triggerToast } = useToast(null);

    const tagOptions = useMemo(() =>
        tagData?.tag?.map(item => ({ value: item.name, label: item.name })),
        [tagData]
    );

    const handleLeadNameField = (event) => {
        const { name, value } = event.target;
        setLeadForm(prev => ({ ...prev, [name]: value }));
    }

    const handleTagSelect = (selectedItems) => {
        const tagsToSubmit = selectedItems?.map(option => option.value);
        setLeadForm(prev => ({ ...prev, tags: tagsToSubmit })); console.log(tagsToSubmit);
        console.log(leadForm);
    }

    const handleLeadformSubmit = async (event) => {
        event.preventDefault();

        setFormLoading(true);

        try {
            const postRequest = await axios.post(postNewLeadUrl, leadForm);

            triggerToast(postRequest.data.message);

        } catch (error) {
            if (error.response) {
                triggerToast(error.response.data);
            } else {
                triggerToast(error.message);
            }
        } finally {
            setFormLoading(false); 
        }
    }

    return (
        <div class="container">
            <form className="form-design"  onSubmit={handleLeadformSubmit}>
                <section>
                    <h1>Add New Lead</h1>
                </section>
                <section>
                    <div className="lead-name-design">
                        <label htmlFor="lead-name">
                            Lead Name : 
                        </label>
                        <input className="leadName-input-box" type="text" id="lead-name" name="name"
                                maxLength={20}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[0-9]/g, "");
                                }} value={leadForm.name} onChange={handleLeadNameField}
                                placeholder="Green Earth Landscaping"

                                required />
                    </div>
                    <div className="source-design">
                        <label htmlFor="lead-source">
                            Lead Source : 
                        </label>
                        <select className="source-input-box" name="source" id="lead-source" value={leadForm.source} onChange={handleLeadNameField} required>
                                <option value="" disabled>Select Source</option>
                                <option value="Website">Website</option>
                                <option value="Referral">Referral</option>
                                <option value="Cold Call">Cold Call</option>
                                <option value="Advertisement">Advertisement</option>
                                <option value="Email">Email</option>
                                <option value="Other">Other</option>
                            </select>
                    </div>
                    <div className="salesAgent-design">
                        <label htmlFor="sales-agent">
                            Sales Agent : 
                        </label>
                        <select className="salesAgent-input-box" name="salesAgent" id="sales-agent" value={leadForm.salesAgent} onChange={handleLeadNameField} required>
                                <option value="" disabled>Select Sales Agent</option>
                                {loading ? <option disabled>loading...</option> : error ? <option disabled>error occured</option> : (
                                    data?.allAgents?.map((item, index) => (
                                        <option key={index} value={item._id}>{item.name}</option>
                                    ))
                                )}
                            </select>
                    </div>
                    <div className="status-design">
                        <label htmlFor="lead-status">
                            Lead Status : 
                        </label>
                        <select className="status-input-box" name="status" id="lead-status" value={leadForm.status} onChange={handleLeadNameField} required>
                                <option value="" disabled>Select Lead Status</option>
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Proposal Sent">Proposal Sent</option>
                                <option value="Closed">Closed</option>
                            </select>
                    </div>
                    <div className="priority-design">
                        <label htmlFor="priority">
                            Priority :
                        </label>
                         <select className="priority-input-box" name="priority" id="priority" value={leadForm.priority} onChange={handleLeadNameField} required>
                                <option value="" disabled>Select Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                    </div>
                    <div className="timeToClose-name-design">
                        <label htmlFor="Time-to-Close">
                            Time to Close : 
                        </label>
                        <input className="timeToClose-input-box" type="num" name="timeToClose" id="Time-to-Close" maxLength={3}
                                inputMode="numeric"
                                onInput={(e) => {
                                    const onlyNumbers = e.target.value.replace(/\D/g, "") 

                                    if (onlyNumbers === "" || parseInt(onlyNumbers,10) <= 120) {
                                        setLeadForm({ ...leadForm, timeToClose: onlyNumbers })
                                    }

                                }}
                                placeholder="Max 120 Days" value={leadForm.timeToClose} required />
                    </div>
                    <div className="tags-multi-design">
                        <label htmlFor="tags">
                            Tags : 
                        </label>
                        <Select
                            className="tags-input-box"
                                isMulti
                                options={tagOptions}
                                value={tagOptions?.filter(option => leadForm.tags.includes(option.value))}
                                onChange={handleTagSelect}
                                placeholder="Select tags..."
                                menuPlacement="auto"
                                id="tags"
                                required
                            />
                    </div>
                </section>
                <button type="submit" disabled={formLoading}>{formLoading ? "Loading..." : "Submit"}</button>
            </form>
            {showToast && (
                <div className={toastMessage.includes("error") ? "toast-red-style" : "toast-green-style"}>{toastMessage}</div> 
            )}
        </div>
    )
}

export default LeadForm;    