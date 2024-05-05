// const Services = () => {
//   return <div>Services</div>;
// };
// export default Services;
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ServicesContex } from "../Context/ServicesContex";
import {ServiceDetailPage} from "../Components/";

const Services = () => {
  const { data, loading, error } = useContext(ServicesContex); // Access context properties
  const [selectedServices, setSelectedServices] = useState(null); // State to store the filtered Services
  const { ServiceId } = useParams();
  const [Udata, setUdata] = useState({
    name: null,
    email: null,
  });

  // Fetch and filter data when component mounts
  useEffect(() => {
    if (data && !loading && !error) {
      // Filter the Services based on ServicesId
      const filteredServices = data.find(
        (Services) => Services._id === ServiceId
      );

      setSelectedServices(filteredServices);
      if (localStorage.getItem("user")) {
        let temp = localStorage.getItem("user");
        let user = JSON.parse(temp);
        setUdata({
          name: user.name,
          email: user.email,
        });
      }

      // console.log(user);
      // console.log(user.name);
      // console.log(user.email);
    }
  }, [data, loading, error, ServiceId]);

  if (loading) {
    return <p>Loading Servicess...</p>; // Render loading indicator
  }

  if (error) {
    return <p>Error fetching Servicess: {error}</p>; // Handle errors gracefully
  }

  if (!selectedServices) {
    return <p>Services not found.</p>; // Handle cases where Services is not found
  }
  // console.log(selectedServices);

  return (
    <ServiceDetailPage
      id={selectedServices._id}
      image={selectedServices.image[0].url}
      name={selectedServices.name}
      description={selectedServices.description}
      price={selectedServices.price}
      category={selectedServices.category}
      ratings={selectedServices.ratings}
      UName={Udata.name}
      UEmail={Udata.email}
    />
  );
};

export default Services;
