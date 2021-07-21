import { useEffect, useState } from "react";
import axios from "axios";
import "./IndiaCovidData.css";
import TestedSample from "./TestedSample";
import * as BiIcons from "react-icons/bi";

function IndiaCovidData() {
    const [data, setData] = useState([]);
    const [vaccinatedData, setVaccinatedData] = useState([]);

    const getCovidData = () => {
        axios
            .get("https://api.covid19india.org/data.json")
            .then(function (response) {
                // console.log(response.data);
                // console.log(response.data.tested);
                setVaccinatedData(response.data.tested);
                const covidData = response.data.statewise[0];
                setData(covidData);
            })
            .catch(function (error) {
                alert(error);
            });
    };

    useEffect(() => {
        getCovidData();
    }, []);

    const formatter = (num) => {
        return new Intl.NumberFormat("en-IN").format(num);
    };

    const vaccineAdministered = vaccinatedData
        .slice(-1)
        .map((item) => item.totaldosesadministered);
    // console.log(vaccineAdministered);

    return (
        <>
            {data && (
                <div>
                    <p className="updated-time">
                        Last Updated on: <strong>{data.lastupdatedtime}</strong>
                    </p>
                    <div className="current">
                        <h5>Current cases in India</h5>
                        <TestedSample />
                    </div>

                    <div className="cases">
                        <div className="activecases">
                            <div>Active </div>
                            <div className="actives">
                                <strong>{formatter(data.active)}</strong>
                            </div>
                        </div>
                        <div className="recovered">
                            <div>Recovered</div>
                            <div>
                                {data.deltarecovered !== "0" && (
                                    <p className="delta-cases">
                                        + {formatter(data.deltarecovered)}
                                    </p>
                                )}
                                <strong>{formatter(data.recovered)}</strong>
                            </div>
                        </div>
                        <div className="confirmed">
                            <div>Confirmed </div>
                            <div>
                                {data.deltaconfirmed !== "0" && (
                                    <p className="delta-cases">
                                        + {formatter(data.deltaconfirmed)}
                                    </p>
                                )}
                                <strong>{formatter(data.confirmed)}</strong>
                            </div>
                        </div>
                        <div className="deaths">
                            <div>Deaths </div>
                            <div>
                                {data.deltadeaths !== "0" && (
                                    <p className="delta-cases">
                                        + {formatter(data.deltadeaths)}
                                    </p>
                                )}
                                <strong>{formatter(data.deaths)}</strong>
                            </div>
                        </div>
                    </div>
                    <div className="vaccine-administered">
                        <h6>
                            <span>
                                <BiIcons.BiBadgeCheck />
                            </span>
                        </h6>
                        <h6>
                            Total Vaccine Administered:{" "}
                            {formatter(vaccineAdministered)}
                        </h6>
                    </div>

                    <div className="updated">
                        <h6>Current cases in each state :</h6>
                    </div>
                </div>
            )}
        </>
    );
}

export default IndiaCovidData;
