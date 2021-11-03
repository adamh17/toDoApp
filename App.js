import React, { useState } from 'react';
import { Alert, Keyboard, ScrollView, KeyboardAvoidingView, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native';
import Task from './components/Task';
import * as Notifications from 'expo-notifications';
import { AntDesign } from '@expo/vector-icons';

export default function App() {

  const [toDo, setToDo] = useState();
  const [toDoItems, setToDoItems] = useState([]);

  const [hour, onChangeText] = useState("");
  const [minute, onChangeText2] = useState("");

  const [overlayIsOn, setOverlayOn] = useState(false);

  // will set a time for a reminder notification for a to do item
  const onSubmit = (reminder, hours, minutes) => {
    Keyboard.dismiss();

    // don't set a reminder if the user has not entered any time
    // this will stop them recieving reminders at midnight (00:00) as the hours and minutes
    // values will be 0 if left blank
    var ifReminder = (hours == 0 && minutes == 0 ? ifReminder=false : ifReminder=true)
    if (ifReminder){
      const schedulingOptions = {
        content: {
          title: "Reminder",
          // Reminder message will be the to do list item
          body: reminder,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          // Send the reminder based on the specified hours and minutes from the user
          hour: hours, minute: minutes, repeats: false,
        },
      };
    
      Notifications.scheduleNotificationAsync(
        schedulingOptions,
      );
    };
  }

  const addToDo = () => {
    Keyboard.dismiss();
    // add the new to do to whatever number of to dos are in the array already
    // task will only be added if the user has entered something in the input box
    // otherwise they will recieve an alert telling them to do so
    var empty = (toDo === null ? empty = false : empty = true);

    if (empty===true){
      setToDoItems([...toDoItems, toDo])
      setToDo(null);
      onChangeText(null);
      onChangeText2(null);

    } else{
      Alert.alert(
        "Hey!",
        "Please enter a to do item before hitting me :)",
        [
          {
            text: "Cancel"
          },
          {text: "Got It"}
        ]
      );
    }
  }

  const removeToDo = (index) => {
    // remove the to do item we tap on
    let itemsCopy = [...toDoItems];
    itemsCopy.splice(index, 1);
    setToDoItems(itemsCopy);
  }

  function toggleOverlay() {
    if (overlayIsOn) {
      setOverlayOn(false);
    } else{
      setOverlayOn(true);
    }
  }


  let currentDate = getDate();
  
  return (
    <View style={overlayIsOn ? styles.changeBackground : styles.container}>

    <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
      
      {/* Title up top*/}
      <View style={styles.toDoWrapper}>
        <Text style={styles.sectionTitle}>To Do Today</Text>
        <Text style={styles.date}>{currentDate.day + "/" + currentDate.month + "/" + currentDate.year}</Text>
        <View style={styles.items}>
            {/* Tasks will be printed from an array here */}
            {
              toDoItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => removeToDo(index)}>
                    <Task text={item}></Task>
                  </TouchableOpacity>
                )
              })
            }
        </View>
      </View>
      </ScrollView>

      {overlayIsOn ?
      <View style={styles.ccc}>
        <View style={styles.overlay}>
          <View style={styles.buttonStyle}>
          <Pressable style={styles.button} onPress={() => {addToDo(); onSubmit(toDo, Number(hour), Number(minute));}}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
            </View>
            <View style={styles.timerContainer}>
                <View style={styles.reminder}>
                <Text style={styles.reminderText}>Set a Reminder :</Text>
                </View>
                <View style={styles.hours}>
                    <TextInput
                    onChangeText={onChangeText}
                    value={hour}
                    placeholder="Hour"
                    style={styles.timerText}
                    keyboardType="numeric"
                    />
                <View style={styles.minutes}>
                    <TextInput
                    onChangeText={onChangeText2}
                    value={minute}
                    placeholder="Minute"
                    style={styles.timerText}
                    keyboardType="numeric"
                    />
                </View>
                </View>
            </View>
            <KeyboardAvoidingView behaviour={"height"} style={styles.writeTaskWrapper}>
                <TextInput style={styles.input} placeholder={"Add a To Do..."} value={toDo} onChangeText={text => setToDo(text)}></TextInput>
            </KeyboardAvoidingView>
        </View>
        </View>
        
        : null}

      {/* This is the code for adding a toDo and reminder */}
      {/* To Do Input */}
      <View>
        <KeyboardAvoidingView behaviour={"height"} style={styles.writeTaskWrapper}>
          <TouchableOpacity onPress={() => toggleOverlay()}>
            <View style={styles.addToDoWrapper}>
              <Text><AntDesign name="plus" size={18} color="black"/></Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
  },

  changeBackground: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.9)",
  },

  toDoWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  date: {
    textDecorationLine: 'underline',
  },

  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },

  addToDoWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },

  // Styling for reminder items
  timerContainer: {
    flexDirection: "row",
    paddingRight: 50,
  },

  reminder: {
    justifyContent: 'center',
    textAlign:'center',
    paddingTop: 30,
  },

  reminderText: {
    paddingLeft: 10,
    paddingRight: 25,
    fontWeight: 'bold',
    color: "#000000",
    paddingTop: 30,
  },

  timerText: {
    fontSize: 15,
    flexDirection: 'row',
    paddingTop: 30,
    },

  hours: {
    flexDirection: 'row',
    paddingTop: 30,
    
  },

  minutes: {
    paddingLeft: 20,
    flexDirection: 'row',
  },

  overlay: {
    // backgroundColor: 'rgba(78, 205, 196, 0.5)',
    backgroundColor: "#E8E8E8",
    paddingBottom: 180,
    width: "90%",
    borderRadius: 5,
  },

  ccc: {
    justifyContent: 'center',
    alignItems: "center",
    paddingBottom: 110,
  },

  buttonStyle: {
    alignItems: "center",
    paddingTop: 10,
  },

  button: {
    backgroundColor: 'black',
    width: "30%",
    paddingVertical: 12,
    elevation: 3,
    borderRadius: 5,
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.55,
  }
});

// get the current date whenever the user opens the app
function getDate() {
  let _now = new Date();
  return {
    month: _now.getMonth() + 1,
    day: _now.getDate(),
    year: _now.getFullYear()
  }
}