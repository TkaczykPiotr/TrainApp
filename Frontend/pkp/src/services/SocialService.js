import axios from 'axios';

const Social_API_BASE_URL = "http://localhost:8080/apis/social";

class SocialService {

    getSocial(){
        return axios.get(Social_API_BASE_URL);
    }
/*
    getConnectionById(ConnectionId){
        return axios.get(Connection_API_BASE_URL + '/' + ConnectionId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }
 createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }
    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

*/
}
export default new SocialService()