import { useContext } from "react";
import { UserContex } from "../../../Context/UserContex"; // Likely typo fixed

function UserReport() {
  const { UserData, UserLoading, UserError, fetchUserData } =
    useContext(UserContex);

  if (UserLoading) {
    return <p className="text-center p-4">UserLoading Users...</p>; // Render UserLoading indicator
  }

  if (UserError) {
    return (
      <div className="flex flex-col items-center p-4">
        <p className="text-red-500 text-center">
          UserError fetching Users: {UserError}
        </p>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchUserData}
        >
          Retry
        </button>
      </div>
    ); // Handle UserErrors gracefully with retry button
  }
  if (!UserData || !UserData.success || !UserData.users) {
    return <p>UserError: Invalid user UserData.</p>;
  }

  const users = UserData.users;

  const totalUsers = users.length;
  const admins = users.filter((user) => user.role === "admin").length;
  const usersCount = totalUsers - admins;

  return (
    <div className="user-report w-full shadow-md rounded-lg px-4 py-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">User Report</h2>
      <p className="text-gray-600">Total Users: {totalUsers}</p>
      <ul className="list-disc pl-4 mb-4">
        <li>
          Admins: {admins} ({Math.round((admins / totalUsers) * 100)}%)
        </li>
        <li>
          Users: {usersCount} ({Math.round((usersCount / totalUsers) * 100)}%)
        </li>
      </ul>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left bg-gray-200 border-b border-gray-400">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b border-gray-400 hover:bg-gray-100"
            >
              <td className="p-2">{user._id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserReport;
