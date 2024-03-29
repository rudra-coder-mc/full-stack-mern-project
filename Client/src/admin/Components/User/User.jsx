import { useContext, useState } from "react";
import { UserContex } from "../../../Context/UserContex";

const User = () => {
  const { UserData, UserLoading, UserError, fetchUserData } =
    useContext(UserContex);
  const [UpDateRole, setUpDateRole] = useState({
    role: "",
    id: "",
  });

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

  const UpdateRolw = (e, id) => {
    if (e != "Selete role") {
      setUpDateRole({
        role: e,
        id: id,
      });
    }
  };
  const handelUpdate = () => {
    console.log(UpDateRole);
  };

  return (
    <div className="user-report w-full shadow-md rounded-lg px-4 py-4 overflow-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">UpDate User</h2>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left bg-gray-200 border-b border-gray-400">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Created At</th>
            <th className="p-2">UpDate Role</th>
            <th className="p-2">Update button</th>
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
              <td>
                <select
                  onChange={() => UpdateRolw(event.target.value, user._id)}
                >
                  <option value="Selete role">Selete role</option>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td>
                <button onClick={handelUpdate}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default User;
