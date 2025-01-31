import { firestore } from "src/utils/firebase";
import { FieldValue } from "@react-native-firebase/firestore";

export const addNotification = (usercode, tag, title, contents, date, state) => {
  const userCollection = firestore().collection("users").doc(usercode);
  userCollection.update("notification", FieldValue.arrayUnion(
    {
      tag: tag,
      title: title,
      contents: contents,
      date: date,
      state: state
    }));
}


export const updateNotificationState = async (usercode, id) => {
  const userCollection = firestore().collection("users").doc(usercode);

  try {
    const userDoc = await userCollection.get();

    const data = userDoc.data();
    const notifications = data.notification

    console.log(notifications)

    const updatedNotifications = notifications.map((item, index) => {
      if (index === id) { 
        return { ...item, state: 0 }; 
      }
      return item; 
    });
    
    await userCollection.update({
      notification: updatedNotifications,
    });

    
  }catch (error) {
  console.error("Error updating notification state: ", error);
}
};

