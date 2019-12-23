import axios from "axios";
import { FETCH_USER } from "./types";

const fetchUser = () => {
  axios
    .get("/api/current_user")
    .then(res => dispatch({ type: FETCH_USER, payload: res }));
};
