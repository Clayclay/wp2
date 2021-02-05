import React, {useEffect,useRef} from 'react';
import Message from '../Message/Message';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


//Send et set undefined how to receive ? need to be pass as proprieties
// les def ds le chat comp puis ajouter {} ds input
const Messages = ({messages, name, oldMessage  }) => {

  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({
    behavior: "smooth",
    });
};

  useEffect(() => {
   scrollToBottom()
  }, []);

  useEffect(() => {
   scrollToBottom()
  }, [messages,oldMessage  ]);
  
return  (

  <List  >
   {/* scroll and then loop thrue the message for this need to go back to chat.js*/}
  
  {oldMessage.map((message,i)  =>  <ListItem  key={i}><Message message={message}  name={name} /></ListItem >)}

  {messages.map((message,i) => <ListItem key={i}><Message  message={message}   name={name} /></ListItem>)}
{/*   Message separate component need  some parameter */ }
  <ListItem ref={scrollRef} >  </ListItem>
  </List>

)}

export default Messages;