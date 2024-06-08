import { ScreenHeader } from '@components/ScreenHeader';
import { Center, Text, VStack } from 'native-base';

export function MyBalance() {
  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader title='Meu Balanço' />
    </VStack>
  );
}