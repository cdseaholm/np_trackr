import http from "../http-common";

class ListItemDataService {
  //create
  create(data) {
    return http.post("/api/list/item/create", data);
  }

  //delete all
  deleteAll() {
    return http.delete(`/api/list/item/delete/all`);
  }

  //delete by name
  delete(name) {
    return http.delete(`/api/list/item/delete/${name}`);
  }

  //get all
  getAll() {
    return http.get("/api/list/item/get/all");
  }

  //get by name
  getByName(name) { 
    return http.get(`/api/list/item/get/${name}`); 
  }

  //update by name
  update(name, data) {
    return http.put(`/api/list/item/update/${name}`, data);
  }
}

export default new ListItemDataService();