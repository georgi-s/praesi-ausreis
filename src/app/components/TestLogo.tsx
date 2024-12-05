import React from "react";
import Image from "next/image";
import LogoUrl from "./Logo.svg?url";

const TestLogo: React.FC = () => (
  <Image
    src={LogoUrl}
    alt="Logo"
    width={40}
    height={40} // src="/Logo.svg"
    // alt="Test Logo"
    // style={{ width: "40px", height: "40px" }}
  />
);

export default TestLogo;
// import Logo from "./Logo.svg";

// const TestLogo = () => (
//   <div>
//     <Logo />
//   </div>
// );
