import React, { createContext, ReactNode, useState } from "react";

type Props = {
    children: ReactNode;
};

type ParamsArray = { params: number }[];

type paramsContextType = {
    params: ParamsArray;
    setNewParams: (newParams: ParamsArray) => void;
};

const paramsContextDefaultValues: paramsContextType = {
    params: [],
    setNewParams: () => {},
};

export const ParamsContext = createContext<paramsContextType>(
    paramsContextDefaultValues
);

export function ParamsProvider({ children }: Props) {
    const [params, setParams] = useState<ParamsArray>([]);

    const setNewParams = (newParams: ParamsArray) => {
        setParams(newParams);
    };

    const contextValues = { params, setNewParams };

    return (
        <ParamsContext.Provider value={contextValues}>
            {children}
        </ParamsContext.Provider>
    );
}

export default ParamsProvider;
