import { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import {
  GET_CONTACT,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // get contact
  const getContact = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({ type: GET_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }

    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // update contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // clear contact
  const clearContact = () => {
    dispatch({ type: CLEAR_CONTACT });
  };

  // set current contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // filter contact
  const filterContact = (text) => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContact,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        clearContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
