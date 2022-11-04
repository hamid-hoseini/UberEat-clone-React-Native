import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from 'react-redux';



const styles = StyleSheet.create({
    menuItemStyle: {
      flexDirection: "row",
      justifyContent: "space-between",
      //alignContent: "space-around",
      margin: 20
    },
  
    titleStyle: {
      fontSize: 19,
      fontWeight: "600",
    },
  });


  

export default function MenuItems({ restaurantName, foodsList, hideCheckbox, marginLeft }) {
  const foods = foodsList ? foodsList : [
    {
      title: "Lasagna",
      description: "With butter lettuce, tomato and sauce bechamel",
      price: "$13.50",
      image:
        "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
    },
    {
      title: "Tandoori Chicken",
      description:
        "Amazing Indian dish with tenderloin chicken off the sizzles 🔥",
      price: "$19.20",
      image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
    },
    {
      title: "Chilaquiles",
      description:
        "Chilaquiles with cheese and sauce. A delicious mexican dish 🇲🇽",
      price: "$14.50",
      image:
        "https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg",
    },
    {
      title: "Chicken Caesar Salad",
      description:
        "One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!",
      price: "$21.50",
      image:
        "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
    },
    {
      title: "Lasagna",
      description: "With butter lettuce, tomato and sauce bechamel",
      price: "$13.50",
      image:
        "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
    }
  ];
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) =>
    dispatch(
      checkboxValue
        ? {
            type: "ADD_TO_CART",
            payload: {
              ...item,
              restaurantName: restaurantName,
              checkboxValue: checkboxValue,
            },
          }
        : {
            type: "REMOVE_FROM_CART",
            payload: {
              title: item.title
            },
          }
    );

    const cartItems = useSelector(
      (state) => state.cartReducer.selectedItems.items
    );
  
    const isFoodInCart = (food, cartItems) =>
      Boolean(cartItems.find((item) => item.title === food.title));

    return (
      // <View style={{ borderWidth: 1, borderStyle: "solid", borderColor: "red" , flex: 1, height: "100%"}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {foods.map((item, index) => (
          <View key={index}>
            <View style={styles.menuItemStyle}>
              {hideCheckbox ? (
                <></>
              ) : (
                <BouncyCheckbox
                  iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
                  fillColor="green"
                  isChecked={isFoodInCart(item, cartItems)}
                  onPress={(checkboxValue) => selectItem(item, checkboxValue)}
                />
              )}
              <FoodInfo food={item} />
              <FoodImage food={item} marginLeft={marginLeft ? marginLeft : 0} />
            </View>
            <Divider
              width={0.5}
              orientation="vertical"
              style={{ marginHorizontal: 20 }}
            />
          </View>
        ))}
      </ScrollView>
    );
}

const FoodInfo = (props) => (
    <View style={{ width: "60%", justifyContent: "space-evenly" }}>
      <Text style={styles.titleStyle}>{props.food.title}</Text>
      <Text>{props.food.description}</Text>
      <Text>{props.food.price}</Text>
    </View>
  );
  
  const FoodImage = ({ marginLeft, ...props }) => (
    <View>
      <Image
        source={{ uri: props.food.image }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 8,
          marginLeft: marginLeft,
          marginRight: 20,
        }}
      />
    </View>
  );