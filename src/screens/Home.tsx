import React, { useEffect, useRef, useState } from 'react';
import { Center, Text, View, ScrollView } from 'native-base';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PieChart } from 'react-native-chart-kit';
import { LineChart } from '@components/LineChart';
import { CandleStickChart } from '@components/CandleStickChart';
const BINANCE_WS_BASE_URL = 'wss://stream.binance.com:9443/ws';
const UPDATE_INTERVAL_MS = 2000; // Ajustado para 2 segundos

const PAIRS = ['btcusdt', 'ethusdt', 'bnbusdt', 'xrpusdt', 'adausdt'];

type KlineData = {
  t: number;
  o: string;
  h: string;
  l: string;
  c: string;
};

export function Home() {
  const [lineData, setLineData] = useState<{ x: number; y: number }[]>([]);
  const [candleData, setCandleData] = useState<KlineData[]>([]);
  const lineWs = useRef<WebSocket | null>(null);
  const candleWs = useRef<WebSocket | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [volumeData, setVolumeData] = useState([]);
  const volumeWs = useRef<WebSocket | null>(null);


  useEffect(() => {
    volumeWs.current = new WebSocket(`${BINANCE_WS_BASE_URL}/!ticker@arr`);
    volumeWs.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const filteredData = data.filter((item) => PAIRS.includes(item.s.toLowerCase()));
      const volumeData = filteredData.map((item) => ({
        name: item.s,
        volume: parseFloat(item.v),
      }));
      setVolumeData(volumeData);
    };

    return () => {
      volumeWs.current?.close();
    };
  }, []);

  useEffect(() => {
    lineWs.current = new WebSocket(`${BINANCE_WS_BASE_URL}/btcusdt@trade`);
    lineWs.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newDataPoint = { x: lineData.length + 1, y: parseFloat(data.p) };
      if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          setLineData((prevData) => [...prevData, newDataPoint]);
          timerRef.current = null;
        }, UPDATE_INTERVAL_MS);
      }
    };

    candleWs.current = new WebSocket(`${BINANCE_WS_BASE_URL}/btcusdt@kline_1m`);
    candleWs.current.onmessage = (event) => {
      const data = JSON.parse(event.data).k;
      setCandleData((prevData) => [
        ...prevData,
        {
          t: data.t,
          o: data.o,
          h: data.h,
          l: data.l,
          c: data.c,
        },
      ]);
    };

    return () => {
      lineWs.current?.close();
      candleWs.current?.close();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const pieData = volumeData.map((item, index) => ({
    name: item.name,
    volume: item.volume,
    color: `rgba(131, 167, 234, ${index / PAIRS.length + 0.4})`,
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }));

  const candleChartData = candleData.map((kline) => ({
    date: new Date(kline.t),
    open: parseFloat(kline.o),
    high: parseFloat(kline.h),
    low: parseFloat(kline.l),
    close: parseFloat(kline.c),
  })).filter(kline => isFinite(kline.open) && isFinite(kline.high) && isFinite(kline.low) && isFinite(kline.close));

  const lineDataYValues = lineData.map((point) => point.y);
  if (lineDataYValues.some(value => !isFinite(value))) {
    console.warn('Invalid value detected in line data:', lineDataYValues);
    // handle the error, e.g. by setting a default value or throwing an error
  }
  
  return (
    <Center flex={1} bg="gray.700">
      <SafeAreaView style={{
        margin: 5
      }}>
        <ScrollView>
          <Text color="white.100" fontSize="lg" mb="2">Gráfico de Preços de Bitcoin (Linha)</Text>
          <LineChart data={lineDataYValues} />
          <Text color="white.100" fontSize="lg" mt="4" mb="2">Gráfico de Velas de Bitcoin</Text>
          <CandleStickChart data={candleChartData} />

          <Text color="white.100" fontSize="lg" mb="2">Gráfico de Volumes de Negociação</Text>
          <PieChart
            data={pieData}
            width={Dimensions.get('window').width - 80}
            height={220}
            chartConfig={{
              backgroundColor: '#1e2923',
              backgroundGradientFrom: '#1e2923',
              backgroundGradientTo: '#08130d',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 4,
              },
            }}
            accessor="volume"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </ScrollView>
      </SafeAreaView>
    </Center>
  );
}
