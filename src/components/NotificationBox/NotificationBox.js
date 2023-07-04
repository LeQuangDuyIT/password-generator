import React, { useEffect, useState } from 'react';
import './NotificationBox.css';

const NotificationBox = props => {
    const { boxId, content, handleCloseBox, notiBoxes, password } = props;
    const [showBox, setShowBox] = useState(true);
    const [countDownTime, setCountDownTime] = useState(5000);
    const [runTimeOut, setRunTimeOut] = useState(true);

    useEffect(() => {
        let timer;
        if (countDownTime <= 0) {
            setShowBox(false);
        } else if (runTimeOut) {
            timer = setInterval(() => {
                setCountDownTime(prevCountDownTime => prevCountDownTime - 10);
            }, 10);
        }
        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [runTimeOut, countDownTime]);

    return (
        showBox && (
            <div
                className="notibox__wrap"
                onMouseEnter={() => setRunTimeOut(false)}
                onMouseLeave={() => setRunTimeOut(true)}
                style={{ opacity: notiBoxes[notiBoxes.length - 1].boxId === boxId ? 1 : 0.3 }}
            >
                {content === 'error' && (
                    <div className="error-icon">
                        <i className="fa-solid fa-exclamation"></i>
                    </div>
                )}
                <p>
                    {content === 'succeeded' && 'Password created successfully!'}
                    {content === 'error' && 'To generate password you must select at least one checkbox'}
                    {content === 'copied' && `Password copied: ${password}`}
                </p>
                <button className="close-btn" onClick={() => handleCloseBox(boxId)}>
                    <i className="fa-solid fa-xmark fa-lg"></i>
                </button>
                <div
                    className={`countdown-line ${
                        content === 'succeeded' ? 'success' : content === 'error' ? 'error' : 'copied'
                    }`}
                    style={{ width: `${countDownTime / 50}%` }}
                ></div>
            </div>
        )
    );
};

export default NotificationBox;
