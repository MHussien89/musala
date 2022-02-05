import { Router } from 'express';
import IndexController from '../controllers/index.controller';
import Route from '../interfaces/routes.interface';

class IndexRoute implements Route {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /:
     *   get:
     *     summary: This should verify that app is loaded successfully
     *     description: This Api verifies that server is loaded with all modules successfully.
     *     consumes:
     *       — application/json
     *     parameters:
     *     responses:
     *       200:
     *         description: Recieve OK.
     */
    this.router.get(`${this.path}`, this.indexController.index);
  }
}

export default IndexRoute;
