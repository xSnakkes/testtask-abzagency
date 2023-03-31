import React from 'react';

interface MyContextType {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
}

const MyContext = React.createContext<MyContextType>({
  data: '',
  setData: () => {},
});

export default MyContext;