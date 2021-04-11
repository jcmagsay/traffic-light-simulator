import React from "react";
import Circle from "../../atoms/Circle/Circle.atom";
import { trafficColors } from "../../../shared/trafficColors";

/**
 * @summary Activates interaction with the traffic light
 *
 * @param {boolean} [active]
 * A boolean that determines whether or not API requests can be made.
 *
 * @param {function} [callback]
 * A function that will be called after
 *
 * @function handleActivate
 * @returns void
 */
const handleActivate = (active, callback) => {
  if (!active) {
    callback(true);
  }
};

/**
 * @summary Returns the color needed for a given light
 *
 * @param {boolean} [active]
 * A boolean which ensures the traffic light is active
 * and can be interacted with
 *
 * @param {string} [activeLight]
 * The current active color for the traffic light
 *
 * @param {string | trafficColors.*} [colorName]
 * A static representation of the color name for a
 * given signal
 *
 * @function getColor
 * @returns string | trafficColorData.*
 */
const getColor = (
  active,
  activeLight,
  colorName
) => {
  try {
    return (
      active && activeLight === colorName
        ? trafficColors[colorName].hex
        : trafficColors.white.hex
    );
  } catch (error) {
    console.error('Issue getting color with the following data:', {
      active,
      activeLight,
      colorName,
    });

    return trafficColors.white.hex;
  }
};

/**
 * @summary Container representing the presentation of the
 *          TrafficLight
 *
 * @param {*} props
 *
 * @function TrafficLight
 * @returns TrafficLight (React Component)
 */
//TODO: Currently this component is not super flexible. It will need to be
//      restructured if the number of lights and/or colors change.
const TrafficLight = (props) => {
  const {
    active,
    activeLight,
    setActive,
    title,
  } = props;

  /**
   * TODO: need to find a good mathematical formula for determining
   * the hard-coded numbers in this component.
   */

  const circleCx = 3.75;
  const circleRhythm = 5;
  const circleRadius = 2;

  // a simple (non-practical) formulat for generating a common 'cy' attribute
  const calculateCy = (input) => input + circleRhythm;

  return (
    <svg viewBox="0 0 50 20" xmlns="http://www.w3.org/2000/svg">
      <title>
        {title}
      </title>
      <g onClick={() => handleActivate(active, setActive)}>
        <rect
          height="16"
          rx="0.25"
          x="1"
          y="1"
          width="5.5"
        />
        <g fill="white">
          <Circle
            active={activeLight === trafficColors.red.name}
            color={getColor(active, activeLight, trafficColors.red.name)}
            cx={circleCx}
            cy={calculateCy(-1)}
            radius={circleRadius}
          />
          <Circle
            active={activeLight === trafficColors.yellow.name}
            color={getColor(active, activeLight, trafficColors.yellow.name)}
            cx={circleCx}
            cy={calculateCy(4)}
            radius={circleRadius}
          />
          <Circle
            active={activeLight === trafficColors.green.name}
            color={getColor(active, activeLight, trafficColors.green.name)}
            cx={circleCx}
            cy={calculateCy(9)}
            radius={circleRadius}
          />
        </g>
      </g>
    </svg>
  );
};

export default TrafficLight;
