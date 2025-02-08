import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    if (task.trim()) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, { id: Date.now(), text: task, isFavorite: false, isCompleted: false }]);
      setTask('');
    } else {
      alert("Please enter a task!");
    }
  };

  const completeTask = (taskId) => {
    setTaskItems((prevItems) => prevItems.filter((item) => item.id !== taskId));
  };

  const editTask = (taskId, newText) => {
    setTaskItems((prevItems) =>
      prevItems.map((item) =>
        item.id === taskId ? { ...item, text: newText } : item
      )
    );
  };

  const toggleFavorite = (taskId) => {
    setTaskItems((prevItems) =>
      prevItems.map((item) =>
        item.id === taskId ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const toggleComplete = (taskId) => {
    setTaskItems((prevItems) =>
      prevItems.map((item) =>
        item.id === taskId ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {taskItems
              .sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0)) // Sort tasks by favorites
              .map((item) => (
                <Task
                  key={item.id}
                  text={item.text}
                  isCompleted={item.isCompleted}
                  isFavorite={item.isFavorite}
                  onComplete={() => toggleComplete(item.id)}
                  onDelete={() => completeTask(item.id)}
                  onEdit={(newText) => editTask(item.id, newText)}
                  onFavorite={() => toggleFavorite(item.id)}
                />
              ))}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          placeholderTextColor="#FFF"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#06B6F5',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#606060',
    borderRadius: 60,
    borderColor: '#FFF',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 30,
    backgroundColor: '#606060',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFF',
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 32,
    color: '#FFF',
  },
});
