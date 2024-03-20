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
    <div className="p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Product Report</h2>
      <div className="overflow-auto grid md:grid-cols-3 gap-4 sm:grid-cols-1">
        {data.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
        </div>
        {data && (
          <div>
            <p className="text-right font-bold text-2xl my-4">
              <span className="border py-2 px-3 bg-slate-400 rounded">Total Amount: ₹{totalAmount}</span>
            </p>
          </div>
        )}
      
    </div>
  );
};

export default ProductReport;
