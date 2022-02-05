import requestPromise from 'request-promise-native';
import correlator from './correlation-id';
export default {
    requestPromise: requestPromise.defaults({
        headers: {
            get 'x-correlation-id'() {
                return correlator.getId();
            }
        }
    })
};
//# sourceMappingURL=correlation-id-request-promise.js.map