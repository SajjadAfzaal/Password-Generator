import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

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
  const [numbers, useNumbers] = useState(false);
  const [symbols, useSymbols] = useState(false);

  const generatePasswordString = (passwordlength: number) => {};
  const createPassword = (passwordlength: number, characters: string) => {
    let result = '';
    for (let i = 0; i < passwordlength; i++) {
      const charIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(charIndex);
    }
    return result;
  };
  const resetPassword = () => {};

  return (
    <View>
      <Text>Password Generator</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
