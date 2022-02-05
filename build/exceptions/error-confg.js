export const errorConfig = {
    ATTACHMENT_MODULE: {
        UPLOAD_IMAGE: {
            INVALID_DATA: {
                status: 409,
                message: 'image not found',
                errorCode: 'Not Found'
            }
        }
    },
    PROPERTY_MODULE: {
        CREATE_PROPERTY: {
            INVAlID_DATA: {
                status: 400,
                message: 'Property data is missing',
                errorCode: 'Bad Request'
            }
        },
        FIND_PROPERTY_BY_ID: {
            NOT_FOUND: {
                status: 404,
                message: 'Property not found',
                errorCode: 'Not Found'
            }
        },
        FIND_PROPERTY_BY_UNITTYPE_ID: {
            NOT_FOUND: {
                status: 404,
                message: 'Unit Type not found',
                errorCode: 'Not Found'
            }
        },
        UPDATE_PROPERTY: {
            INVAlID_DATA: {
                status: 400,
                message: 'Property data is missing',
                errorCode: 'Bad Request'
            },
            INVAlID_AREA: {
                status: 400,
                message: 'Area provided is not correct',
                errorCode: 'Bad Request'
            },
            NOT_FOUND: {
                status: 409,
                message: 'Property not found',
                errorCode: 'Not Found'
            }
        },
        DELETE_PROPERTY_BY_ID: {
            NOT_FOUND: {
                status: 409,
                message: 'Property not found',
                errorCode: 'Not Found'
            }
        },
        UPLOAD_PROPERTY: {
            NOT_FOUND: {
                status: 409,
                message: 'Property not found',
                errorCode: 'Not Found'
            }
        }
    },
    MESSAGE_MODULE: {
        DELETE_MESSAGE_BY_ID: {
            NOT_FOUND: {
                status: 409,
                message: 'Message not found',
                errorCode: 'Not Found'
            }
        }
    },
    RESERVATION_MODULE: {
        CREATE_RESERVATION: {
            INVAlID_DATA: {
                status: 400,
                message: 'Reservation data is missing',
                errorCode: 'Bad Request'
            }
        },
        FIND_RESERVATION_BY_ID: {
            NOT_FOUND: {
                status: 404,
                message: 'Reservation not found',
                errorCode: 'Not Found'
            }
        },
        FIND_RESERVATION_BY_UNIT_TYPE_ID: {
            NOT_FOUND: {
                status: 404,
                message: 'Reservations not found',
                errorCode: 'Not Found'
            }
        },
        UPDATE_RESERVATION: {
            INVAlID_DATA: {
                status: 400,
                message: 'Reservation data is missing',
                errorCode: 'Bad Request'
            },
            NOT_FOUND: {
                status: 409,
                message: 'Reservation not found',
                errorCode: 'Not Found'
            }
        },
        DELETE_RESERVATION_BY_ID: {
            NOT_FOUND: {
                status: 409,
                message: 'Reservation not found',
                errorCode: 'Not Found'
            }
        },
        UPLOAD_RESERVATION: {
            NOT_FOUND: {
                status: 409,
                message: 'Reservation not found',
                errorCode: 'Not Found'
            }
        }
    },
    AREA_MODULE: {
        CREATE_AREA: {
            INVAlID_DATA: {
                status: 400,
                message: 'Area data is missing',
                errorCode: 'Bad Request'
            }
        },
        FIND_AREA_BY_ID: {
            NOT_FOUND: {
                status: 404,
                message: 'Area not found',
                errorCode: 'Not Found'
            }
        },
        FIND_AREA_BY_NAME: {
            NOT_FOUND: {
                status: 404,
                message: 'Area not found',
                errorCode: 'Not Found'
            }
        },
        UPDATE_AREA: {
            INVAlID_DATA: {
                status: 400,
                message: 'Area data is missing',
                errorCode: 'Bad Request'
            },
            NOT_FOUND: {
                status: 404,
                message: 'Area not found',
                errorCode: 'Not Found'
            }
        },
        DELETE_AREA_BY_ID: {
            NOT_FOUND: {
                status: 409,
                message: 'Area not found',
                errorCode: 'Not Found'
            },
            AREA_ASSIGNED: {
                status: 400,
                message: 'Area assigned to existing property',
                errorCode: 'Bad Request'
            }
        }
    },
    DEVICE_INFO__MODULE: {
        CREATE_DEVICE_INFO: {
            INVAlID_DATA: {
                status: 400,
                message: 'Device info data is missing',
                errorCode: 'Bad Request'
            }
        },
        FIND_DEVICE_INFO_BY_ID: {
            NOT_FOUND: {
                status: 404,
                message: 'Device info not found',
                errorCode: 'Not Found'
            }
        },
        UPDATE_DEVICE_INFO: {
            INVAlID_DATA: {
                status: 400,
                message: 'Device info data is missing',
                errorCode: 'Bad Request'
            },
            NOT_FOUND: {
                status: 404,
                message: 'Device info not found',
                errorCode: 'Not Found'
            }
        },
        DELETE_DEVICE_INFO_BY_ID: {
            NOT_FOUND: {
                status: 409,
                message: 'Device info not found',
                errorCode: 'Not Found'
            }
        }
    },
    APP_VERSION__MODULE: {
        CREATE_APP_VERSION: {
            INVAlID_DATA: {
                status: 400,
                message: 'APP version data is missing',
                errorCode: 'Bad Request'
            }
        },
        FIND_APP_VERSION_BY_ID: {
            NOT_FOUND: {
                status: 404,
                message: 'APP version not found',
                errorCode: 'Not Found'
            }
        },
        UPDATE_APP_VERSION: {
            INVAlID_DATA: {
                status: 400,
                message: 'APP version data is missing',
                errorCode: 'Bad Request'
            },
            NOT_FOUND: {
                status: 404,
                message: 'APP version not found',
                errorCode: 'Not Found'
            }
        },
        DELETE_APP_VERSION_BY_ID: {
            NOT_FOUND: {
                status: 409,
                message: 'App version not found',
                errorCode: 'Not Found'
            }
        }
    },
    UNIT_TYPE_MODULE: {
        CREATE_UNIT_TYPE: {
            INVAlID_DATA: {
                status: 400,
                message: 'Unit Type data is missing',
                errorCode: 'Bad Request'
            }
        },
        FIND_UNIT_TYPE_BY_ID: {
            NOT_FOUND: {
                status: 404,
                message: 'Unit Type not found',
                errorCode: 'Not Found'
            }
        },
        FIND_UNIT_TYPE_BY_NAME: {
            NOT_FOUND: {
                status: 404,
                message: 'Unit Type not found',
                errorCode: 'Not Found'
            }
        },
        UPDATE_UNIT_TYPE: {
            INVAlID_DATA: {
                status: 400,
                message: 'Unit Type data is missing',
                errorCode: 'Bad Request'
            },
            NOT_FOUND: {
                status: 409,
                message: 'Unit Type not found',
                errorCode: 'Not Found'
            }
        },
        DELETE_UNIT_TYPE_BY_ID: {
            NOT_FOUND: {
                status: 409,
                message: 'Unit Type not found',
                errorCode: 'Not Found'
            }
        },
        UPLOAD_SHOW_ROOM: {
            NOT_FOUND: {
                status: 404,
                message: 'Unit Type not found',
                errorCode: 'Not Found'
            }
        }
    },
    UNIT_TYPE_GROUP_MODULE: {
        CREATE_UNIT_TYPE: {
            INVAlID_DATA: {
                status: 400,
                message: 'Unit Type Group data is missing',
                errorCode: 'Bad Request'
            },
            INVAlID_TYPES: {
                status: 400,
                message: 'One of the assigned unit type id is not correct',
                errorCode: 'Bad Request'
            }
        },
        FIND_UNIT_TYPE_BY_ID: {
            NOT_FOUND: {
                status: 404,
                message: 'Unit Type Group not found',
                errorCode: 'Not Found'
            }
        },
        FIND_UNIT_TYPE_BY_NAME: {
            NOT_FOUND: {
                status: 404,
                message: 'Unit Type Group not found',
                errorCode: 'Not Found'
            }
        },
        UPDATE_UNIT_TYPE: {
            INVAlID_DATA: {
                status: 400,
                message: 'Unit Type Group data is missing',
                errorCode: 'Bad Request'
            },
            NOT_FOUND: {
                status: 409,
                message: 'Unit Type Group not found',
                errorCode: 'Not Found'
            }
        },
        DELETE_UNIT_TYPE_GROUP_BY_ID: {
            NOT_FOUND: {
                status: 409,
                message: 'Unit Type Group not found',
                errorCode: 'Not Found'
            }
        },
    },
    AMENITIES_MODULE: {
        CREATE_AMENITIES: {
            INVAlID_DATA: {
                status: 400,
                message: 'Amenities data is missing',
                errorCode: 'Bad Request'
            }
        },
        FIND_AMENITIES_BY_ID: {
            NOT_FOUND: {
                status: 404,
                message: 'Amenities not found',
                errorCode: 'Not Found'
            }
        },
        FIND_AMENITIES_BY_NAME: {
            NOT_FOUND: {
                status: 404,
                message: 'Amenities not found',
                errorCode: 'Not Found'
            }
        },
        UPDATE_AMENITIES: {
            INVAlID_DATA: {
                status: 400,
                message: 'Amenities data is missing',
                errorCode: 'Bad Request'
            },
            NOT_FOUND: {
                status: 409,
                message: 'Amenities not found',
                errorCode: 'Not Found'
            }
        },
        DELETE_AMENITIES_BY_ID: {
            NOT_FOUND: {
                status: 409,
                message: 'Amenities not found',
                errorCode: 'Not Found'
            }
        },
        UPLOAD_AMENITY: {
            NOT_FOUND: {
                status: 409,
                message: 'Property not found',
                errorCode: 'Not Found'
            }
        }
    },
    BOOKING_MODULE: {
        CREATE_BOOKING: {
            INVAlID_DATA: {
                status: 400,
                message: 'Booking data is missing',
                errorCode: 'Bad Request'
            }
        },
        VERIFY_MOBILE: {
            INVAlID_DATA: {
                status: 400,
                message: 'Verification data is missing',
                errorCode: 'Bad Request'
            },
            INVAlID_REQUEST_ID: {
                status: 400,
                message: 'Request Id or OTP is wrong',
                errorCode: 'Bad Request'
            },
            INVAlID_STATUS: {
                status: 400,
                message: 'Request status is wrong',
                errorCode: 'Bad Request'
            },
            MISSING_REJECTION_REASON: {
                status: 400,
                message: 'Rejection reason is missing',
                errorCode: 'Bad Request'
            }
        },
        START_CHECK_IN: {
            INVAlID_TOKEN: {
                status: 400,
                message: 'Invalid token',
                errorCode: 'Bad Request'
            },
            TOKEN_EXPIRED: {
                status: 400,
                message: 'The token provided is expired',
                errorCode: 'Bad Request'
            }
        }
    },
    GUEST_MODULE: {
        CREATE_GUEST: {
            INVAlID_DATA: {
                status: 400,
                message: 'guest data is missing',
                errorCode: 'Bad Request'
            }
        },
        UPLOAD_DOCUMENT: {
            INVAlID_DATA: {
                status: 400,
                message: 'Missing Input',
                errorCode: 'Bad Request'
            }
        },
        FIND_GUEST_BY_ID: {
            NOT_FOUND: {
                status: 404,
                message: 'guest not found',
                errorCode: 'Not Found'
            }
        },
        FIND_GUEST_BY_NAME: {
            NOT_FOUND: {
                status: 404,
                message: 'guest not found',
                errorCode: 'Not Found'
            }
        },
        UPDATE_GUEST: {
            INVAlID_DATA: {
                status: 400,
                message: 'guest data is missing',
                errorCode: 'Bad Request'
            },
            NOT_FOUND: {
                status: 404,
                message: 'guest not found',
                errorCode: 'Not Found'
            }
        },
        DELETE_GUEST_BY_ID: {
            NOT_FOUND: {
                status: 409,
                message: 'guest not found',
                errorCode: 'Not Found'
            }
        },
        START_CHECK_IN: {
            INVAlID_TOKEN: {
                status: 400,
                message: 'Invalid token',
                errorCode: 'Bad Request'
            },
            TOKEN_EXPIRED: {
                status: 400,
                message: 'The token provided is expired',
                errorCode: 'Bad Request'
            }
        }
    },
    PAYMENT_MODULE: {
        CREATE_PAYMENT: {
            INVAlID_DATA: {
                status: 400,
                message: 'payment data is missing',
                errorCode: 'Bad Request'
            }
        },
        FIND_PAYMENT_BY_ID: {
            NOT_FOUND: {
                status: 404,
                message: 'payment not found',
                errorCode: 'Not Found'
            }
        },
        FIND_PAYMENT_BY_NAME: {
            NOT_FOUND: {
                status: 404,
                message: 'payment not found',
                errorCode: 'Not Found'
            }
        },
        UPDATE_PAYMENT: {
            INVAlID_DATA: {
                status: 400,
                message: 'payment data is missing',
                errorCode: 'Bad Request'
            },
            NOT_FOUND: {
                status: 404,
                message: 'payment not found',
                errorCode: 'Not Found'
            }
        },
        DELETE_PAYMENT_BY_ID: {
            NOT_FOUND: {
                status: 409,
                message: 'payment not found',
                errorCode: 'Not Found'
            }
        },
        MONTHLY_REVENUE: {
            BAD_REQUEST: {
                status: 400,
                message: 'Maximum number of months is 11',
                errorCode: 'Bas Request'
            }
        }
    },
};
//# sourceMappingURL=error-confg.js.map