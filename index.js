$(document).ready(() => {

  let user_clicked_pattern = [];

  let button_colors = [`red`, `blue`, `green`, `yellow`];

  let game_pattern = []  

  let level = 0;

  let started = false
  
  $(`body`).keydown(() => {

    if(!started){

      $(`h1`).html(`level ${level}`);
      
      next_sequence()

      started = true
    }
    
  })
  
  $(`.btn`).click( function () {
    let user_chosen_color = this.getAttribute(`id`)
    
    user_clicked_pattern.push(user_chosen_color)
    
    console.log(user_clicked_pattern)

    play_sound(user_chosen_color)

    animate_press(user_chosen_color)

    check_answer(user_clicked_pattern.length - 1)

    
  })

  
  function check_answer(current_level){
    if(game_pattern[current_level] === user_clicked_pattern[current_level]){
      console.log(`success`)

      if (user_clicked_pattern.length === game_pattern.length){
        setTimeout(() => {
          next_sequence()
        }, 1000)
      }

    }
    else {
      let audio_2 = new Audio(`sounds/wrong.mp3`)
      audio_2.play()
      $(`body`).addClass(`game-over`)

      setTimeout(() => {
        $(`body`).removeClass(`game-over`)
      }, 200)

      $(`h1`).html(`Game Over, Press Any key to Restart`)

      start_over()

      
    }

  }

  function start_over(){

    started = false;

    level = 0;

    game_pattern = []

  }



  function next_sequence(){

    user_clicked_pattern = [];

    level++; 

    $(`h1`).html(`level ${level}`)

    let random_number = Math.floor(Math.random() * 4)
    
    let random_chosen_color = button_colors[random_number]

    game_pattern.push(random_chosen_color)

    console.log(game_pattern)
    

    play_sound(random_chosen_color)

    $(`#${random_chosen_color}`).fadeOut(100).fadeIn(100)

   
  }

 

  function play_sound(name){
    let audio_1 = new Audio(`sounds/${name}.mp3`)
    audio_1.play()

  }

  let time_interval_id;

  function animate_press(current_color){
     
      $(`#${current_color}`).addClass(`pressed`)

      clearTimeout(time_interval_id)

      time_interval_id = setTimeout(() => {
        $(`#${current_color}`).removeClass(`pressed`)
      }, 100)
   
  }



 
 

  
})