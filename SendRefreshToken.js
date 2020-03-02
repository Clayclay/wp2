 const SendRefreshToken = (res,token) => {

    res.cookie("token", token, {
        httpOnly: true,
      });
    };
 

module.exports = SendRefreshToken;

/* Old res.cookie(token) */ 