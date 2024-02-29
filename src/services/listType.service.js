import http from "../http-common";

class ListTypeDataService {
  //create
  create(data) {
    return http.post("/api/listType/create", data);
  }

  //delete all
  deleteAll() {
    return http.delete(`/api/listType/delete-all`);
  }

  //delete by name
  delete(name) {
    return http.delete(`/api/listType/delete/${name}`);
  }

  //get all
  getAll() {
    return http.get("/api/listType/get/all");
  }

  //get by name
  getByName(name) { 
    return http.get(`/api/listType/get/${name}`); 
  }
}

export default new ListTypeDataService();