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
  
    //get by listid
    getByName(listid) { 
      return http.get(`/api/list/item/attribute/get/${listid}`); 
    }
  
    //update by id
    update(id, data) {
      return http.put(`/api/list/item/attribute/update/${id}`, data);
    }
  }

export default new ItemAttributeDataService();