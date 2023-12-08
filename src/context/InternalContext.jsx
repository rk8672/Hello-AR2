import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const InternalContext = createContext();

export const useInternalContext = () => {
  return useContext(InternalContext);
};

export const InternalProvider = ({ children }) => {
  const [id, setId] = useState({contextKendraID:"",contextKendraName:""});

  const setIdValue = (newId ,name) => {
    setId({contextKendraID:newId,contextKendraName:name});
  };

  return (
    <InternalContext.Provider value={{ id, setIdValue }}>
      {children}
    </InternalContext.Provider>
  );
};

// Modify the PropTypes validation as needed
InternalProvider.propTypes = {
  children: PropTypes.node, // You can adjust the validation
};
