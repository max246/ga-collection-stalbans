import React from "react";
import CollectionItem from "./CollectionItem";
import "./collection.css";
import icon from "../logo.png";
import dateFormat from "dateformat";

function Collection({ data, ...props }) {
  function handleClick(e) {
    e.preventDefault();
    let id = e.target.getAttribute("id");
    if (id === "home") window.interactiveCanvas.sendTextQuery("home");
  }

  return (
    <>
      <div className="collection">
        <div>
          <button
            style={{
              backgroundImage: `url(${icon})`,
              marginTop: `${window.headerHeight}px`,
            }}
            id="home"
            onClick={handleClick}
          ></button>
          <div className="collectionToday">
            {dateFormat(new Date(), "dd.mm.yyyy HH:MM")}
          </div>
        </div>
        {Object.keys(data).map((d, i) => (
          <CollectionItem key={i} data={data[d]} name={d} />
        ))}
      </div>
    </>
  );
}

export default Collection;
