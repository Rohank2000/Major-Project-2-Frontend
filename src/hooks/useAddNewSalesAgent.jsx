import axios from "axios";
import { useState, useContext } from "react";
import { ModalContext } from "../context/ModalContext";

const useAddNewSalesAgent = (AgentTriggerToast)=>{

    const {isAgentModalOpen, setIsAgentModalOpen} = useContext(ModalContext);

    const [agentFormData, setAgentFormData] = useState({ name: "", email: "" });
    const [agentFormLoading, setAgentFormLoading] = useState(false);

    const BASE_URL = import.meta.env.BASE_URL;

    const handleAgentFormData = (event) => {
        const { name, value } = event.target;
        setAgentFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleAgentFormSubmit = async (event) => {
        event.preventDefault();
        setAgentFormLoading(true);
        try {
            const agentDataUpload = await axios.post(`${BASE_URL}/agents`, agentFormData);
            AgentTriggerToast(agentDataUpload.data.message);
        } catch (error) {
            if (error.response) {
                AgentTriggerToast(error.response.data?.message || error.response.data?.error || "Error Occured in Backend Database");
            } else {
                AgentTriggerToast(error.message);
            }
        } finally {
            setAgentFormLoading(false);
        }
    }

return {isAgentModalOpen, setIsAgentModalOpen, agentFormData, setAgentFormData, agentFormLoading, handleAgentFormData, handleAgentFormSubmit}    
}

export default useAddNewSalesAgent;