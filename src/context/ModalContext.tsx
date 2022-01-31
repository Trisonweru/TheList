import { createContext, useContext, ReactNode, useState } from "react";

type modalContextType = {
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
};

const modalContextDefaultValues: modalContextType = {
    open: false,
    handleOpen: () => {},
    handleClose: () => {},
};

const ModalContext = createContext<modalContextType>(modalContextDefaultValues);

export function useModal() {
    return useContext(ModalContext);
}

type Props = {
    children: ReactNode;
};

export function ModalProvider({ children }: Props) {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

     const value = {
        open,
        handleOpen,
        handleClose,
    };

    return (      
            <ModalContext.Provider value={value} >
                {children}
            </ModalContext.Provider>        
    );
}