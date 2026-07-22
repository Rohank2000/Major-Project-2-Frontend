import { useState } from "react";

const useToast = (message) => {
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const triggerToast = (message) => {
        setToastMessage(message);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
            setToastMessage("");
            window.location.reload();
 
        }, 3000);
    }
    return { toastMessage, showToast, triggerToast }
}

export default useToast;