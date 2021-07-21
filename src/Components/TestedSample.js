import React, { useState, useEffect } from "react";
import axios from "axios";

function TestedSample() {
    const [data, setData] = useState();

    const getData = () => {
        axios
            .get("https://api.rootnet.in/covid19-in/stats/testing/latest")
            .then(function (response) {
                // console.log(response.data.data.totalSamplesTested);
                setData(response.data.data.totalSamplesTested);
            });
    };
    const formatter = (num) => {
        return new Intl.NumberFormat("en-IN").format(num);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="totalsamples">
            Total Samples Tested: {""}
            <span style={{ fontWeight: "bold" }}>{formatter(data)}</span>
        </div>
    );
}

export default TestedSample;
