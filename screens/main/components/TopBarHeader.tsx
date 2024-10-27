import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Animated, Image, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../../../App';

// Importing the image
const beeImage = require('../../assets/images/image.png');
const profileImage = require('../../assets/images/pp.png');
type navigationProp = NavigationProp<RootStackParamList, 'Main'>;

const TopBarHeader = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // State to hold search query
    const searchWidth = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<navigationProp>();

    const handleSearchPress = () => {
        if (isSearchActive) {
            Animated.timing(searchWidth, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setIsSearchActive(false));
        } else {
            setIsSearchActive(true);
            Animated.timing(searchWidth, {
                toValue: 200, // Adjust the width based on your design
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    const handleSearchSubmit = () => {
        // Implement your search logic here
        console.log('Searching for:', searchQuery);

        // Optionally hide the keyboard after submission
        Keyboard.dismiss();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                {/* Left Container - App Name or Icon */}
                <View style={styles.leftContainer}>
                    {!isSearchActive ? (
                        <Text style={styles.headerTitle}>BookB</Text>
                    ) : (
                        <Image source={beeImage} style={styles.headerIcon} />
                    )}
                </View>

                {/* Right Container - Search and Profile Icons */}
                <View style={styles.rightContainer}>
                    {/* Search Bar */}
                    {isSearchActive && (
                        <Animated.View style={[styles.searchBar, { width: searchWidth }]}>
                            <TextInput
                                placeholder="Search..."
                                style={styles.searchInput}
                                autoFocus
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                onSubmitEditing={handleSearchSubmit} // Trigger search on "return" key press
                                returnKeyType="search" // Changes the return key text to "Search" (optional)
                            />
                        </Animated.View>
                    )}

                    {/* Search Icon Button */}
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
                        <Icon name={isSearchActive ? "times" : "search"} size={20} color="#A8E6CF" />
                    </TouchableOpacity>

                    {/* Profile Icon */}
                    <TouchableOpacity
                        style={styles.profileIcon}
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
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
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
        justifyContent: 'flex-end',
        flex: 1,
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
        borderColor: '#A8E6CF',
        borderRadius: 8,
        paddingHorizontal: 8,
        height: 40,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
    },
});

export default TopBarHeader;