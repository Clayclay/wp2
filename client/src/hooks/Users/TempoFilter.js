import React, { useState, useEffect } from "react";


const data = [
  {
    nickname: "bu",
    languages: [
      {
        langue: "french"
      },
      {
        langue: "english"
      }
    ]
  },
  {
    nickname: "ma",
    languages: [
      {
        langue: "deutch"
      },
      {
        langue: "english"
      }
    ]
  },
  {
    nickname: "lucie",
    languages: [
      {
        langue: "thai"
      }
    ]
  },
  {
    nickname: "za",
    languages: [
      {
        langue: "french"
      },
      {
        langue: "Spanish"
      }
    ]
  },
  {
    nickname: "My favorite case",
    languages: ["all", "french", "english"]
  },
];

const Filter = ( )  => {

  const [filter, setFilter] = useState(null);  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(data);
  }, []);





  useEffect(() => {
    setUsers([]);
    const filtered = data.map((p) => ({
      ...p,
      //filtered: p.languages.includes(filter) => Basic
      filtered: p.languages.filter((el) => el.langue === filter).length > 0
    }));
    setUsers(filtered);
  }, [filter]);

  return (
    <div className="App">
      <div className="users__labels">
        <a
          href="/#"
          active={filter === "english"}
          onClick={() => setFilter("english")}
        >
          English
        </a>
        <a
          href="/#"
          active={filter === "french"}
          onClick={() => setFilter("french")}
        >
          French
        </a>
        <a
          href="/#"
          active={filter === "thai"}
          onClick={() => setFilter("thai")}
        >
          Thai
        </a>
        <a
          href="/#"
          active={filter === "spanish"}
          onClick={() => setFilter("spanish")}
        >
          Spanish
        </a>
      </div>

      <div className="users__container">

   

        {users.map((item) =>
          item.filtered === true ? 
            <span key={item.nickname}>{item.nickname}</span>
           : ""
        )}
      </div>
    </div>
  );
}

export default Filter;
