import { redirect, notFound } from "next/navigation";
import { getUrlByAlias } from "@/lib/urls";

export default async function AliasPage({ params }: { params: Promise<{ alias: string }> }) {
  const { alias } = await params;
  const entry = await getUrlByAlias(alias);
  if (!entry) notFound();
  redirect(entry.url);
}