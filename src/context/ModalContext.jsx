import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
    const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ isLeadModalOpen, setIsLeadModalOpen, isAgentModalOpen, setIsAgentModalOpen, isDeleteModalOpen, setIsDeleteModalOpen}}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;