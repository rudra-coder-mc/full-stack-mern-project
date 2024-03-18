import { useContext, useState, useEffect } from "react";
import { BookingContex } from "../../../Context/BookingContex"; // Assuming BookingContext

function TodyAppointments() {
  const { data, loading, error, fetchData } = useContext(BookingContex);
  const [filteredServices, setFilteredServices] = useState([]);

  // Filter services on component mount and handle errors
  useEffect(() => {
    if (data && data.success && data.bookings) {
      const todaysDate = new Date().toLocaleDateString("en-US");
      const filtered = data.bookings.filter(
        (booking) =>
          new Date(booking.serviceDate).toLocaleDateString("en-US") ===
          todaysDate
      );
      setFilteredServices(filtered);
    } else {
      console.error("Error fetching bookings:", data?.message); // Log error message
    }
  }, [data]);

  if (loading) {
    return <p className="text-center p-4">Loading Appointments...</p>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center p-4">
        <p className="text-red-500 text-center">
          Error fetching Appointments: {error}
        </p>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchData}
        >
          Retry
        </button>
      </div>
    );
  }

  const bookingCount = filteredServices.length;

  if (!bookingCount) {
    return <p className="text-center p-4">No appointments for today.</p>;
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
