import React, { Component} from "react";
import imginf from '../images/imginf.jpg'

function Information(){

return(

<>
<div id="MainBoxInformation" >
        <div id="wrapperi">
            <img alt="" src={ imginf } style = {{ borderRadius: '20%' }}/>
        </div>

        <div className="row" id="rowInf" >
        <div id="wrapperi">
         <center> <h2 id="h2">Wybierasz się w podróż i chcesz zaoszczędzić na bilecie?</h2> </center>
         <center>  <h3 id="h2">   Zostań Łowcą Promo: wytrop Twoją trasę i upoluj okazję. Teraz jeszcze więcej tanich biletów. </h3>  </center>
         </div>
            <div id="BoxInf" style={{backgroundImage:`url("https://www.aizul.xyz/img/background.jpg")`,backgroundSize: 'cover'}}>
                    <center>
                        <h2 id="hi">
                              Wprowadziliśmy bardzo atrakcyjne upusty cenowe dla pasażerów planujących podróż z wyprzedzeniem. Z oferty można skorzystać na dowolnie wybranej trasie kolejowej w klasie 2.
                              Oferta „Wcześniej Taniej” (30%; 20% lub 10% taniej).
                        </h2>
                            <h2 id="hi">
                                Oferta „Wcześniej Taniej” (30%; 20% lub 10% taniej).
                            </h2>
                    </center>

                            <h2 id="hi-2">
                              Zniżka 30% dostępna jest od 30 do 21 dni przed dniem wyjazdu,
                            </h2>
                            <h2 id="hi-2">
                              Zniżka 20% dostępna jest od 20 do 14 dni przed dniem wyjazdu,
                            </h2>
                            <h2 id="hi-2">
                              Zniżka 10% dostępna jest od 13 do 7 dni przed dniem wyjazdu.
                            </h2>

            </div>

        </div>
</div>

</>)


}

export default Information;