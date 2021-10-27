import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'

import { updateDocument, updateProfile, uploadImage } from '../../Utils/actions'
import { loadImageFromGallery } from '../../Utils/helpers'

export default function InfoUser({ user, setLoading, setLoadingText}) {
    const [photoUrl, setPhotoUrl] = useState(user.photoURL)
    const changePhoto = async() => {
        const result = await loadImageFromGallery([1, 1])
        if (!result.status) {
           return 
        }
        setLoadingText("Actualizando imagen...")
        setLoading(true)
        const resultUploadImage = await uploadImage(result.image, "avatars", user.uid)
        if (!resultUploadImage.statusResponse) {
            setLoading(false)
            Alert.alert("Ha ocurrido un error al cargar la foto de subir")
            return
        }
        const resultUpdateProfile = await updateProfile({ photoURL: resultUploadImage.url})
        setLoading(false)
        if (resultUpdateProfile.statusResponse) {
            setPhotoUrl(resultUploadImage.url)
        }else{
            Alert.alert("Ha ocurrido un error al actualizar la foto de subir")
        }
    }
    return (
        <View style={styles.container}>
           <Avatar
                rounded
                size='large'
                onPress={changePhoto}
                containerStyle={styles.avatar}
                source={
                    photoUrl ? {uri: photoUrl} : require("../../assets/avatar-default.jpg")
                }
           />
           <View style={styles.infoUser}>
               <Text style={styles.displayName}>
                   {
                       user.displayName ? user.displayName : "Anonimo"
                   }
               </Text>
               <Text>
                   {user.email}
               </Text>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor:"#f9f9f9",
        paddingVertical:30
    },
    infoUser: {
        marginLeft:20
    },
    displayName: {
        fontWeight:'bold',
        paddingBottom:5
    }
})
