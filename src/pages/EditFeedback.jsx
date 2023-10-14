import {
  useLoaderData,
  useNavigate,
  json,
  useSubmit,
  useFetcher,
} from "react-router-dom";
import styled from "styled-components";

import { axiosPrivate } from "../utils/axios";
import { titleValidator, detailValidator } from "../constants/validator";
import { CATEGORIES, STATUSES } from "../constants/dropdown";
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

function EditFeedback() {
  const submit = useSubmit();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const feedback = useLoaderData();
  // Category Input Field
  const [category, setCategory] = useDropdown(feedback?.category);
  // Category Input Field
  const [status, setStatus] = useDropdown(feedback?.status);
  // Title Input Field
  const [titleValue, titleError, titleIsTouched, handleTitleChange] = useInput(
    titleValidator,
    feedback?.title
  );

  const [detailValue, detailError, detailIsTouched, handleDetailChange] =
    useInput(detailValidator, feedback?.detail);

  const handleSubmit = async function (event) {
    event.preventDefault();

    if (detailError || titleError) return;

    const modifiedData = {
      title: titleValue,
      detail: detailValue,
      status,
      category,
    };

    submit(modifiedData, { method: "PUT" });
  };

  const handleFeedbackDeletion = function () {
    fetcher.submit(null, {
      action: "/feedback/delete/" + feedback.id,
      method: "DELETE",
    });
  };

  return (
    <Section>
      <div>
        <BackButton />
      </div>

      <article>
        <img src="../../assets/shared/icon-edit-feedback.svg" />
        <h1>Editing &lsquo;{feedback?.title}&rsquo;</h1>
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
            categoryValue={status}
            list={STATUSES}
            onHandleCategory={setStatus}
            type="button"
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
          />
          <ButtonController>
            <Button
              bg="error"
              hover="#E98888"
              definedClass="mr-auto"
              onHandleClick={handleFeedbackDeletion}
              type="button"
            >
              delete
            </Button>
            <Button
              bg="dark-greyish-blue"
              hover="#656EA3"
              onHandleClick={() => navigate("/")}
              type="button"
            >
              cancel
            </Button>
            <Button bg="violet" hover="#C75AF6" type="submit">
              edit feedback
            </Button>
          </ButtonController>
        </form>
      </article>
    </Section>
  );
}

export default EditFeedback;

export const loader = async function (props) {
  const { feedbackId } = props.params;

  try {
    const response = await axiosPrivate({
      url: "/feedback/edit/" + feedbackId,
    });

    return response.data.data;
  } catch (error) {
    throw json(error);
  }
};
