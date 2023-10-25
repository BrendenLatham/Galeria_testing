//content6.js
//this is working for display all the products
import React, { useState, useEffect } from "react";
import ProductContainer3 from "./productContainer3";
import { eachEndpoint, testEndpoint } from "./constant";

const Content6 = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  //const [totalPosts, setTotalPosts] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  //const initialPhotos = slice(photos, 0, itemsPerPage);
  const initialPhotos = photos.slice(0, itemsPerPage);
  const [isShowedAll, setIsShowedAll] = useState(false);

  const showMore = () => {
    setItemsPerPage(itemsPerPage + 15);
    console.log(itemsPerPage);
    if (itemsPerPage >= photos.length) {
      setIsShowedAll(true);
    } else {
      setIsShowedAll(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(testEndpoint)
      .then((IDs) => {
        return IDs.json();
      })
      .then((data) => {
        //setTotalPosts(data.total); // this is the total number of posts
        data.objectIDs.forEach((element) => {
          fetch(eachEndpoint + element)
            .then((res) => {
              if (res.status === 200) {
                return res.json();
              }
            })
            .then((photo) => {
              //console.log(photo);
              if (photo !== undefined) {
                //console.log(photo, "gethereanyway");
                if (photo.primaryImageSmall) {
                  //console.log(photo);
                  setPhotos((prevPhotos) => prevPhotos.concat(photo));
                }
              }
            });
        });
      })
      .catch((err) => console.log(err, "hihi"))
      .finally(() => {
        console.log(photos);
        setLoading(false);
      });
    //console.log(photos);
  }, []);

  return (
    // need to adjust to be in the center of the screen
    <div
      style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1583119912267-cc97c911e416?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YXJ0LHBhaW50aW5nLGh1bWFuLHBlcnNvbixncmV5LHdhbGxwYXBlcnx8fHx8fDE2OTYxMzEyNTU&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600)",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        height: "100vh",
        overflow: "scroll",
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <blockquote className="blockquote text-center">
          <h1 style={{ color: "white" }}>
            Make your space an art galery without a lawsuit
          </h1>
        </blockquote>
      </div>
      {loading ? (
        <div className="p-5" style={{ height: 500 }}>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <blockquote
            className="blockquote text-center p-5"
            style={{ backgroundColor: "transparent" }}
          >
            <h1>New Content</h1>
          </blockquote>
          <ProductContainer3 photos={initialPhotos} />
          <div className="d-flex justify-content-center">
            {isShowedAll ? (
              <button onClick={showMore} className="btn btn-light m-3">
                End of list !!!
              </button>
            ) : (
              <button onClick={showMore} className="btn btn-dark m-3">
                Show More
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Content6;