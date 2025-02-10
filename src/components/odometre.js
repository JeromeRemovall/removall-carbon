import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../scss/components/odometre.scss";
gsap.registerPlugin(ScrollTrigger);

const Odometer = ({ value }) => {
  const odometerRef = useRef(null);
  const digit = value.toString();

  useEffect(() => {
    if (odometerRef.current) {
      const digitElement =
        odometerRef.current.querySelector(
          ".digit"
        );
      if (digitElement) {
        const digitHeight =
          digitElement.offsetHeight;
        odometerRef.current.style.setProperty(
          "--digit-height",
          `${digitHeight}px`
        );

        // Animer chaque chiffre
        const digits = value.toString().split("");
        let digitIndex = 0;

        digits.forEach((digit, index) => {
          if (digit === " ") return;
          const digitSpan =
            odometerRef.current.querySelectorAll(
              ".digit"
            )[digitIndex];
          digitIndex++;
          if (digitSpan) {
            const yValue =
              digit === "0"
                ? `-${(digitHeight / 11) * 10}px`
                : `-${
                    digit * (digitHeight / 11)
                  }px`;
            gsap.fromTo(
              digitSpan,
              { y: 0 },
              {
                y: yValue,
                duration: 0.3,
                ease: "ease.out",
                delay: index * 0.08,
                scrollTrigger: {
                  trigger: odometerRef.current,
                  start: "top 70%",
                  // markers: true,
                },
              }
            );
          }
        });
      }
    }
  }, [value]);

  // Fonction pour ajouter des espaces tous les trois chiffres
  const formatDigits = (digits) => {
    return digits
      .split("")
      .reverse()
      .map((digit, index) => (
        <React.Fragment key={index}>
          <div className="digit">
            {[...Array(10).keys()].map((i) => (
              <div key={i}>{i}</div>
            ))}
            <div key="10">0</div>
          </div>
          {index % 3 === 0 &&
            index !== 0 &&
            index !== digits.length && (
              <div className="separator">
                &nbsp;
              </div>
            )}
        </React.Fragment>
      ))
      .reverse();
  };

  return (
    <div
      className="odometer__number"
      ref={odometerRef}
    >
      {formatDigits(digit)}
    </div>
  );
};

export default Odometer;
