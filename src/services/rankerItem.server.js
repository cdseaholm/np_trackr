import http from "../http-common";

class RankerItemDataService {
  //create
  create(data) {
    return http.post("/api/rankerItem/create", data);
  }

  //delete all
  deleteAll() {
    return http.delete(`/api/rankerItem/delete-all`);
  }

  //delete by name
  delete(name) {
    return http.delete(`/api/rankerItem/delete/${name}`);
  }

  //get all
  getAll() {
    return http.get("/api/rankerItem");
  }

  //get by name
  getByName(name) { 
    return http.get(`/api/rankerItem/${name}`); 
  }
}

export default new RankerItemDataService();