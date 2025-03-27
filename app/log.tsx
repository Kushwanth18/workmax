import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  StyleSheet,
  Image,
  SectionList,
} from "react-native";
import React, { useState } from "react";
import Header from "./Header";

//DB related
import * as SQLite from "expo-sqlite";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { workout } from "@/db/schema";

const log = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight,setWeight] = useState("");

  //DB
  const exposqliteDb = SQLite.openDatabaseSync("workout", {
    enableChangeListener: true,
  });
  const db = drizzle(exposqliteDb);

  const insertWorkout = async (wname, nsets, nreps,weight) => {
    try {
      const currentDate = new Date().toISOString(); // Get the current date in ISO format
      await db.insert(workout).values({
        wname: wname,
        nsets: nsets,
        nreps: nreps,
        date: currentDate,
        weight:weight // Add the current date
      });
      console.log("Workout inserted successfully");
    } catch (e) {
      console.log("Error while inserting ", e);
    }
  };

  const handleSubmit = async () => {
    await insertWorkout(workoutName, sets, reps, weight);
    setWorkoutName("");
    setSets("");
    setReps("");
  };

  const currentDate = new Date().toISOString().split('T')[0];
  const { data:allWorkouts } = useLiveQuery(db.select().from(workout));
  const filteredWorkouts = allWorkouts?.filter((item) => item.date.split('T')[0] === currentDate) || [];
  const sectionedData = [{
    title: currentDate,
    data: filteredWorkouts,
  }];
  return (
    <ScrollView>
    <View className="flex-col items-center bg-[#313638] min-h-full">
      <Header />
      <View className="flex-row justify-start">
        <Text className="text-[#E8E9EB] text-2xl ">
          Date: {currentDate}
        </Text>
      </View>
      <View className="flex-col bg-[#379392] p-10 mt-5 border rounded-3xl w-[300px] justify-center items-center">
        <View className="flex-col justify-center items-center">
          <Text className="text-[#E8E9EB] text-xl">Enter workout Name</Text>
          <TextInput
            className="text-[#E8E9EB] w-[200px] border border-[#E8E9EB] rounded-xl my-3"
            value={workoutName}
            onChangeText={(text) => setWorkoutName(text)}
            selectionColor="white"
          />
        </View>

        <View className="flex flex-row justify-between w-[200px]">
          {/*Sets*/}
          <View className="flex-col justify-center items-center mt-5">
            <Text className="text-[#E8E9EB] text-xl ">Sets</Text>
            <TextInput
              className="text-[#E8E9EB] border border-[#E8E9EB] rounded-xl my-3 w-[50px]"
              value={sets}
              onChangeText={(text) => setSets(text)}
              keyboardType="numeric"
            />
          </View>

          {/*Reps*/}
          <View className="flex-col justify-center items-center mt-5">
            <Text className="text-[#E8E9EB] text-xl ">Reps</Text>
            <TextInput
              className="text-[#E8E9EB] border border-[#E8E9EB] rounded-xl my-3 w-[50px]"
              value={reps}
              onChangeText={(text) => setReps(text)}
              keyboardType="numeric"
            />
          </View>

          {/*Weight*/}
          <View className="flex-col justify-center items-center mt-5">
            <Text className="text-[#E8E9EB] text-xl ">Weight</Text>
            <TextInput
              className="text-[#E8E9EB] border border-[#E8E9EB] rounded-xl my-3 w-[50px]"
              value={weight}
              onChangeText={(text) => setWeight(text)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity onPress={handleSubmit}>
          <Image
            source={require("../assets/images/add_button.png")}
            className="w-10 h-10 items-center mt-5"
          ></Image>
        </TouchableOpacity>
      </View>

      {/*Already uploaded data*/}
      <SectionList
      sections={sectionedData}
      renderItem={({ item }) => (
        <View className="w-[300px] flex-row justify-evenly my-3 border rounded-xl p-5 bg-[#379392]">
          <Text className="text-[#E8E9EB]" >{item.wname}</Text>
          <Text className="text-[#E8E9EB]" >Sets: {item.nsets}</Text>
          <Text className="text-[#E8E9EB]" >Reps: {item.nreps}</Text>
          <Text className="text-[#E8E9EB]" >Weight: {item.weight}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View className="flex justify-center items-center mt-10 text-[#E8E9EB]">
          <Text>{title}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />

    </View>
    </ScrollView>
  );
};

export default log;
