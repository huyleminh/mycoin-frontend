import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../../../../common/components";
import { HttpService } from "../../../../services";
import { TxStatusBadge } from "../../components/badge";

export interface ITransactionDetailPageProps {}

export function TransactionDetailPage(_props: ITransactionDetailPageProps) {
    const { txId } = useParams();

    const [tx, setTx] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTxDetail = async () => {
            try {
                const res = await HttpService.get<any>(`/transactions/${txId}`);
                setIsLoading(false);

                if (res.code === 200) {
                    const data = res.data;
                    setTx(data);
                    return;
                }

                if (res.code === 400) {
                    toast.error(res.message);
                    return;
                }
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };

        fetchTxDetail();
    }, [txId]);

    if (isLoading) {
        return (
            <Card>
                <Card.Body>
                    <Loading />
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title className="d-flex flex-row align-items-center gap-3 fs-4">
                    <Link to="../transactions">
                        <Button
                            className="rounded-circle p-0 d-flex justify-content-center align-items-center"
                            style={{ width: "30px", height: "30px" }}
                            title="Refresh transactions"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} title="Back to transaction history" />
                        </Button>
                    </Link>

                    <p className="mb-0">Transaction Summary</p>

                    <TxStatusBadge status={tx?.status || ""} />
                </Card.Title>
            </Card.Header>

            <Card.Body>
                <Row className="mb-3">
                    <Col>
                        <Stack>
                            <p className="fs-5 text-dark">Transaction Hash</p>

                            <p className="">{tx.hash}</p>
                            {tx.createdAt && <p className="">({new Date(tx.createdAt * 1000).toLocaleString()})</p>}
                        </Stack>
                    </Col>

                    <Col>
                        <Stack>
                            <p className="fs-5 text-dark">Block Mined</p>
                            <p className="">
                                <Link to={`/explorer/blocks/${tx.blockId}`}>{tx.blockId}</Link>
                            </p>
                        </Stack>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col lg={6} className="mb-3">
                        <Stack className="p-3 rounded" style={{ backgroundColor: "#F3F5F9" }}>
                            <p className="fs-5 text-dark">From</p>

                            <p className="text-primary">{tx.from}</p>
                        </Stack>
                    </Col>

                    <Col lg={6} className="mb-3">
                        <Stack className="p-3 rounded" style={{ backgroundColor: "#F3F5F9" }}>
                            <p className="fs-5 text-dark">To</p>

                            <p className="text-primary">{tx.to}</p>
                        </Stack>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col lg={2} md={4}>
                        <Stack className="p-3 rounded" style={{ backgroundColor: "#F3F5F9" }}>
                            <p className="fs-5 text-dark">Amount</p>

                            <p className="">{tx.amount} TECO</p>
                        </Stack>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
