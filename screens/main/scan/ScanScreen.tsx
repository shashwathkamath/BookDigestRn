import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Dimensions, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const ScanScreen = () => {
    const [isbn, setIsbn] = useState<string | null>(null);
    const [bookDetails, setBookDetails] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [enableScanning, setEnableScanning] = useState(true);
    const [bookDescription, setBookDescription] = useState<string>(''); // State for book description
    const [listingPrice, setListingPrice] = useState<string>(''); // State for listing price
    const isFocused = useIsFocused();
    const device = useCameraDevice('back');

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermission();
            if (cameraPermission === 'denied') {
                console.warn('Camera permission denied');
            }
        })();
    }, []);

    const handleBarcodeScanned = useCallback(async (scannedIsbn: string) => {
        if (!scannedIsbn || scannedIsbn === isbn) return;

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
            setBookDetails(null);
        } finally {
            setLoading(false);
        }
    }, [isbn]);

    const codeScanner = useCodeScanner({
        codeTypes: ['ean-13'],
        onCodeScanned: (codes) => {
            if (enableScanning && codes.length > 0) {
                const scannedIsbn = codes[0]?.value;
                if (scannedIsbn) {
                    setEnableScanning(false);
                    handleBarcodeScanned(scannedIsbn);
                }
            }
        },
    });

    const resetScan = () => {
        setIsbn(null);
        setBookDetails(null);
        setBookDescription(''); // Reset the book description
        setListingPrice(''); // Reset the listing price
        setEnableScanning(true);
    };

    const postBookDetails = () => {
        // Function to handle posting book details to the server or performing an action
        console.log('Book details posted:', {
            isbn,
            bookDetails,
            description: bookDescription,
            price: listingPrice,
        });
    };

    const handleListingPriceChange = (value: string) => {
        // Allow only 4 digits
        if (/^\d{0,4}$/.test(value)) {
            setListingPrice(value);
        }
    };

    if (!device) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            {!isbn ? (
                <>
                    <View style={styles.cameraContainer}>
                        <Text style={styles.instructions}>Scan the ISBN of the book</Text>
                        {isFocused && (
                            <Camera
                                style={styles.camera}
                                device={device}
                                isActive={true}
                                codeScanner={codeScanner}
                            />
                        )}
                    </View>
                </>
            ) : loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.bookDetailsContainer}>
                    <FlatList
                        data={[
                            { key: 'Title', value: bookDetails?.title || 'Book not found' },
                            { key: 'Author', value: bookDetails?.authors?.join(', ') || 'Unknown' },
                            { key: 'Publisher', value: bookDetails?.publisher || 'Unknown' },
                            { key: 'Pages', value: bookDetails?.pages || 'Unknown' },
                            { key: 'Market Price', value: bookDetails?.msrp || 'Not Available' },
                        ]}
                        renderItem={({ item }) => (
                            <View style={styles.detailRow}>
                                <Text style={styles.detailKey}>{item.key}:</Text>
                                <Text style={styles.detailValue}>{item.value}</Text>
                            </View>
                        )}
                        ListFooterComponent={() => (
                            <>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailKey}>Listing Price:</Text>
                                    <TextInput
                                        style={[styles.textInput, styles.listingPriceInput]}
                                        placeholder="Enter price"
                                        value={listingPrice}
                                        onChangeText={handleListingPriceChange}
                                        keyboardType="numeric"
                                        maxLength={4}
                                    />
                                </View>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.descriptionLabel}>Describe Book Condition:</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="e.g., Torn pages, folded cover, markings"
                                        value={bookDescription}
                                        onChangeText={setBookDescription}
                                        multiline
                                        numberOfLines={4}
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button title="Scan Another Book" onPress={resetScan} />
                                    <Button title="Post" onPress={postBookDetails} />
                                </View>
                            </>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    cameraContainer: {
        height: SCREEN_HEIGHT * 0.2, // 20% of the screen height
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    camera: {
        ...StyleSheet.absoluteFillObject,
    },
    instructions: {
        fontSize: 16,
        marginBottom: 10,
    },
    bookDetailsContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center', // Center items vertically
        marginVertical: 4, // Adjusted to reduce vertical spacing
    },
    detailKey: {
        fontWeight: 'bold',
        flex: 1,
        marginRight: 5
    },
    detailValue: {
        flexShrink: 1,
        flex: 2,
    },
    descriptionContainer: {
        marginTop: 20,
    },
    descriptionLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    textInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        height: 35, marginRight: 150,
        textAlignVertical: 'top',
    },
    listingPriceInput: {
        width: 80, // Adjust width to fit 4-digit input
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default ScanScreen;