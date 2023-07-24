import { useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AccessKeystoreModal } from "../access-keystore-modal";
import "./styles.scss";

export interface IAccessWalletPageProps {}

export function AccessWalletPage(_props: IAccessWalletPageProps) {
    const [modal, setModal] = useState({
        show: false,
        onClose: () => {},
    });

    const handleOpenAccessModal = () => {
        setModal({ ...modal, show: true, onClose: handleCloseModal });
    };

    const handleCloseModal = () => {
        setModal({ ...modal, show: false });
    };

    return (
        <Stack direction="horizontal" className="justify-content-center align-items-center access-wallet-container">
            <Stack direction="vertical" className="justify-content-center align-items-center p-3 access-wallet-wrapper">
                <h1 className="text-white text-center mb-2">Access my wallet</h1>

                <p className="text-white text-center mb-0 fs-5">Please select a method to access your wallet.</p>
                <p className="text-white text-center mb-2 fs-5">
                    Don't have a wallet?{" "}
                    <Link to="/wallet/create" className="text-decoration-underline" style={{ color: "#f55dff" }}>
                        Create Wallet
                    </Link>
                </p>

                <Card className="cursor-pointer px-4 py-3 access-wallet-method mt-3" onClick={handleOpenAccessModal}>
                    <Stack direction="horizontal" gap={3}>
                        <div className="access-wallet-method-logo">
                            <img src="/images/folder.png" alt="folder-logo" loading="lazy" />
                        </div>

                        <Stack direction="vertical" className="align-items-start justify-content-center w-100">
                            <p className="text-dark fs-3 mb-0">Keystore File</p>

                            <p className="text-dark  mb-0">Using a keystore file from your local machine.</p>
                        </Stack>
                    </Stack>
                </Card>

                <Link to="/" className="mt-3">
                    <button className="btn text-white border border-1">Back to home</button>
                </Link>
            </Stack>

            <AccessKeystoreModal show={modal.show} onHide={modal.onClose} />
        </Stack>
    );
}
