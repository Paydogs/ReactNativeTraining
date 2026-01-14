import { StyleSheet, View, TextInput, Button } from 'react-native';
import { useRef, useState } from 'react';

type GoalInputProps = {
    isValid: (text: string) => boolean
    onAddGoal: (goal: string) => void
};

export function GoalInput(props: GoalInputProps) {
    // const inputFieldRef = useRef<TextInput | null>(null);
    const [enteredGoalText, setEnteredGoalText] = useState('');
    const [isDisabled, setDisabledTo] = useState<boolean>(false);

    function goalInputHandler(enteredText: string) {
        setEnteredGoalText(enteredText);
        setDisabledTo(!props.isValid(enteredText))
    };

    function addGoal() {
        if (!props.isValid(enteredGoalText)) {
            return; // stop if invalid
        }

        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('')
        // inputFieldRef.current?.clear()
    }

    return (
      <View style={styles.inputContainer}>
        <TextInput /*ref={inputFieldRef}*/ style={styles.textInput} placeholder='Goal' onChangeText={goalInputHandler} value={enteredGoalText}/>
        <Button disabled={isDisabled} title='Add Goal' onPress={ addGoal } />
      </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '70%',
        borderRadius: 16,
        marginRight: 8,
        padding: 8
    },
});