import App from './app';
import IndexRoute from './routes/index.route';
import PropertyRoute from './routes/property.route';
import AreaRoute from './routes/area.route';
import ContactRoute from './routes/contact.route';
import BookingRoute from './routes/booking.route';
import UnitTypeRoute from './routes/unitType.route';
import UnitTypeGroupRoute from './routes/unitTypeGroup.route';
import AmenityRoute from './routes/amenity.route';
import SwaggerRoute from './routes/swagger.route';
import GuestRoute from './routes/guest.route';
import PaymentRoute from './routes/payment.route';
import validateEnv from './utils/validateEnv';
import reservationExpirationJob from './cron-jobs/reservation-expiration-cron.service';
import paymentExpirationJob from './cron-jobs/payment-expiration-cron.service';
import ReservationRoute from './routes/reservation.route';
validateEnv();
const app = new App([
    new SwaggerRoute(),
    new IndexRoute(),
    new PropertyRoute(),
    new AreaRoute(),
    new AmenityRoute(),
    new UnitTypeRoute(),
    new UnitTypeGroupRoute(),
    new BookingRoute(),
    new ReservationRoute(),
    new GuestRoute(),
    new PaymentRoute(),
    new ContactRoute()
], [reservationExpirationJob, paymentExpirationJob]);
app.listen();
//# sourceMappingURL=server.js.map