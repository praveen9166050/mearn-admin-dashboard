import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
function Daily() {
  const [startDate, setStartDate] = useState(new Date("2023-07-01"));
  const [endDate, setEndDate] = useState(new Date("2023-08-01"));
  return (
    <div>Daily</div>
  )
}

export default Daily