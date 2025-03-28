import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform, Button, ActivityIndicator } from 'react-native';
import { GoogleGenAI } from "@google/genai";
import Header from './Header';

interface Message {
    text: string;
    sender: 'user' | 'gemini';
    error?: boolean;
}

const Workmaxai = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const apiKey = "gemini-api-key"; // Replace with your actual API key
    const ai = new GoogleGenAI({ apiKey });

    const handleSend = async () => {
        if (inputText.trim() === '') return;

        const newMessage: Message = { text: inputText, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash", // Or "gemini-pro-vision" if needed
                contents: inputText,
            });
            const geminiReply = response.text;
            setMessages((prevMessages) => [...prevMessages, { text: geminiReply || '', sender: 'gemini' }]);
        } catch (error) {
            console.error('Error fetching Gemini reply:', error);
            setMessages((prevMessages) => [...prevMessages, { text: 'Error fetching reply', sender: 'gemini', error: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <View className="flex-1 bg-[#313638]">
                <Header />
                <ScrollView
                    className="flex-1 p-2"
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                >
                    {messages.map((message, index) => (
                        <View
                            key={index}
                            className={`p-2 rounded-lg mb-2 max-w-[80%] ${message.sender === 'user' ? 'bg-[#4a5568] self-end' : 'bg-[#2d3748] self-start'} ${message.error ? 'bg-[#e53e3e]' : ''}`}
                        >
                            <Text className="text-white">{message.text}</Text>
                        </View>
                    ))}
                    {isLoading && <ActivityIndicator size="large" color="#ffffff" />}
                </ScrollView>
                <View className="flex-row items-center p-2 mb-2">
                    <TextInput
                        className="flex-1 border border-[#6b7280] rounded-full p-2 mr-2 text-white"
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Type something..."
                        placeholderTextColor="#a0a0a0"
                    />
                    <Button title="Send" onPress={handleSend} color="#ffffff" />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Workmaxai;
