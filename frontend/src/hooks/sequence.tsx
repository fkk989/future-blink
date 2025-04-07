import { useCallback, useEffect, useState } from "react";
import { getUserToke } from "../utils/helpers";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import toast from "react-hot-toast";

export const useGetSequenceById = (sequenceId: string) => {
  const [sequence, setSequence] = useState<any>();

  const getSequenceData = useCallback(async () => {
    const userToken = getUserToke();
    const sequenceData = await (
      await axios.get(`${BACKEND_URL}/sequence/${sequenceId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
    ).data;

    if (sequenceData.success) {
      setSequence(sequenceData.data.sequence);
    }
  }, []);

  useEffect(() => {
    getSequenceData();
  }, []);

  return { sequence, setSequence, getSequenceData };
};
//
export const useGetSequence = () => {
  const [sequences, setSequences] = useState<any[]>([]);

  const getSequences = useCallback(async () => {
    const userToken = getUserToke();
    const sequencesData = await (
      await axios.get(`${BACKEND_URL}/sequence`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
    ).data;

    if (sequencesData.success) {
      setSequences(sequencesData.data.sequences);
    }
  }, []);

  useEffect(() => {
    getSequences();
  }, []);

  return { sequences, setSequences, getSequences };
};

export const useCreateSequence = (sequenceName: string, getSequences: any) => {
  const createSequence = useCallback(async () => {
    const userToken = getUserToke();
    try {
      await axios.post(
        `${BACKEND_URL}/sequence`,
        { name: sequenceName },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      getSequences();
    } catch (error: any) {
      console.log("error creating List", error.message);
    }
  }, [sequenceName]);

  return { createSequence };
};

export const createOrUpdateSequence = async (
  sequenceId: string,
  data: { scheduledAt: any; leadsList: string[]; nodes: any[] },
  onSuccess: () => void
) => {
  if (!data.scheduledAt) {
    return toast.error("Plese select a schedule date", {
      id: "update-sequence",
    });
  }
  if (!data.leadsList) {
    return toast.error("Plese select a lead list", {
      id: "update-sequence",
    });
  }

  if (data.nodes.length === 0) {
    return toast.error("Please add a node if you want your sequence to run", {
      id: "update-sequence",
    });
  }
  toast.loading("adding data", { id: "update-sequence" });
  try {
    const userToken = getUserToke();

    const res = (
      await axios.post(`${BACKEND_URL}/sequence/${sequenceId}`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
    ).data;
    if (res.success) {
      toast.success("added data successfully", { id: "update-sequence" });
      onSuccess();
    }
  } catch (error: any) {
    toast.error("error adding data", { id: "update-sequence" });
    console.log("error", error.message);
  }
};
