import ACTION_TYPES from "../actions";

const initialState = {
  persons: [],
};

const personReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_PERSON:
      return {
        ...state,
        persons: state.persons.concat({
          id: action.payload.id,
          name: action.payload.name,
          age: action.payload.age,
        }),
      };

    case ACTION_TYPES.DELETE_PERSON:
      const updatedPersons = state.persons.filter(
        (person) => person.id !== action.personId
      );
      return {
        ...state,
        persons: updatedPersons,
      };

    default:
      return state;
  }
};

export default personReducer;
