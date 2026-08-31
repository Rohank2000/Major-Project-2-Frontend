import { useState } from "react";

const useToast = (message) => {
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const triggerToast = (message, options = {}) => {
        const { reload = true, duration = 3000 } = options;
        setToastMessage(message);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
            setToastMessage("");
            if (reload) {
                window.location.reload();
            }
        }, duration);
    }
    return { toastMessage, showToast, triggerToast }
}

export default useToast;