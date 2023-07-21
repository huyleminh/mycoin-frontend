export function formatDisplayAddress(address: string) {
    const head = address.slice(0, 6);
    const tail = address.slice(address.length - 6, address.length);

    return `0x${head}...${tail}`;
}

export function formatDisplayHash(hash: string) {
    const head = hash.slice(0, 6);
    const tail = hash.slice(hash.length - 6, hash.length);

    return `0x${head}...${tail}`;
}
