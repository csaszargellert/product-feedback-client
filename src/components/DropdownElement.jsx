import { useState } from "react";
import styled, { css } from "styled-components";

const Dropdown = styled.div`
  position: relative;

  button {
    border: none;
    outline: none;
    background: none;

    display: flex;
    align-items: center;

    font-family: inherit;
    font-weight: 400;
    font-size: 1.5rem;

    cursor: pointer;

    ${(props) => {
      switch (props.$parent) {
        case "sort":
          return css`
            color: var(--light-grey);
            gap: 8px;

            span {
              font-weight: 700;
            }

            path {
              stroke: var(--light-grey);
            }
          `;
        default:
          return css`
            width: 100%;
            padding: 1.3rem 2.4rem;

            justify-content: space-between;

            background-color: var(--very-light-grey);
            color: var(--greyish-blue);
            text-align: left;

            border: 1px solid transparent;
            border-radius: var(--border-radius);

            &:hover {
              border: 1px solid var(--blue);
            }
          `;
      }
    }}
  }
`;

const DropdownSelect = styled.div`
  position: absolute;
  z-index: 9;
  left: 0;
  transform: translateY(100%);

  border-radius: var(--border-radius);
  background-color: var(--white);

  box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.2);

  p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 2.4rem;
    cursor: pointer;

    color: var(--dark-grey);
  }

  p:not(:last-child) {
    border-bottom: 1px solid rgba(58, 67, 116, 0.15);
  }

  p:hover {
    color: var(--violet);
  }

  ${(props) => {
    switch (props.$parent) {
      case "sort":
        return css`
          bottom: -4.2rem;
          width: 25.5rem;
        `;
      default:
        return css`
          bottom: -1.6rem;
          width: 100%;
        `;
    }
  }}
`;

function DropdownElement({
  categoryValue,
  onHandleCategory,
  list,
  parent,
  type,
}) {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const handleDropdownOpening = function () {
    setDropdownIsOpen((prev) => !prev);
  };

  return (
    <Dropdown $parent={parent}>
      <button type={type} onClick={handleDropdownOpening}>
        <span>{categoryValue}</span>
        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
          <path
            d={dropdownIsOpen ? "M1 6l4-4 4 4" : "M1 1l4 4 4-4"}
            stroke="#4661E6"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
      {dropdownIsOpen && (
        <DropdownSelect $parent={parent} onClick={onHandleCategory}>
          {list &&
            list.map((category) => {
              return (
                <p key={category.id} onClick={handleDropdownOpening}>
                  {category.category}
                  {categoryValue === category.category && (
                    <img src="../../assets/shared/icon-check.svg" />
                  )}
                </p>
              );
            })}
        </DropdownSelect>
      )}
    </Dropdown>
  );
}

export default DropdownElement;
