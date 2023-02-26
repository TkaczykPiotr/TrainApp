import axios from 'axios';

const Ticket_API_BASE_URL = "http://localhost:8080/api/ticket";


class TicketService {

    getTicket(){
        return axios.get(Ticket_API_BASE_URL+ '/all');
    }

    getTicketPDF(id, idT, idP){
            return axios.get(Ticket_API_BASE_URL+ '/generate/' + id + '/' + idT+ '/' + idP,{ responseType: 'blob' }).then((response) => {
                                                                                           const url = window.URL.createObjectURL(new Blob([response.data]));
                                                                                           const link = document.createElement('a');
                                                                                           link.href = url;
                                                                                           link.setAttribute('download',  'ticketPAP' + id +'.pdf'); //or any other extension
                                                                                           document.body.appendChild(link);
                                                                                           link.click();
                                                                                       });
        }

     getTicketAccount(id){
            return axios.get(Ticket_API_BASE_URL+ '/all/'+ id);
        }

    getTicketOne(){
        return axios.get(Ticket_API_BASE_URL + '/one');
    }

    getTicketById(ticketId){
        return axios.get(Ticket_API_BASE_URL + '/one/' + ticketId);
    }

    createTicket(ticket){
        return axios.post(Ticket_API_BASE_URL + '/add', ticket).then(response => {
          localStorage.setItem("ticket", JSON.stringify(response.data));
          return response.data;
        });
    }

    updateTicketFirst(ticket, ticketId){
        return axios.put(Ticket_API_BASE_URL + '/first/' +  ticketId, ticket);
    }

    updateTicketSecond(ticketId, ticket){
        return axios.put(Ticket_API_BASE_URL + '/second/' +  ticketId, ticket);
    }

    updateTicketThird(ticketId, ticket){
        return axios.put(Ticket_API_BASE_URL + '/third/' +  ticketId, ticket);
    }


    //local
    getCurrentTicketConn() {
        return JSON.parse(localStorage.getItem('ticket')).connection;
      }
    getCurrentTicket() {
                  return JSON.parse(localStorage.getItem('ticket'));
     }

    getCurrentTicketId() {
              return JSON.parse(localStorage.getItem('ticket')).id;
    }
    getCurrentTicketPrize() {
                return JSON.parse(localStorage.getItem('ticket')).prize;
    }


    removeTicket(){
     localStorage.removeItem("ticket");
     localStorage.removeItem("site");
     localStorage.removeItem("conn");
     localStorage.removeItem("payment");
    }

    createItemSite(){
    localStorage.setItem("site", JSON.stringify({"site":null}));
    }
    getItemSite(){
    return JSON.parse(localStorage.getItem('site')).site;
    }



}
export default new TicketService()