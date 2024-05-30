export const initialState = {
    allArticles: [],
    displayedArticles: [],
    isLoading: true,
    errors: null,
    articlesToShow: 10,
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_ARTICLES':
        return {
          ...state,
          allArticles: action.payload,
          displayedArticles: action.payload.slice(0, state.articlesToShow),
          isLoading: false,
        };
      case 'LOAD_MORE_ARTICLES':
        const newArticlesToShow = state.articlesToShow + 10;
        return {
          ...state,
          displayedArticles: state.allArticles.slice(0, newArticlesToShow),
          articlesToShow: newArticlesToShow,
        };
      case 'SET_LOADING':
        return {
          ...state,
          isLoading: action.payload,
        };
      case 'SET_ERROR':
        return {
          ...state,
          errors: action.payload,
          isLoading: false,
        };
      default:
        return state;
    }
  };