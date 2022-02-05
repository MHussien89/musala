import * as cron from 'node-cron';
import logger from '../logger/logger';
import PaymentService from '../services/payemnt.service';
class PaymentExpirationJob {
    constructor() {
        this.paymentService = new PaymentService();
    }
    /**
     * sample cronjob
     * @module sampleJobModule
     * @function job
     * @return {void}
     */
    job() {
        cron.schedule('0 0 * * *', async () => {
            logger.debug("Sample crob job runs every day at 12 a.m");
            this.paymentService.changeOverduePaymentStatus();
        });
    }
}
export default new PaymentExpirationJob();
//# sourceMappingURL=payment-expiration-cron.service.js.map