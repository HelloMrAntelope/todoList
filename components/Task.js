import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.text || '');

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const saveEditedTask = () => {
    setIsEditing(false);
    props.onEdit(editedText);
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

        <TouchableOpacity onPress={props.onDelete}>
          <View style={styles.rectangular}></View>
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
  rectangular: {
    width: 15,
    height: 15,
    backgroundColor:'#171717',
    borderColor: '#FF0004',
    borderWidth: 1.5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 20,
    color: '#FFF',
    paddingRight: 10,
  },
  editInput: {
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 5,
    width: '50%',
  },
});

export default Task;


