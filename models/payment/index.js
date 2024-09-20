// order.js (Model File)
class Payment {
    constructor(orderId, userId, paymentStatus) {
      this.orderId = orderId;
      this.userId = userId;
      this.paymentStatus = paymentStatus;
    }
  }
  
  module.exports = Payment;
  