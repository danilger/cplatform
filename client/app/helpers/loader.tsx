import React, { useState, useEffect } from 'react';

const Loader: React.FC = () => {
    const [state, setState] = useState('Загрузка...');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setState(prevState => prevState === 'Загрузка...' ? 'Загрузка' : prevState + '.');
        }, 300);

        return () => {
            clearInterval(intervalId); // Очистка интервала при размонтировании компонента
        };
    }, []);

    return <>{state}</>;
};

export default Loader;
