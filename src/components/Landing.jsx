import React from "react";
import { Link } from "react-router-dom";

function Landing({ products }) {
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const avgPrice = products.length
    ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
    : 0;

  // Show first 3 products as featured
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="page">
      <div className="hero">
        <h1>Welcome to <span>Admin Portal</span></h1>
        <p>Manage your products, track inventory, and grow your store — all in one place.</p>
        <Link to="/products" className="hero-btn">View All Products</Link>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h2>{products.length}</h2>
          <p>Total Products</p>
        </div>
        <div className="stat-card">
          <h2>{totalStock}</h2>
          <p>Items in Stock</p>
        </div>
        <div className="stat-card">
          <h2>${avgPrice}</h2>
          <p>Average Price</p>
        </div>
      </div>

      {featuredProducts.length > 0 && (
        <div className="featured-section">
          <h2>Featured Products</h2>
          <div className="featured-products">
            {featuredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} />
                <div className="product-info">
                  <span className="category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <div className="price">${product.price}</div>
                  <p style={{fontSize: 13, color: "#888", marginBottom: 12}}>Stock: {product.stock}</p>
                  <Link to={`/products/${product.id}`} className="btn-edit" style={{textAlign:"center", textDecoration:"none"}}>View Details</Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign: "center", marginTop: "20px"}}>
            <Link to="/products" className="hero-btn">View All Products</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;