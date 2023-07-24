import { Button, Card, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export function HomePage() {
    const navigate = useNavigate();

    return (
        <Stack className="home-container align-items-center justify-content-center" direction="vertical">
            <Card className="home-card p-4">
                <h1 className="mb-3 w-100 text-center">TECO Wallet</h1>

                <div className="home-card-image mb-3 mx-auto">
                    <img src="images/digital_wallet.jpg" loading="lazy" alt="wallet" />
                </div>

                <Stack direction="horizontal" className="justify-content-center w-100 align-items-center" gap={4}>
                    <Button
                        onClick={() => navigate("/wallet/access")}
                        className="border border-primary text-primary"
                        variant="light"
                        size="lg"
                    >
                        Access Wallet
                    </Button>

                    <Button
                        onClick={() => navigate("/wallet/create")}
                        className="login__back-to-home-btn"
                        variant="primary"
                        size="lg"
                    >
                        Create Wallet
                    </Button>
                </Stack>

                <hr />

                <Link to="/explorer" className="text-decoration-underline text-center">
                    Go to Explorer{" "}
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Link>
            </Card>
        </Stack>
    );
}
