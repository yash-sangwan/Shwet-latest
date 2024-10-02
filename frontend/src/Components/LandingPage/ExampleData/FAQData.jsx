const categories = [
    { id: 1, name: "React" },
    { id: 2, name: "Java" },
    { id: 3, name: "Python" },
  ];
  
const react = [{id:1 , data:[
{ id:"1", question: "What is React?", answer: "React is a JavaScript library for building user interfaces, particularly single-page applications." },
{ id:"2", question: "What are React hooks?", answer: "Hooks are functions that let you use state and other React features in functional components." },
{ id:"3", question: "What is JSX?", answer: "JSX is a syntax extension that allows you to write HTML inside JavaScript." },
{ id:"4", question: "What is the Virtual DOM?", answer: "The Virtual DOM is a lightweight in-memory representation of the real DOM that React uses to update the UI efficiently." },
{ id:"5", question: "How do you pass data between components?", answer: "Data is passed between components using props for parent-to-child communication and state management techniques for deeper communication." },
]}];

const java = [{id:2 , data:[
{ id:"6",  question: "What is Java?", answer: "Java is a high-level, object-oriented programming language used for building applications." },
{ id:"7",  question: "What is the JVM?", answer: "The JVM (Java Virtual Machine) is a virtual machine that runs Java bytecode, allowing Java applications to be platform-independent." },
{ id:"8",  question: "What are Java exceptions?", answer: "Exceptions are events that occur during the execution of programs that disrupt the normal flow of instructions." },
{ id:"9",  question: "What is a class in Java?", answer: "A class is a blueprint for creating objects and defining object behavior." },
{ id:"10", question: "What are access modifiers in Java?", answer: "Access modifiers (public, private, protected) define the visibility and accessibility of classes, methods, and variables." },
]}];

const python = [{id:3 , data:[
{ id:"11", question: "What is Python?", answer: "Python is a high-level, interpreted programming language known for its simplicity and readability." },
{ id:"12", question: "What is a Python list?", answer: "A list in Python is a collection of ordered, mutable items that can contain different data types." },
{ id:"13", question: "What is a Python dictionary?", answer: "A dictionary in Python is a collection of key-value pairs where each key must be unique." },
{ id:"14", question: "What are Python decorators?", answer: "Decorators are functions that modify the behavior of other functions or methods." },
{ id:"15", question: "What is PEP 8?", answer: "PEP 8 is the style guide for writing Python code, promoting readability and consistency." },
]}];

export { categories, react, java, python};