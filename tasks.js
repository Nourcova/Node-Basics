// let tasks = [
//   {
//     'task': 'Sleep',
//     'done': false,
//   },
//   {
//     'task': 'Read Books',
//     'done': true,
//   },
//   {
//     'task': 'Paint the walls',
//     'done': false,
//   },
// ];
let tasks = [];
const cmdList = [
  '\x1b[36mhello:\x1b[0m Returns hello!',
  '\x1b[36mhello "your name":\x1b[0m Returns your name!',
  '\x1b[36madd "task":\x1b[0m Adds a task to the TODO list',
  '\x1b[36mremove:\x1b[0m Removes the last task from the TODO list',
  '\x1b[36mremove "index":\x1b[0m Removes the indexed task from the TODO list',
  '\x1b[36medit "new-task":\x1b[0m Edits the last task from the TODO list',
  '\x1b[36medit "index new-task":\x1b[0m Edits the indexed task from the TODO list',
  '\x1b[36mcheck "index":\x1b[0m Checks the indexed task Done',
  '\x1b[36muncheck "index":\x1b[0m Unchecks the indexed task ',
  '\x1b[36mquit\\exit :\x1b[0m Exits the application ',
  '\x1b[36mhelp:\x1b[0m Gives the list of command available',
]
const fs = require('fs')
let jsonDatabase = "";

if (process.argv[2] === undefined) {
  jsonDatabase = 'database.json';
}
else {
  jsonDatabase = process.argv[2];
}
const saveData = () => {
  try {
    fs.writeFileSync(jsonDatabase, JSON.stringify(tasks, null, 4))
    console.log(`file written successfully in ${jsonDatabase}`);
  } catch (error) {
    console.error("error")
  }
}
const readData = (value) => {
  if (value === 'default') {
    try {
      const data = fs.readFileSync('database.json', 'utf8')
      tasks = JSON.parse(data);
    } catch (error) {
      console.error("error")
    }
  }
  else {
    try {
      const data = fs.readFileSync(value, 'utf8')
      tasks = JSON.parse(data);
    } catch (error) {
      console.error("\x1b[33mThis JSON file doesn't exist, start adding tasks to it\x1b[0m")
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
  console.log(`\n------------------------------\nWelcome to ${name}'s application!\nThis is \x1b[33m${jsonDatabase}\x1b[0m database`)
  console.log("------------------------------\n")
  console.log("Type \x1b[34m'help'\x1b[0m to see all the available commands")
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
  if (text2 === 'quit' || text2 === 'exit') {
    saveData();
    quit();
  }
  else if (text2.split(" ")[0] === "hello") {
    hello(text2);
  }
  else if (text2 === 'help') {
    help();
  }
  else if (text2 === 'list') {
    list();
  }
  else if (text2.split(" ")[0] === 'add') {
    add(text2);
  }
  else if (text2.split(" ")[0] === 'remove') {
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
  console.log('unknown command: "' + c.trim() + '"\n')
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
    console.log(`\x1b[33mhello!\x1b[0m\n`)
  else
    console.log(`\x1b[33m${name}!\x1b[0m\n`)
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
        console.log(`${index + 1}: [ ] ${x.task}`);
      else
        console.log(`${index + 1}: [\x1b[32m✓\x1b[0m] ${x.task}`);
    })
  }
  else
    console.log("The list is empty");
  console.log("");
}


/**
 * Adds a task to the list of tasks
 * 
 * @returns {void}
 * @param {string} task the task we want to add to the list 
 */

function add(task) {
  if (task.split(' ')[1]) {
    tasks.push({
      'task': task.slice(4),
      'done': false
    })
    console.log(`The task \x1b[32m${task.slice(4)}\x1b[0m has been \x1b[36madded\x1b[0m successfully`)
  }
  else
    console.log("Please specify what do you want to add");
  list();
}

/**
 * Removes a task from the list of tasks 
 * 
 * @returns {void}
 * @param {string} n removes the nth element from the list. If n is not passed, it removes the last element
 */

function remove(index) {
  if (index.split(' ')[1]) {
    if (index.split(' ')[1] <= tasks.length) {
      console.log(`The task \x1b[31m${tasks[parseInt(index.split(" ").slice(1)) - 1].task}\x1b[0m has been \x1b[36mremoved\x1b[0m successfully`)
      tasks.splice(index.split(' ')[1] - 1, 1)

    }
    else
      console.log("choose a good number")
  }

  else {
    console.log(`The task \x1b[31m${tasks.pop().task}\x1b[0m has been \x1b[36mremoved\x1b[0m successfully`)
  }
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
      let before = tasks[tasks.length - 1].task
      console.log(`The task \x1b[35m${before}\x1b[0m was \x1b[36medited\x1b[0m successfully to \x1b[32m${index.split(" ").slice(1).join(' ')}\x1b[0m`)
      tasks[tasks.length - 1].task = index.split(" ")[1];
      list();
    }

    else {
      let before = tasks[index.split(" ")[1] - 1].task
      console.log(`The task \x1b[35m${before}\x1b[0m was \x1b[36medited\x1b[0m successflully to \x1b[32m${index.split(" ").slice(2).join(' ')}\x1b[0m`);
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
  else {
    let before = tasks[index.split(" ")[1] - 1].task
    if (tasks[index.split(" ")[1] - 1].done === false) {
      console.log(`The task \x1b[32m${before}\x1b[0m was \x1b[36mchecked\x1b[0m successfully`);
      tasks[index.split(" ")[1] - 1].done = true;
    }
    else {
      console.log(`The task \x1b[31m${before}\x1b[0m is alreday \x1b[36mchecked\x1b[0m`);
    }
  }
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
  else {
    let before = tasks[index.split(" ")[1] - 1].task
    if (tasks[index.split(" ")[1] - 1].done === true) {
      console.log(`The task \x1b[32m${before}\x1b[0m was \x1b[36munchecked\x1b[0m successfully`);
      tasks[index.split(" ")[1] - 1].done = false;
    }
    else{
      console.log(`The task \x1b[31m${before}\x1b[0m is alreday \x1b[36munchecked\x1b[0m`);
    }
  }
  list()
}
/** 
lists all the possible commands
@returns {void}
*/
function help() {
  console.log(`The command line you can use are:\n`);
  cmdList.map(
    x => console.log(`${x}`))
  console.log('')
};



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
