import { Platform } from 'react-native';
import { useTheme } from 'native-base';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeSvg from '@assets/home.svg';
import BalanceSvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';
import { MyBalance } from '@screens/MyBalance';
import { Configuration } from '@screens/Configuration';

type AppRoutes = {
  Home: undefined;
  'Configuração': undefined;
  'Meu Balanço': undefined;
  Perfil: undefined;
}

export type AppNavigationProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSizes = sizes[6];
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.green[300],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[700],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 70,
          paddingTop: sizes[2],
          paddingBottom: sizes[2],
        }
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <HomeSvg fill={color} width={iconSizes} height={iconSizes}/>,
        }}
      />
      <Screen
        name="Meu Balanço"
        component={MyBalance}
        options={{
          tabBarIcon: ({ color }) => <BalanceSvg fill={color} width={iconSizes} height={iconSizes}/>,
        }}
      />
      <Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <ProfileSvg fill={color} width={iconSizes} height={iconSizes}/>,
        }}
      />
      <Screen
        name="Configuração"
        component={Configuration}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="menu" size={iconSizes} color={color} />,
        }}
      />
    </Navigator>
  );
}