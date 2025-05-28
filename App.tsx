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

  const generatePasswordString = (
    passwordlength: number,
    useLower: boolean,
    useUpper: boolean,
    useNumber: boolean,
    useSymbol: boolean,
  ) => {
    let charList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numericChars = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (useUpper) {
      charList += upperCaseChars;
    }
    if (useLower) {
      charList += lowerCaseChars;
    }
    if (useNumber) {
      charList += numericChars;
    }
    if (useSymbol) {
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
              generatePasswordString(
                Number(values.passwordlength),
                lowerCase,
                upperCase,
                numbers,
                symbols,
              );
              // generatePasswordString(Number(values.passwordlength));
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
                    placeholder="Ex. 4-16"
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
                <View style={styles.inputWraper}>
                  <Text style={styles.inputHeading}>Include uppercase</Text>
                  <BouncyCheckBox
                    isChecked={upperCase}
                    onPress={() => {
                      setUpperCase(!upperCase);
                    }}
                    fillColor="#29ab87"
                  />
                </View>
                <View style={styles.inputWraper}>
                  <Text style={styles.inputHeading}>Include numbers</Text>
                  <BouncyCheckBox
                    isChecked={numbers}
                    onPress={() => {
                      setNumbers(!numbers);
                    }}
                    fillColor="#29ab87"
                  />
                </View>
                <View style={styles.inputWraper}>
                  <Text style={styles.inputHeading}>Include symbols</Text>
                  <BouncyCheckBox
                    isChecked={symbols}
                    onPress={() => {
                      setSymbols(!symbols);
                    }}
                    fillColor="#29ab87"
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    <Text style={styles.primaryBtnText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text style={styles.primaryBtnText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={styles.card}>
            <Text selectable={true} style={styles.result}>
              {password}
            </Text>
            <Text style={styles.description}>Long press to copy</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    marginVertical: 16,
    marginHorizontal: 2,
    flex: 1,
    alignItems: 'center',
  },
  formContainer: {
    marginVertical: 12,
    width: 320,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
  },
  inputWraper: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  inputColumn: {},
  inputHeading: {
    fontSize: 16,
    fontWeight: '500',
  },
  error: {
    color: 'red',
  },
  inputStyle: {},
  primaryBtn: {
    height: 60,
    width: 100,
    backgroundColor: '#a3a0a9',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  card: {
    marginVertical: 16,
    marginHorizontal: 16,
    backgroundColor: '#c8dceb',
    height: 80,
    width: 200,
    borderRadius: 10,
  },
  result: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
  },
});
