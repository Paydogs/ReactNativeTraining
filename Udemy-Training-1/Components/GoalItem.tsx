import { Pressable, StyleSheet, Text } from "react-native";

type GoalItemProps = {
    goal: string,
    isFinished: boolean,
    onTap: (goal: string) => void
};

export function GoalItem(props: GoalItemProps) {
    return (
        <Pressable key={props.goal} onPress={() => props.onTap(props.goal)}>
            <Text style={[styles.listElement, props.isFinished ? styles.finishedGoal : styles.unfinishedGoal]}>{ props.goal }</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    listElement: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 16
    },
    finishedGoal: {
        backgroundColor: '#23d289ff',
        color: '#000000'
    },
    unfinishedGoal: {
        backgroundColor: '#773232ff',
        color: '#ffffff'
    },
});