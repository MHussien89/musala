export const errorConfig = {

  GATEWAY_MODULE: {
    CREATE_GATEWAY: {
    },
    UPDATE_GATEWAY: {
      GATEWAY_NOT_FOUND: {
        status: 404,
        message: 'Gateway not found',
        errorCode: 'Not Found'
      }
    },
    GET_GATEWAY_BY_ID: {
      GATEWAY_NOT_FOUND: {
        status: 404,
        message: 'Gateway not found',
        errorCode: 'Not Found'
      }
    },
    CREATE_DEVICE: {
      MAXIMUM_DEVICES: {
        status: 400,
        message: 'Maximum number of devices reached',
        errorCode: 'Bad Request'
      },
      GATEWAY_NOT_FOUND: {
        status: 404,
        message: 'Gateway not found',
        errorCode: 'Not Found'
      }
    },
    UPDATE_DEVICE: {
      DEVICE_NOT_FOUND: {
        status: 404,
        message: 'Device not found',
        errorCode: 'Not Found'
      }
    },
    GET_DEVICE_BY_ID: {
      DEVICE_NOT_FOUND: {
        status: 404,
        message: 'Device not found',
        errorCode: 'Not Found'
      }
    },
    DELETE_DEVICE: {
      GATEWAY_NOT_FOUND: {
        status: 404,
        message: 'Gateway not found',
        errorCode: 'Not Found'
      },
      DEVICE_NOT_FOUND: {
        status: 404,
        message: 'Device not found',
        errorCode: 'Not Found'
      }
    }
  }
};
