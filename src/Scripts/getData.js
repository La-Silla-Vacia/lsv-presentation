function getData(callback) {
  let dataExists = true;
  let interactiveData;
  try {
    if (eindpresentatie_lasillavacia_data) {
      dataExists = true;
      interactiveData = eindpresentatie_lasillavacia_data;
    }
  } catch (e) {
    dataExists = false;
  }

  if (dataExists) {
    if (interactiveData.dataUri) {
      fetchData(interactiveData.dataUri, (data) => {
        if (callback) callback(data);
      });
    }
  }
}

function fetchData(uri, callback) {
  fetch(uri)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      if (callback) callback(json);
    })
    .catch((ex) => {
      console.log('parsing failed', ex)
    })
}

export default getData;