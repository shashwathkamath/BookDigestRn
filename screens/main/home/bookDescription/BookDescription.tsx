import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BookDescription = ({ route }: any) => {
    const { book } = route.params; // Assuming book details are passed as params

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Extended Image Section */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: book.imageUrl }} style={styles.bookImage} />
            </View>

            {/* Book Details Section */}
            <View style={styles.detailsContainer}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.author}>by {book.author}</Text>

                {/* Seller Information */}
                <View style={styles.sellerInfo}>
                    <Text style={styles.sellerName}>Seller: {book.sellerName}</Text>
                    <Text style={styles.reviews}>Reviews: {book.sellerReviews}/5</Text>
                </View>

                {/* Price Information */}
                <View style={styles.priceContainer}>
                    <Text style={styles.marketPrice}>Market Price: ${book.marketPrice}</Text>
                    <Text style={styles.sellingPrice}>Selling Price: ${book.sellingPrice}</Text>
                </View>

                {/* Book Description */}
                <Text style={styles.sectionHeader}>Description</Text>
                <Text style={styles.description}>{book.description}</Text>

                {/* Other Details */}
                <Text style={styles.sectionHeader}>Other Details</Text>
                <Text style={styles.detailsText}>Pages: {book.pages}</Text>
                <Text style={styles.detailsText}>Language: {book.language}</Text>
                <Text style={styles.detailsText}>Publisher: {book.publisher}</Text>

                {/* Call to Action */}
                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default BookDescription;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    imageContainer: {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    bookImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8,
    },
    detailsContainer: {
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: '#f8f9fa',
    },
    bookTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    author: {
        fontSize: 16,
        color: '#555',
        marginBottom: 16,
    },
    sellerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    sellerName: {
        fontSize: 14,
        color: '#777',
    },
    reviews: {
        fontSize: 14,
        color: '#777',
    },
    priceContainer: {
        marginBottom: 16,
    },
    marketPrice: {
        fontSize: 16,
        textDecorationLine: 'line-through',
        color: '#999',
    },
    sellingPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#e63946',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    description: {
        fontSize: 14,
        color: '#444',
        marginBottom: 16,
    },
    detailsText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    buyButton: {
        backgroundColor: '#1d3557',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});