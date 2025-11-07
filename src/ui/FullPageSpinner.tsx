import authBg from "../assets/images/auth-bg2.jpg";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";

function FullPageSpinner() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center w-screen relative z-50"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      <Ring2
        size="40"
        stroke="5"
        strokeLength="0.25"
        bgOpacity="0.1"
        speed="0.8"
        color="white"
      />
    </div>
  );
}

export default FullPageSpinner;
