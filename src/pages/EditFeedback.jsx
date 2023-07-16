import {
  useLoaderData,
  useSubmit,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import axiosDef from "../utils/axios";

import Spinner from "../components/Spinner";
import { titleValidator, detailValidator } from "../constants/validator";
import { CATEGORIES, STATUSES } from "../constants/dropdown";
import useInput from "../custom-hooks/useInput";
import useDropdown from "../custom-hooks/useDropdown";
// import { onDeletionConfirmation } from "../components/ErrorModal";

import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import Button, { BackButton } from "../components/Button";

import { Section, ButtonController } from "./AddFeedback";

export const loader = async function (props) {
  const { feedbackId } = props.params;

  try {
    const data = await axiosDef({
      url: "/feedback/edit/" + feedbackId,
    });

    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};

function EditFeedback() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const feedback = useLoaderData();
  const navigation = useNavigation();
  // Category Input Field
  const [category, setCategory] = useDropdown(feedback.category);
  // Category Input Field
  const [status, setStatus] = useDropdown(feedback.status);
  // Title Input Field
  const [titleValue, titleError, titleIsTouched, handleTitleChange] = useInput(
    titleValidator,
    feedback.title
  );
  // Detail Input Field
  const [detailValue, detailError, detailIsTouched, handleDetailChange] =
    useInput(detailValidator, feedback.detail);

  const handleSubmit = function (event) {
    event.preventDefault();
    console.log(detailError, titleError);
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
    console.log(feedback.id);
    submit(null, {
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
        <h1>Editing &lsquo;{feedback.title}&rsquo;</h1>

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
            >
              {navigation.state !== "idle" ? (
                <Spinner hasParent={true} />
              ) : (
                "delete"
              )}
            </Button>
            <Button
              bg="dark-greyish-blue"
              hover="#656EA3"
              onHandleClick={() => navigate("/")}
            >
              {navigation.state !== "idle" ? (
                <Spinner hasParent={true} />
              ) : (
                "cancel"
              )}
            </Button>
            <Button bg="violet" hover="#C75AF6" type="submit">
              {navigation.state !== "idle" ? (
                <Spinner hasParent={true} />
              ) : (
                "edit feedback"
              )}
            </Button>
          </ButtonController>
        </form>
      </article>
    </Section>
  );
}

export default EditFeedback;
