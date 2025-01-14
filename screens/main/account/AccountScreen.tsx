import { BASE_URL } from '@env'; // Import BASE_URL
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { getUserData } from '../utils/StorageUtils';

const AccountScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('Set Address');
    const [paymentMode, setPaymentMode] = useState('');
    const [booksSold, setBooksSold] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState('$0');
    const [profilePic, setProfilePic] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = async () => {
        setIsLoading(true);
        try {
            const savedProfile = await getUserData(); // Fetch user data from storage or API
            if (savedProfile) {
                setName(savedProfile.name || '');
                setEmail(savedProfile.email || '');
                setProfilePic(savedProfile.photo || null);
            }
            const response = await axios.get(`${BASE_URL}/users/${savedProfile?.id}`);
            const userData = response.data.user;
            setContactNumber(userData.contactNumber || '');
            setAddress(userData.address || '');
            console.log('User data:', userData);
        } catch (error) {
            Alert.alert('Error', 'Failed to load profile data.');
            console.error('Error loading profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveProfile = async () => {
        if (!name || !email || !contactNumber) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        setIsLoading(true);
        try {
            // Assuming we have userId from auth context or storage
            const userId = await getUserData(); // Add this if not already present

            const response = await axios.put(`${BASE_URL}/users/${userId}/update`, {
                name,
                email,
                contactNumber,
                address,
                paymentMode
            });

            console.log('Profile updated:', response.data);
            Alert.alert('Success', response.data.message);
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert(
                'Error',
                (error as any).response?.data?.message || 'Failed to update profile'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Parent container to allow floating button outside of ScrollView
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                {/* Profile Information Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profile Information</Text>
                    <View style={styles.profileContainer}>
                        <TouchableOpacity style={styles.profilePicContainer}>
                            <Image
                                source={
                                    profilePic
                                        ? { uri: profilePic }
                                        : require('../../assets/images/pp.png') // Default placeholder image
                                }
                                style={styles.profilePic}
                            />
                        </TouchableOpacity>
                        <View style={styles.profileDetails}>
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                placeholderTextColor="#555556"
                                value={name}
                                onChangeText={(text) => setName(text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#555556"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter contact number"
                                placeholderTextColor="#555556"
                                value={contactNumber}
                                onChangeText={(text) => setContactNumber(text)}
                                keyboardType="phone-pad"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your delivery address"
                                placeholderTextColor="#555556"
                                value={address}
                                onChangeText={(text) => setAddress(text)}
                            />
                        </View>
                    </View>
                </View>

                {/* Activity Tracking Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Activity Tracking</Text>
                    <View style={styles.activityRow}>
                        <Text>Books Sold: {booksSold}</Text>
                        <Text>Total Earnings: {totalEarnings}</Text>
                    </View>
                    <Button title="View Sold Books" onPress={() => console.log('View Sold Books')} />
                    <Button title="View Listed Books" onPress={() => console.log('View Listed Books')} />
                </View>

                {/* Payment Mode Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Mode</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Payment Mode"
                        placeholderTextColor="#555556"
                        value={paymentMode}
                        onChangeText={(text) => setPaymentMode(text)}
                    />
                    <Button title="Update Payment Mode" onPress={() => console.log('Payment Mode Updated')} />
                </View>

                {/* Notifications & Security Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    <Button title="Change Password" onPress={() => console.log('Change Password')} />
                    <Button title="Notification Preferences" onPress={() => console.log('Notification Preferences')} />
                    <Button title="Privacy Settings" onPress={() => console.log('Privacy Settings')} />
                </View>

                {/* Help & Support Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Help & Support</Text>
                    <Button title="Contact Support" onPress={() => console.log('Contact Support')} />
                    <Button title="View FAQs" onPress={() => console.log('View FAQs')} />
                </View>
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab} onPress={saveProfile}>
                <Text style={styles.fabText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePicContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
        marginRight: 20,
        backgroundColor: '#ddd', // Background color for the placeholder
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePic: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
    },
    profileDetails: {
        flex: 1,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    activityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007AFF',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Android shadow
        elevation: 5,
    },
    fabText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AccountScreen;
