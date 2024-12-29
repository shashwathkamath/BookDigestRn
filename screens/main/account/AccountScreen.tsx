import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getUserData } from '../utils/StorageUtils';

const AccountScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('Add Phone Number');
    const [address, setAddress] = useState('Set Address');
    const [paymentMode, setPaymentMode] = useState('');
    const [booksSold, setBooksSold] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState('$0');
    const [profilePic, setProfilePic] = useState<any>(null);

    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = async () => {
        try {
            const savedProfile = await getUserData();
            if (savedProfile) {
                setName(savedProfile.name);
                setEmail(savedProfile.email);
                setProfilePic(savedProfile.photo)
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    };

    return (
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
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Contact Number"
                            value={contactNumber}
                            onChangeText={(text) => setContactNumber(text)}
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});

export default AccountScreen;