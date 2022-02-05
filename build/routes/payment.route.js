import { Router } from 'express';
import PaymentController from '../controllers/payment.controller';
import { CreatePaymentDto, PaymentAttempt } from '../dtos/payment.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import * as multer from 'multer';
import authMiddleware from '../middlewares/auth.middleware';
const storage = multer.memoryStorage();
const upload = multer({ storage });
class PaymentRoute {
    constructor() {
        this.path = '/payment';
        this.router = Router();
        this.paymentController = new PaymentController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, validationMiddleware(CreatePaymentDto), authMiddleware, this.paymentController.createPayment);
        this.router.get(`${this.path}`, this.paymentController.getPayments);
        this.router.get(`${this.path}/revenue`, this.paymentController.getMonthyRevenue);
        this.router.get(`${this.path}/:id`, this.paymentController.getPaymentById);
        this.router.put(`${this.path}/:id`, validationMiddleware(CreatePaymentDto, true), this.paymentController.updatePayment);
        this.router.delete(`${this.path}/:id`, this.paymentController.deletePayment);
        this.router.post(`${this.path}/:id/attempt`, validationMiddleware(PaymentAttempt, true), this.paymentController.createPaymentAttempet);
        this.router.post(`${this.path}/uploadReceipt`, upload.single('asset'), this.paymentController.uploadReceipt);
    }
}
export default PaymentRoute;
//# sourceMappingURL=payment.route.js.map