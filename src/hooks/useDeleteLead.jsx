import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useDeleteLead = (triggerToast) => {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const deleteLead = async (leadId) => {
        if (!leadId) {
            triggerToast?.("Lead ID is missing.");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this lead? This action cannot be undone."
        );
        if (!confirmed) return;

        setDeleting(true);
        setError(null);

        try {
            const response = await axios.delete(`${BASE_URL}/leads/${leadId}`);
            triggerToast?.(response.data.message || "Lead deleted successfully.");

            // Navigate after toast is visible (useToast reloads after 3s)
            // Delay navigation slightly to allow toast to show
            setTimeout(() => {
                navigate("/");
            }, 1200);
        } catch (err) {
            let message = "Failed to delete lead.";
            if (err.response) {
                message = err.response.data?.message || err.response.data?.error || message;
            } else if (err.request) {
                message = "Network Error: No response from server.";
            } else {
                message = err.message;
            }
            setError(message);
            triggerToast?.(message);
        } finally {
            setDeleting(false);
        }
    };

    return { deleteLead, deleting, error };
};

export default useDeleteLead;
