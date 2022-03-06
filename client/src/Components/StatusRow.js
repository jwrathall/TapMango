import { React, useState, useRef } from "react";
import { Button, Badge } from "reactstrap";

export default function StatusRow(props) {
     //track the toggling of a button
     const [value, setValue] = useState(false);
     //state of action & button: watering, not watering
     const [status, setStatus] = useState(false);
     //watiing message
     const [wait, setWait] = useState(false);
     const [waitTime, setWaitTime] = useState(30);
     const [waterTime, setWaterTime] = useState(10);

     //time and duration vars
     const reWaterThreshold = 6;
     const restPeriod = 30000;
     const wateringDuration = 10000;
     const timer = useRef(null);

     /* 
        Watering is a 10 second cycle but can be stopped, only after completing the cycle will the db be updated.
        There is a 30 second rest period between waterings.
     */
     const waterClickHandler = async (e, plant, toggleAction) => {
          let lastWatered = new Date(plant.lastWatered);
          let timeDifference = Math.abs((new Date() - lastWatered) / 1000); //in seconds

          if (timeDifference <= restPeriod / 1000) return;

          let action = toggleAction;
          setValue(toggleAction);
          setStatus(true);
          if (!action) {
               clearInterval(timer.current);
               setStatus(false);
               timer.current = null;
          } else {
               if (!timer.current) {
                    timer.current = setTimeout(() => {
                         clearInterval(timer.current);
                         clearTimeout(timeout);
                         timer.current = null;
                         setStatus(false);
                         setValue(false);
                         setWaterTime(10);
                         WateringUpdate(plant.id);
                    }, wateringDuration);

                    let timeout = setInterval(updateWaterTime, 1000);

                    function updateWaterTime() {
                         setWaterTime((t) => t - 1);
                    }
               }
          }
     };
     const WateringUpdate = async (id) => {
          const requestOptions = {
               method: "PUT",
               headers: { "Content-Type": "application/json" },
          };
          await fetch("https://localhost:44314/api/plants/" + id + "", requestOptions);
          setStatus(false);
          setWaitPeriod();
          props.rerender(); //refresh Plants
     };

     const setWaitPeriod = () => {
          setWait((e) => !e);
          let waitTimer = setTimeout(() => {
               clearTimeout(timeout);
               clearInterval(waitTimer);
               setWait((e) => !e);
               setWaitTime(30);
          }, restPeriod);

          let timeout = setInterval(updateTime, 1000);

          function updateTime() {
               setWaitTime((t) => t - 1);
          }
     };

     return (
          <tr>
               <td>{props.data.id}</td>
               <td>{props.data.name}</td>
               <td>{props.data.location}</td>
               <td>{props.data.lastWatered}</td>
               <td>
                    <span>
                         {(new Date() - new Date(props.data.lastWatered)) / 3600000 > reWaterThreshold ? (
                              <Badge color="warning">Needs Water</Badge>
                         ) : (
                              <Badge color="success">All Good</Badge>
                         )}
                    </span>
                    <span>&nbsp;{wait && <Badge color="warning">Water in {waitTime}</Badge>}</span>
               </td>
               <td>
                    <Button
                         variant="primary"
                         size="sm"
                         color={!status ? "success" : "danger"}
                         disabled={wait}
                         outline
                         onClick={(e) => waterClickHandler(e, props.data, !value)}
                    >
                         {!status ? "Water Now" : "Stop Watering " + waterTime + ""}
                    </Button>
               </td>
          </tr>
     );
}
