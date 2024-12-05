import React from "react";

const Logo = (props) => (
  <svg id="Ebene_1" data-name="Ebene 1" viewBox="0 0 566.93 566.93" {...props}>
    <defs>
      <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%" />
    </defs>
    <title>{`114 logo_Step4`}</title>
    <path
      stroke="#eb5c37"
      filter="url(#dropShadow)"
      style={{
        animation:
          "dash 10s linear infinite,glow 1.5s ease-in-out infinite alternate forwards 2.5s",
      }}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={100}
      d="M236.41 283.46l-94.13 94.12 94.13 94.12 188.23-188.24L236.41 95.22l-94.13 94.12 94.13 94.12"
    />
  </svg>
);

export default Logo;
