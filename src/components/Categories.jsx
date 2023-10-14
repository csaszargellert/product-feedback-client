import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

import { CATEGORIES } from "../constants/dropdown";
import { CategoryButton } from "./Button";

const CategoryController = styled.form`
  padding: 2.4rem;

  display: flex;
  row-gap: 1.4rem;
  column-gap: 0.8rem;
  flex-wrap: wrap;

  background-color: var(--white);
  border-radius: var(--border-radius);
`;

function Categories({ query }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = function (event) {
    event.preventDefault();
    const searchValue = event.nativeEvent.submitter.textContent.trim() || "All";

    searchParams.set("category", searchValue);
    setSearchParams(searchParams);
  };

  return (
    <CategoryController onSubmit={handleSubmit}>
      <CategoryButton hover="#cfd7ff" active={query === "All"}>
        All
      </CategoryButton>
      {CATEGORIES.map((category) => {
        return (
          <CategoryButton
            hover="#cfd7ff"
            key={category.id}
            active={query === category.category}
          >
            {category.category}
          </CategoryButton>
        );
      })}
    </CategoryController>
  );
}

export default Categories;
