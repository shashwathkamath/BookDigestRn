// BarcodeScanner.tsx
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

interface BarcodeScannerProps {
    onBarcodeScanned: (isbn: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onBarcodeScanned }) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'We need permission to access the camera.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
            } else {
                setHasPermission(true);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                if (Platform.OS === 'ios') {
                    // Assume permission is granted automatically or through system prompts
                    setHasPermission(true);
                } else {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: 'Camera Permission',
                            message: 'We need permission to access the camera.',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        },
                    );
                    setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
                }
            } catch (err) {
                console.error('Failed to request camera permission:', err);
                setHasPermission(false);
            }
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>Requesting camera permission...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <RNCamera
                style={styles.camera}
                captureAudio={false}
                onBarCodeRead={(barcode) => {
                    if (!scanned) {
                        setScanned(true);
                        onBarcodeScanned(barcode.data); // Pass the scanned ISBN to parent
                    }
                }}
                barCodeTypes={[RNCamera.Constants.BarCodeType.ean13]} // ISBN standard
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        width: '80%', // Smaller rectangle width
        height: '30%', // Smaller rectangle height
    },
});

export default BarcodeScanner;