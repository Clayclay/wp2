
          <GridList cellHeight={220} className={classes.gridList} cols={1} >
          {state.users.length > 0 &&  state.users.map(user => (
              <GridListTile  key={user._id.toString()}  component={Link}  onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`} >
                
                  <UsersCard key={user._id.toString()} user={user} />

              </GridListTile>
            ))}
        </GridList>




state.users.length > 0 &&  state.users.map(user => (
    <GridListTile  key={user._id.toString()}  component={Link}  onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`} >
      
        <UsersCard key={user._id.toString()} user={user} />

    </GridListTile>
  ))


///////////////////////

  const LANGUAGES = {
    EN: 'english',
    FR: 'french'
  };
  
  const filterEnglishUsers = user => user.langue === LANGUAGES.EN;
  const filterFrenchUsers = user => user.langue === LANGUAGES.FR;
  
  const languageFilters = {
    [LANGUAGES.EN]: filterEnglishUsers,
    [LANGUAGES.FR]: filterFrenchUsers
  };
  
  const UserList = ({ users }) => {
    const [filter, setFilter] = useState('');
  
    const filteredUsers = !!filter ? users : users.filter(languageFilters[filter]);
  
    return (

        <button onClick={() => setFilter(LANGUAGES.FR)}>
            French
            </button>

      <>
        {filteredUsers.map(user => ....)}
        </>
  );
}


  //////////////////////////


  export const filterArray = (array, filters) => {
    return array.filter((item) => {
      return Object.keys(filters).every((key) => {
        if (typeof filters[key] !== 'function') {
          return true;
        }
        return filters[key](item[key]);
      });
    });
  };