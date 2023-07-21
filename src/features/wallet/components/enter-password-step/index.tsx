import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Alert, Button, Form, FormControl, FormGroup, Spinner, Stack } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export interface IEnterPasswordStepProps {
    onSubmit: (data: IPasswordForm) => void | undefined;
}

export interface IPasswordForm {
    password: string;
    confirmPassword: string;
}

const passwordSchema = z.object({
    password: z
        .string({ required_error: "Password cannot be empty" })
        .trim()
        .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
        .string({ required_error: "Confirm password cannot be empty" })
        .trim()
        .min(8, { message: "Confirm password must be at least 8 characters" }),
});

export function EnterPasswordStep(props: IEnterPasswordStepProps) {
    const { onSubmit } = props;
    const [isLoading, _setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IPasswordForm>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { confirmPassword: "", password: "" },
    });

    const handleSubmitForm: SubmitHandler<IPasswordForm> = async (value) => {
        onSubmit && onSubmit(value);
    };

    useEffect(() => {
        reset();
    }, []);

    return (
        <Stack>
            <h4>Step 1: Create password</h4>

            <Form onSubmit={handleSubmit(handleSubmitForm)}>
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

                <FormGroup className="mb-3">
                    <Form.Label>
                        Confirm Password <small className="text-danger">*</small>
                    </Form.Label>

                    <Controller
                        control={control}
                        name="confirmPassword"
                        defaultValue={""}
                        render={({ field: { ref, value, onChange } }) => (
                            <FormControl
                                ref={ref}
                                value={value}
                                onChange={onChange}
                                type="password"
                                placeholder={"Confirm password"}
                                size="lg"
                            />
                        )}
                    />

                    <Form.Text className="text-danger">{errors?.confirmPassword?.message}</Form.Text>
                </FormGroup>

                <Stack direction="horizontal" className="justify-content-center align-items-center mb-3">
                    <Button variant="primary" type="submit" disabled={isLoading} size="lg">
                        {isLoading && <Spinner animation="border" role="status" size="sm" className="me-2" />}
                        Create wallet
                    </Button>
                </Stack>

                <Alert variant="warning">
                    <Alert.Heading className="fs-6 mb-2">WARNING</Alert.Heading>
                    You will need your keystore file + password to access your wallet. Please save them in a secure
                    location. We CAN NOT retrieve or reset your keystore/password if you lose them.
                </Alert>
            </Form>
        </Stack>
    );
}
