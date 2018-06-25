import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const configureProject = functions.firestore
    .document('projects/{projectId}').onCreate(snap => {
        const projectCreationRequest = snap.data();
        const defaultProjectThumbnail = 'fiery-cumbuca.appspot.com/projectThumbnails/defaultThumbnail.png';
        if (projectCreationRequest.thumbnail === '' ||
            projectCreationRequest.thumbnail === null ||
            projectCreationRequest.thumbnail === undefined) {
            projectCreationRequest.thumbnail = defaultProjectThumbnail;
        }
        return admin.firestore().collection('projects')
            .doc(projectCreationRequest.Id).set(projectCreationRequest);
    })

export const configureUser = functions.firestore.document('users/{userId}')
    .onCreate(snap => {
        const userCreationRequest = snap.data();
        const defaultProfilePic = "fiery-cumbuca.appspot.com/userProfilePictures/defaultProfile.png";

        if (userCreationRequest.profilePicture === '' ||
            userCreationRequest.profilePicture === null ||
            userCreationRequest.profilePicture === undefined){
            userCreationRequest.profilePicture = defaultProfilePic;
        }

        return admin.firestore().collection("users")
            .doc(userCreationRequest.id).set(userCreationRequest);
    });

export const sendNotification = functions.firestore.document('notifications/{notificationId}')
    .onCreate(async snap => {
        const notification = snap.data();
        const payload = {
            notification: {
                title: notification.type,
                body: notification.message
            }
        }

        const  devicesToNotify: string[] = [];
        const userId = snap.data().userId;
        const devicesRef = admin.firestore().collection('devices')
        .where('userId', '==', notification.userId);
        
        const devices = await devicesRef.get();
        
        devices.forEach(device => {
            devicesToNotify.push(device.data().token)
        });

        return admin.messaging().sendToDevice(devicesToNotify, payload);

        
       
        
    });

export const resizeProfilePic = functions.firestore.document('users/{userId}')
    .onUpdate(async snap =>{
        const dataBefore = snap.before.data();
        const dataAfter = snap.after.data();

        //Checking profile picture modification
        if(dataBefore.profilePicture === dataAfter.profilePicture){
            return;
        }

        const gm = require('gm').subClass({ imageMagick: true });
        const photoFile = dataAfter.profilePicture;

        //Image resizing Options
        const width = 50
        const height = 50
        const option = "!"
        const quality = 90

        if(await admin.storage().bucket().file(photoFile).exists()){

            const file = admin.storage().bucket().file(photoFile);
            let stream = file.createReadStream();
    
            stream.on('error', function(err) {
                console.error(err);
                return;
            })
    
            gm(stream).resize(width, height, option).quality(quality);
                //.stream().pipe()
    
            console.log('Resized file: ' + photoFile);
        }
        else{
            console.log("Couldn't resize image");
        }
    });