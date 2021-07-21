import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StateWiseData.css";
import { useHistory } from "react-router-dom";


function StateWiseData() {
    const [data, setData] = useState([]);
    const getCovidData = () => {
        axios
            .get("https://api.covid19india.org/data.json")
            .then(function (response) {
                const covidData = response.data.statewise;
                // console.log(covidData);
                setData(covidData);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        getCovidData();
    }, []);
    const formatter = (num) => {
        return new Intl.NumberFormat("en-IN").format(num);
    };

    const history = useHistory();

    data.length && data.shift();
    let states = data.filter((state) => state.statecode !== "UN");

    // console.log("keys", data);

    return (
        <div>
            <div className="state-data">
                <table className="table table-hover table-bordered">
                    <thead className="table-head">
                        <tr>
                            <th className="table-secondary">State</th>
                            <th className="table-secondary">Confirmed</th>
                            <th className="table-secondary">Active</th>
                            <th className="table-secondary">Recovered</th>
                            <th className="table-secondary">Deaths</th>
                            <th className="table-secondary">Last updated on</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {states.map((item) => (
                            <tr
                                key={item.state}
                                onClick={() =>
                                    history.push(`state/${item.statecode}`)
                                }
                            >
                                <th className="state-name">{item.state}</th>
                                <td className="state-confirmed">
                                    {formatter(item.confirmed)}
                                    {item.deltaconfirmed !== "0" && (
                                        <span className="delta-more">
                                            {" "}
                                            + {formatter(item.deltaconfirmed)}
                                        </span>
                                    )}
                                </td>
                                <td className="state-active">
                                    {formatter(item.active)}
                                </td>
                                <td className="state-recovered">
                                    {formatter(item.recovered)}
                                    {item.deltarecovered !== "0" && (
                                        <span className="delta-less">
                                            {" "}
                                            +{formatter(item.deltarecovered)}
                                        </span>
                                    )}
                                </td>
                                <td className="state-deaths">
                                    {formatter(item.deaths)}
                                    {item.deltadeaths !== "0" && (
                                        <span className="delta-more">
                                            + {formatter(item.deltadeaths)}
                                        </span>
                                    )}
                                </td>
                                <td>{item.lastupdatedtime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
           
        </div>
    );
}

export default StateWiseData;
