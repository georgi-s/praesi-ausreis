// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
// import { useSpring, animated } from "@react-spring/web";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
// } from "chart.js";
// import { NavigationCard } from "./NavigationCard";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title
// );

// interface SlideProps {
//   offset: number;
//   gradient: string;
//   onClick: () => void;
//   title: string;
//   content: React.ReactNode;
// }

// const Slide = ({ offset, gradient, onClick, title, content }: SlideProps) => {
//   const [zoom, setZoom] = useSpring(() => ({ scale: 1 }));

//   return (
//     <>
//       <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
//         <div
//           className="absolute inset-0 bg-gray-900"
//           style={{ clipPath: "polygon(20% 0, 70% 0, 50% 100%, 0% 100%)" }}
//         />
//       </ParallaxLayer>

//       <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
//         <div
//           className="absolute inset-0"
//           style={{
//             background: gradient,
//             clipPath: "polygon(70% 0, 100% 0, 80% 100%, 50% 100%)",
//           }}
//         />
//       </ParallaxLayer>

//       <ParallaxLayer
//         className="flex items-center justify-start pointer-events-none"
//         offset={offset}
//         speed={0.3}
//       >
//         <animated.div
//           style={zoom}
//           className="pl-[20%] w-full"
//           onMouseEnter={() => setZoom({ scale: 1.05 })}
//           onMouseLeave={() => setZoom({ scale: 1 })}
//         >
//           <h2 className="text-6xl font-bold text-white mb-4">{title}</h2>
//           <div className="text-2xl text-white">{content}</div>
//         </animated.div>
//       </ParallaxLayer>
//     </>
//   );
// };

// export default function ParallaxPresentation() {
//   const parallax = useRef<IParallax>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const scroll = (to: number) => {
//     if (parallax.current) {
//       parallax.current.scrollTo(to);
//       setCurrentSlide(to);
//     }
//   };

//   useEffect(() => {
//     const handleWheel = (e: WheelEvent) => {
//       e.preventDefault();
//       if (e.deltaX > 0 || e.deltaY > 0) {
//         scroll(Math.min(slides.length - 1, currentSlide + 1));
//       } else {
//         scroll(Math.max(0, currentSlide - 1));
//       }
//     };

//     const handleTouchStart = (e: TouchEvent) => {
//       const touch = e.touches[0];
//       const startX = touch.pageX;
//       const startY = touch.pageY;

//       const handleTouchMove = (e: TouchEvent) => {
//         const touch = e.touches[0];
//         const diffX = touch.pageX - startX;
//         const diffY = touch.pageY - startY;

//         if (Math.abs(diffX) > Math.abs(diffY)) {
//           e.preventDefault();
//           if (diffX > 50) {
//             scroll(Math.max(0, currentSlide - 1));
//           } else if (diffX < -50) {
//             scroll(Math.min(slides.length - 1, currentSlide + 1));
//           }
//         }
//       };

//       document.addEventListener("touchmove", handleTouchMove, {
//         passive: false,
//       });
//       document.addEventListener(
//         "touchend",
//         () => {
//           document.removeEventListener("touchmove", handleTouchMove);
//         },
//         { once: true }
//       );
//     };

//     window.addEventListener("wheel", handleWheel, { passive: false });
//     document.addEventListener("touchstart", handleTouchStart, {
//       passive: false,
//     });

//     return () => {
//       window.removeEventListener("wheel", handleWheel);
//       document.removeEventListener("touchstart", handleTouchStart);
//     };
//   }, [currentSlide]);

