import { faArrowRotateRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Card, Form, Stack, Table } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { Loading, TableMask } from "../../../../common/components";
import { StringFormatter } from "../../../../common/utils";
import { HttpService } from "../../../../services";
import { TxStatusBadge } from "../../components/badge";
import { toast } from "react-toastify";

export interface ITransactionHistoryPageProps {}

export function TransactionHistoryPage(_props: ITransactionHistoryPageProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [dataSource, setDataSource] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [filter, setFilter] = useState(() => {
        const owner = searchParams.get("owner") || "";
        return { owner, to: "", status: "" };
    });

    const fetchTransactionListAsync = async () => {
        try {
            setIsLoading(true);
            const res = await HttpService.get<any>(`/transactions?owner=${filter.owner}`);
            setIsLoading(false);

            if (res.code === 200) {
                const data = res.data.items;

                setDataSource(data);
                return;
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & { owner: { value: string } };

        setFilter({ ...filter, owner: target.owner.value });
        setSearchParams(`owner=${target.owner.value}`);
    };

    const handleCopyValue = (value: any) => {
        window.navigator.clipboard.writeText(value).then(() => toast.success("Coppied"));
    };

    useEffect(() => {
        fetchTransactionListAsync();
    }, [filter]);

    const mapped = dataSource.map((item: any) => {
        return {
            txHash: item.hash,
            createdAt: item.createdAt,
            blockId: item.blockId,
            from: item.from,
            to: item.to,
            amount: item.amount,
            status: item.status,
        };
    });

    return (
        <>
            <Card className="mb-3">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Transaction owner</Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Enter transaction owner"
                                name="owner"
                                defaultValue={filter.owner}
                            />
                        </Form.Group>

                        <Stack direction="horizontal" className="justify-content-end">
                            <Button variant="primary" type="submit">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" />
                                Filter
                            </Button>
                        </Stack>
                    </Form>
                </Card.Body>
            </Card>

            <Card>
                <Card.Header>
                    <Card.Title className="d-flex flex-row align-items-center gap-3 fs-4">
                        <p className="mb-0">All Transactions</p>

                        <Button
                            variant="success"
                            className="rounded-circle p-0 d-flex justify-content-center align-items-center"
                            style={{ width: "30px", height: "30px" }}
                            title="Refresh transactions"
                            onClick={() => setFilter({ ...filter })}
                        >
                            <FontAwesomeIcon icon={faArrowRotateRight} />
                        </Button>
                    </Card.Title>
                </Card.Header>

                <Card.Body>
                    <TableMask loading={isLoading} indicator={<Loading />}>
                        <Table bordered striped responsive hover>
                            <thead>
                                <tr>
                                    <th style={{ minWidth: "170px" }}>Txn Hash</th>
                                    <th style={{ minWidth: "170px" }}>Block</th>
                                    <th style={{ minWidth: "200px" }}>Created At</th>
                                    <th style={{ minWidth: "170px" }}>From</th>
                                    {/* <th style={{ minWidth: "100px" }}>Type</th> */}
                                    <th style={{ minWidth: "170px" }}>To</th>
                                    <th style={{ minWidth: "200px" }}>Value</th>
                                    <th style={{ minWidth: "150px" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mapped.map((item) => {
                                    return (
                                        <tr key={item.txHash}>
                                            <td>
                                                <Link to={`/explorer/transactions/${item.txHash}`}>
                                                    {StringFormatter.formatDisplayHash(item.txHash)}
                                                </Link>
                                            </td>

                                            <td>
                                                {item.blockId
                                                    ? StringFormatter.formatDisplayHash(item.blockId)
                                                    : "Unknown"}
                                            </td>
                                            <td>{new Date(item.createdAt * 1000).toLocaleString()}</td>

                                            <td>
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={() => handleCopyValue(item.from)}
                                                    title="Click to copy"
                                                >
                                                    {StringFormatter.formatDisplayAddress(item.from)}
                                                </span>
                                            </td>
                                            {/* <td>{item.type}</td> */}
                                            <td>
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={() => handleCopyValue(item.to)}
                                                    title="Click to copy"
                                                >
                                                    {StringFormatter.formatDisplayAddress(item.to)}
                                                </span>
                                            </td>
                                            <td>{item.amount} TECO</td>
                                            <td>
                                                <TxStatusBadge status={item.status} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        {mapped.length === 0 && <div className="w-100 text-center p-3">No data founded</div>}
                    </TableMask>
                </Card.Body>
            </Card>
        </>
    );
}
