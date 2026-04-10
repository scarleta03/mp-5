import getCollection, { URLS_COLLECTION } from "@/lib/db";

export async function getUrlByAlias(alias: string) {
    const col = await getCollection(URLS_COLLECTION);
    return await col.findOne({ alias });
}

export async function createShortUrl(alias: string, url: string) {
    const col = await getCollection(URLS_COLLECTION);
    const res = await col.insertOne({ alias, url });
    if (!res.acknowledged) throw new Error("DB insert failed");
    return { alias, url };
}