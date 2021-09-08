import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'


export default function RegisterForm() {
    return (
        <View style={styles.form}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingrese un email..."
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingrese su contraseña..."
                password={true}
                secureTextEntry={true}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Confirme su contraseña..."
                password={true}
                secureTextEntry={true}
            />
            <Button
                title="Registrar nuevo usuario"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop:30
    },
    input: {
        width:"100%"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#442484"
    }
})
