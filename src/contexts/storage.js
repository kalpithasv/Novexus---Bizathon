import { createContext, useState } from "react";

const MemStorage = createContext();

const MemStorageProvider = ({ children }, props) => {
    const [globalStorage, setGlobalStorage] = useState({});

    const GSsetItem = (key, value) => {
        setGlobalStorage({
            ...globalStorage,
            [key]: value
        });
    }
    const GSgetItem = (key) => globalStorage[key];
    const GSremoveItem = (key) => {
        delete globalStorage[key];
        setGlobalStorage({
            ...globalStorage
        });
    }
    const GSclear = () => setGlobalStorage({});

    const gStorage = {
        getItem: GSgetItem,
        setItem: GSsetItem,
        removeItem: GSremoveItem,
        clear: GSclear
    }
    return (
        <MemStorage.Provider value={{ gStorage }}>
            {children}
        </MemStorage.Provider>
    );
};

export { MemStorage, MemStorageProvider }