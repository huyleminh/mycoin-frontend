import { WalletKeyAgent } from "@huyleminh/mycoin-sdk";
import CryptoJS from "crypto-js";

export function generateAndEncryptKeyPair(payload: { password: string; timestamp: number }): string {
    const { privateKey, publicKey } = new WalletKeyAgent().generateKeyPair();

    const dataToSign = JSON.stringify({ privateKey, publicKey, timestamp: payload.timestamp });

    return CryptoJS.AES.encrypt(dataToSign, payload.password).toString();
}

export function decryptKeystoreContent(content: string, password: string) {
    const bytes = CryptoJS.AES.decrypt(content, password);

    const data = bytes.toString(CryptoJS.enc.Utf8);
    let keyData;

    try {
        keyData = JSON.parse(data);
    } catch (error) {
        throw new Error("Invalid data format");
    }

    const { privateKey, publicKey, timestamp } = keyData;

    if (
        !privateKey ||
        typeof privateKey !== "string" ||
        !publicKey ||
        typeof publicKey !== "string" ||
        !timestamp ||
        typeof timestamp !== "number"
    ) {
        throw new Error("Invalid key data");
    }

    return keyData as { privateKey: string; publicKey: string; timestamp: number };
}
