// "use client";

// import React, { useState } from "react";
// import { useSpring, animated } from "@react-spring/web";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { Github, LogOut } from "lucide-react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// const FloatingButton: React.FC = () => {
//   const { data: session } = useSession();
//   const [isHovered, setIsHovered] = useState(false);

//   const spring = useSpring({
//     scale: isHovered ? 1.1 : 1,
//     config: { tension: 300, friction: 10 },
//   });

//   const handleClick = () => {
//     if (session) {
//       signOut();
//     } else {
//       signIn("github");
//     }
//   };

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <animated.div
//             style={spring}
//             className={`fixed bottom-5 right-5 px-4 py-2 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 ease-in-out ${
//               session
//                 ? "bg-red-500 hover:bg-red-600"
//                 : "bg-[#24292e] hover:bg-[#1a1e21]"
//             }`}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             onClick={handleClick}
//           >
//             {session ? (
//               <>
//                 <LogOut className="w-5 h-5 mr-2 text-white" />
//                 <span className="text-white font-medium">Abmelden</span>
//               </>
//             ) : (
//               <>
//                 <Github className="w-5 h-5 mr-2 text-white" />
//                 <span className="text-white font-medium">
//                   Mit GitHub anmelden
//                 </span>
//               </>
//             )}
//           </animated.div>
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>
//             {session
//               ? "Klicken zum Abmelden"
//               : "Klicken zum Anmelden mit GitHub"}
//           </p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// };

// export default FloatingButton;
"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Github, LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FloatingButton: React.FC = () => {
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      signOut();
    } else {
      signIn("github");
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`fixed bottom-5 right-5 px-4 py-2 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-150 ease-in-out transform hover:scale-105 ${
              session
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#24292e] hover:bg-[#1a1e21]"
            }`}
            onClick={handleClick}
          >
            {session ? (
              <>
                <LogOut className="w-5 h-5 mr-2 text-white" />
                <span className="text-white font-medium">Abmelden</span>
              </>
            ) : (
              <>
                <Github className="w-5 h-5 mr-2 text-white" />
                <span className="text-white font-medium">
                  Mit GitHub anmelden
                </span>
              </>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {session
              ? "Klicken zum Abmelden"
              : "Klicken zum Anmelden mit GitHub"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FloatingButton;
