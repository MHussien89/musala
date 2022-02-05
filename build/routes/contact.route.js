import { Router } from 'express';
import ContactController from '../controllers/contact.controller';
class AreaRoute {
    constructor() {
        this.path = '/contacts';
        this.router = Router();
        this.contactController = new ContactController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.contactController.findAllContacts);
    }
}
export default AreaRoute;
//# sourceMappingURL=contact.route.js.map