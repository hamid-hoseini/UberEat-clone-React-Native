let defaultState = {
    selectedItems: { items: [], restaurantName: ""}
};

let cartReducer = (state = defaultState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case "ADD_TO_CART": {
            //newState = { ...state };
            newState.selectedItems = {
                items: [ ...newState.selectedItems.items, action.payload],
                restaurantName: action.payload.restaurantName, 
                checkboxValue: action.payload.checkboxValue
            };

            break;
        }
        case "REMOVE_FROM_CART": {
            newState.selectedItems = {
                items: [ ...newState.selectedItems.items.filter((item) =>
                    item.title !== action.payload.title 
                    )],
            };
            break;
        }

        default:
            return state;
    }
    console.log(newState, "=>");
    return newState;
};

export default cartReducer;