import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import BouncyCheckBox from 'react-native-bouncy-checkbox';

// Schema Validation
import * as Yup from 'yup';
const PasswordSchema = Yup.object().shape({
  passwordlength: Yup.number()
    .min(4, 'should be min of 4 characters')
    .max(16, 'should be max of 16 characters')
    .required('* Length is required'),
});

export default function App() {
  // use States
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordlength: number) => {
    let charList = '';

    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (upperCase) {
      charList += upperCase;
    }
    if (lowerCase) {
      charList += lowerCase;
    }
    if (numbers) {
      charList += numbers;
    }
    if (specialChars) {
      charList += specialChars;
    }

    const password = createPassword(passwordlength, charList);

    // states
    setPassword(password);
    setIsPassGenerated(true);
  };

  const createPassword = (passwordlength: number, characters: string) => {
    let result = '';
    for (let i = 0; i < passwordlength; i++) {
      const charIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(charIndex);
    }
    return result;
  };
  const resetPassword = () => {
    // Resetting states
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordlength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values);

              generatePasswordString(Number(values.passwordlength));
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,

              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWraper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.inputHeading}>Password length :</Text>
                    {touched.passwordlength && errors.passwordlength && (
                      <Text style={styles.error}>{errors.passwordlength}</Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordlength}
                    onChangeText={handleChange('passwordlength')}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputWraper}>
                  <Text style={styles.inputHeading}>Include lowercase</Text>
                  <BouncyCheckBox
                    isChecked={lowerCase}
                    onPress={() => {
                      setLowerCase(!lowerCase);
                    }}
                    fillColor="#29ab87"
                  />
                </View>
                <View style={styles.inputWraper}></View>
                <View style={styles.inputWraper}></View>
                <View style={styles.inputWraper}></View>

                <View style={styles.formActions}>
                  <TouchableOpacity>
                    <Text>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {},
  formContainer: {},
  title: {},
  inputWraper: {},
  formActions: {},
  inputColumn: {},
  inputHeading: {},
  error: {},
  inputStyle: {},
});
