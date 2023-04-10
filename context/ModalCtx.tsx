import { createContext, ReactNode, useState } from "react";

type Props = {
    children: ReactNode;
};

export const ModalContext = createContext({
    mobileNav: false,
    cartModal: false,
    signIn: false,
    confirmation: false,
    overLay: false,
    handleModal: (action: string) => {},
});

function ModalProvider({ children }: Props) {
    const [modal, setModal] = useState({
        mobileNav: false,
        cartModal: false,
        signIn: false,
        confirmation: false,
        overLay: false,
    });

    const handleModal = (action: string) => {
        if (action === "close") {
            setModal({
                mobileNav: false,
                cartModal: false,
                signIn: false,
                confirmation: false,
                overLay: false,
            });
        }

        if (action === "mobileNav") {
            setModal({
                mobileNav: true,
                cartModal: false,
                signIn: false,
                confirmation: false,
                overLay: true,
            });
        }

        if (action === "cart") {
            setModal({
                mobileNav: false,
                cartModal: !modal.cartModal,
                signIn: false,
                confirmation: false,
                overLay: !modal.overLay,
            });
        }

        if (action === "signIn") {
            setModal({
                mobileNav: false,
                cartModal: false,
                signIn: true,
                confirmation: false,
                overLay: !modal.overLay,
            });
        }

        if (action === "confirmation") {
            setModal({
                mobileNav: false,
                cartModal: false,
                signIn: false,
                confirmation: true,
                overLay: true,
            });
        }
    };

    const contextValues = { handleModal, ...modal };

    return (
        <ModalContext.Provider value={contextValues}>
            {children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;
