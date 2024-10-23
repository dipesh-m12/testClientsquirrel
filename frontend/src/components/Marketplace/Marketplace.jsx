import React, { useEffect, useState } from "react";
import "./Marketplace.css";
import cross from "../../images/cross.png";
import searchIcon from "../../images/searchIcon.png";
import NavBar from "../NavBar/NavBar";
import deleteIcon from "../../images/delete.png";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { patentsRoute } from "../../utils/apiRoutes";

const Marketplace = () => {
  // useAuth();
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [selectedValue, setselectedValue] = useState("");
  const [patents, setpatents] = useState();
  const availableFilters = [
    { name: "Industry", options: ["Aerospace", "Defence", "Technology"] },
    { name: "Technology", options: ["AI-ML", "Radar", "Electronic Warfare"] },
    { name: "Transaction Type", options: ["Available", "Sold"] },
    { name: "Type of Patent", options: ["Design", "Utility", "Plant"] },
  ];

  // Mock list of items
  const items = [
    {
      id: 1,
      name: "Human Rated Crew Mobile",
      status: "Available",
      img: "/path-to-image1",
    },
    {
      id: 2,
      name: "Anti-radar vehicle",
      status: "Sold",
      img: "/path-to-image2",
    },
    {
      id: 3,
      name: "Floating AI-ML based radar system",
      status: "Available",
      img: "/path-to-image3",
    },
    {
      id: 4,
      name: "Autonomous Space Rover",
      status: "Available",
      img: "/path-to-image4",
    },
    {
      id: 5,
      name: "Electronic Warfare Drone",
      status: "Sold",
      img: "/path-to-image5",
    },
    {
      id: 6,
      name: "AI-based Satellite System",
      status: "Available",
      img: "/path-to-image6",
    },
    {
      id: 7,
      name: "Human Rated Crew Mobile",
      status: "Available",
      img: "/path-to-image1",
    },
    {
      id: 8,
      name: "Anti-radar vehicle",
      status: "Sold",
      img: "/path-to-image2",
    },
    {
      id: 9,
      name: "Floating AI-ML based radar system",
      status: "Available",
      img: "/path-to-image3",
    },
    {
      id: 10,
      name: "Autonomous Space Rover",
      status: "Available",
      img: "/path-to-image4",
    },
    {
      id: 11,
      name: "Electronic Warfare Drone",
      status: "Sold",
      img: "/path-to-image5",
    },
    {
      id: 12,
      name: "AI-based Satellite System",
      status: "Available",
      img: "/path-to-image6",
    },
    // Add more items as needed
  ];

  useEffect(() => {
    async function start() {
      const { data } = await axios.get(`${patentsRoute}/get-all-patents`);
      console.log(data.data);
      setpatents(data.data);
    }
    start();
  }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items per page
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Paginate the items list
  const paginateItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  // Handle page change
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to add filter to applied filters
  const addFilter = (filter) => {
    if (!appliedFilters.includes(filter)) {
      setAppliedFilters([...appliedFilters, filter]);
      setselectedValue("");
    }
  };

  // Function to remove a filter
  const removeFilter = (filter) => {
    setAppliedFilters(appliedFilters.filter((f) => f !== filter));
  };

  return (
    <>
      <NavBar />
      <div className="search-container-mp">
        <div className="filters-mp">
          <span className="filter-item-mp">
            All <span className="count-mp">(109)</span>
          </span>
          <span className="filter-item-mp">
            Available <span className="count-mp">(97)</span>
          </span>
          <span className="filter-item-mp">
            Sold <span className="count-mp">(12)</span>
          </span>
        </div>

        <div className="search-bar-mp">
          <span className="search-icon-mp">
            <img src={searchIcon} />
          </span>
          <input type="text-mp" placeholder="Search by keywords" />
        </div>
      </div>

      <div className="marketplace-mp">
        {/* Filters Section */}
        <div className="filters-section-mp">
          <h2>Filters</h2>
          <div className="filter-block-mp">
            <div className="filter-category-mp">
              <label>Industry</label>
              <select
                onChange={(e) => addFilter(e.target.value)}
                value={selectedValue}
              >
                <option value="" disabled selected>
                  Select Industry
                </option>
                <option value="Aerospace">Aerospace</option>
                <option value="Defence">Defence</option>
                <option value="Technology">Technology</option>
              </select>
            </div>

            <div className="filter-category-mp">
              <label>Technology</label>
              <select
                onChange={(e) => addFilter(e.target.value)}
                value={selectedValue}
              >
                <option value="" disabled selected>
                  Select Technology
                </option>
                <option value="AI-ML">AI-ML</option>
                <option value="Radar">Radar</option>
                <option value="Electronic Warfare">Electronic Warfare</option>
              </select>
            </div>

            <div className="filter-category-mp">
              <label>Transaction Type</label>
              <select
                onChange={(e) => addFilter(e.target.value)}
                value={selectedValue}
              >
                <option value="" disabled selected>
                  Select Transaction Type
                </option>
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            <div className="filter-category-mp">
              <label>Type of Patent</label>
              <div className="patent-options-mp">
                <button onClick={() => addFilter("Design")}>Design</button>
                <button onClick={() => addFilter("Utility")}>Utility</button>
                <button onClick={() => addFilter("Plant")}>Plant</button>
              </div>
            </div>
          </div>
        </div>

        <div className="filter-item-section-mp">
          {/* Applied Filters Section */}
          <div className="applied-filters-section-mp">
            <h3>Applied Filters</h3>
            <div className="applied-filters-mp">
              {appliedFilters.length > 0 ? (
                appliedFilters.map((filter, index) => (
                  <div key={index} className="applied-filter-mp">
                    <p>{filter}</p>
                    <button
                      onClick={() => removeFilter(filter)}
                      className="filterInButton-mp"
                    >
                      <img src={cross} />
                    </button>
                  </div>
                ))
              ) : (
                <p>No filters applied</p>
              )}
            </div>
          </div>

          {/* Items List Section */}

          <div className="items-list-section-mp">
            <h3>Items</h3>
            <div className="items-list-mp">
              {paginateItems().map((item) => (
                <div className="item-mp" key={item.id}>
                  <img src={item.img} alt={item.name} />
                  <p>{item.name}</p>
                  <div className="item-list-bin-mp">
                    <span
                      className={`availability-mp ${
                        item.status === "Sold" ? "availability-sold-mp " : ""
                      }`}
                    >
                      {item.status}
                    </span>
                    <button>
                      <img src={deleteIcon} className="item-list-bin-mp" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-mp">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketplace;
