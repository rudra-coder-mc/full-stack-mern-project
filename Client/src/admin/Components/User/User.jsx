import { useContext, useState } from "react";
import { UserContex } from "../../../Context/UserContex";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import axios from "axios";

const User = () => {
  const { UserData, UserLoading, UserError, fetchUserData } =
    useContext(UserContex);
  const [UpDateRole, setUpDateRole] = useState({
    role: "",
    id: "",
  });
  const [Loding, setLoding] = useState(false);
  const [Error, setError] = useState("");
  const axiosInstance = axios.create({ withCredentials: true });

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
    setError(null);
    if (e != "Selete role") {
      setUpDateRole({
        role: e,
        id: id,
      });
    }
  };
  const handelUpdate = async (id) => {
    setLoding(true);
    // console.log(UpDateRole.role);
    if (UpDateRole.id == id) {
      try {
        let Url = `/api/v1/admin/user/${id}`;
        const response = await axiosInstance.put(Url, {
          role: UpDateRole.role,
        });
        if (response.data.success) {
          fetchUserData();
        } else {
          setError("Something went wrong. Please try again.");
          console.log(response);
        }
      } catch (error) {
        // Log error for debugging
        console.error("Error fetching data:", error);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoding(false);
      }
    } else {
      setError("on one time selected User can Update");
    }

    setLoding(false);
  };

  const handelDelete = async (id) => {
    setLoding(true);
    // console.log(id);
    try {
      let Url = `/api/v1/admin/user/${id}`;
      const response = await axiosInstance.delete(Url);
      if (response.data.success) {
        fetchUserData();
      } else {
        setError("Something went wrong. Please try again.");
        console.log(response);
      }
    } catch (error) {
      // Log error for debugging
      console.error("Error fetching data:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoding(false);
    }
  };


  return (
    <div className="user-report w-full shadow-md rounded-lg px-4 py-4 overflow-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">UpDate User</h2>
      {Error && <span className="text-xl text-red-800">{Error}</span>}
 

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
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      UpDate Role
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
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
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          <div className="relative">
                            <select
                              onChange={(event) =>
                                UpdateRolw(event.target.value, user._id)
                              }
                              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
                            >
                              <option value="Selete role">Select role</option>
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                className="w-4 h-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-.707.293z"
                                />
                              </svg>
                            </div>
                          </div>
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          <button
                            className="m-1 bg-green-500 p-1 rounded-sm px-3 py-1"
                            onClick={() => handelUpdate(user._id)}
                            disabled={Loding}
                          >
                            <FaRegEdit className="text-2xl" />
                          </button>
                          <button
                            className="m-1 bg-red-500 p-1 rounded-sm px-3 py-1"
                            onClick={() => handelDelete(user._id)}
                            disabled={Loding}
                          >
                            <FaRegTrashAlt className="text-2xl" />
                          </button>
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
};
export default User;
