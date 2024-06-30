const OrderCard = (prop) => {
  const { order } = prop;
  const { shippingInfo, paymentInfo = {}, orderItems } = order; // Set default empty object for paymentInfo

  return (
    <div className=" border-gray-300 rounded-md p-4 mb-4 bg-neutral-50 shadow-lg shadow-indigo-500/40">
      <div className="flex justify-between mb-2">
        <p className="font-bold">Shipping Info</p>
        <span
          className={`border py-1 px-1.5 rounded text-white ${
            paymentInfo.orderStatus === "Delivered"
              ? "bg-green-600"
              : paymentInfo.orderStatus === "Processing"
              ? "bg-yellow-400"
              : ""
          }`}
        >
          <p>{paymentInfo.orderStatus}</p>
        </span>
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
          <span className="border py-1 px-1.5 bg-zinc-200 shadow shadow-slate-300 rounded"><p className="font-semibold">Total: ₹{paymentInfo.totalPrice || 0}</p></span>{" "}
          {/* Set default value for totalPrice */}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
