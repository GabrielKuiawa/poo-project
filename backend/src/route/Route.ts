import { Router, Request, Response } from "express";
import CategoryRoute from "./CategoryRoute";
import ImageRoute from "./ImageRoute";
import UserRoute from "./UserRoute";
import SearchRoute from "./SearchRoute";

export default class Route {
  private router: Router = Router();

  constructor() {
    this.initRoute();
  }

  private initRoute(): void {
    this.router.get("/", (_req: Request, res: Response) => {
      res.json({
        name: "Mood Board API",
        description: "API REST da plataforma de inspiração visual Mood Board.",
        repository: "https://github.com/GabrielKuiawa/mood-board",
        endpoints: {
          images: "/api/image",
          categories: "/api/category",
          users: "/api/user",
          login: "/api/user/login",
          search: "/api/search/suggestions",
        },
      });
    });

    const categoryRoute = new CategoryRoute();
    const imageRoute = new ImageRoute();
    const userRoute = new UserRoute();
    const searchRoute = new SearchRoute();
    this.router.use("/api/category", categoryRoute.getRouter());
    this.router.use("/api/image", imageRoute.getRouter());
    this.router.use("/api/user", userRoute.getRouter());
    this.router.use("/api/search", searchRoute.getRouter());
  }

  public getRouter(): Router {
    return this.router;
  }
}
