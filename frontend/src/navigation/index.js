import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Search, PlusCircle, Activity, Settings } from 'lucide-react-native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MobileInputScreen from '../screens/MobileInputScreen';
import OTPScreen from '../screens/OTPScreen';
import TermsScreen from '../screens/TermsScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import InterestsScreen from '../screens/InterestsScreen';
import InboxScreen from '../screens/InboxScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import HomeScreen from '../screens/HomeScreen';
import LiveScreen from '../screens/LiveScreen';
import SellScreen from '../screens/SellScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BrowseScreen from '../screens/BrowseScreen';
import SubcategoryScreen from '../screens/SubcategoryScreen';
import CategoryLiveScreen from '../screens/CategoryLiveScreen';
import ActivityScreen from '../screens/ActivityScreen';
import PaymentsShippingScreen from '../screens/PaymentsShippingScreen';
import AddressScreen from '../screens/AddressScreen';
import SellerApplicationScreen from '../screens/SellerApplicationScreen';
import SellerStoreScreen from '../screens/SellerStoreScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';
import { COLORS } from '../constants/colors';

import ViewProfileScreen from '../screens/ViewProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import StartLiveScreen from '../screens/StartLiveScreen';
import AddProductScreen from '../screens/AddProductScreen';
import ProductListingsScreen from '../screens/ProductListingsScreen';
import SellerLiveScreen from '../screens/SellerLiveScreen';
import ViewerLiveScreen from '../screens/ViewerLiveScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: COLORS.text,
                tabBarInactiveTintColor: COLORS.textSecondary,
                tabBarStyle: {
                    borderTopColor: COLORS.border,
                    backgroundColor: COLORS.background,
                    paddingTop: 5,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000, // Highest priority
                    elevation: 10, // Android shadow/layer priority
                    height: 60,
                    paddingBottom: 5,
                },
                tabBarIcon: ({ color, size }) => {
                    let IconComponent;
                    if (route.name === 'Home') IconComponent = Home;
                    else if (route.name === 'Categories') IconComponent = Search;
                    else if (route.name === 'Sell') IconComponent = PlusCircle;
                    else if (route.name === 'Activity') IconComponent = Activity;
                    else if (route.name === 'Account') IconComponent = Settings;
                    return <IconComponent color={color} size={size} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Categories" component={BrowseScreen} />
            <Tab.Screen name="Sell" component={SellScreen} />
            <Tab.Screen name="Activity" component={ActivityScreen} />
            <Tab.Screen name="Account" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="MobileInput" component={MobileInputScreen} />
                <Stack.Screen name="OTP" component={OTPScreen} />
                <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: true, title: '' }} />
                <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
                <Stack.Screen name="Interests" component={InterestsScreen} />
                <Stack.Screen name="Inbox" component={InboxScreen} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} />
                <Stack.Screen name="Subcategory" component={SubcategoryScreen} />
                <Stack.Screen name="CategoryLive" component={CategoryLiveScreen} />
                <Stack.Screen name="SellerStore" component={SellerStoreScreen} />
                <Stack.Screen name="SellerApplication" component={SellerApplicationScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} />
                <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
                <Stack.Screen name="Main" component={TabNavigator} />
                <Stack.Screen name="PaymentsShipping" component={PaymentsShippingScreen} />
                <Stack.Screen name="Address" component={AddressScreen} />
                <Stack.Screen name="ViewProfile" component={ViewProfileScreen} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                <Stack.Screen name="StartLive" component={StartLiveScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProductListings" component={ProductListingsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SellerLive" component={SellerLiveScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
                <Stack.Screen name="ViewerLive" component={ViewerLiveScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
                <Stack.Screen
                    name="LiveStream"
                    component={LiveScreen}
                    options={{ presentation: 'fullScreenModal' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
