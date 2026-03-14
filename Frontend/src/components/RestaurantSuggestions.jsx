import { useEffect, useState } from "react";

function RestaurantSuggestions({ transactions }) {

  
  const [restaurants,setRestaurants] = useState([]);
  const [budget,setBudget] = useState(0);

  const income = transactions
    .filter(t=>t.amount>0)
    .reduce((s,t)=>s+t.amount,0);

  const expense = transactions
    .filter(t=>t.amount<0)
    .reduce((s,t)=>s+t.amount,0);

  const balance = income + expense;

  const savings = balance * 0.2;
  const reserve = balance * 0.1;

  const spendable = balance - savings - reserve;

  useEffect(()=>{

    setBudget(spendable);

    navigator.geolocation.getCurrentPosition(async(pos)=>{

      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const query = `
      [out:json];
      (
        node["amenity"="restaurant"](around:2000,${lat},${lon});
      );
      out;
      `;

      const res = await fetch(
        "https://overpass-api.de/api/interpreter", //OpenStreetMap Overpass API - URL
        {
          method:"POST",
          body:query
        }
      );

      const data = await res.json();

      const restaurants = data.elements.map(r=>{

        const distance = Math.sqrt(
          Math.pow(lat-r.lat,2)+Math.pow(lon-r.lon,2)
        )*111000;

        const estimatedCost = Math.floor(Math.random()*400)+100;

        return{
          name:r.tags?.name || "Local Restaurant",
          distance:distance.toFixed(0),
          cost:estimatedCost
        }

      });

      const filtered = restaurants
        .filter(r=>r.cost <= spendable)
        .sort((a,b)=>a.distance-b.distance)
        .slice(0,5);

      setRestaurants(filtered);

    });

  },[transactions]);

  return (
  <div className="discovery-container">
    <div className="discovery-header">
      <div className="budget-insight">
        <h3>🍽 Affordable Dining</h3>
        <p>Based on your <strong>Safe to Spend</strong> limit</p>
      </div>
      <div className="budget-badge">
        <label>Food Budget</label>
        <span>₹{budget.toFixed(0)}</span>
      </div>
    </div>

    {restaurants.length === 0 ? (
      <div className="empty-state">
        <p>No restaurants within budget nearby. Time to cook? 🍳</p>
      </div>
    ) : (
      <div className="restaurant-grid">
        {restaurants.map((r, i) => (
          <div key={i} className="res-card-modern">
            <div className="res-info">
              <h4>{r.name}</h4>
              <div className="res-meta">
                <span className="dist-tag">📍 {r.distance}m</span>
                <span className="cost-tag">₹{r.cost} avg</span>
              </div>
            </div>
            <div className="res-action">
              <button className="view-btn">View Menu</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

}

export default RestaurantSuggestions