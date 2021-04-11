import { createContext } from "react";
import RequestService from "../services/Request.service";

const serviceUris = {
  trafficLightUri: 'https://traffic-light-api.herokuapp.com',
}

// default context for the API provider
const defaultContext = {};

// create a singleton instance for a traffic request service
const trafficApi = new RequestService(serviceUris.trafficLightUri);

// do not use this in this file, it is used in the context provider in App.jsx
const apiProvider = {
  trafficApi,
  // any future apis can be added here
};

// create a context object that can be provided to the app
const ApiContext = createContext(defaultContext);

export {
  ApiContext,
  apiProvider,
};

