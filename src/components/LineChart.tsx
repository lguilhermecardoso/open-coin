import React from 'react';
import { Text } from "native-base";
import { Dimensions, View } from "react-native";
import Svg, { Polyline } from "react-native-svg";

interface LineChartProps {
  data: number[];
}

export function LineChart({ data }: LineChartProps) {
  if (data.some(value => !isFinite(value))) {
    console.warn('Invalid data value detected:', data);
    return null;
  }

  const height = 200;
  const width = Dimensions.get('window').width;
  const verticalPadding = 20;
  const horizontalPadding = 20;

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const valueRange = maxValue - minValue;

  
  if (valueRange === 0) {
    const y = height / 2;
    const points = data
      .map((value, index) => {
        const x = data.length > 1 ? (index / (data.length - 1)) * (width - horizontalPadding * 2) + horizontalPadding : width / 2;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <View>
        <Svg height={height} width={width}>
          <Polyline points={points} fill="none" stroke="white" strokeWidth="2" />
        </Svg>
      </View>
    );
  }

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * (width - horizontalPadding * 2) + horizontalPadding;
      const y = ((value - minValue) / valueRange) * (height - verticalPadding * 2);
      return `${x},${height - y - verticalPadding}`;
    })
    .join(' ');

  return (
    <View>
      {data.length > 1 && (
        <Text color="white.100" fontSize="xs">
          Preço Atual: {Number(data[data.length - 1]).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </Text>
      )}
      <Svg height={height} width={width}>
        <Polyline points={points} fill="none" stroke="white" strokeWidth="2" />
      </Svg>
    </View>
  );
};
