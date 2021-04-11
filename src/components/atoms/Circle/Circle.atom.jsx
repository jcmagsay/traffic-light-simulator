import React from "react";

import './Circle.css';

/**
 * @summary One of the foundational SVG objects used
 *          in creating a vector.
 *
 * @param {*} [props]
 * A generic data packet with all dependencies needed
 * to successfully render the <Circle> object
 *
 * @function Circle
 * @returns Circle (React Component)
 */
const Circle = (props) => {
  const {
    active,
    color,
    cx,
    cy,
    radius,
  } = props;

  const classes = [
    'circle',
    active ? 'active' : undefined
  ].join(' ')

  return (
    <circle
      className={classes}
      cx={cx}
      cy={cy}
      fill={color}
      r={radius}
    />
  );
}

export default Circle;
