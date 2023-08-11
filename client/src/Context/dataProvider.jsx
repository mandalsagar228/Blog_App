import { createContext, useState } from "react";

export const dataContext = createContext(null);
const loginValue = {
  username: "",
  password: "",
};

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState(loginValue);
  const updateAccount = (username, password) => {
    setAccount({ ...account, username, password });
  };
  return (
    <dataContext.Provider value={{ account, setAccount: updateAccount }}>
      {children}
    </dataContext.Provider>
  );
};
export default DataProvider;
