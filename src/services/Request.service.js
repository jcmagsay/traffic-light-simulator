// Reference design from https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started#step_3_%E2%80%93_a_simple_example

/**
 * @class RequestService
 *
 * @summary Creates a generic request object
 */
class RequestService {
  // the root/base uri which will be used to make http requests
  baseUri = undefined;

  // the allowed http request methods
  validRequestTypes = ['get', 'patch', 'post', 'put', 'delete'];

  constructor(baseUri) {
    this.baseUri = baseUri;
  }

  /**
   * @summary Logs API responses as the ready state changes while
   *          the request is in-flight
   *
   * @function logResponses
   * @returns void
   */
  logResponses() {
    if (this.readyState === XMLHttpRequest.DONE) {
      if (this.status === 200) {
        console.info('Retrieved data successfully.');
      } else {
        console.error('There was a problem with the request.');
      }
    }
  }

  /**
   * @summary The mechanism for making a request on an API
   *
   * @param {string} [requestMethod]
   * The http request method type
   *
   * @param {string} [path]
   * Any addition path parameters to append to the baseUri
   *
   * @function makeRequest
   * @returns Promise()
   */
  makeRequest(requestMethod = 'GET', path = undefined) {
    let requestTypeFormatted;

    return new Promise((resolve, reject) => {
      const httpRequest = new XMLHttpRequest();

      if (!httpRequest) {
        console.error('Cannot create XMLHttpRequest object.');

        reject(null);
      }

      // format request type for validation
      if (typeof requestMethod === 'string') {
        requestTypeFormatted = requestMethod.toLowerCase();
      }

      // ensure that the request type is allowed
      const isValidRequest = this.validRequestTypes.includes(
        requestTypeFormatted,
      );

      if (!isValidRequest) {
        console.error(`Cannot make request with request type: ${requestMethod}.`)

        reject(null);
      }

      // logs success and failures
      httpRequest.onreadystatechange = this.logResponses();

      // if additional params are added, this string composer will not work
      const requestUri = [
        this.baseUri,
        path || undefined
      ].join('/')

      // handler for opening a connection to the API
      httpRequest.open(
        requestMethod,
        requestUri,
      );

      // handler for successful http request
      httpRequest.onload = () => resolve(httpRequest.response);

      // handler for failed http request
      httpRequest.onerror = () => reject(httpRequest.response);

      // handler for sending a request to the API
      httpRequest.send();
    });
  }
}

export default RequestService;
