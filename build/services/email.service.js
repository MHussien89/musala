import * as AWS from 'aws-sdk';
import logger from '../logger/logger';
import { awsConfig } from '../config/aws-config';
/**
 * send confirmation email to the user
 * @function sendReservationConfirmationEmail
 * @param  {string} email - email that user want to reset the password for
 * @return {Promise<any>}
 */
export function sendPaymentConfirmationEmail(email, name, phoneNumber, paymentItems) {
    let payment = "<table>";
    if (paymentItems && paymentItems.length > 0) {
        payment = payment + `<tr><th>Payment</th><th>Amount</th></tr>`;
        paymentItems.forEach(p => {
            payment = payment + `<tr><td>${p.feeName}</td><td>${p.feeValue} EGP</td></tr>`;
        });
    }
    payment = payment + '</table>';
    const params = {
        Destination: {
            ToAddresses: [email]
        },
        // Template: 'requestconfirmation-1628274018988',
        Template: 'payment_confirmation-20221230120455',
        TemplateData: `{ "subject":"Your Payment has been confirmed!","guestName":"${name}","supportPhoneNumber":"${phoneNumber}","homePageLink":"${process.env.baseURlWebsite}","paymentDetails":"${payment}"}`,
        Source: '"Birdnest" <hello@birdnestlife.com>'
    };
    logger.debug(`try to send reservation email to ${email}`);
    const sendPromise = new AWS.SES({
        apiVersion: '2010-12-01',
        region: 'me-south-1',
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey
    }).sendTemplatedEmail(params)
        .promise();
    return sendPromise
        .then((data) => {
        logger.debug('sending reservation confirmation email successfully');
        return data;
    })
        .catch((err) => {
        logger.debug('sending reservation confirmation email failed');
        return err;
    });
}
//# sourceMappingURL=email.service.js.map