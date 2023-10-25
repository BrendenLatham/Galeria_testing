import React, { useState, useEffect } from "react";
import ProductContainer3 from "./productContainer3";
import { eachEndpoint, testEndpoint, searchEndpoint } from "./constant";
import { useLocation } from "react-router";

const SearchResult = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const initialPhotos = photos.slice(0, itemsPerPage);
  const [isShowedAll, setIsShowedAll] = useState(false);

  const { state } = useLocation();
  //console.log(state);

  const showMore = () => {
    setItemsPerPage(itemsPerPage + 15);
    if (itemsPerPage >= photos.length) {
      setIsShowedAll(true);
    } else {
      setIsShowedAll(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setPhotos([]);
    setIsShowedAll(false);
    fetch(searchEndpoint + state)
      .then((IDs) => {
        return IDs.json();
      })
      .then((data) => {
        data.objectIDs.forEach((element) => {
          fetch(eachEndpoint + element)
            .then((res) => {
              if (res.status === 200) {
                return res.json();
              }
            })
            .then((photo) => {
              if (photo !== undefined) {
                if (photo.primaryImageSmall) {
                  setPhotos((prevPhotos) => prevPhotos.concat(photo));
                }
              }
            });
        });
      })
      .catch((err) => console.log(err, "hihi"))
      .finally(() => {
        setLoading(false);
      });
  }, [state]);

  return (
    <div>
      <ProductContainer3 photos={initialPhotos} />
      <div className="d-flex justify-content-center">
        {!isShowedAll && (
          <button className="btn btn-primary" onClick={() => showMore()}>
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchResult;