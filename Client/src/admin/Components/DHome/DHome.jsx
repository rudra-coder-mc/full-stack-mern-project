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
      <div className="bg-gray-100 min-h-screen">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {OrderData && (
          <div className="bg-yellow-400 rounded-lg shadow-md p-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H3zm5 10a1 1 0 11-2 0 1 1 0 012 0zm4-4a1 1 0 11-2 0 1 1 0 012 0zm4 4a1 1 0 11-2 0 1 1 0 012 0zm-7-6h6v2H9V7z" clipRule="evenodd" />
            </svg>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Total Orders
              </h2>
              <p className="text-gray-600">
                {OrderData.length}
              </p>
            </div>
          </div>
        )}
        {UserData.users && (
          <div className="bg-green-400 rounded-lg shadow-md p-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H3zm5 10a1 1 0 11-2 0 1 1 0 012 0zm4-4a1 1 0 11-2 0 1 1 0 012 0zm4 4a1 1 0 11-2 0 1 1 0 012 0zm-7-6h6v2H9V7z" clipRule="evenodd" />
            </svg>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Total Users
              </h2>
              <p className="text-gray-600">
                {UserData.users.length}
              </p>
            </div>
          </div>
        )}
        {BookingData && (
          <div className=" rounded-lg shadow-md p-6 flex items-center bg-pink-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H3zm5 10a1 1 0 11-2 0 1 1 0 012 0zm4-4a1 1 0 11-2 0 1 1 0 012 0zm4 4a1 1 0 11-2 0 1 1 0 012 0zm-7-6h6v2H9V7z" clipRule="evenodd" />
            </svg>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Total Bookings
              </h2>
              <p className="text-gray-600">
                {BookingData.bookingCount}
              </p>
            </div>
          </div>
        )}
        {OrderData && UserData && BookingData && (
          <div className=" rounded-lg shadow-md p-6 flex items-center bg-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H3zm5 10a1 1 0 11-2 0 1 1 0 012 0zm4-4a1 1 0 11-2 0 1 1 0 012 0zm4 4a1 1 0 11-2 0 1 1 0 012 0zm-7-6h6v2H9V7z" clipRule="evenodd" />
            </svg>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 ">
                Total Order Price
              </h2>
              <p className="text-gray-600">
                Rs.{totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
    </>
  );
};

export default DHome;
