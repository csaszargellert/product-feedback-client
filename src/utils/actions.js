import { json, redirect } from "react-router-dom";
import axiosDef from "./axios";

export const manipulateFeedbackAction = async function ({ request, params }) {
  const method = request.method;
  const newFormData = await request.formData();

  let url = "feedback/add";

  if (method === "PUT") {
    url = "feedback/edit/" + params.feedbackId;
  }

  try {
    await axiosDef({
      url: url,
      method: method,
      data: newFormData,
    });

    return redirect("/");
  } catch (error) {
    throw json(
      { message: error.response.data.data },
      { status: error.response.status }
    );
  }
};

export const deleteFeedback = async function ({ params }) {
  const { feedbackId } = params;
  console.log("ACTION");
  try {
    const delData = await axiosDef({
      url: "/feedback/edit/" + feedbackId,
      method: "DELETE",
    });

    if (delData.data.success) {
      return redirect("/");
    }
  } catch (error) {
    console.log(error);
    throw json(
      { message: error.response.data.data },
      { status: error.response.status }
    );
  }
};
