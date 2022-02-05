export var PaymentType;
(function (PaymentType) {
    PaymentType["CASH"] = "cash";
    PaymentType["CARD"] = "card";
})(PaymentType || (PaymentType = {}));
export var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["COLLECTED"] = "collected";
    PaymentStatus["OVERDUE"] = "overdue";
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["CANCELED"] = "canceled";
})(PaymentStatus || (PaymentStatus = {}));
export var PaymentCollector;
(function (PaymentCollector) {
    PaymentCollector["AIRBNB"] = "airbnb";
    PaymentCollector["BOOKING"] = "booking";
    PaymentCollector["PAYMOB"] = "paymob";
    PaymentCollector["BIRDNEST"] = "birdnest";
})(PaymentCollector || (PaymentCollector = {}));
export var PaymentAttemptStatus;
(function (PaymentAttemptStatus) {
    PaymentAttemptStatus["COMPLETED"] = "completed";
    PaymentAttemptStatus["PENDING"] = "pending";
    PaymentAttemptStatus["REFUNDED"] = "refunded";
    PaymentAttemptStatus["FAILED"] = "failed";
})(PaymentAttemptStatus || (PaymentAttemptStatus = {}));
//# sourceMappingURL=payment.interface.js.map