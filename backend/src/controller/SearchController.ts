import { NextFunction, Request, Response } from "express";
import { SearchService } from "../service/SearchService";
import { validatePagination } from "../utils/validation";
import { validateSearchQuery } from "../utils/search";

export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  public async getSuggestions(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const query =
        validateSearchQuery(req.query.q ?? "", { allowEmpty: true }) ?? "";
      const { limit } = validatePagination(
        "1",
        req.query.limit === undefined ? "9" : req.query.limit,
      );

      const suggestions = await this.searchService.getSuggestions(query, limit);
      res.json({ data: suggestions });
    } catch (error) {
      next(error);
    }
  }
}
