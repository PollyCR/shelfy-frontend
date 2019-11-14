import React, { useState, useEffect } from "react";
import API from "../adapters/API";
import { Card, Placeholder, Button } from "semantic-ui-react";

const BrandsContainer = props => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    API.validateUser();
    API.getBrands().then(data => {
      setBrands(data);
      setSelectedBrand(null);
    });
  }, []);

  const handleBackClick = () => {
    props.history.push("/dashboard");
  };

  const findBrands = () => {
    return brands.map(brand => (
      <ul key={brand.id} onClick={findBrand} id={brand.id} value={brand.name}>
        {brand.name}
      </ul>
    ));
  };

  const handleListClick = (user, product) => {
    API.addListProduct(user.id, product).then(props.history.push("/list"));
    // .then(() => {API.getRoutine()})
  };

  const handleRoutineClick = (event, product) => {
    event.persist();
    // brand =
    let brand = props.brands.find(brand => brand.id === product.brand_id);

    API.addProductfromBrands({
      ...product,
      brand: brand,
      routine: event.target.id,
      id: props.user.id
    }).then(() => props.history.push(`/${event.target.id}`));
    // console.log({routine:event.target})
  };

  const findBrand = event => {
    event.persist();
    // console.log(event);
    setSelectedBrand(parseInt(event.target.id));
    if (selectedBrand) {
      return <h1>{brands.find(brand => brand.id === selectedBrand).name}</h1>;
    } else {
      return <Placeholder />;
    }
  };

  return (
    <div>
      <h1>Choose a brand...</h1>
      {selectedBrand ? (
        <Card className="selectedBrand">
          <h1>{brands.find(brand => brand.id === selectedBrand).name}</h1>
          {brands
            .find(brand => brand.id === selectedBrand)
            .products.map(product => (
              <div key={product.id}>
                <ul className="selectedProductName">{product.name}</ul>
                <ul className="selectedProductType">{product.product_type}</ul>
                <ul className="activeIngredients">
                  {product.active_ingredients
                    .map(a_i => {
                      return a_i.name.trim().toLowerCase();
                    })
                    .join(", ")}
                </ul>
                <Button.Group vertical basic>
                  <Button
                    onClick={() => handleListClick(props.user, product.id)}
                  >
                    add to list
                  </Button>
                  <Button
                    id="am"
                    onClick={event => handleRoutineClick(event, product)}
                  >
                    add to morning routine
                  </Button>
                  <Button
                    id="pm"
                    onClick={event => handleRoutineClick(event, product)}
                  >
                    add to evening routine
                  </Button>
                  <Button
                    id="treatment"
                    onClick={event => handleRoutineClick(event, product)}
                  >
                    add to treatment routine
                  </Button>
                </Button.Group>
              </div>
            ))}
        </Card>
      ) : null}
      {findBrands()}
      <Button basic onClick={handleBackClick}>
        go back
      </Button>
    </div>
  );
};

export default BrandsContainer;
