import React from "react";
import greenIcon from "../green_bin.png";
import domesticIcon from "../domestic_bin.png";
import foodIcon from "../food_bin.png";
import recycleIcon from "../recycle_bin.png";
import "./collectionitem.css";
import dateFormat from "dateformat";

function CollectionItem({ data, name, ...props }) {
  let icon = <img src={greenIcon} />;
  if (name === "food") icon = <img src={foodIcon} />;
  else if (name == "green") icon = <img src={greenIcon} />;
  else if (name === "domestic") icon = <img src={domesticIcon} />;
  else if (name === "recycle") icon = <img src={recycleIcon} />;

  let next = new Date(data.next);
  let last = new Date(data.last);

  return (
    <div className="item">
      <div>{icon}</div>
      <div>
        <p className="title">{name}</p>
        <p className="date">
          <b>Next:</b> {data.next === null ? "Not available" : dateFormat(next, "dd.mm.yyyy HH:MM")}
        </p>
        <p className="date">
          <b>Last:</b> {data.last === null ? "Not available" : dateFormat(last, "dd.mm.yyyy HH:MM")}
        </p>
      </div>
    </div>
  );
}

export default CollectionItem;
