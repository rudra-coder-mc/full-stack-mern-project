import { useContext } from "react";
import { ServicesContex } from "../../Context/ServicesContex";
import ServicesCard from "../../admin/Components/Services/ServicesCard";

const Services = () => {
  const { data, loading, error } = useContext(ServicesContex); // Access context properties

  if (loading) {
    return <p>Loading Services...</p>; // Render loading indicator
  }

  if (error) {
    return <p>Error fetching Services: {error}</p>; // Handle errors gracefully
  }
//   console.log(data);
  return (
    <>
      {data.map((Service) => (
        <ServicesCard
          key={Service._id}
          id={Service._id}
          name={Service.name}
          description={Service.description}
          price={Service.price}
          ratings={Service.ratings}
          image={Service.image[0].url}
          category={Service.category}
        />
      ))}
    </>
  );
};

export default Services;
