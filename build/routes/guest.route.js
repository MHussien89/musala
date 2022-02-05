import * as multer from 'multer';
import { Router } from 'express';
import GuestController from '../controllers/guest.controller';
import { CreateGuestDto } from '../dtos/guest.dto';
import validationMiddleware from '../middlewares/validation.middleware';
const storage = multer.memoryStorage();
const upload = multer({ storage });
import authMiddleware from '../middlewares/auth.middleware';
class GuestRoute {
    constructor() {
        this.path = '/guest';
        this.router = Router();
        this.guestController = new GuestController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, validationMiddleware(CreateGuestDto), authMiddleware, this.guestController.createGuest);
        this.router.post(`${this.path}/web`, validationMiddleware(CreateGuestDto), this.guestController.createGuest);
        this.router.post(`${this.path}/search`, this.guestController.getGuestByIds);
        this.router.get(`${this.path}`, this.guestController.getGuests);
        this.router.get(`${this.path}/:id`, this.guestController.getGuestById);
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateGuestDto, true), this.guestController.updateGuest);
        this.router.delete(`${this.path}/:id`, this.guestController.deleteGuest);
        this.router.post(`${this.path}/uploadDocument`, upload.single('asset'), this.guestController.uploadDocument);
    }
}
export default GuestRoute;
//# sourceMappingURL=guest.route.js.map