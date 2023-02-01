import axios from 'axios';

const Connection_API_BASE_URL = "http://localhost:8080/api/connection";

class ConnectionService {

    getConnection(){
        return axios.get(Connection_API_BASE_URL+ '/view');
    }

    getConnectionById(connectionId){
            return axios.get(Connection_API_BASE_URL+ '/one/' + connectionId);
        }

    createConnection(connection){
            return axios.post(Connection_API_BASE_URL+'/add/', connection);
        }

       getCurrentConn() {
              return JSON.parse(localStorage.getItem('conn'));
            }

}
export default new ConnectionService()