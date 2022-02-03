/* eslint-disable */
import { createContext } from 'react';

type matisseContextType = {
    lastUpdatedTime : number;
    setLastUpdatedTime : (time: number) => void;
}

const matisseContextDefaultValues: matisseContextType = {
    lastUpdatedTime: Date.now(),
    setLastUpdatedTime: () => {},
};


const MatisseContext = createContext<matisseContextType>(matisseContextDefaultValues);

export default MatisseContext;

