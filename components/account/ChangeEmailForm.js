import { isEmpty } from 'lodash'
import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { validateEmail } from '../../Utils/helpers'

export default function ChangeEmailForm({ email, setShowModal, toastRef, setReloadUser}) {
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = () => {
        if (!validateForm()) {
            return
        }
    }

    const validateForm = () => {
        setErrorEmail(null)
        setErrorPassword(null)
        let isValid = true

        if (!validateEmail(newEmail)) {
            setErrorEmail("Debes ingresar un email valido.")
            isValid = false
        }

        if (newEmail === email) {
            setErrorEmail("Debes ingresar un email diferente al actual.")
            isValid = false
        }

        if (isEmpty(password)) {
            setErrorPassword("Debes ingresar tu contraseña actual.")
            isValid = false
        }

        return isValid
    }
    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa el nuevo correo..."
                containerStyle={styles.input}
                defaultValue={email}
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                keyboardType="email-address"
                rightIcon={{
                    type:"material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
            />
            <Input
                placeholder="Ingresa tu contraseña..."
                containerStyle={styles.input}
                defaultValue={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name= { showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{color: "#c2c2c2"}} 
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Cambiar Email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems:'center',
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        width:"95%"
    },
    btn: {
        backgroundColor: "#442484"
    }
})
