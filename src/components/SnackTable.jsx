import { useState } from "react";
import { snacks } from "../data/data";

export const SnackTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [sortOrderType, setSortOrderType] = useState(null);

  const sortOrderHandle = (sortBy) => {
    if (sortOrderType === sortBy) {
      setSortOrderType(sortBy + "_desc");
    } else {
      setSortOrderType(sortBy);
    }
  };

  const getSortedData = () => {
    const sortedData = [...snacks];

    if (sortOrderType) {
      const [sortBy, order] = sortOrderType.split("_");

      sortedData.sort((a, b) => {
        if (order === "desc") {
          if (sortBy === "productName") {
            return b[sortBy].toLowerCase() < a[sortBy].toLowerCase() ? -1 : 1;
          } else if (sortBy === "ingredients") {
            return b[sortBy].join().toLowerCase() <
              a[sortBy].join().toLowerCase()
              ? -1
              : 1;
          } else {
            return b[sortBy] - a[sortBy];
          }
        } else {
          if (sortBy === "productName") {
            return a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 : 1;
          } else if (sortBy === "ingredients") {
            return a[sortBy].join().toLowerCase() <
              b[sortBy].join().toLowerCase()
              ? -1
              : 1;
          } else {
            return a[sortBy] - b[sortBy];
          }
        }
      });
    }

    return sortedData;
  };

  const filteredSnacks = getSortedData().filter(
    (snack) =>
      searchInput === "" ||
      snack.productName
        .toLowerCase()
        .includes(
          searchInput.toLowerCase() ||
            snack.ingredients
              .join(" ")
              .toLowerCase()
              .includes(searchInput.toLowerCase())
        )
  );

  return (
    <div>
      <div className="mt-4">
        <input
          type="text"
          value={searchInput}
          className="py-2 px-4 border-2 rounded w-[50%]"
          placeholder="Search with Products or Ingredients"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center mt-[2rem]">
        <table className="border-2 rounded-md">
          <thead className="border-2">
            <tr className="border-2">
              <th onClick={() => sortOrderHandle("id")}>Id</th>
              <th onClick={() => sortOrderHandle("productName")}>
                Product Name
              </th>
              <th onClick={() => sortOrderHandle("productWeight")}>
                Product Weight
              </th>
              <th onClick={() => sortOrderHandle("price")}>Price (INR)</th>
              <th onClick={() => sortOrderHandle("calories")}>Calories</th>
              <th onClick={() => sortOrderHandle("ingredients")}>
                Ingredients
              </th>
            </tr>
          </thead>
          <tbody className="border-2">
            {filteredSnacks?.map((snack) => (
              <tr key={snack.id}>
                <td>{snack.id}</td>
                <td>{snack.productName}</td>
                <td>{snack.productWeight}g</td>
                <td>{snack.price}</td>
                <td>{snack.calories}</td>
                <td>{snack.ingredients.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
