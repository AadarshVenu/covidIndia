import React from "react";
import IndiaCovidData from "./IndiaCovidData.js";
import StateWiseData from "./StateWiseData";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./Footer"

function MainPage() {
    const classes = makeStyles();
    return !(<IndiaCovidData />) ? (
        <Backdrop className={classes.backdrop} open>
            <CircularProgress color="inherit" />)
        </Backdrop>
    ) : (
        <div>
            <IndiaCovidData />
            <StateWiseData />
            <Footer/>
        </div>
    );
}

export default MainPage;
