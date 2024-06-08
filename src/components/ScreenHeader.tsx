import { HStack, Heading } from "native-base";

interface ScreenHeaderProps {
  title: string;
}
export function ScreenHeader({title}: ScreenHeaderProps) {
  return (
    <HStack bg="gray.900" pt={16} pb={5} px={4} mb={2} alignItems="center" justifyContent="center">
        <Heading color="gray.100" fontSize="md">{title}</Heading>
    </HStack>
  )
}