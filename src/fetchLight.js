import { allowedColors } from "./shared/trafficColors";

/**
 * Format response data
 *
 * @param {string} response
 */
const formatResponseData = (response) => {
  try {
    const formattedResponse = JSON.parse(response);

    const { color } = formattedResponse;

    if (!allowedColors.includes(color)) {
      throw Error(`Color '${color}' is not permitted`);
    }

    return color;
  } catch (error) {
    console.error(error);
  }
};

const fetchLight = async (trafficApi, updateDataCallback) => {
  const response = await trafficApi.makeRequest(
    'GET',
    undefined,
    updateDataCallback,
  );

  if (!response) {
    console.info('No response received.')
    return null;
  }

  console.info(`Successfully retrieved data from traffic API: ${response}`);

  const color = formatResponseData(response);

  return color;
}

export {
  fetchLight,
};
