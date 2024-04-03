import { useContext } from "react";
import { UserContex } from "../../../Context/UserContex"; // Likely typo fixed
import { FaUserGroup, FaUsers, FaUserTie } from "react-icons/fa6";

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
    <div className="user-report w-full shadow-md rounded-lg px-4 py-4 overflow-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">User Report</h2>

      <div className="grid grid-cols-3 gap-6 mx-4 my-5">
        <div className="flex border rounded-sm overflow-hidden bg-white shadow shadow-bloack">
          <span className="bg-green-500 flex items-center px-4 py-3.5">
            <FaUsers className="text-5xl text-white" />
          </span>
          <div className="my-auto">
            <h3 className="px-4 text-gray-700">Total Member</h3>
            <p className="px-4 text-3xl">{totalUsers}</p>
          </div>
        </div>
        <div className="flex border rounded-sm overflow-hidden bg-white shadow shadow-bloack">
          <span className="bg-blue-400 flex items-center px-4 py-3.5">
            <FaUserTie className="text-5xl text-white" />
          </span>
          <div className="my-auto">
            <h3 className="px-4 text-gray-700">Total Admins</h3>
            <p className="px-4 text-3xl">{admins}</p>
          </div>
        </div>
        <div className="flex border rounded-sm overflow-hidden bg-white shadow shadow-bloack">
          <span className=" bg-indigo-400 flex items-center px-4 py-3.5">
            <FaUserGroup className="text-5xl text-white" />
          </span>
          <div className="my-auto">
            <h3 className="px-4 text-gray-700">Total Users</h3>
            <p className="px-4 text-3xl">{usersCount}</p>
          </div>
        </div>
      </div>
      {/* <table className="w-full table-auto">
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
      </table> */}

      <div className="p-8 rounded-md w-full">
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal shadow-lg shadow-indigo-500/40">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                        {user._id}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                        {user.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                        {user.email}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                        {user.role}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                        {new Date(user.createdAt).toLocaleDateString()}
                        </p>
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
}

export default UserReport;
