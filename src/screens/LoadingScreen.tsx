import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'florayfauna', 'A26kf3ujLhmnPAAGYRWm');
    }
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>Loading data...</Text>
    </View>
  );

}

export default LoadingScreen;