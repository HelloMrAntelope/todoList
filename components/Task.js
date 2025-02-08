import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.text || '');
  const [deletePressed, setDeletePressed] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const saveEditedTask = () => {
    setIsEditing(false);
    props.onEdit(editedText);
  };

  const handleDeletePress = () => {
    setDeletePressed(true); // Change to gray when pressed
    setTimeout(() => {
      setDeletePressed(false); // Reset to red after short delay
      props.onDelete(); // Actually delete the task
    }, 200); // Adjust delay as needed (200ms)
  };

  return (
    <View style={[styles.item, props.isFavorite ? styles.itemFavorite : null]}>
      <View style={styles.itemLeft}>
        <TouchableOpacity
          style={[styles.circle, props.isCompleted ? styles.circleCompleted : null]}
          onPress={props.onComplete}
        >
          {props.isCompleted ? <Text style={styles.checkmark}>✔</Text> : null}
        </TouchableOpacity>

        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editedText}
            onChangeText={setEditedText}
            onBlur={saveEditedTask}
            autoFocus
          />
        ) : (
          <TouchableOpacity onPress={toggleEditing} style={styles.textContainer}>
            <Text style={[styles.itemText, props.isCompleted ? styles.itemTextCompleted : null]}>
              {editedText}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={props.onFavorite}>
          <Text style={styles.star}>{props.isFavorite ? '★' : '☆'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeletePress} style={styles.deleteButton} activeOpacity={0.6}>
            <Text style={[styles.icon, { color: deletePressed ? '#808080' : '#FF0004' }]}>
                ❌
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#06B6F5',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemFavorite: {
    backgroundColor: '#FFD700',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#171717',
    borderColor: '#FFF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleCompleted: {
    backgroundColor: '#00C853',
    borderColor: '#00C853',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 18,
    color: '#FFF',
    flexShrink: 1,
  },
  itemTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#5E5E5E',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 5, // Adjust spacing
    padding: 5, // Adds better clickability
  },
  icon: {
    fontSize: 15,
  },
  star: {
    fontSize: 25,
    color: '#FFF',
    paddingRight: 5,
  },
  editInput: {
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 5,
    width: '50%',
  },
});

export default Task;


