import React from "react";
import EmployeeData from "./providers/empdata";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeDetail from "./providers/empDetails";


function App() {
  return (
    <div className="App">
       <BrowserRouter>
                <Routes>
                    <Route 
                      element={<EmployeeData />}
                      path="/"
                    />
                    <Route 
                        element={<EmployeeDetail />} 
                        path="/empDetails" 
                    />
                </Routes>
            </BrowserRouter>
    </div>
  );
}

export default App;
