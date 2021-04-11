const SiteCopy = {
  instructions: {
    activateTrafficLight: 'To activate the traffic light, please click it.',
    changeActiveLightRandomly: 'To change light randomly, please click the "Change!" button, an API request will be used to determine the next light.',
    changeActiveLightSequenced: 'To change light in sequence, please click the "Next sequence!" button. The current state will be used to load up the next logical state in a traffic light sequence. The expected sequence will be "G -> Y -> R". ',
  },
  messaging: {
    header: 'Traffic Light Simulator',
    steps: {
      one: 'Step 1: Activate traffic light',
      two: 'Step 2: Change active light randomly',
      three: 'Step 3: Change active light in proper sequence',
    },
    information: {
      timestamp: '* Timestamp is primarily to give feedback when next random light data is the same as the previous'
    }
  }
};

export default SiteCopy;
