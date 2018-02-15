import React from 'react';
import { Transition } from 'react-transition-group'
import './Loading.css';

const Loading = ({ in: inProp }) => (
    <Transition in={inProp} timeout={2000}>
        {(status) => (
                <div className={`text-center loading fade ${status}`}>
                    <img src='/img/loading.svg' alt="loading" />
                </div>
        )}
    </Transition>
);

export default Loading;

