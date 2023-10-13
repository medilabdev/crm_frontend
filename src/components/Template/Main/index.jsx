import React from "react";

const Main = ({ children }) => {
  return (
    <main id="main" className="main" style={{ fontSize: "0.8rem" }}>
      {children}
    </main>
  );
};

export default Main;
