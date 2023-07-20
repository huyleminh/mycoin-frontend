import { Stack, Spinner } from "react-bootstrap";
import "./styles.scss";

export interface ILoadingProps {
    message?: string;
    color?: string;
}

export function Loading(props: ILoadingProps) {
    const { message, color } = props;
    return (
        <Stack direction="vertical" className="loading-container justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" className="mb-3" />
            {message && <p className={`text-${color || "muted"} text-center`}>{message}</p>}
        </Stack>
    );
}
