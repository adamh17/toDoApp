import React from "react";
import {View, Text, StyleSheet} from 'react-native';

// A resuable component that will appear on screen when the user adds a to do item
const Task = (props) => {

    return (
        <View style={styles.toDoWrapper}>
            <View style={styles.leftSide}>
                <View style={styles.bulletPoint}></View>
                <Text style={styles.toDotext}>{props.text}</Text>
            </View>
            <View>
                <Text style={styles.rightSide}>X</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    toDoWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#000000',
        marginBottom: 20,
    },

    leftSide: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },

    rightSide: {
        color: '#FF0000',
    },

    bulletPoint: {
        width: 15,
        height: 15,
        backgroundColor: '#2EFF2E',
        opacity: 0.4,
        borderRadius: 15,
        marginRight: 15,
    },

    toDotext: {
        maxWidth: '80%',
    },
})

export default Task;