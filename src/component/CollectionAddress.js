import React from "react";
import "./collectionaAddress.css";

function CollectionAddress({ address, ...props }) {
  function handleClick(e) {
    e.preventDefault();
    let num = e.target.getAttribute("num");
    window.interactiveCanvas.sendTextQuery("Collection setup " + num);
  }

  return (
    <div className="collectionAddress">
      {address.map((item, i) => {
        return (
          <div key={i}>
            <a onClick={handleClick} num={item.uprn}>
              {item.address}
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default CollectionAddress;
