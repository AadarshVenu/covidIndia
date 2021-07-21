import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./DistrictWiseData.css";
import StateData from "./StateData";
import Footer from "./Footer";

function DistrictWiseData() {
    const [data, setData] = useState([]);
    const [nameOfState, setNameOfState] = useState();
    const stateCode = useParams().stateCode.toUpperCase();
    // console.log(stateCode);

    const getCovidData = useCallback(() => {
        axios
            .get("https://api.covid19india.org/state_district_wise.json")
            .then(function (response) {
                // console.log(response.data);
                let stateNames = Object.entries(response.data);              
                let stateName = stateNames.filter(
                    (item) => item[1].statecode === stateCode
                );
                // console.log(stateName[0][0]);
                setNameOfState(stateName[0][0]);


                let districts = Object.values(response.data).find(
                    (item) => item.statecode === stateCode
                ).districtData;
                // console.log( districts);
                let district_list = [];
                for (let x in districts) {
                    let obj = districts[x];
                    obj["district_name"] = x;
                    district_list.push(obj);
                }
                setData(district_list);
            })
            .catch(function (error) {
                alert(error);
            });
    }, [stateCode]);

    useEffect(() => {
        getCovidData();
    }, [getCovidData]);

    const formatter = (num) => {
        return new Intl.NumberFormat("en-IN").format(num);
    };

    return (
        <>
            <h3 className="name-of-state">{nameOfState}</h3>
            <StateData />
            <div className="district-data">
                <h6>Cases in each district</h6>
                <table className="table table-hover table-bordered">
                    <thead className="table-head">
                        <tr>
                            <th className="table-secondary">District</th>
                            <th className="table-secondary">Confirmed</th>
                            <th className="table-secondary">Active</th>
                            <th className="table-secondary">Recovered</th>
                            <th className="table-secondary">Deaths</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {data.map((item) => (
                            <tr key={item.district_name}>
                                <th className="state-name">
                                    {item.district_name}
                                </th>
                                <td className="state-confirmed">
                                    {formatter(item.confirmed)}
                                    {item.delta.confirmed !== 0 && (
                                        <span className="delta-more">
                                            {" "}
                                            + {formatter(item.delta.confirmed)}
                                        </span>
                                    )}
                                </td>
                                <td className="state-active">
                                    {formatter(item.active)}
                                </td>
                                <td className="state-recovered">
                                    {formatter(item.recovered)}

                                    {item.delta.recovered !== 0 && (
                                        <span className="delta-less">
                                            {" "}
                                            + {formatter(item.delta.recovered)}
                                        </span>
                                    )}
                                </td>
                                <td className="state-deaths">
                                    {formatter(item.deceased)}
                                    {item.delta.deceased !== 0 && (
                                        <span className="delta-more">
                                            {" "}
                                            + {formatter(item.delta.deceased)}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}

export default DistrictWiseData;
