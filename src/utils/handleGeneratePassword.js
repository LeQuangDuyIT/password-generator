import { specialCharacters } from './constants';

const handleGeneratePassword = (length, conditionsCheckList) => {
    let password = [];
    for (let i = 0; i < length; i++) {
        password = [...password, '*'];
    }

    const getFunctionByCondition = conditionsCheckList.map(condition =>
        getRandomCharacterByCondition().find(conditionObj => conditionObj.condition === condition)
    );

    const getIndexsToStart = getRandomNNumbers(conditionsCheckList.length, length);
    for (let i = 0; i < getIndexsToStart.length; i++) {
        password[getIndexsToStart[i]] = getFunctionByCondition[i].getRandom();
    }

    for (let i = 0; i < length; i++) {
        if (password[i] === '*') {
            const randomType = Math.floor(Math.random() * conditionsCheckList.length);
            const randomCharacter = getFunctionByCondition[randomType].getRandom();
            password[i] = randomCharacter;
        }
    }

    return password.join('');
};

const getRandomNNumbers = (quantity, limitValue) => {
    let numbers = [];
    while (numbers.length < quantity) {
        const randomNumber = Math.floor(Math.random() * limitValue);
        const shouldPush = !numbers.includes(randomNumber);
        if (shouldPush) {
            numbers.push(randomNumber);
        }
    }
    return numbers;
};

const getRandomCharacterByCondition = () => {
    const getCharByASCII = (quantity, startIndex) => {
        const randomIndex = Math.floor(Math.random() * quantity);
        const randomCharCode = startIndex + randomIndex;
        return String.fromCharCode(randomCharCode);
    };
    return [
        {
            condition: 'upper',
            getRandom: () => getCharByASCII(26, 65)
        },
        {
            condition: 'lower',
            getRandom: () => getCharByASCII(26, 97)
        },
        {
            condition: 'number',
            getRandom: () => Math.floor(Math.random() * 10)
        },
        {
            condition: 'symbol',
            getRandom: () => {
                const randomIndex = Math.floor(Math.random() * specialCharacters.length);
                return specialCharacters[randomIndex];
            }
        }
    ];
};

export default handleGeneratePassword;
