import * as cron from 'node-cron';
import logger from '../logger/logger';
class SampleJob {
    /**
     * sample cronjob
     * @module sampleJobModule
     * @function job
     * @return {void}
     */
    job() {
        cron.schedule('* * * * *', async () => {
            logger.debug("Sample crob job runs every mintue");
        });
    }
}
export default new SampleJob();
//# sourceMappingURL=sample-cron.service.js.map