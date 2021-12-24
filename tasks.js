let tasks = [
  {
    'task': 'Sleep',
    'done': false,
  },
  {
    'task': 'Read Books',
    'done': true,
  },
  {
    'task': 'Paint the walls',
    'done': false,
  },
];

const fs = require('fs')
let jsonDatabase = "";

if (process.argv[2]===undefined) {
  jsonDatabase = 'database.json';
}
else {
  jsonDatabase = process.argv[2];
}
const saveData = () => {
  try {
    fs.writeFileSync(`${jsonDatabase}`, JSON.stringify(tasks, null, 4))
    console.log("file written successfully");
  } catch (err) {
    console.error(err)
  }
}
const readData = (value) => {
  if (value === 'default') {
    try {
      const data = fs.readFileSync('database.json', 'utf8')
      tasks = JSON.parse(data);
    } catch (err) {
      console.error(err)
    }
  }
  else {
    try {
      const data = fs.readFileSync(`${value}`, 'utf8')
      tasks = JSON.parse(data);
    } catch (err) {
      console.error(err)
    }
  }
}
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
  if (process.argv[2] === undefined)
    readData('default');
  else
    readData(process.argv[2])
}



/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  let text2 = text.trim();
  if (text === 'quit\n' || text === 'exit\n') {
    saveData()
    quit();
  }
  else if (text2.split(" ")[0] === "hello") {
    hello(text2);
  }
  else if (text === 'help\n') {
    help();
  }
  else if (text === 'list\n') {
    list();
  }
  else if (text2.split(" ")[0]=== 'add'){
    add(text2);
  }
  else if (text2.split(" ")[0]==='remove'){
    remove(text2)
  }
  else if (text2.split(" ")[0] === "edit") {
    edit(text2);
  }
  else if (text2.split(" ")[0] === "check") {
    check(text2);
  }
  else if (text2.split(" ")[0] === "uncheck") {
    uncheck(text2);
  }


  else {
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */

function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}


/**
 * Says hello! if you write hello
 * Says hello "your name"! if you write hello "your name"
 *
 * @returns {void}
 * @param {string} name the name to put after hello
 */
function hello(name) {
  if (name === "hello")
    console.log('hello!')
  else
    console.log(`${name}!`)
}


/**
 * Lists all the tasks
 * 
 * @returns {void}
 */

function list() {
  if (tasks !== []) {
    tasks.map((x, index) => {
      if (x.done === false)
        console.log(`[ ] ${index + 1}- ${x.task}`);
      else
        console.log(`[✓] ${index + 1}- ${x.task}`);
    })
  }
  else
    console.log("the list is empty");
}


/**
 * Adds a task to the list of tasks
 * 
 * @returns {void}
 * @param {string} task the task we want to add to the list 
 */

function add(task) {
  if (task.split(' ')[1]){
    tasks.push({
      'task':task.slice(4),
      'done':false
    })
  }
  else
    console.log("please specify what do you want to add");
  list();
}

/**
 * Removes a task from the list of tasks 
 * 
 * @returns {void}
 * @param {string} n removes the nth element from the list. If n is not passed, it removes the last element
 */

function remove (index){
  if (index.split(' ')[1]){
    if (index.split(' ')[1] <= tasks.length)
      tasks.splice(index.split(' ')[1]-1,1)
    else
      console.log("choose a good number")    
  }

  else
    tasks.pop()

  list();
}
/**
 * Edits a the nth task if n is specified.
 * Edits the last task if n is not defined
 * 
 * @returns {void}
 * @param {string} index the index of the task to edit
 */
function edit(index) {
  if (index.length === 4 || index.split(" ")[1] > tasks.length) {
    console.log("Please specify a task to edit");
    list();
  }
  else if (index) {
    if (isNaN(parseInt(index.split(" ")[1]))) {
      tasks[tasks.length - 1].task = index.split(" ")[1];
      list();
    }

    else {
      tasks[index.split(" ")[1] - 1].task = index.split(" ").slice(2).join(' ');
      list();
    }
  }
  // if (isNaN(index.split(" ")[1])){
  //   tasks[tasks.length-1]=(index.slice(5));
  // }
}

/**
 * 
 * Checks the indexed task
 * 
 * @returns {void}
 * @param {index}
 * 
 */
function check(index) {
  if (index.length === 5 || index.split(" ")[1] > tasks.length)
    console.log("Please choose a existing task");
  else
    tasks[index.split(" ")[1] - 1].done = true;
  list()
}

/**
 * 
 * Uncheck the indexed task
 * 
 * @returns {void}
 * @param {index}
 * 
 */
function uncheck(index) {
  if (index.length === 7 || index.split(" ")[1] > tasks.length)
    console.log("Please choose a existing task");
  else
    tasks[index.split(" ")[1] - 1].done = false;
  list()
}
/** 
lists all the possible commands
@returns {void}
*/
function help() {
  console.log('The command line you can use are:\nhello\nhello "your name"\nadd\nadd "task"\nremove\nremove "index"check "index"\nuncheck "index"\nquit, exit\nhelp\n');
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Ibrahim Nour")
