import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

const ScanScreen = () => {
    const [isbn, setIsbn] = useState<string | null>(null);
    const [bookDetails, setBookDetails] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused(); // To check if the screen is focused
    const device = useCameraDevice('back'); // Access the back camera

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermission();
            if (cameraPermission === 'denied') {
                console.warn('Camera permission denied');
            }
        })();
    }, []);

    const handleBarcodeScanned = async (scannedIsbn: string) => {
        if (!scannedIsbn || scannedIsbn === isbn) return; // Prevent redundant scans

        setIsbn(scannedIsbn);
        setLoading(true);

        try {
            const response = await axios.get(`https://api2.isbndb.com/book/${scannedIsbn}`, {
                headers: {
                    'Authorization': 'YOUR_API_KEY', // Replace with your ISBNdb API key
                },
            });
            setBookDetails(response.data.book);
        } catch (error) {
            console.error('Failed to fetch book details:', error);
        } finally {
            setLoading(false);
        }
    };

    // Configure the useCodeScanner hook
    // const codeScanner = useCodeScanner({
    //     codeTypes: ['ean-13', 'qr'], // Include EAN-13 for ISBNs
    //     onCodeScanned: (codes) => {
    //         console.log("Codes", codes);
    //     }
    // });

    // Check if permissions are not granted or device is not ready
    if (!device) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            {!isbn ? (
                <>
                    <Text style={styles.instructions}>Scan the ISBN of the book</Text>
                    {isFocused && (
                        <Camera
                            style={StyleSheet.absoluteFill}
                            device={device}
                            isActive={true}
                        //codeScanner={codeScanner} // Attach the codeScanner directly to the Camera
                        />
                    )}
                </>
            ) : loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.bookDetails}>
                    <Text style={styles.bookTitle}>{bookDetails?.title || 'Book not found'}</Text>
                    <Text>Author: {bookDetails?.authors?.join(', ') || 'Unknown'}</Text>
                    <Text>Publisher: {bookDetails?.publisher || 'Unknown'}</Text>
                    <Text>Pages: {bookDetails?.pages || 'Unknown'}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    instructions: { fontSize: 16, marginBottom: 20 },
    bookDetails: { alignItems: 'center', padding: 20 },
    bookTitle: { fontSize: 18, fontWeight: 'bold' },
});

export default ScanScreen;