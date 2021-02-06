const handleSelectLang = (selectlang, e) => {
    e.preventDefault(); 

    fetch (`http://localhost:5000/api/user/${id}/langs` ,
        { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`
        },
        body: 
        JSON.stringify({selectlang})
      })      
      .then(res => {
        if (res.ok) {
          return res.json();
        }
          throw res;   
      })
      .then(resJson => {
        dispatch({ 
          type: ACTION_TYPES.USER_INPUT_CHANGE,
          payload: resJson
        })  
        setOpen(true);
      });
  };  