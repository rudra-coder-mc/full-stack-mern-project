import { useState, useEffect, useContext } from "react";
import Services from "../Components/Services/Services";
import { ServicesContex } from "../Context/ServicesContex";

const ServicesCategory = (prop) => {
  const { data, loading, error } = useContext(ServicesContex); // Access context properties

  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredServices, setFilteredServices] = useState(data); // State for filtered services
  const [filteredHomeServices, setFilteredHomeServices] = useState(data); // State for filtered services
  const [selectedCategory, setSelectedCategory] = useState("all"); // State for selected category

  useEffect(() => {
    const filterServices = () => {
      if (!searchTerm && selectedCategory === "all") {
        setFilteredServices(data); // Set all services if no search or filter
        return;
      }

      let filtered = data.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (selectedCategory !== "all") {
        filtered = filtered.filter(
          (service) => service.category === selectedCategory
        );
      }

      setFilteredServices(filtered);
    };
    const filterHomeServices = () => {
      let filtered = data.filter((service) => service.category === prop.filter);

      setFilteredHomeServices(filtered);
    };

    filterHomeServices();
    filterServices(); // Call filter function on initial render and search/category changes
  }, [data, searchTerm, selectedCategory]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      {!prop.filter && (
        <div className="search-bar category-filter flex m-4 gap-2">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-500"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-500"
          >
            <option value="all">All Categories</option>
            {/* Add options for your available categories dynamically based on data */}
            {data.map((service) => (
              <option key={service.category} value={service.category}>
                {service.category}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="my-3 mx-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-1 items-center justify-center">
        {loading ? (
          <p>Loading Services...</p>
        ) : error ? (
          <p>Error fetching Services: {error}</p>
        ) : prop.filter ? (
          <>
            <Services services={filteredHomeServices} />
          </>
        ) : (
          <Services services={filteredServices} /> // Pass filtered services to Services component
        )}
      </div>
    </>
  );
};

export default ServicesCategory;
