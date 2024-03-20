import ServicesCard from "../../admin/Components/Services/ServicesCard";

const Services = (prop) => {
  const { services } = prop;

  return (
    <>
      {services.map((service) => (
        <ServicesCard
          key={service._id}
          id={service._id}
          name={service.name}
          description={service.description}
          price={service.price}
          ratings={service.ratings}
          image={service.image[0].url} // Assuming image is stored in an array with url property
          category={service.category}
        />
      ))}
    </>
  );
};

export default Services;
