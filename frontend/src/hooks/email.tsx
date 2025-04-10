import { useCallback, useEffect, useState } from "react";
import { getUserToke } from "../utils/helpers";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import toast from "react-hot-toast";

export const useGetEmailTemplate = () => {
  const [template, setTemplate] = useState<any[]>([]);

  const getTemplate = useCallback(async () => {
    const userToken = getUserToke();
    const template = await (
      await axios.get(`${BACKEND_URL}/email-template`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
    ).data;

    if (template.success) {
      setTemplate(template.data.templates);
    }
    console.log(template);
  }, []);

  useEffect(() => {
    getTemplate();
  }, []);

  return { template, setTemplate, getTemplate };
};
export const userCreateTemplate = (templateName: string, getTemplate: any) => {
  const createTemplate = useCallback(async () => {
    toast.loading("creating template", { id: "creating-template" });
    const userToken = getUserToke();
    try {
      await axios.post(
        `${BACKEND_URL}/email-template`,
        { name: templateName },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      toast.success("creating template", { id: "creating-template" });
      getTemplate();
    } catch (error: any) {
      toast.error("creating template", { id: "creating-template" });
      console.log("error creating List", error.message);
    }
  }, [templateName]);

  return { createTemplate };
};

export const updateTemplate = async (
  templateId: string,
  { subject, html }: { subject: string; html: string },
  onSuccess: () => void
) => {
  toast.loading("updateing template", { id: "update-template" });
  try {
    const userToken = getUserToke();

    const res = (
      await axios.post(
        `${BACKEND_URL}/email-template/${templateId}`,
        { html, subject },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
    ).data;
    if (res.success) {
      toast.success("added data successfully", { id: "update-template" });
      onSuccess();
    }
  } catch (error: any) {
    toast.error("error adding data", { id: "update-template" });
    console.log("error", error.message);
  }
};
