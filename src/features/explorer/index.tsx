import { useEffect } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { TransactionHistoryPage } from "./pages/transaction";
import { TransactionDetailPage } from "./pages/transaction-detail";
import "./styles.scss";

export interface IExplorerFeatureProps {}

export function ExplorerFeature(_props: IExplorerFeatureProps) {
    const location = useLocation();

    useEffect(() => {
        document.title = "TECO Explorer";
    }, []);

    return (
        <>
            <Navbar className="bg-primary explorer-navbar py-0" sticky="top">
                <Container>
                    <Navbar.Brand to="/explorer" as={Link}>
                        <Stack direction="horizontal" className="align-items-center">
                            <div className="explorer-navbar-logo-container">
                                <img className="" src="/images/digital_wallet.jpg" alt="app-logo" loading="lazy" />
                            </div>

                            <h1 className="mb-0 ms-2 fs-4 text-white">TECO Explorer</h1>
                        </Stack>
                    </Navbar.Brand>

                    <Navbar.Toggle />

                    <Navbar.Collapse className="justify-content-start">
                        <Nav className="">
                            {/* <Nav.Link to="./blocks" as={Link} active={location.pathname === "/explorer/blocks"}>
                                Blockchain
                            </Nav.Link> */}

                            <Nav.Link
                                to="./transactions"
                                as={Link}
                                active={location.pathname === "/explorer/transactions"}
                            >
                                Transactions
                            </Nav.Link>

                            <Nav.Link to="/" as={Link} active={location.pathname === "/"}>
                                Access Wallet
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-5">
                <Routes>
                    {/* <Route path="/blocks" element={<BlockchainPage />} /> */}

                    <Route path="/transactions/:txId" element={<TransactionDetailPage />} />

                    <Route path="/transactions" element={<TransactionHistoryPage />} />

                    <Route index element={<Navigate to="./transactions" />} />

                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </Container>
        </>
    );
}
