export let users = [
  {
    id: "",
    username: "hyeongjin",
    password: "$2b$10$1qNZOLvPWHc7BYtO20UWCuzIzqmfqRchnh0XdJsNzeoA.EjUJKYna",
    url: "",
  },
  {
    id: "",
    username: "bob",
    password: "$2b$10$DViy9oZJvmecy.I1MCCiZeWSkMIVLfWEsH770BNevxS7OtGJmADpO",
    url: "",
  },
  {
    id: "",
    username: "ellie",
    password: "$2b$10$75HaC6avTpw/cJDSwjalQuxMir/R1L9v9QiRBtv8FO1vDwJXntFBe",
    url: "",
  },
];

export const create = async (newUser) => {
  users.push(newUser);
};

export const findByUsername = async (username) => {
  return users.find((user) => user.username === username);
};

export const findById = async (id) => {
  return users.find((user) => user.id === id);
};
