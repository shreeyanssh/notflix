import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTQ5OTM4YjBlYjUxYjk5NmY3OTY4MzhiNmQ4NDhhYSIsInN1YiI6IjY1ZGUxMzc2ODlkOTdmMDE3Yzk5NmQ3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u_G6ig7MSKjX4uvjy48U6LYr6wGgR4ZydDkaMeX84Bc",
  },
});

export default instance;