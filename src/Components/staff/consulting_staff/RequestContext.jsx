import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import protectedApi from "../../../APIs/ProtectedApi";

const RequestsContext = createContext();
const staffId = 3;
export const RequestsProvider = ({ children }) => {
  const [waitingRequests, setwaitingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  useEffect(() => {
    getAllWaitingRequests();
    getAllAcceptedRequests();
  }, []);

  const getAllWaitingRequests = () => {
    protectedApi
      .get("/request/waiting")
      .then((response) => {
        setwaitingRequests(response.data);
      })
      .catch((error) => console.log(error));
  };
  function getAllAcceptedRequests() {
    protectedApi
      .get(
        "/request/valuation-request/not/" +
          staffId +
          "/WAITING"
      )
      .then((resp) => {
        setAcceptedRequests(resp.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <RequestsContext.Provider value={{ waitingRequests, getAllWaitingRequests,acceptedRequests, getAllAcceptedRequests }}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => useContext(RequestsContext);
