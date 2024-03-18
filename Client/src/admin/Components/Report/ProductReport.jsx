import { useContext } from "react";
import OrderCard from "./OrderCard";
import { OrderContext } from "../../../Context/OrderContex";

const ProductReport = () => {
  const { data, loading, error, fetchData } = useContext(OrderContext);

  if (loading) {
    return <p>Loading Orders...</p>; // Render loading indicator
  }

  if (error) {
    return (
      <div>
        <p>Error fetching Orders: {error}</p>
        <button onClick={fetchData}>Retry</button>
      </div>
    ); // Handle errors gracefully with retry button
  }

  const totalAmount = data.reduce(
    (acc, order) => acc + order.paymentInfo.totalPrice,
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product Report</h2>
      {data.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
      {data && (
        <p className="text-right font-bold mt-4">
          Total Amount: ₹{totalAmount}
        </p>
      )}
    </div>
  );
};

export default ProductReport;
