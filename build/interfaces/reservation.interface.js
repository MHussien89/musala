export var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus["CONFIRMATION_PENDING"] = "confirmation_pending";
    ReservationStatus["CHECKED_IN"] = "checked_in";
    ReservationStatus["CHECK_IN_STARTED"] = "checkin_started";
    ReservationStatus["IN_HOUSE"] = "in_house";
    ReservationStatus["CHECKED_OUT"] = "checked_out";
    ReservationStatus["CANCELED"] = "canceled";
    ReservationStatus["EXPIRED"] = "expired";
})(ReservationStatus || (ReservationStatus = {}));
export var ReservationActivityType;
(function (ReservationActivityType) {
    ReservationActivityType["CREATE_RESERVATION"] = "create_reservation";
    ReservationActivityType["UPDATE_RESERVATION"] = "update_reservation";
    ReservationActivityType["CREATE_PAYMENT"] = "create_payment";
    ReservationActivityType["UPDATE_PAYMENT"] = "update_payment";
    ReservationActivityType["DELETE_PAYMENT"] = "delete_payment";
    ReservationActivityType["CREATE_GUEST"] = "create_guest";
    ReservationActivityType["UPDATE_GUEST"] = "update_guest";
})(ReservationActivityType || (ReservationActivityType = {}));
//# sourceMappingURL=reservation.interface.js.map