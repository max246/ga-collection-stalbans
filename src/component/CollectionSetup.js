import React, { useRef, useState } from "react";
import icon from "../logo.png";
import Keyboard from "react-simple-keyboard";
import CollectionAddress from "./CollectionAddress";
import "react-simple-keyboard/build/css/index.css";
import "./collectionsetup.css";

function CollectionSetup({ data, ...props }) {
  const [input, setInput] = useState("");
  const keyboard = useRef();

  let showKeyboard = true;
  if (data && data.address) {
    showKeyboard = false;
  }
  function handleClick(e) {
    e.preventDefault();
    let id = e.target.getAttribute("id");
    if (id === "home") window.interactiveCanvas.sendTextQuery("home");
  }
  function onChange(input) {
    setInput(input);
  }

  function onKeyPress(button) {
    if (button === "{enter}") {
      window.interactiveCanvas.sendTextQuery("Collection search " + input);
    }
  }

  function onChangeInput(event) {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  }
  return (
    <>
      <div className="collectionSetup">
        <button
          style={{
            backgroundImage: `url(${icon})`,
            marginTop: `${window.headerHeight}px`,
          }}
          id="home"
          onClick={handleClick}
        ></button>
        {showKeyboard ? (
          <input
            className="inputAddress"
            type="text"
            placeholder="Type your address or postcode"
            onChange={onChangeInput}
            value={input}
          />
        ) : null}
        {showKeyboard ? (
          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
        ) : (
          <CollectionAddress address={data.address} />
        )}
      </div>
    </>
  );
}

export default CollectionSetup;
