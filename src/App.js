import React, { useState, useEffect } from "react";
import { View } from "./components/View";

// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem("products");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const App = () => {
  const [products, setproducts] = useState(getDatafromLS());

  // input
  const [category, setcategory] = useState("");
  const [Description, setDescription] = useState("");
  const [price, setprice] = useState("");
  const [large, setlarge] = useState("");
  const [median, setmedian] = useState("");
  const [short, setshort] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  // form submit

  const handleAddproductsubmit = (e) => {
    e.preventDefault();
    // creating an object

    let obj = {
      category,
      Description,
      price,
      large,
      median,
      short
    };
    setproducts([...products, obj]);
    setTotalPrice((prev) => prev + Number(price));

    ///////////////////////////////////////////////////////////////
    setcategory("");
    setDescription("");
    setprice("");
    setlarge("");
    setmedian("");
    setshort("");
  };

  // delete
  const deleteproduct = (productname) => {
    var product = products.find((prod) => prod.productname === productname);

    const filteredproducts = products.filter((element, index) => {
      return element.productname !== productname;
    });
    setproducts(filteredproducts);
    ////////////////////////////////////////////////////////////
    setTotalPrice((prev) => prev - product.price);
  };

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleRemoveAll = () => {
    setproducts([]);
    setTotalPrice(0);
  };

  return (
    <div className="wrapper">
      <h1>Shoe Commerce Platform</h1>

      <div className="main">
        <div className="form-container">
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={handleAddproductsubmit}
          >
            <label>choose a catagory</label>
            <select
              id="catagory"
              name="catagory"
              className="form-control"
              required
              onChange={(e) => setcategory(e.target.value)}
              value={category}
            >
              <option value="animal"> navyblue</option>
              <option value="movies"> backshoose</option>
              <option value="electricity"> red shoose</option>
              <option value="food"> orange shgoose</option>
            </select>
            <br></br>
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={Description}
            ></input>
            <br></br>
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              required
              onChange={(e) => setprice(e.target.value)}
              value={price}
            ></input>
            <br></br>

            <label>L</label>
            <input
              type="number"
              className="form-control"
              required
              onChange={(e) => setlarge(e.target.value)}
              value={large}
            ></input>
            <br></br>
            <label>M</label>
            <input
              type="number"
              className="form-control"
              required
              onChange={(e) => setmedian(e.target.value)}
              value={median}
            ></input>
            <br></br>
            <label>S</label>
            <input
              type="number"
              className="form-control"
              required
              onChange={(e) => setshort(e.target.value)}
              value={short}
            ></input>
            <br></br>
            <button type="submit" className="btn btn-success btn-md">
              ADD Product
            </button>
          </form>

          <h1>Products</h1>

          <h3>Total Value Worth of product rs.{totalPrice}</h3>
        </div>

        <div className="view-container">
          {products.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>catagory</th>
                      <th>Description</th>
                      <th>price</th>
                      <th>large</th>
                      <th>median</th>
                      <th>short</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <View products={products} deleteproduct={deleteproduct} />
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-danger btn-md"
                onClick={handleRemoveAll}
              >
                Remove All
              </button>
            </>
          )}
          {products.length < 1 && <div>No products are added yet</div>}
        </div>
      </div>
    </div>
  );
};

export default App;
