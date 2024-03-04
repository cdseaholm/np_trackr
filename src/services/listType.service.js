import http from "../http-common";

class ListDataService {
  //create
  create(data) {
    return http.post("/api/list/create", data);
  }

  //delete all
  deleteAll() {
    return http.delete(`/api/list/delete-all`);
  }

  //delete by name
  delete(name) {
    return http.delete(`/api/list/delete/${name}`);
  }

  //get all
  getAll() {
    return http.get("/api/list/get/all");
  }

  //get by name
  getByName(name) { 
    return http.get(`/api/list/get/${name}`); 
  }
}

export default new ListDataService();