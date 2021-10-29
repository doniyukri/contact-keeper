import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alert.length > 0 &&
    alertContext.alert.map((item) => (
      <div key={item.id} className={`alert alert-${item.type}`}>
        <i className="fas fa-info-circle" /> {item.msg}
      </div>
    ))
  );
};

export default Alerts;
