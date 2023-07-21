import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row, Stack } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../../../../common/contexts";

export interface ISendTransactionPageProps {}

export interface ITransactionForm {
    amount: number;
    address: string;
}

const txSchema = z.object({
    amount: z.number(),
    address: z
        .string({ required_error: "Address cannot be empty" })
        .trim()
        .length(130, "Invalid key length")
        .startsWith("04", "Invalid key format"),
});

export function SendTransactionPage(_props: ISendTransactionPageProps) {
    const authContext = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ITransactionForm>({
        resolver: zodResolver(txSchema),
        defaultValues: { amount: 0, address: "" },
    });

    const handleSubmitForm: SubmitHandler<ITransactionForm> = async (value) => {
        console.log(value);
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
                                                onChange={(event) => onChange(+event.target.value)}
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
        </Container>
    );
}
