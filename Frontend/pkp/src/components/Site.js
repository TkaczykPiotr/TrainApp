import React, { Component, Modal, Button, useState, render} from "react";
import '../styles/styles.css';
import SiteModal from "./siteModal"
import TicketService from "../services/ticketService";
import SiteService from "../services/sitesService";

const Site = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";


  return (
    <div className={showHideClassName}>

      <section className="modal-main">
        {children}
        <div> </div>
        <button type="button" onClick={handleClose}>
          Close
        </button>
        <SiteModal></SiteModal>
      </section>

    </div>
  );
};

export default Site;