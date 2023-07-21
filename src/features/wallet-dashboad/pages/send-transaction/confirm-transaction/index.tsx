import { useEffect, useState } from "react";
import { Button, Modal, Spinner, Stack } from "react-bootstrap";
import { HttpService } from "../../../../../services";
import { useAuth } from "../../../../../common/contexts";
import { toast } from "react-toastify";
import { Transaction, UnspentTxOutput } from "@huyleminh/mycoin-sdk";

export interface IConfirmTransactionProps {
    show: boolean;
    onClose: () => void | undefined;
    onSubmit: () => void | undefined;

    initData: { amount: number; address: string };
}

export function ConfirmTransaction(props: IConfirmTransactionProps) {
    const { show, onClose, initData, onSubmit } = props;

    const authContext = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitTransaction = async () => {
        try {
            setIsLoading(true);

            // get unspent tx from BE
            const txRes = await HttpService.get<any[]>(`/wallet/${authContext.userKeyInfo.publickey}/unspent-txs`);

            if (txRes.code === 200) {
                const data = txRes.data! as UnspentTxOutput[];

                if (data.length === 0) {
                    toast.error("Not enough money");
                    setIsLoading(false);
                    return;
                }

                // sign tx
                const signedTransaction = Transaction.createSignTransaction({
                    receiver: initData.address,
                    amount: initData.amount,
                    senderPrivate: authContext.userKeyInfo.privateKey,
                    unspentTxOutputs: data,
                });

                // send

                const createRes = await HttpService.post<any>(`/transactions`, {
                    transaction: signedTransaction,
                });

                setIsLoading(false);

                if (createRes.code === 201) {
                    // close modal

                    onSubmit();
                    return;
                }

                if (createRes.code === 400) {
                    toast.error(createRes.message);
                    return;
                }

                return;
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        if (isLoading || !onClose) {
            return;
        }

        onClose();
    };

    useEffect(() => {
        if (show) {
            setIsLoading(false);
        }
    }, [show]);

    return (
        <Modal show={show} backdrop="static" centered keyboard={false} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title className="text-center w-100">Transaction Confirmation</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="mb-3">
                    <strong className="text-dark">Please double check everything.</strong> We will not be able to
                    reverse your transaction once it's submitted!
                </p>

                <hr />

                <Stack direction="vertical">
                    <Stack direction="horizontal" gap={3} className="w-100 mb-3 align-items-start">
                        <p className="mb-0 w-auto" style={{ minWidth: "100px" }}>
                            Sending:{" "}
                        </p>

                        <p
                            className="mb-0 d-inline-block flex-grow-1 w-100"
                            style={{ wordWrap: "break-word", overflow: "auto" }}
                        >
                            {initData.amount.toString()} TECO
                        </p>
                    </Stack>

                    <Stack direction="horizontal" gap={3} className="w-100 mb-3 align-items-start">
                        <p className="mb-0 w-auto" style={{ minWidth: "100px" }}>
                            To address:{" "}
                        </p>

                        <p
                            className="mb-0 d-inline-block flex-grow-1 w-100"
                            style={{ wordWrap: "break-word", overflow: "auto" }}
                        >
                            {initData.address}
                        </p>
                    </Stack>

                    <Stack direction="horizontal" className="justify-content-center align-items-center mb-3" gap={3}>
                        <Button
                            variant="light"
                            type="button"
                            className="text-primary border border-primary"
                            disabled={isLoading}
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>

                        <Button variant="primary" type="submit" disabled={isLoading} onClick={handleSubmitTransaction}>
                            {isLoading && <Spinner animation="border" size="sm" className="me-2" />}
                            Confirm & Send
                        </Button>
                    </Stack>
                </Stack>
            </Modal.Body>
        </Modal>
    );
}
