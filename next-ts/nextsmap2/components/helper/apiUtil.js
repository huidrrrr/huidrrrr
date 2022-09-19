import axios from "axios";
export async function getAllPlaces() {
  const response = await axios.get(
    "https://wikimapia-54a96-default-rtdb.firebaseio.com/places.json"
  );
  const placeData = [];
  for (const key in response.data) {
    placeData.push({
      id: key,
      ...response.data[key],
    });
  }
  return placeData;
}

export async function getPlaceById(id) {
  const allPlaces = await getAllPlaces();
  return allPlaces.find((place) => place.id === id);
}

export async function getPlusCode(position) {
  const url =
    "https://plus.codes/api?address=" + position.lat + "," + position.lng;
  const response = await axios.get(url);
  const plusCode = response.data.plus_code.global_code;
  return plusCode;
}

export async function addOneMissingPlace(place) {
  const url =
    "https://wikimapia-54a96-default-rtdb.firebaseio.com/places.json";
  const response = await axios({
    method: "post",
    url: url,
    data: JSON.stringify(place),
  });
  return response;
}

export async function getOneUpperPlaces(id) {
  const allPlaces = await getAllPlaces();
  return allPlaces.filter((place) => place.upperId === id);
}

// Comment api---------------------------------------------------------

export async function getOnePlaceAllComments(placeId) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/places/${placeId}/comments.json`;
  const response = await axios({
    method:'get',
    url: url,
  });
  return response;
}

export async function addComment(placeId, comment) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/places/${placeId}/comments.json`;
  const response = await axios({
    method: "post",
    url: url,
    data: JSON.stringify(comment),
  });
  return response;
}

//  event api-----------------------------------------------------------------
export async function getOnePlaceEventsByPlaceId(placeId) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/places/${placeId}/events`;
  const response = await axios({
    method:'get',
    url: url,
  });
  return response;
}

export async function addOneEventToDraft(event, placeId, editorId,currentTime) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/eventDraft.json`;
  const eventData = {
    placeId: placeId,
    editorId: editorId,
    event: event,
    editedTime:currentTime
  };
  const response = await axios({
    method: "post",
    url: url,
    data: JSON.stringify(eventData),
  });
  return response;
}

export async function addOnePlaceToDraft(place,editorId,currentTime) {
  const url = `https://wikimapia-54a96-default-rtdb.firebaseio.com/placeDraft.json`;
  const placeData = {
    editorId: editorId,
    place: place,
    editedTime:currentTime
  };
  const response = await axios({
    method: "post",
    url: url,
    data: JSON.stringify(placeData),
  });
  return response;
}

