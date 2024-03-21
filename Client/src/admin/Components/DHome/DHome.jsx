import { useContext, useEffect } from "react";
import { OrderContext } from "../../../Context/OrderContex";
import { BookingContex } from "../../../Context/BookingContex";
import { UserContex } from "../../../Context/UserContex";

const DHome = () => {
  const { OrderData, OrderLoading, OrderError, fetchOrderData } =
    useContext(OrderContext);
  const { UserData, UserLoading, UserError, fetchUserData } =
    useContext(UserContex);
  const { BookingData, BookingLoading, BookingError, fetchBookingData } =
    useContext(BookingContex);

  // Fetch data on component mount
  useEffect(() => {
    fetchOrderData();
    fetchUserData();
    fetchBookingData();
  }, []);

  if (OrderLoading || UserLoading || BookingLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }
  if (OrderError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 rounded-md px-4 py-3 flex items-center space-x-4">
          <svg
            className="h-6 w-6 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.99 14.522a1 1 0 001.414-1.414L13.436 12l-1.414-1.414A1 1 0 0010.99 10.586V14.522zM9 16a3 3 0 100-6 3 3 0 000 6z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v3"
            />
          </svg>
          <p className="text-red-500">Error fetching Orders: {OrderError}</p>
        </div>
        <button
          onClick={fetchOrderData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }
  if (UserError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 rounded-md px-4 py-3 flex items-center space-x-4">
          <svg
            className="h-6 w-6 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.99 14.522a1 1 0 001.414-1.414L13.436 12l-1.414-1.414A1 1 0 0010.99 10.586V14.522zM9 16a3 3 0 100-6 3 3 0 000 6z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v3"
            />
          </svg>
          <p className="text-red-500">Error fetching User: {UserError}</p>
        </div>
        <button
          onClick={fetchUserData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }
  if (BookingError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 rounded-md px-4 py-3 flex items-center space-x-4">
          <svg
            className="h-6 w-6 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.99 14.522a1 1 0 001.414-1.414L13.436 12l-1.414-1.414A1 1 0 0010.99 10.586V14.522zM9 16a3 3 0 100-6 3 3 0 000 6z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v3"
            />
          </svg>
          <p className="text-red-500">Error fetching Booking: {BookingError}</p>
        </div>
        <button
          onClick={fetchBookingData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const totalAmount = OrderData.reduce(
    (acc, order) => acc + order.paymentInfo.totalPrice,
    0
  );

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {" "}
        {OrderData && (
          <div>
            <h2>Total Orders: {OrderData.length}</h2>
          </div>
        )}
        {UserData.users && (
          <div>
            <h2>Total Users: {UserData.users.length}</h2>
          </div>
        )}
        {BookingData && (
          <div>
            <h2>Total Bookings: {BookingData.bookingCount}</h2>
          </div>
        )}
        {OrderData && UserData && BookingData && (
          <div>
            <p>Total Order Price: {totalAmount.toFixed(2)}</p>
            {/* Add a button or link here if needed */}
          </div>
        )}
      </div>
    </>
  );
};

export default DHome;
