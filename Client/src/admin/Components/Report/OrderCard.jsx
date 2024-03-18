const OrderCard = (prop) => {
  const { order } = prop;
  const { shippingInfo, paymentInfo = {}, orderItems } = order; // Set default empty object for paymentInfo

  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4">
      <div className="flex justify-between mb-2">
        <p className="font-bold">Shipping Info</p>
        <p>{paymentInfo.orderStatus}</p>
      </div>
      <div>
        <p>
          Address: {shippingInfo.address}, {shippingInfo.city},{" "}
          {shippingInfo.state} - {shippingInfo.pinCode}
        </p>
        <p>Phone: {shippingInfo.phoneNo}</p>
      </div>
      <ul className="list-none p-0 mt-4">
        {orderItems.map((item) => (
          <li key={item._id} className="mb-2">
            <span className="font-bold">{item.name}</span> (Quantity:{" "}
            {item.quantity}) - ₹{item.price}
          </li>
        ))}
      </ul>
      {paymentInfo && (
        <div className="flex justify-between mt-4">
          <p>Items: ₹{paymentInfo.itemsPrices || 0}</p>{" "}
          {/* Set default value for itemsPrices */}
          <p>Total: ₹{paymentInfo.totalPrice || 0}</p>{" "}
          {/* Set default value for totalPrice */}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
