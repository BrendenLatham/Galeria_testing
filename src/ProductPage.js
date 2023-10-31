// src/ProductPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import "./product.css"
const baseEndpoint = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

const relatedProducts = [
  { id: "1", name: "Graphic Tee Small - $24.99" },
  { id: "2", name: "Graphic Tee Medium - $24.99" },
  { id: "3", name: "Graphic Tee Large - $24.99" },
  { id: "4", name: "Graphic Tee XL - $24.99" },
  { id: "5", name: "Canvas Print - $59.99" },
  { id: "6", name: "Giclee Print - $39.99" },
  { id: "7", name: "Coffee Mug - $12.99" },
];

function ProductPage() {
  const { objectId } = useParams(); // Access the objectId from the route parameters
  const [productInfo, setProductInfo] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const handleAddToCart = () => {
    if (selectedProduct) {
      const productToAdd = relatedProducts.find((product) => product.id === selectedProduct);
      if (productToAdd) {
        setSelectedProducts([...selectedProducts, productToAdd]);
        setSelectedProduct("");
      }
    }
  };

  useEffect(() => {
    fetch(baseEndpoint + objectId)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setProductInfo(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [objectId]);

  return (
    <div className="product-page">
      
      {productInfo && (
        <div className="product-image">
          <h1>{productInfo.title}</h1>
          <h3>{productInfo.artistDisplayName}</h3>
          <img src={productInfo.primaryImageSmall} alt={productInfo.title} />
        </div>
      )}
    
      <form>
        <label>Select a product:</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">-- Select a product --</option>
          {relatedProducts.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </form>
      
    </div>
  );
}
export default ProductPage;