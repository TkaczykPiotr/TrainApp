import axios from 'axios';


const API_URL = 'http://localhost:8080/api/site/';

class SiteService {


  getSiteAllByConn(id) {
    return axios.get(API_URL + 'all/' + id);
  }

  updateSite(id){
          return axios.put(API_URL + 'update/' +  id);
      }


}

export default new SiteService();