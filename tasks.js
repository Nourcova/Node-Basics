
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
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
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
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text.trim().split(" ")[0] === 'hello\n'){
    hello("");
  }
  else if(text.trim().split(" ")[0] === 'hello' && text.split(" ")[1] !== []){
    hello(text.trim().split(" ").slice(1).join(',').replace(',',' '));
  }
  else if(text === 'help\n'){
    help();
  }
  else{
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
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello! if you write hello
 * Says hello "your name"! if you write hello "your name"
 *
 * @returns {void}
 * @param {string} name the name to put after hello
 */
function hello(name){
  if (name){
    console.log(`hello ${name}!`)
  }
  else{
    console.log ('hello!')
  }
}


/** 
lists all the possible commands
@returns {void}
*/
function help(){
  console.log ('The command line you can use are:\nhello\nquit, exit\nhelp\n');
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Ibrahim Nour")
