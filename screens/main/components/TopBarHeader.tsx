import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../../../App';

// Importing the image
const beeImage = require('../../assets/images/image.png');
const profileImage = require('../../assets/images/pp.png');
type navigationProp = NavigationProp<RootStackParamList, 'Main'>;

const TopBarHeader = ({ }) => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const searchWidth = useRef(new Animated.Value(40)).current;
    const navigation = useNavigation<navigationProp>();

    const handleSearchPress = () => {
        if (isSearchActive) {
            Animated.timing(searchWidth, {
                toValue: 40,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setIsSearchActive(false));
        } else {
            setIsSearchActive(true);
            Animated.timing(searchWidth, {
                toValue: 260,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    const closeSearch = () => {
        Animated.timing(searchWidth, {
            toValue: 40,
            duration: 300,
            useNativeDriver: false,
        }).start(() => setIsSearchActive(false));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                {isSearchActive ? (
                    <Image source={beeImage} style={styles.headerIcon} />
                ) : (
                    <Text style={styles.headerTitle}>BookB</Text>
                )}
                <View style={styles.rightContainer}>
                    {isSearchActive && (
                        <Animated.View style={[styles.searchBar, { width: searchWidth }]}>
                            <TextInput
                                placeholder="Search..."
                                style={styles.searchInput}
                                autoFocus
                            />
                            <TouchableOpacity onPress={closeSearch} style={styles.closeButton}>
                                <Icon name="times" size={16} color="#666" />
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
                        <Icon name="search" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileIcon}
                        onPress={() => navigation.navigate('Account')}
                    >
                        <Image
                            source={profileImage} // Replace with your image URL
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 60,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left',
        color: '#A8E6CF',
        textShadowColor: '#333333',
        letterSpacing: 1.2,
        fontFamily: 'Pacifico',
    },
    headerIcon: {
        width: 30, // Adjust size as needed
        height: 30,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchButton: {
        padding: 8,
    },
    profileIcon: {
        padding: 8,
    },
    image: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        height: 40,
        marginRight: 10,
        marginLeft: 8,
    },
    searchInput: {
        flex: 1,
    },
    closeButton: {
        padding: 4,
    },
});

export default TopBarHeader;