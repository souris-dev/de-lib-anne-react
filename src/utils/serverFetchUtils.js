export const apiUrl = "http://localhost:8000";
export const atServiceEndpoint = (service, endpoint) =>
  apiUrl + "/" + service + endpoint;

export async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return new Promise((resolve, reject) => {
    response.json().then((resp) => {
      // TODO: THIS REALLY SHOULD NOT BE DONE
      // BUT DOING THIS FOR NOW TO MAINTAIN BACKWARD COMPATIBILITY
      // Should instead be using an object that encapsulates the status
      // and the response
      resp.status = response.status;
      resolve(resp);
    }
    );
  });
}

export async function getData(url = "", data = {}) {
  var completeUrl = url;
  if (data != {}) {
    completeUrl += "?";

    let params = new URLSearchParams();

    for (let key in data) {
      params.set(key, data[key]);
    }

    completeUrl += params;
  }
  const response = await fetch(completeUrl, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  });

  return new Promise((resolve, reject) => {
    response.json().then((resp) => {
      // TODO: THIS REALLY SHOULD NOT BE DONE
      // BUT DOING THIS FOR NOW TO MAINTAIN BACKWARD COMPATIBILITY
      // Should instead be using an object that encapsulates the status
      // and the response
      resp.status = response.status;
      resolve(resp);
    }
    );
  })
}
