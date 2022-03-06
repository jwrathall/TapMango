import { React, useEffect, useState, useReducer, dispatch } from "react";
import { Container, Button, Table, Toast, ToastHeader, ToastBody } from "reactstrap";
import Header from "./nav";
import StatusRow from "./StatusRow";

export default function Home() {
     const [plants, setPlants] = useState([]);
     //use for the watering button
     const [value, setValue] = useState(false);
     const [statusText, setStatusText] = useState("Water Now");
     const [status, setStatus] = useState(false);
     const [overWater, setOverWater] = useState(false);
     const [groupWater, setGroupWater] = useState([]);

     //  const [items, dispatch] = useReducer((state, action) => {
     //       switch (action.type) {
     //            case "add":
     //                 return [...state, action.index];
     //            case "remove":
     //            // keep every item except the one we want to remove
     //            //return state.filter((_, index) => index != action.index);
     //            default:
     //                 return state;
     //       }
     //  }, []);

     useEffect(() => {
          fetchPlants();
          return () => {};
     }, []);

     async function fetchPlants() {
          let response = await fetch("https://localhost:44314/api/plants");
          const plants = await response.json();
          setPlants(plants);
     }

     //  const checkBoxClickHandler = (id) => {
     //       let group = groupWater;
     //       const found = group.find((elem) => elem === id);
     //       if (found === undefined) {
     //            setGroupWater((prevArray) => [...prevArray, id]);
     //       } else {
     //            const index = group.findIndex((elem) => elem === id);
     //            group.splice(index, 1);
     //            //state.filter((_, index) => index != action.index);

     //            setGroupWater(group);
     //       }
     //  };
     //  const groupWaterClickHandler = async () => {
     //       if (groupWater.length === 0) return;

     //       const requestOptions = {
     //            method: "PUT",
     //            headers: { "Content-type": "application/json; charset=UTF-8" },
     //            body: JSON.stringify(groupWater),
     //       };
     //       await fetch("https://localhost:44314/api/plants", requestOptions);
     //       fetchPlants();
     //  };

     return (
          <div className="App">
               <Header className="App-header">whole new page</Header>
               {/* {items} */}
               <Container>
                    <div>
                         <Table striped bordered hover size="sm">
                              <thead>
                                   <tr>
                                        {/* <th>
                                             <Button color="primary" size="sm" onClick={() => dispatch({ type: "add", index: 1 })}>
                                                  Update All
                                             </Button>
                                             <Button color="primary" size="sm" onClick={() => groupWaterClickHandler()}>
                                                  Update All
                                             </Button>
                                        </th> */}
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
                                             return (
                                                  <StatusRow
                                                       data={plant}
                                                       key={i}
                                                       rerender={fetchPlants}
                                                       //    checkHandler={checkBoxClickHandler}
                                                  ></StatusRow>
                                             );
                                        })}
                                   </tbody>
                              )}
                         </Table>
                    </div>
               </Container>
          </div>
     );
}
