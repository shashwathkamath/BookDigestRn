import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";



const HomeScreen = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'https://9776-2600-1001-a00b-9a64-e153-7b62-b22f-a28a.ngrok-free.app';

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${BASE_URL}/books`); //this will change everytime new instance of api is created
            const data = await response.json();
            setBooks(data);
            console.log("Data ---> ", data);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false); // Set loading to false after the fetch, whether it succeeds or fails
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
                    <View style={{ marginBottom: 16, padding: 8, borderWidth: 1, borderRadius: 4 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                        <Text>{item.author}</Text>
                        <Text>{item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default HomeScreen;