import axios from 'axios';

const Payment_API_BASE_URL = "http://localhost:8080/api/payment";

class PaymentService {

      getPayment(){
             return axios.get(Payment_API_BASE_URL+ '/all');
         }



    createPayment(payment){
        return axios.post(Payment_API_BASE_URL + '/add', payment).then(response => {
             localStorage.setItem("payment", JSON.stringify(response.data));
              return response.data;
           });
    }

    getCurrentPaymentId() {
                  return JSON.parse(localStorage.getItem('payment')).id;
        }


}
export default new PaymentService()