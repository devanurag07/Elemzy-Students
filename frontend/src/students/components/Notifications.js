import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { clearNotifications } from "../actions/classroomActions";
import { useSnackbar } from "notistack";

const Notifications = () => {
  const notifications = useSelector((state) => state.classroom.notifications);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (notifications.length >= 1) {
      for (let notification of notifications) {
        enqueueSnackbar(notification.msg, notification.options);
      }

      clearNotifications();
    }
  }, [notifications]);

  return <div></div>;
};

export default Notifications;
