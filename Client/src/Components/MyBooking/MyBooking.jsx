import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SubNav from "../SubNav/SubNav";

const MyBooking = () => {
  const [user, setUser] = useState(null); // Use null for initial state
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Use consistent naming
  const [bookings, setBookings] = useState([]); // Use a specific name for bookings

  useEffect(() => {
    const fetchBookings = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        return; // Handle user not logged in earlier
      }

      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      try {
        setIsLoading(true); // Set loading state before fetching

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include withCredentials for authorized requests
        };

        const response = await axios.get(
          "http://localhost:4000/api/v1/booking/me", // Double-check endpoint URL
          config
        );

        setBookings(response.data.bookings); // Set bookings from response data
      } catch (error) {
        console.error("Error fetching bookings:", error); // Log error message
        // Handle error more informatively (e.g., display error message to user)
      } finally {
        setIsLoading(false); // Clear loading state after success or failure
      }
    };

    fetchBookings();
  }, []); // Empty dependency array ensures one-time execution

  if (!user) {
    return (
      <>
        <p>User is not logged in.</p>
        <button
          className="bg-blue-500 text-white rounded-lg m-2 p-2"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </>
    );
  }
  const newData = (date) => {
    // console.log(date);
    const formattedDate = new Date(date).toLocaleDateString("en-IN");
    // console.log(formattedDate);
    return formattedDate;
  };

  const bookingContent = isLoading ? (
    <p>Loading bookings...</p>
  ) : (
    <div>
      {/* <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border border-gray-200">
              Service Name
            </th>
            <th className="px-4 py-2 text-left border border-gray-200">Name</th>
            <th className="px-4 py-2 text-left border border-gray-200">
              Email
            </th>
            <th className="px-4 py-2 text-left border border-gray-200">
              Phone
            </th>
            <th className="px-4 py-2 text-left border border-gray-200">
              Service Date
            </th>
            <th className="px-4 py-2 text-left border border-gray-200">
              Service Time
            </th>
            <th className="px-4 py-2 text-left border border-gray-200">
              Comments
            </th>
            <th className="px-4 py-2 text-left border border-gray-200">
              Car Type
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border border-gray-200">
                {booking.serviceName}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {booking.name}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {booking.email}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {booking.phone}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {newData(booking.serviceDate)}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {booking.serviceTime}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {booking.comments}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {booking.carType}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <div className="p-8 rounded-md w-full">
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal shadow-lg shadow-indigo-500/40">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Service Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Phone
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Service Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Service Time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Comments
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Car Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
            <tr key={booking._id} className="hover:bg-gray-100">
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{booking.serviceName}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">{booking.name}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">{booking.email}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">{booking.phone}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">{newData(booking.serviceDate)}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">{booking.serviceTime}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">{booking.comments}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">{booking.carType}</p>
              </td>
            </tr>
          ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SubNav />

      {bookingContent}
    </>
  );
};

export default MyBooking;
