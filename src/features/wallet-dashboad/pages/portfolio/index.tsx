import { faArrowRotateRight, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../../common/contexts";
import { StringFormatter } from "../../../../common/utils";
import { HttpService } from "../../../../services";
import "./styles.scss";

export interface IWalletPortfolioProps {}

export function WalletPortfolio(_props: IWalletPortfolioProps) {
    const authContext = useAuth();
    const { userKeyInfo } = authContext;

    const [balance, setBalance] = useState(0);
    const [blockIndex, setBlockIndex] = useState(0);

    const handleRefreshBalance = () => {
        reloadBalanceAsync();
    };

    const handleCopyAddress = () => {
        const publicKey = userKeyInfo.publickey!;

        window.navigator.clipboard.writeText(publicKey).then(() => toast.success("Address copied!"));
    };

    const reloadBalanceAsync = async () => {
        try {
            const res = await HttpService.get<{ balance: number }>(`/wallet/${userKeyInfo.publickey!}/balance`);

            if (res.code === 200) {
                const data = res.data;
                setBalance(data?.balance || 0);
                authContext.setUserKeyInfo({ ...userKeyInfo, balance: data?.balance || 0 });
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const reloadLatestBlockAysnc = async () => {
        try {
            const res = await HttpService.get<any>(`/blocks/latest`);

            if (res.code === 200) {
                const data = res.data;
                setBlockIndex(data?.index || 0);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        reloadBalanceAsync();
        reloadLatestBlockAysnc();
    }, []);

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <Card>
                        <Card.Body>
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

                                    <p className="fs-5 text-dark mb-0">{balance} TECO</p>
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

                                    <p className="mb-0">
                                        {StringFormatter.formatDisplayAddress(userKeyInfo.publickey!)}
                                    </p>
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

                                    <p className="mb-0">Last Block: {blockIndex + 1}</p>
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
