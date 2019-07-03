import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

let ws;

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: { name: "Bob" },
      messages: []
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  openServer() {
    ws = new WebSocket('ws://localhost:3001');
    ws.onopen = () => {
      console.log('connected');
    }
    ws.onmessage = e => {
      const message = JSON.parse(e.data)
    }
  }

  sendMessage(newMessage){
    ws.send(JSON.stringify(newMessage))
    // const messages = this.state.messages.concat(newMessage)
    // this.setState({ messages: messages })
    // console.log(newMessage)
  }

  componentDidMount() {
    this.openServer();
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: "unknown", content: "t͖̩u͉̬̤̻͚rn̻̝̟̖̻͈ͅ ̘̤̝̺̻͖͇a̞̮̪̮̖̥̲r̮͚̺ǒ̿̌̈́̄ṵn̗̦ḏ̖̗̙ͅ" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />,
        <ChatBar currentUser={this.state.currentUser.name} sendMessage={this.sendMessage} />
      </div>
    );
  }
}