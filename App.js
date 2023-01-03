import StackNavigator from "./src/navegator/StackNavigator";

export default function App(){

  const requestUserPermission=async()=>{
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  return (
    <>
      <StackNavigator>
        
      </StackNavigator>
    </>
  );
}