//   const slides = [
//     {
//       title: "Einleitung und Motivation",
//       content: (
//         <div>
//           <p>
//             Entwicklung eines webbasierten Tools zur Automatisierung der
//             Erfassung und Abrechnung von Auslagen und Reisekosten für Reedu GmbH
//             & Co. KG.
//           </p>
//           <ul className="list-disc list-inside mt-4">
//             <li>Digitalisierung des analogen Prozesses</li>
//             <li>Effizienzsteigerung und Fehlerreduzierung</li>
//             <li>Transparenz und Nachvollziehbarkeit</li>
//           </ul>
//         </div>
//       ),
//       gradient: "linear-gradient(to right, deeppink 0%, coral 100%)",
//     },
//     {
//       title: "Projektübersicht",
//       content: (
//         <div>
//           <p>Hauptziele des Projekts:</p>
//           <ul className="list-disc list-inside mt-4">
//             <li>Digitale Erfassung von Auslagen und Reisekosten</li>
//             <li>Automatisierte Genehmigungsprozesse</li>
//             <li>Transparente Statusverfolgung</li>
//             <li>Integration in bestehende IT-Infrastruktur</li>
//           </ul>
//           <p className="mt-4">Projektdauer: 80 Stunden</p>
//         </div>
//       ),
//       gradient: "linear-gradient(to right, SlateBlue 0%, DeepSkyBlue 100%)",
//     },
//     {
//       title: "Technische Umsetzung",
//       content: (
//         <div>
//           <p>Verwendete Technologien:</p>
//           <ul className="list-disc list-inside mt-4">
//             <li>Next.js für Frontend und API</li>
//             <li>PostgreSQL Datenbank</li>
//             <li>MINIO Object Storage</li>
//             <li>Docker für Containerisierung</li>
//           </ul>
//           <p className="mt-4">
//             Implementierung von Benutzerauthentifizierung, Datenbankoperationen
//             und Dateiverarbeitung.
//           </p>
//         </div>
//       ),
//       gradient: "linear-gradient(to right, tomato 0%, gold 100%)",
//     },
//     {
//       title: "Ergebnisse und Vorteile",
//       content: (
//         <div>
//           <p>Erreichte Verbesserungen:</p>
//           <ul className="list-disc list-inside mt-4">
//             <li>60% Effizienzsteigerung im Abrechnungsprozess</li>
//             <li>Reduzierung von Fehlerquellen</li>
//             <li>Erhöhte Transparenz und Benutzerfreundlichkeit</li>
//             <li>Verbesserte Datenverwaltung und -sicherheit</li>
//           </ul>
//           <div className="h-64 w-full mt-4">
//             <Bar
//               data={{
//                 labels: ["Manueller Prozess", "Digitaler Prozess"],
//                 datasets: [
//                   {
//                     label: "Bearbeitungszeit (Minuten)",
//                     data: [30, 12],
//                     backgroundColor: [
//                       "rgba(255, 99, 132, 0.5)",
//                       "rgba(54, 162, 235, 0.5)",
//                     ],
//                     borderColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
//                     borderWidth: 1,
//                   },
//                 ],
//               }}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                   },
//                 },
//               }}
//             />
//           </div>
//         </div>
//       ),
//       gradient: "linear-gradient(to right, #84fab0 0%, #8fd3f4 100%)",
//     },
//     {
//       title: "Wirtschaftliche Betrachtung",
//       content: (
//         <div>
//           <p>Kosten-Nutzen-Analyse:</p>
//           <div className="h-64 w-full mt-4">
//             <Pie
//               data={{
//                 labels: ["Entwicklungskosten", "Jährliche Einsparungen"],
//                 datasets: [
//                   {
//                     data: [4000, 5950],
//                     backgroundColor: [
//                       "rgba(255, 99, 132, 0.5)",
//                       "rgba(54, 162, 235, 0.5)",
//                     ],
//                     borderColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
//                     borderWidth: 1,
//                   },
//                 ],
//               }}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     position: "top" as const,
//                   },
//                   title: {
//                     display: true,
//                     text: "Kosten vs. Einsparungen (in €)",
//                   },
//                 },
//               }}
//             />
//           </div>
//           <p className="mt-4">
//             Amortisation der Entwicklungskosten innerhalb des ersten Jahres.
//           </p>
//         </div>
//       ),
//       gradient: "linear-gradient(to right, #a18cd1 0%, #fbc2eb 100%)",
//     },
//     {
//       title: "Fazit und Ausblick",
//       content: (
//         <div>
//           <p>Erreichte Ziele:</p>
//           <ul className="list-disc list-inside mt-4">
//             <li>Erfolgreiche Digitalisierung des Abrechnungsprozesses</li>
//             <li>Signifikante Effizienzsteigerung und Kosteneinsparungen</li>
//             <li>Hohe Benutzerakzeptanz und -zufriedenheit</li>
//           </ul>
//           <p className="mt-4">Zukünftige Entwicklungen:</p>
//           <ul className="list-disc list-inside mt-4">
//             <li>Entwicklung einer nativen Mobile-App</li>
//             <li>Integration von KI für automatische Kategorisierung</li>
//             <li>Erweiterung der Analysefunktionen</li>
//           </ul>
//         </div>
//       ),
//       gradient: "linear-gradient(to right, #a18cd1 0%, #fbc2eb 100%)",
//     },
//   ];

//   return (
//     <div className="w-screen h-screen bg-gray-100">
//       <Parallax ref={parallax} pages={slides.length} horizontal>
//         {slides.map((slide, index) => (
//           <Slide
//             key={index}
//             offset={index}
//             gradient={slide.gradient}
//             onClick={() => scroll(Math.min(slides.length - 1, index + 1))}
//             title={slide.title}
//             content={slide.content}
//           />
//         ))}

