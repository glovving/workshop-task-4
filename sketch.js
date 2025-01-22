let myangel;
let intro = false;

//initial yes and no buttons
let yes, no;

//continue flag
let continue_game = true;
let yes_no = false;

//declaring monkey images
let end1monkey1, end1monkey2, end1monkey3, end1monkey4;
let monkeyarray;

//declaring other images
let heaven;

//checkboxes for quiz and quiz answers
let q1, q2, q3, q4;
let checkbox_array;
let answers = [0, 0, 0, 0];
let answers_strings = ["'kind'", "'beautiful'", "'pure'", "'fragrant'"];
let answers_string_print = '';
//button to complete quiz
let quizcomplete;
//calculating score
let calc_quiz_score = false;
//counting quiz score
let count_score = 0;
//seeing if passed
let passed = false;

//user input box and storing
let user_input;
let user_name = '';
let name_submit_button;
let name_submitted = false;

//declaring audio 
let end_song;


function preload(){
  //load angel
  myangel = loadImage("Resources/myangel.png");

  //load monkeys
  end1monkey1 = loadImage("Resources/end1monkey_st.png");
  end1monkey2 = loadImage("Resources/end1monkey2_st.png");
  end1monkey3 = loadImage("Resources/end1monkey3_st.png");
  end1monkey4 = loadImage("Resources/end1monkey4_st.png");
  monkeyarray = [end1monkey1, end1monkey2, end1monkey3, end1monkey4];

 

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // the initial yes or no selection
  yes = createButton("yes");
  no = createButton("no");
  
  yes.position(250, 240);
  no.position(yes.x + yes.width + 10, 240);

  yes.style('z-index', '10');
  no.style('z-index', '10');
  
  
  yes.mousePressed(() =>{
    continue_game = true;
    yes_no = true;
  });
  no.mousePressed(()=>{
    continue_game = false;
    yes_no = true;
  });

  // the quiz check boxes
  q1 = createCheckbox("I am kind.", false);
  q1.position(width/2 + 50, height/2 - 130);
  q2 = createCheckbox("I am beautiful.", false);
  q2.position(width/2 + 50, height/2 - 105);
  q3 = createCheckbox("I am pure.", false);
  q3.position(width/2 + 50, height/2 - 80);
  q4 = createCheckbox("I am fragrant.", false);
  q4.position(width/2 + 50, height/2 - 55);

  //storing in array and hiding until needed
  checkbox_array = [q1, q2, q3, q4];
  hide_checkboxes();

  //button for submitting answers and hiding until needed
  quizcomplete = createButton("complete");
  quizcomplete.position(width/2 + 50, height/2 - 20)

  quizcomplete.mousePressed(() => {
    calc_quiz_score = true;
  })

  quizcomplete.hide();

  //users name input and hiding until needed
  user_input = createInput();
  user_input.position(width/2 + 50, height/2 - 130)
  user_input.hide();

  name_submit_button = createButton("Submit")
  name_submit_button.position(width/2 + 50, height/2 - 105);
  name_submit_button.mousePressed(() => {
    name_submitted = true;
  })
  name_submit_button.hide();

  //loading heaven images
  heaven = loadImage("Resources/heaven.jpg");
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
 if(!yes_no){
  introduction();
 }
 else{
  if(!continue_game){
    end1();
  }
  else{
    if(!calc_quiz_score){
    continue1();}
    else{
      quiz_results();
      if(passed === true){
      success1();}
      else{
        end1();
      }
      }
    }
  }
 }


function introduction(){
  image(myangel, 70, 250, 200, 200);
  text("Hello, I am an angel.\nDo you love me?", 200, 200);

  

  
}

function end1(){
  yes.hide();
  no.hide();
  hide_checkboxes();
  quizcomplete.hide();
  background(240, 239, 225);

  //text to display
  textAlign(CENTER, CENTER);
  textSize(45);
  fill(0);
   text("Please come back when you have more love.", width/2, height/2);
   
  let rand_int = floor(random(0, 100));
  //adjusting the monkey array
  let add_monkeys = [];

  for(let x = 0; x<5; x++){
    //adding a random amount of each image to the array
    let rand_add_amount = floor(random(0, 30));
    for(let x2 = 0; x2< rand_add_amount; x2++){
      
      add_monkeys.push(monkeyarray[x]);
    }
  }
  monkeyarray = monkeyarray.concat(add_monkeys);

  //creating a random collage
  for(let x3 = 0; x3<rand_int; x3++){
    let rand_monkey = monkeyarray[floor(random(0, monkeyarray.length-1))];
    let rand_size = floor(random(0, 100));
    image(rand_monkey, floor(random(0, height)), floor(random(0, width)), floor(random(25, 100)), floor(random(25, 100)));
  }}


function continue1(){
  background(237, 199, 219);
  yes.hide();
  no.hide();
  
  imageMode(CENTER);
  image(myangel, width/2 - 100, height/2, 200, 200 * (myangel.height/ myangel.width));

  //showing quiz elements now
  show_checkboxes();
  quizcomplete.show();
  
  //the text instructions for quiz
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(0);
  text("Thank you, you have passed the first stage.\nComplete this quiz to prove true alleigance to me.", width/2, height/2 - 200);
  textSize(20)
  text("Check all that apply, and press complete to sumbit.", width/2, height/2 + 200);
}

function quiz_results(){
  //counting the points by checking what boxes are checked
  for(let x = 0; x<checkbox_array.length; x++){
    if(checkbox_array[x].checked()){
      count_score += 1;
      quiz_results[x] += 1;
    }
  }
  //returning pass status
  if(count_score>2){
    passed =  true;
  }
  
}

function success1(){
  background(160, 208, 235);
  hide_checkboxes();
  quizcomplete.hide();
  imageMode(CENTER);
  image(myangel, width/2 - 100, height/2, 200, 200 * (myangel.height/ myangel.width));
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(0);
  text("And what might your name be?", width/2, height/2 - 200);

  user_input.show();
  name_submit_button.show();
  answers_string_print = '';

  if (name_submitted){
    user_name = user_input.value();
    qualities();
    success2();
  }

}

function hide_checkboxes(){
  for(let x = 0; x<checkbox_array.length; x++){
    checkbox_array[x].hide();
  }
}

function show_checkboxes(){
  for(let x = 0; x<checkbox_array.length; x++){
    checkbox_array[x].show();
  }
}

function success2(){
  user_input.hide();
  name_submit_button.hide();
  qualities();
  background(220);
  
  imageMode(CENTER);
  
  image(heaven, width/2, height/2, width, height);
  image(myangel,  width/2, height/2, 200, 200 * (myangel.height/ myangel.width));

  textAlign(CENTER, CENTER);
  textSize(20);
  fill(0);
  text(`Welcome to Heaven ${user_name}.`, width/2, height/2 - ((200 * (myangel.height/ myangel.width))/2) - 100); 
  text(`You are:\n ${answers_string_print}\nWe all love you here.`, width/2, height/2 + ((200 * (myangel.height/ myangel.width))/2) + 100);
}

function qualities(){
  //creating custom strong of qualities user selected
  for(let x = 0; x < answers.length; x ++){
    if (checkbox_array[x].checked()){
      answers_string_print += `${answers_strings[x]}.\n`;
    }
  }
}


