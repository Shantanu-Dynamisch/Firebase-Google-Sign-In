import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Google configuration
  GoogleSignin.configure({
    webClientId:
      '267138314311-lqv58fd8466dvnkdkf0bfsd4mvjbb2t5.apps.googleusercontent.com',
  });

  const googleSignIn = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);

    user_sign_in
      .then(user => {
        console.log('SignIn With Google..', user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const googleSignOutt = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(error=>{
          console.log(error);
      })
  };

  return (
    <View style={styles.body}>
      <ImageBackground
        source={require('./image/bgImage.jpg')}
        resizeMode="cover"
        style={styles.imgBackground}>
        <View style={{marginTop:480}}>
        <Text style={styles.heading}>Google Sign-In</Text>
        <Text style={styles.heading1}>Using Firebase</Text>

          <TouchableOpacity style={styles.btn} onPress={googleSignIn}>
            <Text style={styles.btnText}>Google Sign-In</Text>
          </TouchableOpacity>
          {/* <Text style={styles.heading2}>Welcome {user.email}</Text> */}
          <TouchableOpacity style={styles.btn} onPress={googleSignOutt}>
            <Text style={styles.btnText}>Sign-Out</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
  },
  heading: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 40,
    fontWeight:'bold',
  },
  heading1:{
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 40,
    fontWeight:'bold',
    marginBottom: 20,

  },
  heading2: {
    color: 'orange',
    marginBottom: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'blue',
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    marginTop: 20,
  },
  btn: {
    width: 350,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'white',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius:50,
  },
  btnText: {
    color: 'orange',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
