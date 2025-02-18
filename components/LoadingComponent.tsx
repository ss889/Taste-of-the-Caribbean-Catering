import React from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';

const LoadingIndicator: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </Modal>
  );
};

export default LoadingIndicator;
