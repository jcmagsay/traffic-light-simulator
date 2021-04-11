import React from "react";

/**
 * @summary Creates an <Instruction /> component with the template:
 *            - Title
 *            - Detail
 *            - Call to Action (button)
 *
 * @param {*} [props]
 * A generic data packet with all dependencies needed
 * to successfully render the <Instruction> objects and
 * to communicate back to the parent component
 *
 * @returns Instruction (React Component)
 */
const Instruction = (props) => {
  const {
    callToAction,
    detail,
    title,
  } = props;

  return (
    <section>
      <h3>
        {title}
      </h3>
      <p>
        {detail}
      </p>
      {
        callToAction
        && (
          <button
            // TODO: in the future, create a debounce while fetch/http-request is happening
            disabled={callToAction.active}
            onClick={callToAction.onClick}
            type="button"
          >
            {callToAction.text}
          </button>
        )
      }
    </section>
  );
};

export default Instruction;
