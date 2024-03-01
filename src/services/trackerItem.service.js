import http from "../http-common";

class TrackerItemDataService {
  //create
  create(data) {
    return http.post("/api/trackerItem/create", data);
  }

  //delete all
  deleteAll() {
    return http.delete(`/api/trackerItem/delete-all`);
  }

  //delete by name
  delete(name) {
    return http.delete(`/api/trackerItem/delete/${name}`);
  }

  //get all
  getAll() {
    return http.get("/api/trackerItem");
  }

  //get by name
  getByName(name) { 
    return http.get(`/api/trackerItem/get/${name}`); 
  }

  //update by name
  update(name, data) {
    return http.put(`/update/${name}`, data);
  }
}

export default new TrackerItemDataService();