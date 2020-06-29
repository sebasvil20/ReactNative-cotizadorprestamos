import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  YellowBox,
} from 'react-native';
import colors from './src/utils/colors';
import Form from './src/components/Form';
import Footer from './src/components/Footer';
import ResultCalculation from './src/components/ResultCalculation';

YellowBox.ignoreWarnings(['Picker has been extracted']);

export default function App() {
  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [month, setMonth] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (capital && interest && month) calculate();
    else reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capital, interest, month]);

  const calculate = () => {
    reset();
    if (!capital) {
      setErrorMessage('Añade la cantidad que quieres solicitar');
    } else if (!interest) {
      setErrorMessage('Añade el interes hdp');
    } else if (!month) {
      setErrorMessage('Selecciona los meses a pagar');
    } else {
      const i = interest / 100;
      const fee = capital / ((1 - Math.pow(i + 1, -month)) / i);
      setTotal({
        monthlyFee: fee.toFixed(2).replace('.', ','),
        totalPayable: (fee * month).toFixed(2).replace('.', ','),
      });
    }
  };

  const reset = () => {
    setErrorMessage('');
    setTotal(null);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background} />
        <Text style={styles.titleApp}>Cotizador de Prestamos</Text>
        <Form
          setCapital={setCapital}
          setInterest={setInterest}
          setMonth={setMonth}
        />
      </SafeAreaView>

      <ResultCalculation
        errorMessage={errorMessage}
        capital={capital}
        interest={interest}
        month={month}
        total={total}
      />
      <Footer calculate={calculate} />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height: 290,
    alignItems: 'center',
  },
  titleApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    zIndex: -1,
  },
});
