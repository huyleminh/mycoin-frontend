import { useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CreateWalletModal } from "../create-wallet-modal";
import "./styles.scss";

export interface ICreateWalletPageProps {}

export function CreateWalletPage(_props: ICreateWalletPageProps) {
    const [modal, setModal] = useState({
        show: false,
        onClose: () => {},
    });

    const handleKeyStoreModal = () => {
        setModal({ ...modal, show: true, onClose: handleCloseKeyStoreModal });
    };

    const handleCloseKeyStoreModal = () => {
        setModal({ ...modal, show: false });
    };

    return (
        <Stack direction="horizontal" className="justify-content-center align-items-center create-wallet-container">
            <Stack direction="vertical" className="justify-content-center align-items-center p-3 create-wallet-wrapper">
                <h1 className="text-white text-center mb-2">Create a new wallet</h1>

                <p className="text-white text-center mb-0 fs-5">Please select a method to create a new wallet</p>
                <p className="text-white text-center mb-2 fs-5">
                    Already have a wallet?{" "}
                    <Link to="/wallet/access" className="text-decoration-underline" style={{ color: "#f55dff" }}>
                        Access Wallet
                    </Link>
                </p>

                <Card className="cursor-pointer px-4 py-3 create-wallet-method mt-3" onClick={handleKeyStoreModal}>
                    <Stack direction="horizontal" gap={3}>
                        <div className="create-wallet-method-logo">
                            <img src="/images/folder.png" alt="folder-logo" loading="lazy" />
                        </div>

                        <Stack direction="vertical" className="align-items-start justify-content-center w-100">
                            <p className="text-dark fs-3 mb-0">Keystore File</p>

                            <p className="text-dark  mb-0">Create keystore file and password</p>
                        </Stack>
                    </Stack>
                </Card>

                <Link to="/" className="mt-3">
                    <button className="btn text-white border border-1">Back to home</button>
                </Link>
            </Stack>

            <CreateWalletModal show={modal.show} onHide={modal.onClose} />
        </Stack>
    );
}
