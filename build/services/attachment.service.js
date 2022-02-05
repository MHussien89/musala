import HttpException from '../exceptions/HttpException';
import { errorConfig } from '../exceptions/error-confg';
import * as AWS from 'aws-sdk';
import * as stream from 'stream';
import { awsConfig } from '../config/aws-config';
import logger from '../logger/logger';
const s3 = new AWS.S3({
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
    region: 'me-south-1'
});
class AttachmentService {
    constructor() {
        this.attachmentErrors = errorConfig.ATTACHMENT_MODULE;
    }
    /**
     * upload one file
     * @module attachmentModule
     * @function uploadAssets
     * @param  {string} file - file to be saved
     * @return {Promise<any>}
     */
    async uploadAssets(file, path) {
        if (file && file.buffer) {
            const fileName = file.originalname || '';
            const splitedName = fileName.split('.').filter((el) => {
                return el;
            });
            if (splitedName.length <= 1) {
                splitedName.push(new Date().getTime().toString());
            }
            else {
                splitedName.splice(splitedName.length - 1, 0, new Date().getTime().toString());
            }
            let assestsName;
            if (splitedName.length === 1) {
                assestsName = splitedName.join('');
            }
            else {
                assestsName = splitedName.join('.');
            }
            logger.debug(`format assets name for image ${assestsName} AttachmentService uploadAssets`);
            const bufferStream = new stream.PassThrough();
            bufferStream.end(file.buffer);
            const params = {
                Bucket: awsConfig.assetsBucket,
                Key: `${path}/${assestsName}`,
                Body: bufferStream,
                ACL: 'public-read'
            };
            return new Promise((resolve, reject) => {
                logger.debug(`try to upload assets to aws bucket ${params.Bucket} key ${params.Key} AttachmentService uploadAssets`);
                s3.upload(params, (err, data) => {
                    if (err) {
                        logger.debug(`failed to upload assets to aws bucket ${params.Bucket} key ${params.Key} AttachmentService uploadAssets`);
                        reject(err);
                    }
                    else {
                        logger.debug(`succesfully  upload image to aws bucket ${params.Bucket} key ${params.Key} AttachmentService uploadAssets`);
                        resolve(data);
                    }
                });
            });
        }
        throw new HttpException(this.attachmentErrors.UPLOAD_IMAGE.INVALID_DATA);
    }
    /**
   * delete one file
   * @module attachmentModule
   * @function deleteAssets
   * @param  {string} file - file to be deleted
   * @return {Promise<any>}
   */
    async deleteAssets(key) {
        logger.debug(`delete asset with key ${key} AttachmentService deleteAssets`);
        const params = {
            Bucket: awsConfig.assetsBucket,
            Key: key
        };
        return new Promise((resolve, reject) => {
            logger.debug(`try to delete assets from aws bucket ${params.Bucket} key ${key} AttachmentService deleteAssets`);
            s3.deleteObject(params, (err, data) => {
                if (err) {
                    logger.debug(`failed to delete assets from aws bucket ${params.Bucket} key ${key} AttachmentService deleteAssets`);
                    reject(err);
                }
                else {
                    logger.debug(`succesfully  delete image from aws bucket ${params.Bucket} key ${key} AttachmentService deleteAssets`);
                    resolve(data);
                }
            });
        });
    }
}
export default AttachmentService;
//# sourceMappingURL=attachment.service.js.map