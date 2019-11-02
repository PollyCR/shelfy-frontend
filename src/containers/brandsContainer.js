import React, { useState, useEffect } from "react";
import API from "../adapters/API";
import { Card, Placeholder, Button } from "semantic-ui-react";

const BrandsContainer = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    API.validateUser();
    API.getBrands().then(data => {
      setBrands(data);
      setSelectedBrand(null);
    });
  }, []);

  const findBrands = () => {
    return brands.map(brand => (
      <ul key={brand.id} onClick={findBrand} id={brand.id} value={brand.name}>
        {brand.name}
      </ul>
    ));
  };

  const findBrand = event => {
    event.persist();
    // console.log(event);
    setSelectedBrand(parseInt(event.target.id));
    if (selectedBrand) {
      return (
          <h1>{brands.find(brand => brand.id === selectedBrand).name}</h1>
          )}
       else {
    }
  };

  const findProducts = () => {
    if (selectedBrand !== undefined) {
      return brands.find(brand => brand.id === selectedBrand).products;
    }
  };

  return <div>
    <h1>Choose a brand...</h1>
    {selectedBrand ? <Card><h1>{brands.find(brand => brand.id === selectedBrand).name}</h1>{brands.find(brand => brand.id === selectedBrand).products.map(product => <ul key = {product.id}>{product.name} <br /><Button>Add to routine</Button><Button>Add to list</Button></ul>)}</Card> : null}
    {findBrands()}</div>;
};

export default BrandsContainer;
