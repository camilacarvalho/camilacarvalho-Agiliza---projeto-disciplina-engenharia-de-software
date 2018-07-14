import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as gcs from '@google-cloud/storage';
import * as os from 'os';
import * as path from 'path';


const spawn = require('child-process-promise').spawn;
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

export const buildUser = functions.auth.user().onCreate(snap => {
    const user = {
        name: snap.displayName,
        email: snap.email
    }
    //O id do documento que representa o usuario sera dado pelo uid do usuario.
    return admin.firestore().collection("users").doc(snap.uid).create(user);

});    

export const sendNotification = functions.firestore.document('notifications/{notificationId}')
    .onCreate(snap => {

        const notification = snap.data();
        const payload = {
            notification: {
                title: notification.type,
                body: notification.message
            }
        }

        return admin.firestore().collection('devices')
        .where('userId', '==', notification.userId).get().then( devices =>{

            const devicesToNotify = []

            devices.forEach(device =>{
                devicesToNotify.push(device.data().token);
            })
            
            return devicesToNotify;
        }).then( devicesToNotify =>{
            return admin.messaging().sendToDevice(devicesToNotify, payload);
        }).catch( error =>{
            console.log(error);
        })
    
    });

    //Storage function: Resize thumbnails
    exports.onFileChange = functions.storage.object().onFinalize(event =>{

        const bucket = event.bucket;
        const contentType = event.contentType;
        const filepath = event.name;
        console.log('File change detected!! Executing function');
        const destBucket = gcs().bucket(bucket);

        //check if file exists
        if(!destBucket.file(filepath).exists()){
            return false;
        }

        //check if file has been resized
        if(path.basename(filepath).startsWith('resized-')){
            console.log('File already renamed!');
            return true;
        }

        const tmpFilePath = path.join(os.tmpdir(), path.basename(filepath));
        const metadata = {contentType: contentType};

        return destBucket.file(filepath).download({
            destination: tmpFilePath
        }).then(() =>{
            return spawn('convert', [tmpFilePath, '-resize', '500x500', tmpFilePath]);
        }).then(() =>{
            return destBucket.upload(tmpFilePath, {destination: 'resized-' +
             path.basename(filepath), metadata: metadata})
        });
    });

export const criateTaskNotification = functions.firestore.document('tasks/{tasksId}').onCreate(snap => {

    const task = snap.data();
  
    const notificationTask = {
        notification:{
            message: "Nova tarefa recebida: " + task.description,
            projectId: task.projectId,
            seen: false,
            type: "Task notification",
            userId: task.taskKeeper
        }
    }
 
    return admin.firestore().collection('notifications').add(notificationTask);
});

// This will crop square 300x300 px image from the center of the original:
// return spawn('convert', [tempFilePath, '-gravity', 'center', '-crop', `300x300+0+0`, tempFilePath], { capture: ['stdout', 'stderr'] })﻿