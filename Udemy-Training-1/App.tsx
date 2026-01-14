import { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { GoalItem } from './Components/GoalItem';
import { GoalInput } from './Components/GoalInput';

export default function App() {
  const [goals, setGoals] = useState<string[]>([]);
  const [finishedGoals, setFinishedGoals] = useState<string[]>([]);

  function validator(text: string): boolean {
    const isValid = !goals.includes(text)
    return isValid
  }

  function addGoalHandler(goal: string) {
    setGoals(goals => [...goals, goal]);
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
      <Image style={{ height: 100, width: 100, alignItems: "center", justifyContent: "space-between"}} source={require('./assets/icon.png')} />
      <Text style={styles.titleText}>Add Goal</Text>
      <GoalInput isValid={validator} onAddGoal={addGoalHandler}/>
      <View style={styles.goalContainer}>
        <Text>List of goals:</Text>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {goals.map((goal) =>
            <GoalItem key={goal} goal={goal} isFinished={finishedGoals.includes(goal)} onTap={toggleGoalFinish}/>
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
  goalContainer: {
    flex: 5,
    paddingTop: 8
  },
  scrollView: {

  }
});
