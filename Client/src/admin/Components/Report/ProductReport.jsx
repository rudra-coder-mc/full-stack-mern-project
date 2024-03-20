import { useContext } from "react";
import OrderCard from "./OrderCard";
import { OrderContext } from "../../../Context/OrderContex";

const ProductReport = () => {
  const { OrderData, OrderLoading, OrderError, fetchOrderData } =
    useContext(OrderContext);

  if (OrderLoading) {
    return <p>OrderLoading Orders...</p>; // Render OrderLoading indicator
  }

  if (OrderError) {
    return (
      <div>
        <p>OrderError fetching Orders: {OrderError}</p>
        <button onClick={fetchOrderData}>Retry</button>
      </div>
    ); // Handle OrderErrors gracefully with retry button
  }

  const totalAmount = OrderData.reduce(
    (acc, order) => acc + order.paymentInfo.totalPrice,
    0
  );

  return (
    <div className="p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Product Report</h2>
      {OrderData.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
      {OrderData && (
        <p className="text-right font-bold mt-4">
          Total Amount: ₹{totalAmount}
        </p>
      )}
    </div>
  );
};

export default ProductReport;
