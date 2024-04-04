

const initialState = () => ({
  breadcrumbs: [
    {
      name: "HOME",
      path: "/",
    },
  ],
});

export const BreadcrumbReducerData = (state = initialState(), action) => {
  switch (action.type) {
    
    default:
      return state;
  }
};
