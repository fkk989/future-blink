import { useCallback, useEffect, useState } from "react";
import { getUserToke } from "../utils/helpers";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import toast from "react-hot-toast";

export const useGetListbyId = (listId: string) => {
  const [listData, setListData] = useState<any>();

  const getListData = useCallback(async () => {
    const userToken = getUserToke();
    const listData = await (
      await axios.get(`${BACKEND_URL}/lead/${listId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
    ).data;

    if (listData.success) {
      console.log("list data", listData.data.lists.listData.data);
      setListData(listData.data.lists);
    }
    console.log(listData);
  }, []);

  useEffect(() => {
    getListData();
  }, []);

  return { listData, setListData, getListData };
};
export const useGetList = () => {
  const [listData, setListData] = useState<any[]>([]);

  const getListData = useCallback(async () => {
    const userToken = getUserToke();
    const listData = await (
      await axios.get(`${BACKEND_URL}/lead`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
    ).data;

    if (listData.success) {
      setListData(listData.data.lists);
    }
  }, []);

  useEffect(() => {
    getListData();
  }, []);

  return { listData, setListData, getListData };
};

export const userCreateList = (listName: string, getListData: any) => {
  const createList = useCallback(async () => {
    const userToken = getUserToke();
    try {
      await axios.post(
        `${BACKEND_URL}/lead`,
        { name: listName },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      getListData();
    } catch (error: any) {
      console.log("error creating List", error.message);
    }
  }, [listName]);

  return { createList };
};

export const createOrUpdateListData = async (
  listId: string,
  data: any[],
  onSuccess: () => void
) => {
  if (data.length === 0) {
    return toast.error("please select some data", { id: "add-list-data" });
  }
  toast.loading("adding data", { id: "add-list-data" });
  try {
    const userToken = getUserToke();

    const res = (
      await axios.post(
        `${BACKEND_URL}/lead/${listId}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
    ).data;
    if (res.success) {
      toast.success("added data successfully", { id: "add-list-data" });
      onSuccess();
    }
  } catch (error: any) {
    toast.error("error adding data", { id: "add-list-data" });
    console.log("error", error.message);
  }
};
