// --- WiFi Communication --- //
var server_addr = "192.168.1.25";
var server_port = 65432;

// Executes when DOM completed
window.onload = function() {

    // creates a connection to the raspberry pi
    const net = require('net');
    const client = net.createConnection({ port: server_port, host: server_addr }, () => {});

    // get data from the server, update values on scoreboard
    client.on('data', (data) => {
        data = JSON.parse(data);
        document.getElementById("score").innerHTML = data['currScore'];
        document.getElementById("highscore").innerHTML = "High Score: " + data['highScore'].toString();
    });

    // Used to update timer, start to reset, and reset to start
    var timer = document.getElementById("timer");
    var button = document.getElementById("button");

    var time = 60; // Timer starting from 60 seconds to 0 seconds
    var countdown; // Timer code that runs each second
    var scores = null; // Score
  
    // Executes when the start/reset button clicked
    button.addEventListener("click", function() {
      if (button.innerHTML === "Start") {

        // Decrements timer by one second for each second that passes
        countdown = setInterval(function() {
          time--;
          var minutes = Math.floor(time / 60);
          var seconds = time % 60;
          timer.innerHTML = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);

          // Time runs out
          if (time === 0) {
            // Play buzzer sound
            var buzzer = new Audio('buzzer.mp3');
            buzzer.play();

            clearInterval(countdown); // Stop timer counting down
            clearInterval(scores) // Stop scores from increasing
          }
        }, 1000);

        button.innerHTML = "Reset";

        // For every 25 miliseconds, send server "C", indicating "count" (read from us sensor, update scores)
        scores = setInterval(function() {
            client.write("C\r\n");
        }, 25);

        // Reset button clicked
      } else {
        clearInterval(countdown); // Stop timer counting down
        clearInterval(scores);    // Stop scores from increasing
        client.write("R\r\n");    // Tell server to reset the current score (keeps the highscore)
        
        // Reset the timer
        time = 60;
        timer.innerHTML = "01:00";
        button.innerHTML = "Start";
      }
    });
};