//         <ParallaxLayer
//           sticky={{ start: 0, end: slides.length - 1 }}
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-end",
//             padding: "1rem",
//           }}
//         >
//           <button
//             className="bg-white bg-opacity-80 px-4 py-2 rounded shadow hover:bg-opacity-100 transition-colors"
//             onClick={() => scroll(Math.max(0, currentSlide - 1))}
//           >
//             Zurück
//           </button>
//           <div className="flex space-x-3 bg-black/20 p-2 rounded-full backdrop-blur-sm">
//             {slides.map((slide, index) => (
//               <NavigationCard
//                 key={index}
//                 title={`${index + 1}`}
//                 isActive={index === currentSlide}
//                 onClick={() => scroll(index)}
//               />
//             ))}
//           </div>
//           <button
//             className="bg-white bg-opacity-80 px-4 py-2 rounded shadow hover:bg-opacity-100 transition-colors"
//             onClick={() =>
//               scroll(Math.min(slides.length - 1, currentSlide + 1))
//             }
//           >
//             Weiter
//           </button>
//         </ParallaxLayer>
//       </Parallax>
//     </div>
//   );
// }
"use client";

import React, { useRef, useEffect, useState } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { useSpring, animated } from "@react-spring/web";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { NavigationCard } from "./NavigationCard";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface SlideProps {
  offset: number;
  gradient: string;
  onClick: () => void;
  title: string;
  content: React.ReactNode;
}

const Slide = ({ offset, gradient, onClick, title, content }: SlideProps) => {
  const [zoom, setZoom] = useSpring(() => ({ scale: 1 }));

  return (
    <>
      <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
        <div
          className="absolute inset-0 bg-gray-900"
          style={{
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)", // Vereinfachter Clip-Path für Mobile
          }}
        />
      </ParallaxLayer>

      <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
        <div
          className="absolute inset-0"
          style={{
            background: gradient,
            clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)", // Vereinfachter Clip-Path für Mobile
          }}
        />
      </ParallaxLayer>

      <ParallaxLayer
        className="flex items-center justify-start pointer-events-none px-4 md:px-0"
        offset={offset}
        speed={0.3}
      >
        <animated.div
          style={zoom}
          className="w-full md:pl-[20%] max-w-7xl mx-auto"
          onMouseEnter={() => setZoom({ scale: 1.05 })}
          onMouseLeave={() => setZoom({ scale: 1 })}
        >
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4">
            {title}
          </h2>
          <div className="text-base md:text-2xl text-white">{content}</div>
        </animated.div>
      </ParallaxLayer>
    </>
  );
};

