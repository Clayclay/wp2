

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


///////

const LANGUAGES = {
  EN: 'english',
  FR: 'french'
};
// const filter = (val) => user.langue === languages.en
const filterEnglishUsers = user => user.langue === LANGUAGES.EN;
// function if  one parameter skip the parentheses          equal value and equal type
const filterFrenchUsers = user => user.langue === LANGUAGES.FR;

const languageFilters = {
  [LANGUAGES.EN]: filterEnglishUsers,
  [LANGUAGES.FR]: filterFrenchUsers
};
  
  

  console.log("languageFilters[filter]",languageFilters[filter])
  // user => user.langue === LANGUAGES.FR ou B change car filter = [LANGUAGES.EN]
  console.log("1",filter, "2",filterFrenchUsers,"3",[LANGUAGES.FR])
 // 1 french 2 user => user.langue === LANGUAGES.FR 3 ["french"]
