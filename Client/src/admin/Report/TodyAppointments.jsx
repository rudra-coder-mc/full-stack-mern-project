import { useContext, useState, useEffect } from "react";
import { BookingContex } from "../../Context/BookingContex"; // Assuming BookingContext
import { FaCalendarXmark } from "react-icons/fa6";

function TodyAppointments() {
  const { BookingData, BookingLoading, BookingError, fetchBookingData } =
    useContext(BookingContex);
  const [filteredServices, setFilteredServices] = useState([]);

  // Filter services on component mount and handle BookingErrors
  useEffect(() => {
    if (BookingData && BookingData.success && BookingData.bookings) {
      const todaysDate = new Date().toLocaleDateString("en-US");
      const filtered = BookingData.bookings.filter(
        (booking) =>
          new Date(booking.serviceDate).toLocaleDateString("en-US") ===
          todaysDate
      );
      setFilteredServices(filtered);
    } else {
      console.BookingError(
        "BookingError fetching bookings:",
        BookingData?.message
      ); // Log BookingError message
    }
  }, [BookingData]);

  if (BookingLoading) {
    return <p className="text-center p-4">BookingLoading Appointments...</p>;
  }

  if (BookingError) {
    return (
      <div className="flex flex-col items-center p-4">
        <p className="text-red-500 text-center">
          BookingError fetching Appointments: {BookingError}
        </p>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchBookingData}
        >
          Retry
        </button>
      </div>
    );
  }

  const bookingCount = filteredServices.length;

  if (!bookingCount) {
    return (
      <>
        <div className="w-[100%] m-auto flex justify-center">
          <div className="w-80 py-10 rounded  bg-white">
            <p className="flex justify-center">
              <FaCalendarXmark className="text-6xl text-[#DC2626]"/>
            </p>
            <p className="text-xl font-normal text-gray-500 mt-5 mb-6 text-center">No appointments for today !</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="service-report w-full overflow-auto shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Today`s Appointments
      </h2>
      <p className="text-gray-600">Total Bookings: {bookingCount}</p>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left bg-gray-200 border-b border-gray-400">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Service Date</th>
            <th className="p-2">Service Time</th>
            <th className="p-2">Comments</th>
            <th className="p-2">Car Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service) => (
            <tr
              key={service._id}
              className="border-b border-gray-400 hover:bg-gray-100"
            >
              <td className="p-2">{service._id}</td>
              <td className="p-2">{service.name}</td>
              <td className="p-2">{service.email}</td>
              <td className="p-2">{service.phone}</td>
              <td className="p-2">
                {new Date(service.serviceDate).toLocaleDateString("en-IN")}
              </td>
              <td className="p-2">{service.serviceTime}</td>
              <td className="p-2">{service.comments}</td>
              <td className="p-2">{service.carType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodyAppointments;
