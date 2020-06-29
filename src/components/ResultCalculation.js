import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function ResultCalculation(props) {
  const {errorMessage, capital, interest, month, total} = props;
  return (
    <View style={styles.content}>
      {total && (
        <View style={styles.boxResult}>
          <Text style={styles.title}>RESUMEN</Text>
          <DataResult title="Cantidad solicitada" value={`${capital} COP`} />
          <DataResult title="Interes %: " value={`${interest} %`} />
          <DataResult title="Plazos" value={`${month} meses`} />
          <DataResult title="Pago mensual" value={`${total.monthlyFee} COP`} />
          <DataResult
            title="Total a pagar"
            value={`${total.totalPayable} COP`}
          />
        </View>
      )}
      <View>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    </View>
  );
}

function DataResult(props) {
  const {title, value} = props;
  return (
    <View style={styles.value}>
      <Text>{title}</Text>
      <Text>{value} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 40,
  },
  error: {
    textAlign: 'center',
    color: '#f00',
    fontWeight: 'bold',
    fontSize: 20,
  },
  boxResult: {
    padding: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  value: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
