import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

export const revalidate = false;

// Fumadocs server-side search endpoint.
export const { staticGET: GET } = createFromSource(source);

