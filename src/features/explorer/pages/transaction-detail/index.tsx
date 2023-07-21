import { useParams } from "react-router-dom";

export interface ITransactionDetailPageProps {}

export function TransactionDetailPage(props: ITransactionDetailPageProps) {
    const { txId } = useParams();

    return <div>{txId}</div>;
}
