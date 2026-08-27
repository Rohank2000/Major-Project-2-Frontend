import { createContext, useState } from "react";

export const LeadModalContext = createContext();

export const LeadModalProvider = ({ children }) => {
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

    return (
        <LeadModalContext.Provider value={{ isLeadModalOpen, setIsLeadModalOpen }}>
            {children}
        </LeadModalContext.Provider>
    );
};

export default LeadModalProvider;