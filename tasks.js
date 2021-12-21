
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
}

let tasks = ['Shop', 'Read Books', 'Paint the walls'];
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
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if (text.trim().split(" ")[0] === 'hello\n') {
    hello("");
  }
  else if (text.trim().split(" ")[0] === 'hello' && text.split(" ")[1] !== []) {
    hello(text.trim().split(" ").slice(1).join(',').replace(',', ' '));
  }
  else if (text === 'help\n') {
    help();
  }
  else if (text === 'list\n') {
    list();
  }
  else if (text.trim().split(" ")[0] === 'add' && text.split(' ')[1] !== []) {
    add(text.trim().split(' ').slice(1).join(',').replace(',', ' '));
  }
  else if (text.trim().split(" ")[0] === 'remove' && text.split(' ')[1] !== []) {
    remove(text.trim().split(' ')[1])
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
  if (name) {
    console.log(`hello ${name}!`)
  }
  else {
    console.log('hello!')
  }
}


/**
 * Lists all the tasks
 * 
 * @returns {void}
 */

function list() {
  tasks.map((x, index) => {
    console.log(`${index + 1}- ${x}`);
  })
}


/**
 * Adds a task to the list of tasks
 * 
 * @returns {void}
 * @param {string} task the task we want to add to the list 
 */
function add(task) {
  tasks.push(task)
  list();
}

/**
 * Removes a task from the list of tasks 
 * 
 * @returns {void}
 * @param {string} n removes the nth element from the list. If n is not passed, it removes the last element
 */
function remove(index) {
  if (index) {
    tasks.splice(index - 1, 1);
  }
  else
    tasks.pop();
  list();
}

/** 
lists all the possible commands
@returns {void}
*/
function help() {
  console.log('The command line you can use are:\nhello\nhello "your name"\nadd "task"\nremove\nremove "index"\nquit, exit\nhelp\n');
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
