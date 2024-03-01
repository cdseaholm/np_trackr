import http from "../http-common";

class CustomItemDataService {
  //create
  create(data) {
    return http.post("/api/customItem/create", data);
  }

  //delete all
  deleteAll() {
    return http.delete(`/api/customItem/delete-all`);
  }

  //delete by name
  delete(name) {
    return http.delete(`/api/customItem/delete/${name}`);
  }

  //get all
  getAll() {
    return http.get("/api/customItem");
  }

  //get by name
  getByName(name) { 
    return http.get(`/api/customItem/get/${name}`); 
  }

  //update by name
  update(name, data) {
    return http.put(`/update/${name}`, data);
  }
}

export default new CustomItemDataService();