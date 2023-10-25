// productContainer3.js
import React from "react";

const ProductContainer3 = (postToRender) => {
  console.log(postToRender);
  return (
    <div className="container-fluid" style={{ backgroundColor: "white" }}>
      <div className="row row-cols-2 row-cols-md-3 g-4">
        {postToRender.photos.map((product) => (
          <div className="col" key={product.objectID}>
            <div className="card bg-dark text-white">
              <img
                src={product.primaryImage}
                className="card-img-top center-block"
                alt={product.title}
              />
              <div
                className="card-img-overlay d-flex flex-column justify-content-end"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
              >
                <h5 className="card-title">{product.artistDisplayName}</h5>
                <p className="card-text">{product.title}</p>
                <button
                  href="./#"
                  className="btn btn-dark"
                  style={{ maxWidth: 100 }}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
        ;
      </div>
    </div>
  );
};
export default ProductContainer3;

