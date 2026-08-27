import useToast from "../hooks/useToast";
import axios from "axios";
import { useState, useContext } from "react";
import { AgentModalContext } from "../context/AgentModalContext";


const useAddNewSalesAgent = ()=>{

const { toastMessage, showToast, triggerToast } = useToast(null);
    const {isModalOpen, setIsModalOpen} = useContext(AgentModalContext);

    const [agentFormData, setAgentFormData] = useState({ name: "", email: "" });
    const [agentFormLoading, setAgentFormLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleAgentFormData = (event) => {
        const { name, value } = event.target;
        setAgentFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleAgentFormSubmit = async (event) => {
        event.preventDefault();
        setAgentFormLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/agents`, agentFormData);
            triggerToast(res.data.message);
        } catch (error) {
            if (error.response) {
                triggerToast(error.response.data?.message || error.response.data?.error || "Error Occured in Backend Database");
            } else {
                triggerToast(error.message);
            }
        } finally {
            setAgentFormLoading(false);
        }
    }

return {toastMessage, showToast, triggerToast, isModalOpen, setIsModalOpen, agentFormData, setAgentFormData, agentFormLoading, handleAgentFormData, handleAgentFormSubmit}    
}

export default useAddNewSalesAgent;