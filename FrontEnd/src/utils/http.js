import config from "./config";

function get(endpoint) {
  return fetch(`${config.BASE_URL}${endpoint}`)
    .then((response) => response.json())
    .then((data) => data);
}

export default { get };
