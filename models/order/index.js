class Order {
  constructor(
    createdAt,
    discountAmount,
    easebuzzTxnId,
    items,
    isVeg,
    orderStatus,
    paymentStatus,
    preOrder,
    restaurantImageUrl,
    restaurantLocation,
    restaurantName,
    totalPrice,
    userFcmToken,
    userId,
    userName,
    vendorFcmToken,
    vendorId,
    orderId
  ) {
    this.createdAt = createdAt;
    this.discountAmount = discountAmount;
    this.easebuzzTxnId = easebuzzTxnId;
    this.items = items;
    this.isVeg = isVeg;
    this.orderStatus = orderStatus;
    this.paymentStatus = paymentStatus;
    this.preOrder = preOrder;
    this.restaurantImageUrl = restaurantImageUrl;
    this.restaurantLocation = restaurantLocation;
    this.restaurantName = restaurantName;
    this.totalPrice = totalPrice;
    this.userFcmToken = userFcmToken;
    this.userId = userId;
    this.userName = userName;
    this.vendorFcmToken = vendorFcmToken;
    this.vendorId = vendorId;
    this.orderId =orderId;

  }

  // Method to convert Order object to a plain JavaScript object
  toObject() {
    return {
      createdAt: this.createdAt,
      discountAmount: this.discountAmount,
      easebuzzTxnId: this.easebuzzTxnId,
      items: this.items,
      isVeg: this.isVeg,
      orderStatus: this.orderStatus,
      paymentStatus: this.paymentStatus,
      preOrder: this.preOrder,
      restaurantImageUrl: this.restaurantImageUrl,
      restaurantLocation: this.restaurantLocation,
      restaurantName: this.restaurantName,
      totalPrice: this.totalPrice,
      userFcmToken: this.userFcmToken,
      userId: this.userId,
      userName: this.userName,
      vendorFcmToken: this.vendorFcmToken,
      vendorId: this.vendorId,
      orderId:this.orderId
    };
  }
}

module.exports = Order;
