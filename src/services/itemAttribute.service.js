import http from "../http-common";

class ItemAttributeDataService {
    //create
    create(data) {
      return http.post("/api/list/item/attribute/create", data);
    }
  
    //delete all
    deleteAll() {
      return http.delete(`/api/list/item/attribute/delete/all`);
    }
  
    //delete by name
    delete(name) {
      return http.delete(`/api/list/item/attribute/delete/${name}`);
    }
  
    //get all
    getAll() {
      return http.get("/api/list/item/attribute/get/all");
    }
  
    //get by name
    getByName(name) { 
      return http.get(`/api/list/item/attribute/get/${name}`); 
    }
  
    //update by name
    update(name, data) {
      return http.put(`/api/list/item/attribute/update/${name}`, data);
    }
  }

export default new ItemAttributeDataService();