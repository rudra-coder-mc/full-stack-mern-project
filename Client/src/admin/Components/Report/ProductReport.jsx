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

  <div className="overflow-auto grid md:grid-cols-3 gap-4 sm:grid-cols-1">
      {OrderData.map((order) => (
        <OrderCard key={order._id} order={order} />
      
      ))}
    </div>
      {OrderData && (
        <div>
        <p className="text-right font-bold mt-4">
          Total Amount: ₹{totalAmount}
        </p>
</div>
      )}

    </div>
  );
};

export default ProductReport;
