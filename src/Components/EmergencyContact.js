import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EmergencyContact.css"
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./Footer";



function EmergencyContact() {
    const classes = makeStyles();
    const [data, setData] = useState();
      const getData = () => {
          axios
              .get("https://api.rootnet.in/covid19-in/contacts")
              .then(function (response) {
                //   console.log(response.data.data.contacts);
                 setData(response.data.data.contacts);
              });
      };

      useEffect(() => {
          getData();
      }, []);

    return (
        <div>
            {!data ? (
                <Backdrop className={classes.backdrop} open>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                <div>
                    <div className="central-contact">
                        <h5>Central Helpline Contacts</h5>
                        <h6>Phone Number: {data.primary.number}</h6>
                        <h6>Email: {data.primary.email}</h6>
                    </div>
                    <div className="emergency-table">
                        <table className="table table-bordered">
                            <thead className="table-head">
                                <tr>
                                    <th className="table-dark">State</th>
                                    <th className="table-dark">
                                        Emergency Number
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {data.regional.map((state) => (
                                    <tr key={state.loc}>
                                        <th>{state.loc}</th>
                                        <td>{state.number}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    );
}

export default EmergencyContact;
