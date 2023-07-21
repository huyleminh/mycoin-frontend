import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loading, TableMask } from "../../../../common/components";
import { StringFormatter } from "../../../../common/utils";
import { HttpService } from "../../../../services";
import { TxStatusBadge } from "../../components/badge";

export interface ITransactionHistoryPageProps {}

export function TransactionHistoryPage(_props: ITransactionHistoryPageProps) {
    const [dataSource, setDataSource] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [filter, setFilter] = useState({
        from: "",
        to: "",
        status: "",
    });

    const fetchTransactionListAsync = async () => {
        try {
            setIsLoading(true);
            const res = await HttpService.get<any>(`/transactions`);
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

                                            <td>{StringFormatter.formatDisplayAddress(item.from)}</td>
                                            {/* <td>{item.type}</td> */}
                                            <td>{StringFormatter.formatDisplayAddress(item.to)}</td>
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
