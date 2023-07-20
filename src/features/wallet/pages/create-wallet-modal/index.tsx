import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { EnterPasswordStep, IPasswordForm } from "../../components/enter-password-step";
import { StoreKeyStep } from "../../components/store-key-step";
import { WalletService } from "../../../../services";
import { CompleteStep } from "../../components/complete-step";
import { useNavigate } from "react-router-dom";

export interface ICreateWalletModalProps {
    show: boolean;
    onHide: (rerender?: boolean) => void | undefined;
}

export function CreateWalletModal(props: ICreateWalletModalProps) {
    const { show, onHide } = props;
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);

    const [data, setData] = useState<string>("");

    const handleCloseForm = () => {
        onHide && onHide();
    };

    const handleStepOneSubmit = (value: IPasswordForm) => {
        setData(value.password);
        setCurrentStep(2);
    };

    const handleStepTwoSubmit = () => {
        // download file
        const timestamp = new Date().getTime() / 1000;
        const fileData = WalletService.generateAndEncryptKeyPair({ password: data, timestamp });

        const blob = new Blob([JSON.stringify({ key: fileData })], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.download = `${timestamp}_wallet_store_key`;
        downloadLink.href = url;
        downloadLink.click();

        setCurrentStep(3);
    };

    useEffect(() => {
        if (show) {
            setCurrentStep(1);
        }
    }, [show]);

    return (
        <Modal show={show} onHide={() => handleCloseForm()} keyboard={false} size="lg" backdrop="static" centered>
            <Modal.Header closeButton></Modal.Header>

            <Modal.Body>
                <h2 className="mb-5 text-center d-block">Create Wallet with Keystore File</h2>

                <div className="mt-3">
                    {currentStep === 1 && <EnterPasswordStep onSubmit={handleStepOneSubmit} />}

                    {currentStep === 2 && (
                        <StoreKeyStep onCancel={() => setCurrentStep(1)} onSubmit={handleStepTwoSubmit} />
                    )}

                    {currentStep === 3 && (
                        <CompleteStep onCancel={() => setCurrentStep(1)} onSubmit={() => navigate("/wallet/access")} />
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}
