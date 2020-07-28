// sends data to DB
// retrieves data from DB

// getFavs is an axios get request to get data from db
export const getFavs = (axios) => {
  return axios.get('localhost:8080/fav');
};
// link with show favs button so when a user clicks button it renders a list of 'fav synonyms'

// postFavs is an axios post request to post data to db
// link with onClick fn so when a user clicks a synonym is gets added to db

// create a fn that will delete all data from db
// destroy/delete?
