import useAxios from "../hooks/useAxiosGET"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import useToast from "../hooks/useToast";
import useDeleteLead from "../hooks/useDeleteLead";

const LeadManagement = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        source: "",
        salesAgent: "",
        status: "",
        tags: [],
        timeToClose: "",
        priority: ""
    })
    const [commentFormData, setCommentFormData] = useState({
        lead: "",
        author: "",
        commentText: ""
    });

    const [formLoading, setFormLoading] = useState(false);
    const [commentFormLoading, setCommentFormLoading] = useState(false);
    const { toastMessage, showToast, triggerToast } = useToast(null);
    const { deleteLead, deleteLoading, isDeleteModalOpen, setIsDeleteModalOpen } = useDeleteLead(triggerToast);

    const BASE_URL = import.meta.env.BASE_URL

    const agentList = `${BASE_URL}/agents`;
    const { data: agentData, loading: loadingAgent, error: agentError } = useAxios(agentList, []);
    const filteredAgentData = agentData?.allAgents;

    const { leadId } = useParams();

    useEffect(() => {
        if (!leadId) {
            triggerToast("Lead ID is missing.");
            return
        }
    }, [leadId]);

    const getLeadsData = `${BASE_URL}/leads`;
    const { data: leadsData, loading: leadsLoading, error: leadsError } = useAxios(getLeadsData, []);
    const presentLeadDetails = leadsData?.lead?.find((item) => item._id === leadId);

    const getTagsData = `${BASE_URL}/tags`;
    const { data: tagsData, loading: tagsLoading, error: tagsError } = useAxios(getTagsData, []);

    const getLeadsNameData = presentLeadDetails?.name;
    const getLeadsstatusData = presentLeadDetails?.status;
    const getLeadstagsData = presentLeadDetails?.tags?.map((item) => ({ value: item, label: item }));
    const getLeadstimeToCloseData = presentLeadDetails?.timeToClose;
    const getLeadspriorityData = presentLeadDetails?.priority;

    const editLeadDataUrl = `${BASE_URL}/leads/${leadId}`;

    const addCommentUrl = `${BASE_URL}/leads/${presentLeadDetails?._id}/comments`;

    const getCommentData = `${BASE_URL}/leads/${presentLeadDetails?._id}/comments`;

    const { data: commentData, loading: commentLoading, error: commentError } = useAxios(getCommentData, []);

    const handleInputData = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    }

    const uploadFormData = async (event) => {
        event.preventDefault();

        if (!leadId) {
            triggerToast("Lead not loaded yet, please wait.");
            return;
        }

        const finalPayload = Object.fromEntries(Object.entries(formData).filter(([_, value]) => value !== "" && value.length !== 0));

        setFormLoading(true);

        try {
            const editLeadData = await axios.put(editLeadDataUrl, finalPayload);
            triggerToast(editLeadData.data.message);
        } catch (error) {
            if (error.response) {
                triggerToast(error.response.data?.message || error.response.data?.error || "Error Occured in Backend Database");
            } else {
                triggerToast(error.message);
            }
        } finally {
            setFormLoading(false);
        }
    }

    const handleCommentFormData = (event) => {
        const { name, value } = event.target;

        setCommentFormData((prevComment) => ({ ...prevComment, [name]: value }));

        setCommentFormData((prevComment) => ({ ...prevComment, lead: presentLeadDetails?._id }));

    }

    const uploadComment = async (event) => {
        event.preventDefault();

        if (!leadId) {
            triggerToast("Lead ID is missing.");
            return;
        }

        if (!presentLeadDetails?._id) {
            triggerToast("Lead ID is missing.");
            return;
        }

        setCommentFormLoading(true);

        try {
            const addNewComment = await axios.post(addCommentUrl, commentFormData);
            triggerToast(addNewComment.data.message);
        } catch (error) {
            if (error.response) {
                triggerToast(error.response.data?.message || error.response.data?.error || "Error Occured in Backend Database");
            } else {
                triggerToast(error.message);
            }
        } finally {
            setCommentFormLoading(false);
        }
    }

    return (
        <div className="dashboard-wrapper">
            {showToast && (
                <div className={String(toastMessage).toLowerCase().includes("error") || String(toastMessage).toLowerCase().includes("invalid") ? "toast-red-style" : "toast-green-style"}>{toastMessage}</div>
            )}
            <main className="dashboard-wrapper">
                <div className="lead-management-border-around-h2">
                    <h2>Lead Management: [{presentLeadDetails?.name}]</h2>
                    <div className="lead-management-sidebar-and-body">
                        <aside className="lead-management-aside">
                            <h3>Sidebar</h3>
                            <div className="lead-management-sidebar-border">
                                <Link to="/">
                                    <button className="back-to-dashboard-design">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="white"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                                        </svg>
                                        <p>Back to Dashboard</p>
                                    </button>
                                </Link>
                            </div>
                        </aside>
                        <section className="lead-management-section-body">
                            <h2>Lead Details</h2>
                            <div className="lead-management-lead-details-border">
                                <div className="lead-management-lead-details-paragraph-card">
                                    <p>Lead Name : {leadsLoading ? "Loading..." : leadsError ? "Error Occured" : presentLeadDetails?.name}</p>
                                    <p>Sales Agent : {leadsLoading ? "Loading..." : leadsError ? "Error Occured" : presentLeadDetails?.salesAgent?.name}</p>
                                    <p>Tags : {leadsLoading ? "Loading..." : leadsError ? "Error Occured" : presentLeadDetails?.tags?.join(", ")}</p>
                                    <p>Source : {leadsLoading ? "Loading..." : leadsError ? "Error Occured" : presentLeadDetails?.source}</p>
                                    <p>Status : {leadsLoading ? "Loading..." : leadsError ? "Error Occured" : presentLeadDetails?.status}</p>
                                    <p>Priority : {leadsLoading ? "Loading..." : leadsError ? "Error Occured" : presentLeadDetails?.priority}</p>
                                    <p> Time to Close : {leadsLoading ? "Loading..." : leadsError ? "Error Occured" : presentLeadDetails?.timeToClose} Days</p>
                                </div>
                            </div>
                            <div className="lead-management-edit-details-styles">
                                <button onClick={() => setIsEditModalOpen(true)}>
                                    Edit Lead Details
                                </button>
                            </div>
                            {isDeleteModalOpen && (
                                <div className="delete-modal-overlay" onClick={() => setIsDeleteModalOpen(false)}>
                                    <div className="delete-modal-content" onClick={(event) => event.stopPropagation()}>
                                        <button type="button" className="delete-cross-cancel-button-style" onClick={() => setIsDeleteModalOpen(false)}>
                                            &times;
                                        </button>
                                        <p>
                                            Are you sure you want to delete this lead? This action cannot be undone.
                                        </p>
                                        <div className="delete-button-alignment-style">
                                            <button type="button" className="delete-button" onClick={() => deleteLead(leadId)} disabled={deleteLoading || leadsLoading || !presentLeadDetails}>{deleteLoading ? "Deleting..." : "Permanently Delete"}</button>
                                            <button type="button" className="delete-cancel-button" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="lead-management-delete-styles">
                                <button
                                    className="delete-lead-button"
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    disabled={deleteLoading || leadsLoading || !presentLeadDetails}
                                    title="Delete this lead permanently"
                                >
                                    {deleteLoading ? (
                                        "Deleting..."
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                            Delete Lead
                                        </>
                                    )}
                                </button>
                            </div>
                            <h2>Comments Section</h2>
                            <div className="lead-management-comment-horizontal-lines">
                                <div className="lead-management-comment-green-container">
                                    {commentLoading ? "Loading..." : commentError ? "Error Occured" : commentData?.comments?.length === 0 ? (
                                        <div className="lead-management-comment-white-container">
                                            <p className="lead-management-comment-date-time">
                                            </p>
                                            <p className="lead-management-comment-main-content">
                                                No Comment Available For This Lead.
                                            </p>
                                        </div>
                                    ) : (commentData?.comments?.map((item, index) => {
                                        const rawDate = item?.createdAt;
                                        const date = new Date(rawDate);
                                        const localDate = date.toLocaleDateString('en-india', {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        });
                                        const localTime = date.toLocaleTimeString('en-india', {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        });
                                        return (
                                            <div key={index} className="lead-management-comment-white-container">
                                                <p className="lead-management-comment-date-time">
                                                    <small>  {item?.author?.name} - {localDate} - {localTime}
                                                    </small>
                                                </p>
                                                <p className="lead-management-comment-main-content">
                                                    Comment: {item?.commentText}
                                                </p>
                                            </div>
                                        )
                                    }))}
                                </div>
                            </div>
                            <form onSubmit={uploadComment} className="centering-the-add-comment">
                                <div className="lead-management-comment-button-blue-styles">
                                    <textarea name="commentText" maxLength={1000} placeholder="Write a comment..." className="lead-management-comment-textarea" value={commentFormData.commentText} onChange={handleCommentFormData} required></textarea>
                                    <div className="lead-management-comment-select-and-label">
                                        <label htmlFor="lead-sales-agent" className="lead-management-comment-label">SalesAgent</label>
                                        <select name="author" id="lead-sales-agent" className="lead-management-comment-select" value={commentFormData.author} onChange={handleCommentFormData} required>
                                            <option value="" disabled>Select SalesAgent</option>
                                            {loadingAgent ? "Loading" : agentError ? "Error Occured" : filteredAgentData?.map((item, index) => (
                                                <option key={index} value={item._id} className="lead-management-comment-select-option">{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="lead-management-comment-button-styles">
                                        <button type="submit" disabled={commentFormLoading}>{commentFormLoading ? "Loading" : "Submit"}</button>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                    {isEditModalOpen && (
                        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                            <div className="modal-content" onClick={(event) => event.stopPropagation()}>
                                <button type="button" className="modal-close-button" onClick={() => setIsEditModalOpen(false)}>
                                    &times;
                                </button>
                                <form className="form-style" onSubmit={uploadFormData}>
                                    <h2>Edit Lead Details</h2>
                                    <div className="horizontal-alignment-edit-lead-form-elements">
                                        <div className="vertical-Stacking-edit-lead-details">
                                            <label htmlFor="lead-name">Lead Name</label>
                                            <textarea className="lead-name-textarea-style" id="lead-name" value={leadsLoading ? "Loading..." : getLeadsNameData} disabled />
                                        </div>

                                        <div className="vertical-Stacking-edit-lead-details">
                                            <label htmlFor="lead-source">Lead Source</label>
                                            <select className="vertical-Stacking-edit-lead-details-input-style" name="source" id="lead-source" value={leadsLoading ? "Loading..." : formData.source} onChange={handleInputData}>
                                                <option value="" disabled>Select Source</option>
                                                <option value="Website">Website
                                                </option>
                                                <option value="Referral">Referral
                                                </option>
                                                <option value="Cold Call">Cold Call</option>
                                                <option value="Advertisement">Advertisement</option>
                                                <option value="Email">Email</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="vertical-Stacking-edit-lead-details">
                                            <label htmlFor="lead-salesAgent">Sales Agent</label>
                                            <select className="vertical-Stacking-edit-lead-details-input-style" name="salesAgent" id="lead-salesAgent" value={leadsLoading ? "Loading..." : formData.salesAgent} onChange={handleInputData}>
                                                <option value="" disabled>Select SalesAgent</option>
                                                {loadingAgent ? "Loading" : agentError ? "Error Occured" : filteredAgentData?.map((item, index) => (
                                                    <option key={index} value={item._id}>{item.name}</option>
                                                ))}
                                            </select>                                        </div>
                                    </div>

                                    <div className="horizontal-alignment-edit-lead-form-elements">
                                        <div className="vertical-Stacking-edit-lead-details">
                                            <label htmlFor="lead-status">Lead Status</label>
                                            <select className="vertical-Stacking-edit-lead-details-input-style" name="status" id="lead-status" value={formData.status} onChange={handleInputData}>
                                                <option value="" disabled>Select Lead Status</option>
                                                <option value="New">New</option>
                                                <option value="Contacted">Contacted</option>
                                                <option value="Qualified">Qualified</option>
                                                <option value="Proposal Sent">Proposal Sent</option>
                                                <option value="Closed">Closed</option>

                                            </select>
                                        </div>

                                        <div className="vertical-Stacking-edit-lead-details">
                                            <label htmlFor="lead-priority">Priority</label>
                                            <select className="vertical-Stacking-edit-lead-details-input-style" name="priority" id="lead-priority" disabled>
                                                <option>{leadsLoading ? "Loading..." : getLeadspriorityData}</option>
                                            </select>
                                        </div>

                                        <div className="vertical-Stacking-edit-lead-details">
                                            <label htmlFor="lead-timeToClose">Time To Close</label>
                                            <input className="vertical-Stacking-edit-lead-details-input-style" type="number" name="timeToClose" id="lead-timeToClose" value={leadsLoading ? "Loading..." : getLeadstimeToCloseData} disabled />
                                        </div>
                                    </div>

                                    <div className="vertical-Stacking-edit-lead-details">
                                        <label htmlFor="lead-tag">Tags</label>
                                        <Select isDisabled className="vertical-Stacking-edit-lead-details-input-style" id="lead-tag" classNamePrefix="rs" isMulti options={getLeadstagsData} value={leadsLoading ? "Loading.." : getLeadstagsData}></Select>
                                    </div>
                                    <div className="form-button-styling">
                                        <button className="submit-button" type="submit" disabled={formLoading || leadsLoading}>{formLoading || leadsLoading ? "Loading" : "Submit"}</button>
                                        <button className="cancel-button" type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default LeadManagement;