import React from 'react';

const Nomatch = (props) => {
  console.log('props -> ', props);
  return (
   <h1 style={{color: 'red'}}>No Match for {props.location.pathname}</h1>
  );
};

export default Nomatch;
