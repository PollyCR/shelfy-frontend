import React, { useState, useEffect } from "react";
import API from "../adapters/API";
import {Card} from 'semantic-ui-react'

const BrandsContainer = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    API.getBrands().then(data => {
      setBrands(data);
      setSelectedBrand(data[0].id);
    });
  }, []);

  const handleClick = e => {
    setSelectedBrand(parseInt(e.target.id))
    findBrand()
    
  }

  const findBrand = () => {
    return (<Card>{brands.find(brand => brand.id === selectedBrand).name}</Card>)
  }

  return (
    <div>

      {brands.map(brand => (
        <Card key={brand.id} onClick = {handleClick} id={brand.id} value={brand.name}>
          {brand.name}
        </Card>
        
      ))}
    </div>
  );
};

export default BrandsContainer;
