import { React, useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import Header from "./nav";
import StatusRow from "./StatusRow";

export default function Home() {
     const [plants, setPlants] = useState([]);

     useEffect(() => {
          fetchPlants();
          return () => {};
     }, []);

     async function fetchPlants() {
          let response = await fetch("https://localhost:44314/api/plants");
          const plants = await response.json();
          setPlants(plants);
     }
     const divSpace = {
          height: 25,
     };

     return (
          <div className="App">
               <Header className="App-header"></Header>
               <div style={divSpace}></div>
               <Container>
                    <div>
                         <Table striped bordered hover size="sm">
                              <thead>
                                   <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Location</th>
                                        <th>Last Watered</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                   </tr>
                              </thead>

                              {plants.length > 0 && (
                                   <tbody>
                                        {plants.map((plant, i) => {
                                             return <StatusRow data={plant} key={i} rerender={fetchPlants}></StatusRow>;
                                        })}
                                   </tbody>
                              )}
                         </Table>
                    </div>
               </Container>
          </div>
     );
}
