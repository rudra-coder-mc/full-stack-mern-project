import { useState, useEffect } from "react";
import { SubNav } from "../";

const Address = () => {
  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    pinCode: 0,
    phoneNo: 0,
  });
  const [AddressMessage, setAddressMessage] = useState(null);

  const handleSubmitForAddress = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    let data = JSON.stringify(address);
    localStorage.setItem("address", data);
    setAddressMessage("Update success...");
  };
  useEffect(() => {
    let data2 = localStorage.getItem("address");
    let address = JSON.parse(data2);
    setAddress(address);
  }, []);
  const handleChangeForAddress = (event) => {
    setAddressMessage(null);
    setAddress({ ...address, [event.target.name]: event.target.value });
  };
  return (
    <>
      <SubNav />
      <div className="overflow-auto mb-8 bg-blue-200 max-w-md mx-auto w-full space-y-8 border p-4 rounded-xl mt-8">
        <div className="container mx-auto ">
          <h1 className="text-3xl font-bold mb-6">Address</h1>
          <form
            onSubmit={handleSubmitForAddress}
            className="w-full space-y-2 p-4 rounded-xl bg-gradient-to-r  from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
          >
            {/* {AddressError && ( // Conditionally display error message
              <span className="text-red-500 font-bold text-sm block mb-4">
                {AddressError}
              </span>
            )} */}
            {AddressMessage && ( // Conditionally display error message
              <span className="text-black font-bold text-sm block mb-4">
                {AddressMessage}
              </span>
            )}
            <div className="flex flex-col">
              <label htmlFor="address" className="text-sm font-medium mb-2">
                address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={address?.address}
                onChange={handleChangeForAddress}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="text-sm font-medium mb-2">
                city
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={address?.city}
                onChange={handleChangeForAddress}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="state" className="text-sm font-medium mb-2">
                state
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={address?.state}
                onChange={handleChangeForAddress}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="pinCode" className="text-sm font-medium mb-2">
                pinCode
              </label>
              <input
                type="number"
                id="pinCode"
                name="pinCode"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={address?.pinCode}
                onChange={handleChangeForAddress}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phoneNo" className="text-sm font-medium mb-2">
                phoneNo
              </label>
              <input
                type="number"
                id="phoneNo"
                name="phoneNo"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={address?.phoneNo}
                onChange={handleChangeForAddress}
                size="10"
                required
              />
            </div>

            
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update shipping Address
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Address;
