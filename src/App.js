import "./App.css";
import MainPage from "../src/Components/MainPage";
import { BrowserRouter as Router,Route, Switch } from "react-router-dom";
import EmergencyContact from "./Components/EmergencyContact.js";
import Header from "./Components/Header.js";
import DistrictWiseData from "./Components/DistrictWiseData.js";



function App() {
    return (
        <Router>
            <>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <MainPage />
                    </Route>
                    <Route path="/emergency" exact>
                        <EmergencyContact />
                    </Route>
                    <Route path="/state/:stateCode" exact>
                        <DistrictWiseData />
                    </Route>
                    
                </Switch>
            </>
        </Router>
    );
}

export default App;
