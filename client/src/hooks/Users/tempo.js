

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



  /////////////////






    is it ok to use this one then ? 
const  filtered = users.map((user) => ({
        ...user,
        filtered: user.languages.filter((el) => el.langue === filter).length > 0
      })) ; 
 i dont understand why ""...user"
@Clayclay ...user seems to be spread operator. Where is the users coming from.?
[10:40]
Something like this could help. nested map. 

users.map(user => user...., then when we get to the language, we use map again to map through their languages.)