import { useEffect, useState } from 'react';
import './App.css';
import { passwordConditionsCheckList } from './utils/constants';
import handleGeneratePassword from './utils/handleGeneratePassword';
import NotificationBox from './components/NotificationBox/NotificationBox';

function App() {
    const [length, setLength] = useState(26);
    const [checkedList, setCheckedList] = useState([]);
    const [password, setPassword] = useState('');
    const [notiBoxes, setNotiBoxes] = useState([]);

    const onCheck = checkingName => {
        const isChecked = checkedList.includes(checkingName);
        if (isChecked) {
            const newCheckedList = checkedList.filter(checkedItem => checkedItem !== checkingName);
            setCheckedList(newCheckedList);
        } else {
            setCheckedList(prevCheckedList => [...prevCheckedList, checkingName]);
        }
    };

    const onGeneratePassword = event => {
        event.preventDefault();
        if (checkedList.length > 0) {
            const result = handleGeneratePassword(length, checkedList);
            setPassword(result);
            setNotiBoxes(prevNotiBoxes => [...prevNotiBoxes, { boxId: new Date().getTime(), content: 'succeeded' }]);
        } else {
            setNotiBoxes(prevNotiBoxes => [...prevNotiBoxes, { boxId: new Date().getTime(), content: 'error' }]);
            setPassword('');
        }
    };

    const handleCloseBox = boxId => {
        const newNotiBoxes = notiBoxes.filter(box => box.boxId !== boxId);
        setNotiBoxes(newNotiBoxes);
    };

    const handleClickCopy = () => {
        if (password !== '') {
            navigator.clipboard.writeText(password);
            setNotiBoxes(prevNotiBoxes => [...prevNotiBoxes, { boxId: new Date().getTime(), content: 'copied' }]);
        }
    };

    return (
        <div className="container">
            <div className="noti-space">
                {notiBoxes.length > 0 &&
                    notiBoxes.map(box => (
                        <NotificationBox
                            key={box.boxId}
                            {...box}
                            handleCloseBox={handleCloseBox}
                            notiBoxes={notiBoxes}
                            password={password}
                        />
                    ))}
            </div>
            <h1 className="title">Password Generator</h1>
            <div className="input-bar">
                <input type="text" value={password} readOnly />
                <button className="copy-password-btn" onClick={handleClickCopy}>
                    <i className="fa-regular fa-clipboard fa-xl"></i>
                </button>
            </div>
            <form className="conditions-space">
                <div className="form-item">
                    <label htmlFor="length">Password length</label>
                    <input
                        type="number"
                        id="length"
                        min={4}
                        max={26}
                        value={length}
                        onChange={e => setLength(e.target.value)}
                    />
                </div>
                {passwordConditionsCheckList.map(condition => {
                    const { checkingName, labelContent } = condition;
                    return (
                        <div className="form-item" key={checkingName}>
                            <label htmlFor={checkingName}>{labelContent}</label>
                            <input
                                type="checkbox"
                                id={checkingName}
                                checked={checkedList.includes(checkingName)}
                                onChange={() => onCheck(checkingName)}
                            />
                        </div>
                    );
                })}
                <button className="generate-btn" onClick={onGeneratePassword}>
                    Generate Password
                </button>
            </form>
        </div>
    );
}

export default App;
