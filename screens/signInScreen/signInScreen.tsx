import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Button, View } from "react-native";


const SignInScreen = () => {

    GoogleSignin.configure({
        webClientId: 'AIzaSyATF9m_ubB5C5a32rooBBhoqbXaWWiFLWo', // obtained from Google API Console
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        scopes: ['profile', 'email'] // what API you want to access on behalf of the user, default is email and profile
    });
    const signIn = async () => {
        console.log("inside sign in button");
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // Handle sign-in success
            console.log(userInfo);
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // User cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // Operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // Play services not available or outdated
            } else {
                // Some other error happened
            }
        }
    };

    return <View>
        <Button title="Sign in with Google" onPress={signIn} />
    </View>
}

export default SignInScreen;