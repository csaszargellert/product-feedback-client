import { json, redirect } from "react-router-dom";
import { axiosPrivate } from "./axios";

export const manipulateFeedbackAction = async function ({ request, params }) {
  const method = request.method;
  const newFormData = await request.formData();

  let url = "/feedback/add";

  if (method === "PUT") {
    url = "/feedback/edit/" + params.feedbackId;
  }

  try {
    await axiosPrivate({
      url: url,
      method: method,
      data: newFormData,
    });
    return redirect("/");
  } catch (error) {
    throw json(
      { message: error.response.data.error },
      { status: error.response.status }
    );
  }
};

export const deleteFeedback = async function ({ params }) {
  const { feedbackId } = params;

  try {
    await axiosPrivate({
      url: "/feedback/edit/" + feedbackId,
      method: "DELETE",
    });

    return redirect("/");
  } catch (error) {
    throw json(
      { message: error.response.data.error },
      { status: error.response.status }
    );
  }
};

export const upvoteFeedback = async function ({ params, request }) {
  const { feedbackId } = params;
  try {
    const response = await axiosPrivate({
      url: `/feedback/${feedbackId}/upvote`,
      method: "POST",
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      const url = new URL(request.url);
      const searchParams = new URLSearchParams(url.search);
      return redirect("/login?" + searchParams.toString());
    }

    throw json(
      { message: error.response.data.error },
      { status: error.response.status }
    );
  }
};