export default function ParallaxPresentation() {
  const parallax = useRef<IParallax>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scroll = (to: number) => {
    if (parallax.current) {
      parallax.current.scrollTo(to);
      setCurrentSlide(to);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaX > 0 || e.deltaY > 0) {
        scroll(Math.min(slides.length - 1, currentSlide + 1));
      } else {
        scroll(Math.max(0, currentSlide - 1));
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const startX = touch.pageX;
      const startY = touch.pageY;

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const diffX = touch.pageX - startX;
        const diffY = touch.pageY - startY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
          e.preventDefault();
          if (diffX > 50) {
            scroll(Math.max(0, currentSlide - 1));
          } else if (diffX < -50) {
            scroll(Math.min(slides.length - 1, currentSlide + 1));
          }
        }
      };

      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener(
        "touchend",
        () => {
          document.removeEventListener("touchmove", handleTouchMove);
        },
        { once: true }
      );
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, [currentSlide]);

  const slides = [
    {
      title: "Einleitung und Motivation",
      content: (
        <div>
          <p>
            Entwicklung eines webbasierten Tools zur Automatisierung der
            Erfassung und Abrechnung von Auslagen und Reisekosten für Reedu GmbH
            & Co. KG.
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Digitalisierung des analogen Prozesses</li>
            <li>Effizienzsteigerung und Fehlerreduzierung</li>
            <li>Transparenz und Nachvollziehbarkeit</li>
          </ul>
        </div>
      ),
      gradient: "linear-gradient(to right, deeppink 0%, coral 100%)",
    },
    {
      title: "Projektübersicht",
      content: (
        <div>
          <p>Hauptziele des Projekts:</p>
          <ul className="list-disc list-inside mt-4">
            <li>Digitale Erfassung von Auslagen und Reisekosten</li>
            <li>Automatisierte Genehmigungsprozesse</li>
            <li>Transparente Statusverfolgung</li>
            <li>Integration in bestehende IT-Infrastruktur</li>
          </ul>
          <p className="mt-4">Projektdauer: 80 Stunden</p>
        </div>
      ),
      gradient: "linear-gradient(to right, SlateBlue 0%, DeepSkyBlue 100%)",
    },
    {
      title: "Technische Umsetzung",
      content: (
        <div>
          <p>Verwendete Technologien:</p>
          <ul className="list-disc list-inside mt-4">
            <li>Next.js für Frontend und API</li>
            <li>PostgreSQL Datenbank</li>
            <li>MINIO Object Storage</li>
            <li>Docker für Containerisierung</li>
          </ul>
          <p className="mt-4">
            Implementierung von Benutzerauthentifizierung, Datenbankoperationen
            und Dateiverarbeitung.
          </p>
        </div>
      ),
      gradient: "linear-gradient(to right, tomato 0%, gold 100%)",
    },
    {
      title: "Ergebnisse und Vorteile",
      content: (
        <div>
          <p>Erreichte Verbesserungen:</p>
          <ul className="list-disc list-inside mt-4">
            <li>60% Effizienzsteigerung im Abrechnungsprozess</li>
            <li>Reduzierung von Fehlerquellen</li>
            <li>Erhöhte Transparenz und Benutzerfreundlichkeit</li>
            <li>Verbesserte Datenverwaltung und -sicherheit</li>
          </ul>
          <div className="h-64 w-full mt-4">
            <Bar
              data={{
                labels: ["Manueller Prozess", "Digitaler Prozess"],
                datasets: [
                  {
                    label: "Bearbeitungszeit (Minuten)",
                    data: [30, 12],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.5)",
                      "rgba(54, 162, 235, 0.5)",
                    ],
                    borderColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      ),
      gradient: "linear-gradient(to right, #84fab0 0%, #8fd3f4 100%)",
    },
    {
      title: "Wirtschaftliche Betrachtung",
      content: (
        <div>
          <p>Kosten-Nutzen-Analyse:</p>
          <div className="h-64 w-full mt-4">
            <Pie
              data={{
                labels: ["Entwicklungskosten", "Jährliche Einsparungen"],
                datasets: [
                  {
                    data: [4000, 5950],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.5)",
                      "rgba(54, 162, 235, 0.5)",
                    ],
                    borderColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top" as const,
                  },
                  title: {
                    display: true,
                    text: "Kosten vs. Einsparungen (in €)",
                  },
                },
              }}
            />
          </div>
          <p className="mt-4">
            Amortisation der Entwicklungskosten innerhalb des ersten Jahres.
          </p>
        </div>
      ),
      gradient: "linear-gradient(to right, #a18cd1 0%, #fbc2eb 100%)",
    },
    {
      title: "Fazit und Ausblick",
      content: (
        <div>
          <p>Erreichte Ziele:</p>
          <ul className="list-disc list-inside mt-4">
            <li>Erfolgreiche Digitalisierung des Abrechnungsprozesses</li>
            <li>Signifikante Effizienzsteigerung und Kosteneinsparungen</li>
            <li>Hohe Benutzerakzeptanz und -zufriedenheit</li>
          </ul>
          <p className="mt-4">Zukünftige Entwicklungen:</p>
          <ul className="list-disc list-inside mt-4">
            <li>Entwicklung einer nativen Mobile-App</li>
            <li>Integration von KI für automatische Kategorisierung</li>
            <li>Erweiterung der Analysefunktionen</li>
          </ul>
        </div>
      ),
      gradient: "linear-gradient(to right, #a18cd1 0%, #fbc2eb 100%)",
    },
  ];

  return (
    <div className="w-screen h-screen bg-gray-100 overflow-hidden">
      <Parallax ref={parallax} pages={slides.length} horizontal>
        {slides.map((slide, index) => (
          <Slide
            key={index}
            offset={index}
            gradient={slide.gradient}
            onClick={() => scroll(Math.min(slides.length - 1, index + 1))}
            title={slide.title}
            content={slide.content}
          />
        ))}

        <ParallaxLayer
          sticky={{ start: 0, end: slides.length - 1 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "1rem",
          }}
        >
          <button
            className="bg-white bg-opacity-80 px-2 py-1 md:px-4 md:py-2 rounded shadow hover:bg-opacity-100 transition-colors text-sm md:text-base"
            onClick={() => scroll(Math.max(0, currentSlide - 1))}
          >
            Zurück
          </button>
          <div className="hidden md:flex space-x-3 bg-black/20 p-2 rounded-full backdrop-blur-sm">
            {slides.map((slide, index) => (
              <NavigationCard
                key={index}
                title={`${index + 1}`}
                isActive={index === currentSlide}
                onClick={() => scroll(index)}
              />
            ))}
          </div>
          <div className="flex md:hidden items-center justify-center bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <span className="text-white text-sm">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
          <button
            className="bg-white bg-opacity-80 px-2 py-1 md:px-4 md:py-2 rounded shadow hover:bg-opacity-100 transition-colors text-sm md:text-base"
            onClick={() =>
              scroll(Math.min(slides.length - 1, currentSlide + 1))
            }
          >
            Weiter
          </button>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
