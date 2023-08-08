'use client'
import React, { ReactComponentElement } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

interface Children {
    children: React.ReactNode
}

const ReduxProvider: React.FC<Children> = ({ children }: Children) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default ReduxProvider;
