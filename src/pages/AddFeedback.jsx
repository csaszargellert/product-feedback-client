import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSubmit } from "react-router-dom";

import { titleValidator, detailValidator } from "../constants/validator";
import { CATEGORIES } from "../constants/dropdown";
import useInput from "../custom-hooks/useInput";
import useDropdown from "../custom-hooks/useDropdown";

import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import Button, { BackButton } from "../components/Button";

const Section = styled.section`
  padding: 9.6rem 0;
  max-width: 54rem;
  margin: 0 auto;

  & > div {
    margin-bottom: 6.8rem;
  }

  article {
    padding: 5.2rem 4.2rem 4rem;
    background-color: var(--white);
    position: relative;
  }

  h1 {
    font-weight: 700;
    font-size: 2.4rem;
    letter-spacing: -0.3px;
    color: var(--greyish-blue);

    margin-bottom: 4rem;
  }

  article > img {
    position: absolute;
    top: 0;
    left: 4.2rem;
    transform: translateY(-50%);
  }
`;

const ButtonController = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.6rem;
`;

function AddFeedback() {
  const navigate = useNavigate();
  const submit = useSubmit();
  // Category Input Field
  const [category, setCategory] = useDropdown(CATEGORIES[0].category);
  // Title Input Field
  const [
    titleValue,
    titleError,
    titleIsTouched,
    handleTitleChange,
    setTitleError,
    setTitleIsTouched,
  ] = useInput(titleValidator);
  // Detail Input Field
  const [
    detailValue,
    detailError,
    detailIsTouched,
    handleDetailChange,
    setDetailError,
    setDetailIsTouched,
  ] = useInput(detailValidator);

  const handleSubmit = async function (event) {
    event.preventDefault();
    let hasError = false;
    if (!titleValue && !titleIsTouched) {
      hasError = true;
      setTitleError("Cannot be empty");
      setTitleIsTouched(true);
    }
    if (!detailValue && !detailIsTouched) {
      hasError = true;
      setDetailError("Cannot be empty");
      setDetailIsTouched(true);
    }

    if (hasError) {
      return;
    }

    const data = {
      category,
      title: titleValue,
      detail: detailValue,
    };

    submit(data, { method: "POST" });
  };

  return (
    <Section>
      <div>
        <BackButton />
      </div>

      <article>
        <img src="../../assets/shared/icon-new-feedback.svg" />
        <h1>Create New Feedback</h1>

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            id="title"
            name="title"
            label="feedback title"
            description="Add a short descriptive headline"
            value={titleValue}
            error={titleError}
            isTouched={titleIsTouched}
            handleChange={handleTitleChange}
          />
          <Dropdown
            categoryValue={category}
            list={CATEGORIES}
            onHandleCategory={setCategory}
            type="button"
          />
          <Input
            type="textarea"
            id="detail"
            name="detail"
            label="feedback detail"
            description="Include any specific comment on what should be improved, added, etc."
            value={detailValue}
            error={detailError}
            isTouched={detailIsTouched}
            handleChange={handleDetailChange}
            mb={true}
            definedClassname="height-l"
          />
          <ButtonController>
            <Button
              bg="dark-greyish-blue"
              hover="#656EA3"
              onHandleClick={() => navigate("/")}
            >
              cancel
            </Button>
            <Button bg="violet" hover="#C75AF6" type="submit">
              add feedback
            </Button>
          </ButtonController>
        </form>
      </article>
    </Section>
  );
}

export default AddFeedback;
