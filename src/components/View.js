import React from "react";
import { Icon } from "react-icons-kit";
import { trash } from "react-icons-kit/feather/trash";

export const View = ({ products, deleteproduct }) => {
  return products.map((item) => (
    <tr key={item.productname}>
      <td>{item.catagory}</td>
      <td>{item.Description}</td>
      <td>{item.price}</td>
      <td>{item.large}</td>
      <td>{item.median}</td>
      <td>{item.short}</td>
      <td
        className="delete-btn"
        onClick={() => deleteproduct(item.productname)}
      >
        <Icon icon={trash} />
      </td>
    </tr>
  ));
};
