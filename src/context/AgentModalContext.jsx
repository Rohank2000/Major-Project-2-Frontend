import { createContext, useState } from "react";

export const AgentModalContext = createContext();

export const AgentModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <AgentModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
            {children}
        </AgentModalContext.Provider>
    );
};

export default AgentModalProvider;