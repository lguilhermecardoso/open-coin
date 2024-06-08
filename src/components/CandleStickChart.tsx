import React from 'react';
import { Dimensions } from "react-native";
import Svg, { G, Line, Rect, SvgProps, GProps } from 'react-native-svg';

interface CandleStickData {
  open: number;
  close: number;
  high: number;
  low: number;
}

interface CandleStickChartProps {
  data: CandleStickData[];
}

export function CandleStickChart({ data }: CandleStickChartProps) {
  const { width } = Dimensions.get('window');
  const candleWidth = width / data.length;

  const normalizeY = (value: number, min: number, max: number, height: number): number => {
    if (min === max) return height / 2;
    return ((value - min) / (max - min + 0.0001)) * height; 
  };

  if (data.length === 0) {
    return null;
  }

  const yValues = data.flatMap((d) => [d.high, d.low]).filter(isFinite);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  if (!isFinite(minY) || !isFinite(maxY) || minY === maxY) {
    return null;
  }

  return (
    <Svg height={200} width={width}>
      {data.map((d, index) => {
        if (!isFinite(d.open) || !isFinite(d.close) || !isFinite(d.high) || !isFinite(d.low)) {
          return null; 
        }
        const open = normalizeY(d.open, minY, maxY, 200);
        const close = normalizeY(d.close, minY, maxY, 200);
        const high = normalizeY(d.high, minY, maxY, 200);
        const low = normalizeY(d.low, minY, maxY, 200);
        
        if (!isFinite(open) || !isFinite(close) || !isFinite(high) || !isFinite(low)) {
          console.warn('Invalid value detected in candlestick data:', { open, close, high, low });
          return null;
        }

        
        if (open === Infinity || close === Infinity || high === Infinity || low === Infinity) {
          console.warn('Infinity value detected in candlestick data:', { open, close, high, low });
          return null;
        }

        return (
          <G key={index as number}>
            <Line
              x1={index * candleWidth + candleWidth / 2}
              y1={200 - high}
              x2={index * candleWidth + candleWidth / 2}
              y2={200 - low}
              stroke="black"
            />
            <Rect
              x={index * candleWidth}
              y={200 - Math.max(open, close)}
              width={candleWidth}
              height={Math.abs(open - close)}
              fill={open > close ? 'red' : 'green'}
            />
          </G>
        );
      })}
    </Svg>
  );
};
