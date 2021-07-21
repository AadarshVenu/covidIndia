import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import "./StateData.css";

function StateData() {
    const [data, setData] = useState([]);
    const stateCode = useParams().stateCode.toUpperCase();
    // console.log(stateCode);
    const getCovidData = useCallback(() => {
        axios
            .get("https://api.covid19india.org/v4/min/data.min.json")
            .then(function (response) {
                let states = Object.entries(response.data);
                // console.log(states);
                let stateData = states.filter((item) => item[0] === stateCode);
                // console.log(stateData);
                setData(stateData);
            })
            .catch(function (error) {
                alert(error);
            });
    }, [stateCode]);
    const formatter = (num) => {
        return new Intl.NumberFormat("en-IN").format(num);
    };

    useEffect(() => {
        getCovidData();
    }, [getCovidData]);

    // console.log(data[0][1].meta.population)

    return (
        <div>
            {data.map((item) => (
                <div key={item[0]}>
                    <div className="state-card">
                        <div className="each-state-cases">
                            <div className="each-state-confirmed">
                                <h6>Confirmed</h6>
                                <p>{formatter(item[1].total.confirmed)}</p>
                            </div>
                            <div className="each-state-recovered">
                                <h6>Recovered</h6>
                                <p>{formatter(item[1].total.recovered)}</p>
                            </div>
                            <div className="each-state-deaths">
                                <h6>Deaths</h6>
                                <p>{formatter(item[1].total.deceased)}</p>
                            </div>
                        </div>
                        <div className="each-state-extra-details">
                            <div className="each-state-recovery-ratio">
                                <h6>Recovery Ratio</h6>
                                <p>
                                    {(
                                        (item[1].total.recovered /
                                            item[1].total.confirmed) *
                                        100
                                    ).toFixed(1)}
                                    %
                                </p>
                            </div>

                            <div className="each-state-fatality-ratio">
                                <h6>Case Fatality Ratio</h6>
                                <p>
                                    {(
                                        (item[1].total.deceased /
                                            item[1].total.confirmed) *
                                        100
                                    ).toFixed(1)}
                                    %
                                </p>
                            </div>
                            <div className="each-state-confirmed-ratio">
                                <h6>Confirmed Per Lakh</h6>
                                <p>
                                    {formatter(
                                        (
                                            (item[1].total.confirmed /
                                                item[1].meta.population) *
                                            100000
                                        ).toFixed(1)
                                    )}
                                </p>
                            </div>
                            <div className="each-state-tests-ratio">
                                <h6>Tests Done Per Lakh</h6>
                                <p>
                                    {formatter(
                                        (
                                            (item[1].total.tested /
                                                item[1].meta.population) *
                                            100000
                                        ).toFixed(1)
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="vaccination-card">
                            <div className="population-details">
                                <div> Population</div>
                                <strong>
                                    {formatter(item[1].meta.population)}
                                </strong>
                            </div>
                            <div className="test-details">
                                <div> Number of tests conducted</div>
                                <strong>
                                    {formatter(item[1].total.tested)}
                                </strong>
                            </div>
                            <div className="onedose-details">
                                <div>Atleast one dose</div>
                                <strong>
                                    {" "}
                                    {formatter(item[1].total.vaccinated1)}
                                </strong>
                            </div>
                            <div className="twodose-details">
                                <div>Fully vaccinated</div>
                                <strong>
                                    {formatter(item[1].total.vaccinated2)}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StateData;
