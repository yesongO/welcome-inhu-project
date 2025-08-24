// components/PickerModal.tsx (새 파일)

import { FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type PickerModalProps = {
    visible: boolean;
    data: string[];
    onClose: () => void;
    onSelect: (item: string) => void;
};

export default function PickerModal({ visible, data, onClose, onSelect }: PickerModalProps) {
    return (
    <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
    >
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <SafeAreaView style={styles.container}>
            <View style={styles.pickerContainer}>
            <Text style={styles.title}>학과를 선택해주세요</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => onSelect(item)}
                >
                    <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
                )}
            />
            </View>
        </SafeAreaView>
        </TouchableOpacity>
    </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    },
    container: {
    width: '80%',
    maxHeight: '60%',
    },
    pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    },
    title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    },
    item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    },
    itemText: {
    textAlign: 'center',
    fontSize: 16,
    },
});