import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()


     export const createUser = functions.auth.user().onCreate(event => {
    const user = {
        name: event.displayName,
        firstName: "",
        lastName: "",
        photo: event.photoURL,
        role: "",
        city: "",
        state: "",
        country: "",
        bio: ""  
    }
    return admin.firestore().collection('users').doc(event.uid).set(user);
 }); 

    export const helloWorld = functions.https.onRequest((request, response) => {
        response.send("teste");
    });
