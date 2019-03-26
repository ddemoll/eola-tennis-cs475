import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
   View,
   Image,
   Text,
   StyleSheet
 } from 'react-native';

 import styles from '../Containers/Styles/AddAnnounceStyle'

 /**
Allows user to select an image. Can give initial prop of selectedImage if trying to update image

 */

 class ImageSelector extends Component {

   getPhotos = () => {

       var ImagePicker = require('react-native-image-crop-picker').default;
       ImagePicker.openPicker({
         width: 640,
         height: 640,
         cropping: true,
         mediaType: 'photo'
       }).then(image => {

         this.props.done({
           [this.props.editScreen ? 'newSelectedImage' : 'selectedImage']: {
             type: image.mime,
             uri: image.path
           }
         })

       });

   }

   render () {

     const { selectedImage, newSelectedImage } = this.props;

     let imageBtn = null;

       let image_uri = null

       if(newSelectedImage != null) {
         image_uri = newSelectedImage.uri
       } else if(selectedImage != null){
         image_uri = selectedImage.uri
       }

         return <TouchableWithoutFeedback onPress={this.getPhotos}>

         {
         (selectedImage == null && newSelectedImage == null) ? (
             <View style={styles.addImageContainer}>

               <Text style={styles.addImageTitle}>Upload Photo</Text>
             </View>
           ) : (
               <Image
                 style={styles.addImageContainer}
                 source={{ uri: image_uri}}
               />
             )
         }
         </TouchableWithoutFeedback>


 }
}

   export default ImageSelector
