import { Alert, Button, Stack } from "react-bootstrap";

export interface IStoreKeyStepProps {
    onSubmit: () => void | undefined;
    onCancel: () => void | undefined;
}

export function StoreKeyStep(props: IStoreKeyStepProps) {
    const { onCancel, onSubmit } = props;

    return (
        <Stack>
            <h4>Step 2: Download keystore file</h4>

            <Alert variant="primary">
                <Alert.Heading className="fs-6">NOTES</Alert.Heading>
                Please keep it safe and make a backup. Don't lose it or share to anyone
            </Alert>

            <Stack direction="horizontal" className="justify-content-center align-items-center mb-3" gap={3}>
                <Button
                    variant="light"
                    type="button"
                    size="lg"
                    className="text-primary border border-primary"
                    onClick={() => onCancel && onCancel()}
                >
                    Back to step 1
                </Button>

                <Button variant="primary" type="button" size="lg" onClick={() => onSubmit && onSubmit()}>
                    Acknowledge & Download
                </Button>
            </Stack>
        </Stack>
    );
}
