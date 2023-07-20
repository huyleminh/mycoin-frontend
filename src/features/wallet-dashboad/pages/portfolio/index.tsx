import { faArrowRotateRight, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.scss";

export interface IWalletPortfolioProps {}

export function WalletPortfolio(props: IWalletPortfolioProps) {
    const handleRefreshBalance = () => {};

    const handleCopyAddress = () => {};

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            {/* <Card.Title className="text-dark px-2">My Portfolio</Card.Title> */}

                            <Stack
                                direction="horizontal"
                                className="mb-3 align-items-center justify-content-start"
                                gap={3}
                            >
                                <div className="portfolio-balance-logo-container">
                                    <img src="/svgs/network.svg" alt="network-image" loading="lazy" />
                                </div>

                                <Stack className="justify-content-center w-auto" gap={1}>
                                    <p className="fs-5 mb-0 text-uppercase">My TECO balance</p>

                                    <p className="fs-5 text-dark mb-0">100 TECO</p>
                                </Stack>

                                <Button
                                    variant="success"
                                    className="rounded-circle p-0 d-flex justify-content-center align-items-center"
                                    style={{ width: "45px", height: "45px" }}
                                    title="Refresh balance"
                                    onClick={handleRefreshBalance}
                                >
                                    <FontAwesomeIcon icon={faArrowRotateRight} />
                                </Button>
                            </Stack>

                            <Stack direction="horizontal" className="mb-3 justify-content-between align-items-end">
                                <Stack className="justify-content-center">
                                    <p className="fs-6 mb-0 text-uppercase d-flex align-items-center">
                                        My address value
                                        <Button
                                            variant="light"
                                            title="Copy"
                                            className="text-primary p-0 rounded-circle ms-3"
                                            style={{ width: "35px", height: "35px" }}
                                            onClick={handleCopyAddress}
                                        >
                                            <FontAwesomeIcon icon={faCopy} fontSize="18px" />
                                        </Button>
                                    </p>

                                    <p className="mb-0">asdasdasdasdadasda</p>
                                </Stack>

                                <Link to="../send-tx">
                                    <Button variant="primary">Send Coin</Button>
                                </Link>
                            </Stack>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card>
                        <Card.Body className="px-3 portfolio-network">
                            <Card.Title className="text-dark px-2">Network</Card.Title>

                            <Stack
                                direction="horizontal"
                                className="rounded p-3"
                                style={{ backgroundColor: "#f2f4fa" }}
                            >
                                <Stack className="justify-content-center" gap={1}>
                                    <p className="fs-5 text-dark mb-0">MyCoin Testnet</p>

                                    <p className="mb-0">Last Block: 123</p>
                                </Stack>

                                <div className="portfolio-network-logo-container">
                                    <img src="/svgs/network.svg" alt="network-image" loading="lazy" />
                                </div>
                            </Stack>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
