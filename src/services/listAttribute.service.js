import http from "../http-common";

class ListAttributeDataService {
    //create
    create(data) {
      return http.post("/api/list/attribute/create", data);
    }
  
    //delete all
    deleteAll() {
      return http.delete(`/api/list/attribute/delete/all`);
    }
  
    //delete by name
    delete(name) {
      return http.delete(`/api/list/attribute/delete/${name}`);
    }
  
    //get all
    getAll() {
      return http.get("/api/list/attribute/get/all");
    }
  
    //get by name
    getByName(name) { 
      return http.get(`/api/list/attribute/get/${name}`); 
    }
  
    //update by id
    update(id, data) {
      return http.put(`/api/list/attribute/update/${id}`, data);
    }
  }

export default new ListAttributeDataService();