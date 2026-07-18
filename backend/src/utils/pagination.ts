import { Request } from "express";
import { PaginationMeta, PaginationResponseMeta } from "../types/Pagination";

function createPageUrl(req: Request, page: number, limit: number): string {
  const forwardedHost = req.get("x-forwarded-host")?.split(",")[0].trim();
  const host = forwardedHost ?? req.get("host");

  if (!host) {
    throw new Error("Não foi possível determinar o host da requisição.");
  }

  const url = new URL(req.originalUrl, `${req.protocol}://${host}`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  return url.toString();
}

export function serializePaginationMeta(
  req: Request,
  meta: PaginationMeta,
): PaginationResponseMeta {
  return {
    ...meta,
    next:
      meta.page < meta.totalPages
        ? createPageUrl(req, meta.page + 1, meta.limit)
        : null,
    previous:
      meta.page > 1 && meta.totalPages > 0
        ? createPageUrl(req, meta.page - 1, meta.limit)
        : null,
  };
}
