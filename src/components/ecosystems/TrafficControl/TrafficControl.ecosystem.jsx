import React, { useContext, useState } from "react";
import TrafficLight from "../../molecules/TrafficLight/TrafficLight.molecule";
import { fetchLight } from "../../../fetchLight";
import Instruction from "./partials/Instruction.partial";
import { ApiContext } from "../../../providers/Api.provider";
import { trafficColors } from "../../../shared/trafficColors";
import SiteCopy from "../../../data/SiteCopy.data";

/**
 * @summary Allows random selection to occur by fetching the
 *          next state, then updated state to reflect the newly
 *          retrieved state. This is a non-deterministic
 *          workflow and is completely random.
 *
 * @param {*} [dataPacket]
 * A generic data packet with all dependencies needed
 * to handle a correct sequence change
 *
 * @function handleRandomizedChange
 * @return void
 */
const handleRandomizedChange = async ({
  trafficApi,
  setLight,
  setLastChanged,
}) => {
  console.info('handleRandomizedChange() called');

  // TODO: Create a hook where any fetches are disabled until
  //       a response is returned from the API
  const res = await fetchLight(trafficApi)
    .then((response) => {
      console.info('data retrieved from API', { response });
      return response;
    })


  setLight(res);
  setLastChanged(Date.now());
};

/**
 * @summary Allows sequencing to be enforced by understanding
 *          current and next states. This is a deterministic
 *          workflow. (R -> G -> Y -> (repeat))
 *
 * @param {*} [dataPacket]
 * A generic data packet with all dependencies needed
 * to handle a correct sequence change
 *
 * @function handleSequencedChange
 * @returns void
 */
const handleSequencedChange = ({
  light,
  setLight,
  setLastChanged,
}) => {
  console.info('handleSequencedChange() called');
  let nextColor;

  switch (light) {
    case trafficColors.red.name:
      nextColor = trafficColors.green.name;
      break;
    case trafficColors.yellow.name:
      nextColor = trafficColors.red.name;
      break;
    case trafficColors.green.name:
      nextColor = trafficColors.yellow.name;
      break;
    default:
      console.error(`Cannot process color: ${light}. It is not part of expected sequence`)
      nextColor = trafficColors.white.name;
      break;
  }

  setLight(nextColor);
  setLastChanged(Date.now());
};

/**
 * @summary Returns a collection of instructions data
 *          used for creating <Instruction> objects
 *
 * @param {*} [dataPacket]
 * A generic data packet with all dependencies needed
 * to successfully render the <Instruction> objects
 *
 * @returns Array<InstructionData>
 */
const instructionsData = ({
  copy,
  trafficApi,
  active,
  light,
  setLight,
  setLastChanged,
}) => (
  [
    {
      title: copy.messaging.steps.one,
      detail: copy.instructions.activateTrafficLight,
      callToAction: null,
    },
    {
      title: copy.messaging.steps.two,
      detail: copy.instructions.changeActiveLightRandomly,
      callToAction: {
        active: !active,
        onClick: () => handleRandomizedChange({
          trafficApi,
          setLight,
          setLastChanged,
        }),
        text: 'Change!'
      },
    },
    {
      title: copy.messaging.steps.three,
      detail: copy.instructions.changeActiveLightSequenced,
      callToAction: {
        active: !active,
        onClick: () => handleSequencedChange({
          light,
          setLight,
          setLastChanged,
        }),
        text: 'Next Sequence!'
      },
    },
  ]
);

/**
 * @summary Container for Business Logic of the Traffic Light.
 *          Creates a control wrapping all Traffic components:
 *            - Instruction
 *            - TrafficLight
 *            - etc.
 *
 * @function TrafficControl
 * @returns TrafficControl (React Component)
 */
const TrafficControl = () => {
  /* STATE HOOKS */
  const [light, setLight] = useState(null);
  const [lastChanged, setLastChanged] = useState(Date.now());
  const [active, setActive] = useState(false);

  /* CONTEXT HOOKS */
  const apiContext = useContext(ApiContext);
  const trafficApi = apiContext?.trafficApi;

  /* STATIC TEXT COPY DATA */
  const copy = SiteCopy;

  /* DEPENDENCIES FOR CROSS FUNCTION COMMUNICATION */
  const dataPacket = {
    copy,
    trafficApi,
    active,
    light,
    setLight,
    setLastChanged,
  };
  const instructions = instructionsData(dataPacket);

  /**
   * @summary Allows traffic light to be activated and interacted with.
   *
   * NOTE: This should only be used as a callback for event
   *       handling within the <TrafficLight /> component.
   *
   * @function activateTrafficLight
   * @returns void
  */
  const activateTrafficLight = () => {
    setActive(true);
    handleRandomizedChange(dataPacket);
  };

  return (
    <aside className="group">
      <section className="instructions">
        {instructions.map((instruction, i) => {
          const key = `instruction-step${i}-${Date.now()}`;
          return (
            <Instruction
              key={key}
              title={instruction.title}
              detail={instruction.detail}
              callToAction={instruction.callToAction}
            />
          );
        })}
      </section>
      <section className="traffic-light">
        <h3>State Tracking Data</h3>
        <dl>
          <dt><b>Color:</b></dt>
          <dd>{light || 'No color displayed yet.'}</dd>
          <dt><b>Timestamp*</b>:</dt>
          <dd>{lastChanged}</dd>
        </dl>
        <TrafficLight
          active={active}
          activeLight={light}
          setActive={activateTrafficLight}
          title="Traffic light object"
        />
        <em>{copy.messaging.information.timestamp}</em>
      </section>
    </aside>
  );
};

export default TrafficControl;
