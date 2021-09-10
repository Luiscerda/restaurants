import React, { useState} from 'react'
import { Input, Button, Icon } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import { useNavigation} from '@react-navigation/native'
import { isEmpty } from 'lodash'

import Loading from '../Loading'
import { validateEmail } from '../../Utils/helpers'
import { loginWithEmailAndPassword } from '../../Utils/actions'

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
       
    }

    const doLogin = async() =>{
        if (!validateData()) {
            return;
        }

        setLoading(true)
        const result = await loginWithEmailAndPassword(formData.email, formData.password)
        setLoading(false)
        if (!result.statusResponse) {
            setErrorEmail(result.error)
            setErrorPassword(result.error)
            return
        }
        navigation.navigate("account")
    }

    const validateData = () => {
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true

        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes de ingresar un email valido.")
            isValid = false
        }

        if (isEmpty(formData.password)) {
            setErrorPassword("Debes de ingresar una contraseña.")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.container}>
             <Input
                containerStyle={styles.input}
                placeholder="Ingrese un email..."
                onChange={(e) => {onChange(e,"email")}}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingrese su contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => {onChange(e,"password")}}
                errorMessage={errorPassword}
                defaultValue={formData.password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        style={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }               
            />
             <Button
                title="Iniciar Sesion"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doLogin()}
            />
            {
                loading &&
                <Loading
                    isVisible={loading}
                    text="Iniciando Sesion..."
                />
            }
            
        </View>
    )
}

const defaultFormValues = () => {
    return {email: "", password :""}
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30
    },
    input:{
        width:"100%"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#442484"
    },
    icon: {
        color: "#c1c1c1"
    }
})
