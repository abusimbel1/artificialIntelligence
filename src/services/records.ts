import axios from "axios"

const getParsedText = async () =>
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.data)
