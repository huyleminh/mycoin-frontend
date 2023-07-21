import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Modal, Row, Stack } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../../../common/contexts";
import { ConfirmTransaction } from "./confirm-transaction";

export interface ISendTransactionPageProps {}

export interface ITransactionForm {
    amount: number;
    address: string;
}

export function SendTransactionPage(_props: ISendTransactionPageProps) {
    const authContext = useAuth();
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ITransactionForm>({
        resolver: zodResolver(
            z.object({
                amount: z
                    .number()
                    .gt(0, "Amount must be larger than 0")
                    .lte(authContext.userKeyInfo.balance, "Not enough money"),
                address: z
                    .string({ required_error: "Address cannot be empty" })
                    .trim()
                    .length(130, "Invalid key length")
                    .startsWith("04", "Invalid key format"),
            })
        ),
        defaultValues: { amount: 0, address: "" },
    });

    const [modal, setModal] = useState({
        show: false,
        initData: { amount: 0, address: "" },
    });

    const [okModal, setOkModal] = useState({
        show: false,
    });

    const handleSubmitForm: SubmitHandler<ITransactionForm> = async (value) => {
        // open confirm
        setModal({ ...modal, show: true, initData: { ...value } });
    };

    const handleSubmitTransaction = () => {
        setModal({ ...modal, show: false });
        // open modal
        setOkModal({ ...okModal, show: true });
    };

    useEffect(() => {
        reset();
    }, []);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-dark px-2">Create Transaction</Card.Title>

                            <Form onSubmit={handleSubmit(handleSubmitForm)}>
                                <FormGroup className="mb-3">
                                    <Form.Label className="d-flex">
                                        <span>Amount</span> <small className="text-danger">*</small>
                                        <p className="flex-grow-1 text-end mb-0 text-success">
                                            Current balance: {authContext.userKeyInfo.balance}
                                        </p>
                                    </Form.Label>

                                    <Controller
                                        control={control}
                                        name="amount"
                                        render={({ field: { ref, value, onChange } }) => (
                                            <FormControl
                                                ref={ref}
                                                value={value}
                                                onChange={(event) => {
                                                    event.preventDefault();
                                                    onChange(+event.target.value);
                                                }}
                                                type="number"
                                                placeholder={"Enter amount"}
                                                autoFocus
                                                size="lg"
                                            />
                                        )}
                                    />

                                    <Form.Text className="text-danger">{errors?.amount?.message}</Form.Text>
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <Form.Label>
                                        To Address <small className="text-danger">*</small>
                                    </Form.Label>

                                    <Controller
                                        control={control}
                                        name="address"
                                        render={({ field: { ref, value, onChange } }) => (
                                            <FormControl
                                                ref={ref}
                                                value={value}
                                                onChange={onChange}
                                                type="text"
                                                placeholder={"Enter to address"}
                                                size="lg"
                                            />
                                        )}
                                    />

                                    <Form.Text className="text-danger">{errors?.address?.message}</Form.Text>
                                </FormGroup>

                                <Stack
                                    direction="horizontal"
                                    className="justify-content-center align-items-center mb-3"
                                >
                                    <Button variant="primary" type="submit" size="lg">
                                        Next
                                    </Button>
                                </Stack>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <ConfirmTransaction
                show={modal.show}
                onClose={() => setModal({ ...modal, show: false })}
                initData={modal.initData}
                onSubmit={handleSubmitTransaction}
            />

            <Modal centered backdrop="static" keyboard={false} show={okModal.show} onHide={() => {}}>
                <Modal.Header>
                    <Modal.Title className="text-center w-100">Transaction initiated</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Stack className="w-100 align-items-center mb-3">
                        <FontAwesomeIcon icon={faCheck} className="text-success" size="5x" />
                    </Stack>

                    <p>
                        Once completed, the coin amount will be deposited to the address you provided. This should take
                        a few minutes depending on how congested the nertwork is
                    </p>

                    {/* todo: add explorer link */}

                    <Button size="lg" className="w-100" onClick={() => navigate("../portfolio")}>
                        Close
                    </Button>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
