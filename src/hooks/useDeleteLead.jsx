import axios from "axios";
import { useState, useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { useNavigate } from "react-router-dom";

const useDeleteLead = (DeletetriggerToast) => {

    const {isDeleteModalOpen, setIsDeleteModalOpen} = useContext(ModalContext);

    const [deleteLoading, setDeleteLoading] = useState(false);

    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const deleteLead = async (leadId) => {
        if (!leadId) {
            DeletetriggerToast("Lead ID is missing.");
            return;
        }

        setDeleteLoading(true);

        try {
            const deleteLeadData = await axios.delete(`${BASE_URL}/leads/${leadId}`);
            DeletetriggerToast(deleteLeadData.data.message, { reload: false });

            setTimeout(() => {
                navigate("/");
            }, 3000);

        } catch (error) {
            if (error.response) {
                DeletetriggerToast(error.response.data?.message || error.response.data?.error);
            } else {
                DeletetriggerToast(error.message);
            }
        } finally {
            setDeleteLoading(false);
        }
    };

    return { deleteLead, deleteLoading, isDeleteModalOpen, setIsDeleteModalOpen };
};

export default useDeleteLead;