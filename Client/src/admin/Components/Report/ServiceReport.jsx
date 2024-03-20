import { useContext } from "react";
import { BookingContex } from "../../../Context/BookingContex";

function createServiceReport(data) {
  if (!data || !data.success || !data.bookings) {
    // Check for bookings property
    return null; // Handle invalid or empty data
  }

  const bookings = data.bookings.map((booking) => {
    // Format serviceDate for better readability (optional)
    const formattedDate = new Date(booking.serviceDate).toLocaleDateString(
      "en-IN"
    );
    // console.log(bookings);
    return {
      id: booking._id,
      serviceName: booking.serviceName,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      serviceDate: formattedDate, // Use formattedDate if needed
      serviceTime: booking.serviceTime,
      comments: booking.comments,
      carType: booking.carType,
    };
  });

  const report = {
    bookingCount: data.bookingCount,
    services: bookings,
  };

  return report;
}

const ServiceReport = () => {
  const { data, loading, error, fetchData } = useContext(BookingContex);
  const report = createServiceReport(data);
  console.log(data);
  if (!report) {
    return <p>Error creating service report. Invalid data.</p>;
  }
  // console.log(report);
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

  const { bookingCount, services } = report;

  return (
    <div className="service-report w-full overflow-auto shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointments</h2>
      <p className="text-gray-600">Total Bookings: {bookingCount}</p>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left bg-gray-200 border-b border-gray-400">
            <th className="p-2">ID</th>
            <th className="p-2">service Name</th>
            <th className="p-2">User Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Service Date</th>
            <th className="p-2">Service Time</th>
            <th className="p-2">Comments</th>
            <th className="p-2">Car Type</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr
              key={service.id}
              className="border-b border-gray-400 hover:bg-gray-100"
            >
              <td className="p-2">{service.id}</td>
              <td className="p-2">{service.serviceName}</td>
              <td className="p-2">{service.name}</td>
              <td className="p-2">{service.email}</td>
              <td className="p-2">{service.phone}</td>
              <td className="p-2">{service.serviceDate}</td>
              <td className="p-2">{service.serviceTime}</td>
              <td className="p-2">{service.comments}</td>
              <td className="p-2">{service.carType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceReport;
