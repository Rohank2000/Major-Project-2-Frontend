import { useState, useContext, useMemo } from "react";
import axios from "axios";
import useAxios from "../hooks/useAxiosGET";
import useToast from "../hooks/useToast";
import { LeadModalContext } from "../context/LeadModalContext";

const useAddNewLead = (parentTriggerToast) => {
    const [leadFormData, setLeadFormData] = useState({
        name: "",
        source: "",
        salesAgent: "",
        status: "",
        priority: "",
        timeToClose: "",
        tags: []
    });

    const [formLoading, setFormLoading] = useState(false);

    const { isLeadModalOpen, setIsLeadModalOpen } = useContext(LeadModalContext);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const getAgentsUrl = `${BASE_URL}/agents`;
    const getTagsUrl = `${BASE_URL}/tags`;
    const postNewLeadUrl = `${BASE_URL}/leads`;

    const { data: agentData, loading: agentLoading, error: agentError } = useAxios(getAgentsUrl, []);
    const { data: tagData, loading: tagLoading, error: tagError } = useAxios(getTagsUrl, []);

    const agentList = agentData?.allAgents;

    const tagOptions = useMemo(() =>
        tagData?.tag?.map((item) => ({ value: item.name, label: item.name })),
        [tagData]
    );

    const { toastMessage, showToast, triggerToast } = useToast(null);

    const notify = parentTriggerToast || triggerToast;

    const handleLeadFormFields = (event) => {
        const { name, value } = event.target;
        setLeadFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleLeadFormSubmit = async (event) => {
        event.preventDefault();

        setFormLoading(true);

        try {
            const postRequest = await axios.post(postNewLeadUrl, leadFormData);
            notify(postRequest.data.message);
        } catch (error) {
            if (error.response) {
                notify(error.response.data?.message || error.response.data?.error || "An error occurred");
            } else {
                notify(error.message);
            }
        } finally {
            setFormLoading(false);
        }
    }

    return {
        leadFormData,
        formLoading,
        isLeadModalOpen,
        setIsLeadModalOpen,
        agentList,
        agentLoading,
        agentError,
        tagOptions,
        tagLoading,
        tagError,
        handleLeadFormFields,
        handleLeadFormSubmit
    };
}

export default useAddNewLead;
