import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CustomSnackbar = ({ message, isVisible, onClose }) => {
    const [open, setOpen] = useState(isVisible);
    const [displayMessage, setDisplayMessage] = useState(message);

    useEffect(() => {
        if (isVisible) {
            setOpen(true);
            setDisplayMessage(message); // Lưu trữ thông báo khi hiển thị
            const timer = setTimeout(() => {
                setOpen(false);
                if (onClose) onClose(); // Gọi callback khi `Snackbar` đóng
            }, 2000); // Thời gian hiển thị 2 giây
            return () => clearTimeout(timer);
        }
    }, [isVisible,message, onClose]);

    // Xác định kiểu thông báo và màu sắc

    const severity = displayMessage.includes("successfully") ? "success" : "error";

    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => setOpen(false)}
        >
            <Alert
                onClose={() => setOpen(false)}
                severity={severity}
                sx={{
                    width: "100%",
                    backgroundColor: severity === "success" ? "green" : "red",
                    color: "#fff",
                }}
            >
                {displayMessage}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
