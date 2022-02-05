import { Router } from 'express';
import BookingController from '../controllers/booking.controller';
import { CreateBookingDto, VerifyOTPDto, PaymentDetailsDto, FinalizeBookingDto } from '../dtos/booking.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import authoriztionMddlewareFactory from '../middlewares/authorization.middleware';
import authMiddleware from '../middlewares/auth.middleware';
class BookingRoute {
    constructor() {
        this.path = '/book';
        this.router = Router();
        this.bookingController = new BookingController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.bookingController.getAllBookingRequests);
        this.router.post(`${this.path}`, validationMiddleware(CreateBookingDto), this.bookingController.createBookingRequest);
        this.router.post(`${this.path}/verify`, validationMiddleware(VerifyOTPDto), this.bookingController.verifyOTP);
        this.router.post(`${this.path}/paymentDetails`, validationMiddleware(PaymentDetailsDto), this.bookingController.addPaymentDetailsToRequest);
        this.router.post(`${this.path}/finalize`, validationMiddleware(FinalizeBookingDto), this.bookingController.finalizeBookingRequest);
        this.router.get(`${this.path}/:requestId`, this.bookingController.getBookingRequest);
        this.router.post(`${this.path}/:requestId/messages`, authMiddleware, authoriztionMddlewareFactory(['propertiesFullAccess', 'propertiesModifyAccess']), this.bookingController.addMessageToBookingRequest);
        this.router.delete(`${this.path}/:requestId/messages/:messageId`, authMiddleware, authoriztionMddlewareFactory(['propertiesFullAccess', 'propertiesModifyAccess']), this.bookingController.deleteMessageFromBookingRequest);
    }
}
export default BookingRoute;
//# sourceMappingURL=booking.route.js.map