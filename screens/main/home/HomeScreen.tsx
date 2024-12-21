import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Book } from "../types/Book";
import { NavigationProp } from "../types/NavigationProp";

const HomeScreen = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp>();
    const BASE_URL = 'https://086f-2600-1001-a00c-b48b-41fe-55d2-296e-e434.ngrok-free.app';

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${BASE_URL}/books`);
            const data = await response.json();
            setBooks(data);
            console.log("Data ---> ", data);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <FlatList
                data={books}
                keyExtractor={(item) => item._id} // Ensure that _id is available and unique for each book
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('BookDescription', { book: item })} // Navigate to BookDescription with the book details
                    >
                        <View style={{ marginBottom: 16, padding: 8, borderWidth: 1, borderRadius: 4 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                            <Text>{item.author}</Text>
                            <Text>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default HomeScreen;