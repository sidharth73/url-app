import React from 'react';
import { Link } from "react-router-dom";

const Logout = (props) => {
  return (
  <div>
      <Link to='/dashboard' onClick={props.onLogout}>
        Logout
      </Link>
  </div>
  );
};

export default Logout;
