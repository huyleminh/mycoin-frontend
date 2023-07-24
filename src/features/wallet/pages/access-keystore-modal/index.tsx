import { Button, Form, FormControl, FormGroup, Modal, Stack } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { WalletService } from "../../../../services";
import { useAuth } from "../../../../common/contexts";
import { useNavigate } from "react-router-dom";

export interface IAccessKeystoreModalProps {
    show: boolean;
    onHide: (rerender?: boolean) => void | undefined;
}

const passwordSchema = z.object({
    password: z
        .string({ required_error: "Password cannot empty" })
        .trim()
        .min(8, { message: "Password must be at least 8 characters" }),
});

export function AccessKeystoreModal(props: IAccessKeystoreModalProps) {
    const { show, onHide } = props;
    const authContext = useAuth();
    const navigate = useNavigate();

    const [keyContent, setKeyContent] = useState<string>("");

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<{ password: string }>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { password: "" },
    });

    const handleCloseForm = () => {
        onHide && onHide();
    };

    const handleChooseFile = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;

        if (!target.files || !target.files[0]) {
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = function () {
            const content = fileReader.result;

            if (!content) {
                toast.error("Cannot select empty file");
                return;
            }

            setKeyContent(content.toString());
        };

        fileReader.readAsText(target.files[0]);
    };

    const handleSubmitForm: SubmitHandler<{ password: string }> = async (value) => {
        try {
            const keyObject = JSON.parse(keyContent);
            const key = keyObject.key;

            const userKeyData = WalletService.decryptKeystoreContent(key, value.password);

            authContext.setUserKeyInfo({
                privateKey: userKeyData.privateKey,
                publickey: userKeyData.publicKey,
                timestamp: userKeyData.timestamp,
                balance: 0,
            });
            navigate("/wallet/dashboard");
        } catch (error) {
            toast.error("Invalid password or file format");
        }
    };

    useEffect(() => {
        if (!show) {
            return;
        }

        reset();
        setKeyContent("null");
    }, [show]);

    return (
        <Modal show={show} onHide={() => handleCloseForm()} keyboard={false} size="lg" backdrop="static" centered>
            <Modal.Header closeButton></Modal.Header>

            <Modal.Body>
                <h2 className="mb-5 text-center d-block">Access Wallet with Keystore File</h2>

                <div className="mt-3">
                    <Stack>
                        <Form onSubmit={handleSubmit(handleSubmitForm)}>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>
                                    Select your Keystore File <small className="text-danger">*</small>
                                </Form.Label>
                                <Form.Control type="file" onChange={handleChooseFile} size="lg" />
                            </Form.Group>

                            <FormGroup className="mb-3">
                                <Form.Label>
                                    Enter Password <small className="text-danger">*</small>
                                </Form.Label>

                                <Controller
                                    control={control}
                                    name="password"
                                    defaultValue={""}
                                    render={({ field: { ref, value, onChange } }) => (
                                        <FormControl
                                            ref={ref}
                                            value={value}
                                            onChange={onChange}
                                            type="password"
                                            placeholder={"Enter password"}
                                            autoFocus
                                            size="lg"
                                        />
                                    )}
                                />

                                <Form.Text className="text-danger">{errors?.password?.message}</Form.Text>
                            </FormGroup>

                            <Stack direction="horizontal" className="justify-content-center align-items-center">
                                <Button variant="primary" type="submit" size="lg">
                                    Access Wallet
                                </Button>
                            </Stack>
                        </Form>
                    </Stack>
                </div>
            </Modal.Body>
        </Modal>
    );
}
