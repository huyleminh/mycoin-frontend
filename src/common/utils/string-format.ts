export function formatDisplayAddress(address: string) {
    const head = address.slice(0, 4);
    const tail = address.slice(address.length - 4, address.length);

    return `0x${head}...${tail}`;
}
