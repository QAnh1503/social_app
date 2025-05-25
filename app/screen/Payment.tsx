import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { Image, Modal, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { View, Platform, Text } from 'react-native';

export default function Payment() {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}