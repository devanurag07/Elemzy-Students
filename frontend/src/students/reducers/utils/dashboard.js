export const loadDashboardDataRe = (state, action) => {
  const dashboard_data = action.payload;

  return { ...state, dashboard_data };
};
