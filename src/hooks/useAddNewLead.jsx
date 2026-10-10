import { useState, useContext} from "react";
import axios from "axios";
import useAxios from "../hooks/useAxiosGET";
import { ModalContext } from "../context/ModalContext";

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

    const { isLeadModalOpen, setIsLeadModalOpen } = useContext(ModalContext);

    const BASE_URL = import.meta.env.BASE_URL;

    const getAgentsUrl = `${BASE_URL}/agents`;
    const getTagsUrl = `${BASE_URL}/tags`;
    const postNewLeadUrl = `${BASE_URL}/leads`;

    const { data: agentData, loading: agentLoading, error: agentError } = useAxios(getAgentsUrl, []);
    const { data: tagData, loading: tagLoading, error: tagError } = useAxios(getTagsUrl, []);

    const agentList = agentData?.allAgents;

    const tagOptions = tagData?.tag?.map((item) => ({ value: item.name, label: item.name }));

    const handleLeadFormFields = (event) => {
        const { name, value } = event.target;
        setLeadFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleLeadFormSubmit = async (event) => {
        event.preventDefault();

        setFormLoading(true);

        try {
            const leadDataUpload = await axios.post(postNewLeadUrl, leadFormData);
            parentTriggerToast(leadDataUpload.data.message);
        } catch (error) {
            if (error.response) {
                parentTriggerToast(error.response.data?.message || error.response.data?.error || "Error Occured in Backend Database");
            } else {
                parentTriggerToast(error.message);
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
