import { useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable, ScrollView } from 'react-native';

export default function App() {
  const inputFieldRef = useRef<TextInput | null>(null);

  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [finishedGoals, setFinishedGoals] = useState<string[]>([]);
  const [isDisabled, setDisabledTo] = useState<boolean>(false);

  function goalInputHandler(enteredText: string) {
    setEnteredGoalText(enteredText);
    setDisabledTo(goals.includes(enteredText));
  };

  function addGoalHandler() {
    console.log("Goal: " + enteredGoalText);
    setGoals(goals => [...goals, enteredGoalText]);
    inputFieldRef.current?.clear();
  };

  function toggleGoalFinish(goal: string) {
    if (finishedGoals.includes(goal)) {
      setFinishedGoals(finishedGoals.filter(goalItem => goalItem != goal));
    } else {
      setFinishedGoals(goals => [...goals, goal]);
    }
  };

  return (
    <View style={styles.appContainer}>
      <Text style={styles.titleText}>Add Goal</Text>
      <View style={styles.inputContainer}>
        <TextInput ref={inputFieldRef} style={styles.textInput} placeholder='Goal' onChangeText={goalInputHandler}/>
        <Button disabled={isDisabled} title='Add Goal' onPress={addGoalHandler} />
      </View>
      <View style={styles.goalContainer}>
        <Text>List of goals:</Text>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {goals.map((goal) =>
            <Pressable key={goal} onPress={() => toggleGoalFinish(goal)}>
              <Text style={[styles.listElement, finishedGoals.includes(goal)?styles.finishedGoal:styles.unfinishedGoal]}>{goal}</Text>
            </Pressable>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
  titleText: {
    fontSize: 32,
    paddingBottom: 16
  },
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
  goalContainer: {
    flex: 5,
    paddingTop: 8
  },
  listElement: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 16
  },
  listelement2: {
    fontSize: 24,
    borderRadius: 34
  },
  finishedGoal: {
    backgroundColor: '#23d289ff',
    color: '#000000'
  },
  unfinishedGoal: {
    backgroundColor: '#773232ff',
    color: '#ffffff'
  },
  scrollView: {

  }
});
