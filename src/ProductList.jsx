import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./ProductList.css";
import CartItem from "./CartItem";
import { addItem } from "../redux/CartSlice"; // adjust path if your CartSlice is located elsewhere

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();

  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const [addedToCart, setAddedToCart] = useState({}); // track which plants are added

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image:
            "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15",
        },
        {
          name: "Spider Plant",
          image:
            "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
        },
        {
          name: "Peace Lily",
          image:
            "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18",
        },
        {
          name: "Boston Fern",
          image:
            "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
          description: "Adds humidity to the air and removes toxins.",
          cost: "$20",
        },
        {
          name: "Rubber Plant",
          image:
            "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
          description: "Easy to care for and effective at removing toxins.",
          cost: "$17",
        },
        {
          name: "Aloe Vera",
          image:
            "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Purifies the air and has healing properties for skin.",
          cost: "$14",
        },
      ],
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image:
            "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3",
          description: "Calming scent, used in aromatherapy.",
          cost: "$20",
        },
        {
          name: "Jasmine",
          image:
            "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3",
          description: "Sweet fragrance, promotes relaxation.",
          cost: "$18",
        },
        {
          name: "Rosemary",
          image:
            "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
          description: "Invigorating scent, often used in cooking.",
          cost: "$15",
        },
        {
          name: "Mint",
          image:
            "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
          description: "Refreshing aroma, used in teas and cooking.",
          cost: "$12",
        },
        {
          name: "Lemon Balm",
          image:
            "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
          description: "Citrusy scent, relieves stress and promotes sleep.",
          cost: "$14",
        },
        {
          name: "Hyacinth",
          image:
            "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
          description: "Beautiful flowering plant known for its fragrance.",
          cost: "$22",
        },
      ],
    },
    {
      category: "Insect Repellent Plants",
      plants: [
        {
          name: "Oregano",
          image:
            "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg",
          description:
            "Contains compounds that can deter certain insects.",
          cost: "$10",
        },
        {
          name: "Marigold",
          image:
            "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg",
          description: "Natural insect repellent, adds color to the garden.",
          cost: "$8",
        },
        {
          name: "Geraniums",
          image:
            "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg",
          description:
            "Known for insect-repelling properties and pleasant scent.",
          cost: "$20",
        },
        {
          name: "Basil",
          image:
            "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg",
          description: "Repels flies and mosquitoes, used in cooking.",
          cost: "$9",
        },
        {
          name: "Catnip",
          image:
            "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg",
          description: "Repels mosquitoes and attracts cats.",
          cost: "$13",
        },
      ],
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          name: "Aloe Vera",
          image:
            "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Soothing gel used for skin ailments.",
          cost: "$14",
        },
        {
          name: "Echinacea",
          image:
            "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg",
          description: "Boosts immune system, helps fight colds.",
          cost: "$16",
        },
        {
          name: "Peppermint",
          image:
            "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg",
          description: "Relieves digestive issues and headaches.",
          cost: "$13",
        },
        {
          name: "Chamomile",
          image:
            "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
          description: "Soothes anxiety and promotes sleep.",
          cost: "$15",
        },
        {
          name: "Calendula",
          image:
            "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg",
          description: "Heals wounds and soothes skin irritations.",
          cost: "$12",
        },
      ],
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        {
          name: "ZZ Plant",
          image:
            "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3",
          description: "Thrives in low light and requires minimal watering.",
          cost: "$25",
        },
        {
          name: "Pothos",
          image:
            "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg",
          description: "Tolerates neglect and can grow in various conditions.",
          cost: "$10",
        },
        {
          name: "Snake Plant",
          image:
            "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Needs infrequent watering and is resilient to pests.",
          cost: "$15",
        },
      ],
    },
  ];

  const styleObj = {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "20px",
  };
  const styleObjUl = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "1100px",
  };
  const styleA = {
    color: "white",
    fontSize: "30px",
    textDecoration: "none",
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  // Add to cart handler
  const handleAddToCart = (plant) => {
    // Build item payload. Add quantity default 1 so reducer can use it.
    const payload = {
      name: plant.name,
      image: plant.image,
      description: plant.description,
      cost: plant.cost,
      quantity: 1,
    };

    dispatch(addItem(payload));
    // mark as added in local state to update UI
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt="logo"
              style={{ width: 48, height: 48 }}
            />
            <a href="/" onClick={(e) => handleHomeClick(e)} style={{ textDecoration: "none" }}>
              <div>
                <h3 style={{ color: "white", margin: 0 }}>Paradise Nursery</h3>
                <i style={{ color: "white" }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>

        <div style={styleObjUl}>
          <div>
            <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>
              Plants
            </a>
          </div>
          <div>
            <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
              <h1 className="cart" style={{ margin: 0 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  id="IconChangeColor"
                  height="48"
                  width="48"
                >
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    id="mainIconPathAttribute"
                  ></path>
                </svg>
              </h1>
            </a>
          </div>
        </div>
      </div>

      {!showCart ? (
        <>
          {!showPlants ? (
            <div style={{ padding: 40, textAlign: "center" }}>
              <h2>Welcome to Paradise Nursery</h2>
              <p>Click <strong>Plants</strong> in the navbar to view products and add them to your cart.</p>
            </div>
          ) : (
            <div className="product-grid" style={{ padding: "20px" }}>
              {plantsArray.map((categoryObj) => (
                <section key={categoryObj.category} style={{ marginBottom: "32px" }}>
                  <h2 style={{ marginBottom: "12px" }}>{categoryObj.category}</h2>
                  <div
                    className="cards-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    {categoryObj.plants.map((plant) => (
                      <div className="plant-card" key={plant.name} style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "12px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                        background: "#fff"
                      }}>
                        <img
                          src={plant.image}
                          alt={plant.name}
                          style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }}
                        />
                        <h3 style={{ margin: "8px 0 4px 0" }}>{plant.name}</h3>
                        <p style={{ margin: "0 0 8px 0", fontSize: 14 }}>{plant.description}</p>
                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                          <strong>{plant.cost}</strong>
                          <button
                            onClick={() => handleAddToCart(plant)}
                            disabled={!!addedToCart[plant.name]}
                            style={{
                              padding: "8px 12px",
                              borderRadius: 6,
                              border: "none",
                              cursor: addedToCart[plant.name] ? "default" : "pointer",
                              backgroundColor: addedToCart[plant.name] ? "#bbb" : "#4CAF50",
                              color: "white",
                            }}
                          >
                            {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
