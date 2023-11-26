import { useState } from "react";
import { useMutation } from "@apollo/client";
import { NEW_CATEGORY } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import { Link } from "react-router-dom";

export default function Categories(props) {
  const userData = props.userData;

  console.log(userData);

  const [createCategory, setCreateCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [createCategoryMutation] = useMutation(NEW_CATEGORY, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const categoryFormHandler = async (e) => {
    e.preventDefault();
    console.log(newCategory);

    try {
      const { data } = await createCategoryMutation({
        variables: {
          name: newCategory,
          user: userData._id,
        },
      });

      console.log("Category created:", data.newCategory);
    } catch (error) {
      console.error(error);
    }

    setNewCategory("");
    setCreateCategory(false);
  };

  return (
    <div className="category-container">
      <ul className="categories">
        <li id="my-category">My categories</li>
        <div id="cat-border">
          {userData.categories.map((category) => (
            <li className="category" key={category.name}>
              <Link to={`/category/${category.name}`}>{category.name}</Link>
            </li>
          ))}
          <li
            className="category"
            id="new-category"
            onClick={() => {
              setCreateCategory(!createCategory);
            }}>
            New +
          </li>
        </div>{" "}
        {createCategory && (
          <form id="new-category-form" onSubmit={categoryFormHandler}>
            <input
              type="text"
              name="newCategory"
              id="newCategory"
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value);
              }}
            />
            <button type="submit">Create</button>
          </form>
        )}
      </ul>
    </div>
  );
}
