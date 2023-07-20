import { Alert, Button, Stack } from "react-bootstrap";

export interface ICompleteStepProps {
    onSubmit: () => void | undefined;
    onCancel: () => void | undefined;
}

export function CompleteStep(props: ICompleteStepProps) {
    const { onCancel, onSubmit } = props;

    return (
        <Stack>
            <h4>Step 3: You are done!</h4>

            <Alert variant="success">
                <Alert.Heading className="fs-6">DONE!</Alert.Heading>
                You are now ready to access with keystore file. This file should only be used in an offline setting.
            </Alert>

            <Stack direction="horizontal" className="justify-content-center align-items-center mb-3" gap={3}>
                <Button
                    variant="light"
                    type="button"
                    size="lg"
                    className="text-primary border border-primary"
                    onClick={() => onCancel && onCancel()}
                >
                    Create Another Wallet
                </Button>

                <Button variant="primary" type="button" size="lg" onClick={() => onSubmit && onSubmit()}>
                    Access Wallet
                </Button>
            </Stack>
        </Stack>
    );
}
