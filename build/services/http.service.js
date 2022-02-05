import * as request from 'request';
import { CONSTANTS } from '../config/cloud-beds';
import { HelpersUtils } from '../utils/helpers';
import HttpException from '../exceptions/HttpException';
class HTTPService {
    constructor() {
        this.doRequest = (method, url, body) => {
            return new Promise((resolve, reject) => {
                switch (method) {
                    case 'GET':
                        return this.get(url, resolve, reject);
                    case 'POST':
                        return this.post(url, body, resolve, reject);
                    case 'PUT':
                        return this.put(url, body, resolve, reject);
                }
            });
        };
        this.refreshRequest = () => {
            return new Promise((resolve, reject) => {
                return this.refresh(resolve, reject);
            });
        };
        this.refresh = (resolve, reject) => {
            const options = {
                method: 'POST',
                url: CONSTANTS.URL.REFRESH_TOKEN,
                json: true,
                form: {
                    grant_type: CONSTANTS.GRANT_TYPE,
                    client_id: CONSTANTS.CLIENT_ID,
                    client_secret: CONSTANTS.CLIENT_SECRET,
                    refresh_token: process.env.refresh_token
                }
            };
            request(options, (error, res, body) => {
                if (!error && res.statusCode == 200) {
                    resolve(body);
                }
                else {
                    reject(error);
                }
            });
        };
        this.get = (url, resolve, reject) => {
            const options = {
                url: url,
                json: true,
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${process.env.token}`
                }
            };
            request(options, (error, res, body) => {
                if (!error && res.statusCode == 200) {
                    resolve(res.body);
                }
                else if (!error) {
                    resolve({ statusCode: res.statusCode });
                }
                else {
                    reject(error);
                }
            });
        };
    }
    async callAPI(method, url, body) {
        let response = await this.doRequest(method, url, body);
        if (response.statusCode) {
            if (response.statusCode == 401) {
                let refreshResponse = await this.refreshRequest();
                HelpersUtils.storeCloudBedsTokens({ 'token': refreshResponse.access_token, 'refresh_token': refreshResponse.refresh_token });
                return this.callAPI(method, url, body);
            }
            else {
                throw new HttpException({
                    message: 'Integration error',
                    status: 500,
                    errorCode: 'BE-Error-' + response.statusCode
                });
            }
        }
        return response;
    }
    post(url, body, resolve, reject) {
        request.post(url, { form: body }, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(res.body);
            }
            else if (!error) {
                resolve({ statusCode: res.statusCode });
            }
            else {
                reject(error);
            }
        });
    }
    put(url, body, resolve, reject) {
        request.put(url, { form: body }, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(res.body);
            }
            else if (!error) {
                resolve({ statusCode: res.statusCode });
            }
            else {
                reject(error);
            }
        });
    }
}
export default HTTPService;
//# sourceMappingURL=http.service.js.map