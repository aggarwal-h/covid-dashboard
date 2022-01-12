import React from "react";

function Content({ children }) {
  return (
    <main className="main-content">
      <div className="container mx-auto pt-8 p-2 sm:p-8 md:p-16">
        {children}
      </div>
    </main>
  );
}

export default Content;
