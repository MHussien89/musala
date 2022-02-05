import * as cron from 'node-cron';
import logger from '../logger/logger';
import ReservationService from '../services/reservation.service';
import PaymentService from '../services/payemnt.service';
class ReservationExpirationJob {
    constructor() {
        this.reservationService = new ReservationService();
        this.paymentService = new PaymentService();
    }
    /**
     * sample cronjob
     * @module sampleJobModule
     * @function job
     * @return {void}
     */
    job() {
        cron.schedule('*/3 * * * *', async () => {
            logger.debug("Sample crob job runs every mintue");
            const canceledReservations = await this.reservationService.cancelExpiredReservations();
            await this.paymentService.cancelExpiredPayments(canceledReservations);
        });
    }
}
export default new ReservationExpirationJob();
//# sourceMappingURL=reservation-expiration-cron.service.js.map