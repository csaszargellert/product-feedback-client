import { Link, useSearchParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";

import { useSortContext } from "../context/sortContext";
import Button from "./Button";
import Suggestion from "./Suggestion";
import DropdownElement from "./DropdownElement";
import { SORT } from "../constants/dropdown";

const Header = styled.section`
  padding: 1.4rem 1.6rem 1.4rem 2.4rem;
  margin-bottom: 2.4rem;
  border-radius: 1rem;
  background-color: var(--dark-greyish-blue);

  display: flex;
  align-items: center;
  gap: 3.8rem;
`;

function SortHeader({ suggestions }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { sort, handleSort } = useSortContext();
  const search = new URLSearchParams(location.search);
  const sortInUrl = search.get("sort");

  useEffect(() => {
    if (sort && sort !== sortInUrl) {
      searchParams.set("sort", sort);
      setSearchParams(searchParams);
    }
  }, [sort]);

  return (
    <Header>
      <Suggestion>
        {suggestions} {`suggestion${suggestions > 1 ? "s" : ""}`}
      </Suggestion>
      <DropdownElement
        list={SORT}
        categoryValue={sort || SORT[0].category}
        onHandleCategory={handleSort}
        parent="sort"
        type="button"
      >
        Sort by :{" "}
      </DropdownElement>
      <Button
        as={Link}
        to="/feedback/add"
        bg="violet"
        hover="#C75AF6"
        definedClass="ml-auto"
      >
        + add feedback
      </Button>
    </Header>
  );
}

export default SortHeader;
