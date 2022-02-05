import * as multer from 'multer';
import { Router } from 'express';
import validationMiddleware from '../middlewares/validation.middleware';
import authoriztionMddlewareFactory from '../middlewares/authorization.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import { CreateReservationDto, ReservationSearchDto, UpdateReservationDto } from '../dtos/reservation.dto';
import ReservationController from '../controllers/reservation.controller';
const storage = multer.memoryStorage();
const upload = multer({ storage });
class ReservationRoute {
    constructor() {
        this.path = '/reservation';
        this.router = Router();
        this.reservationController = new ReservationController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:id`, authMiddleware, authoriztionMddlewareFactory(['reservationFullAccess', 'reservationModifyAccess']), this.reservationController.getOneReservation);
        this.router.get(`${this.path}/:id/payments`, authMiddleware, authoriztionMddlewareFactory(['reservationFullAccess', 'reservationModifyAccess', 'createReservation']), this.reservationController.getReservationPayments);
        this.router.post(`${this.path}/search`, 
        // authMiddleware,
        // authoriztionMddlewareFactory(['reservationFullAccess', 'reservationModifyAccess']),
        validationMiddleware(ReservationSearchDto), this.reservationController.filterReservation);
        this.router.put(`${this.path}/:id/checkInGuest`, validationMiddleware(UpdateReservationDto), this.reservationController.checkInGuest);
        this.router.post(`${this.path}`, authMiddleware, authoriztionMddlewareFactory(['reservationFullAccess', 'reservationModifyAccess']), validationMiddleware(CreateReservationDto), this.reservationController.createReservation);
        this.router.put(`${this.path}/:id`, authMiddleware, authoriztionMddlewareFactory(['reservationFullAccess', 'reservationModifyAccess', 'createReservation']), validationMiddleware(UpdateReservationDto), this.reservationController.updateReservation);
        this.router.delete(`${this.path}/:id`, authMiddleware, authoriztionMddlewareFactory(['reservationFullAccess', 'reservationModifyAccess']), this.reservationController.deleteReservation);
    }
}
export default ReservationRoute;
//# sourceMappingURL=reservation.route.js.map