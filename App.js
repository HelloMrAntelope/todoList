import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform } from 'react-native';
import Task from './components/Task';
import ThemeSelector from './components/ThemeSelector';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [task, setTask] = useState('');
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim()) {
      Keyboard.dismiss();
      setActiveTasks([...activeTasks, { id: Date.now(), text: task, isFavorite: false }]);
      setTask('');
    } else {
      alert("Please enter a task!");
    }
  };

  const completeTask = (taskId) => {
    const taskToComplete = activeTasks.find((item) => item.id === taskId);
    if (taskToComplete) {
      setActiveTasks(activeTasks.filter((item) => item.id !== taskId));
      setCompletedTasks([...completedTasks, { ...taskToComplete, isCompleted: true }]);
    }
  };

  const unCompleteTask = (taskId) => {
    const taskToMoveBack = completedTasks.find((item) => item.id === taskId);
    if (taskToMoveBack) {
      setCompletedTasks(completedTasks.filter((item) => item.id !== taskId));
      setActiveTasks([...activeTasks, { ...taskToMoveBack, isCompleted: false }]);
    }
  };

  const deleteTask = (taskId, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks(completedTasks.filter((item) => item.id !== taskId));
    } else {
      setActiveTasks(activeTasks.filter((item) => item.id !== taskId));
    }
  };

  const editTask = (taskId, newText, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks(completedTasks.map((item) => (item.id === taskId ? { ...item, text: newText } : item)));
    } else {
      setActiveTasks(activeTasks.map((item) => (item.id === taskId ? { ...item, text: newText } : item)));
    }
  };

  const toggleFavorite = (taskId, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks(completedTasks.map((item) => (item.id === taskId ? { ...item, isFavorite: !item.isFavorite } : item)));
    } else {
      setActiveTasks(activeTasks.map((item) => (item.id === taskId ? { ...item, isFavorite: !item.isFavorite } : item)));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks:</Text>
          <View style={styles.items}>
            {activeTasks
              .sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0)) // Sort active tasks by favorite
              .map((item) => (
                <Task
                  key={item.id}
                  text={item.text}
                  isCompleted={false}
                  isFavorite={item.isFavorite}
                  onComplete={() => completeTask(item.id)}
                  onDelete={() => deleteTask(item.id, false)}
                  onEdit={(newText) => editTask(item.id, newText, false)}
                  onFavorite={() => toggleFavorite(item.id, false)}
                />
              ))}
          </View>
          
          {completedTasks.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Completed tasks:</Text>
              <View style={styles.items}>
                {completedTasks.map((item) => (
                  <Task
                    key={item.id}
                    text={item.text}
                    isCompleted={true}
                    isFavorite={item.isFavorite}
                    onComplete={() => unCompleteTask(item.id)}
                    onDelete={() => deleteTask(item.id, true)}
                    onEdit={(newText) => editTask(item.id, newText, true)}
                    onFavorite={() => toggleFavorite(item.id, true)}
                  />
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <KeyboardAvoidingView 
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100}
       style={styles.writeTaskWrapper}>
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
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation, route }) => ({
          headerStyle: { backgroundColor: '#06B6F5' },
          headerTintColor: '#FFF',
          headerTitleStyle: { fontSize: 20 },
          headerRight: () => 
            route.name === 'Home' ? (
              <TouchableOpacity
              onPress={() => navigation.navigate('Themes')}
              style={styles.themeButton}
            >
              <Text style={styles.themeButtonText}>Themes</Text>
            </TouchableOpacity>
          ) : null,    
        })}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Themes" component={ThemeSelector} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
  },
  tasksWrapper: {
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#06B6F5',
    marginTop: 20,
  },
  items: {
    marginTop: 10,
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
  
  themeButtonText: {
    marginRight: 15,
    padding: 5,
    color: '#FFF',
    fontSize: 20,
  },
});
