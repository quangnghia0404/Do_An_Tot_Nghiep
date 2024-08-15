import React from "react";
import { Link } from "react-router-dom";

function Note() {
  return (
    <div>
      <div className="note">
        <div className="note-left">
          <p>Liên hệ</p>
        </div>
        <div className="note-right">
          <Link to="/" id="link">
            Trang chủ
          </Link>{" "}
          / Liên hệ
        </div>
      </div>
    </div>
  );
}

export default Note;
