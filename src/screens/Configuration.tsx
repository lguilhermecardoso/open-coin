import { ScreenHeader } from '@components/ScreenHeader';
import { Center, Text, VStack } from 'native-base';

export function Configuration() {
  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader title='Configurações' />
    </VStack>
  );
}