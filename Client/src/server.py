import picar_4wd as fc
import socket
import json
import time

# Keeps track of current score, high score
highScore = 0
currScore = 0

# Function to check if us sensor registers a score, update scores
def getScores(count):
    global highScore, currScore
    scored = False
    scores = {} # dictionary containing currScore, highScore

    # Runs continuously, except when reset button is clicked
    if count == "Count":
        distance = fc.us.get_distance() # read distance from us sensor

        # if distance is less than 20, the ball has been sensed
        if distance < 20 and distance > 0:
            scored = True # player scored
            currScore = currScore + 1 # score increments

            # update high score if necessary
            if currScore > highScore:
                highScore = currScore
    # Reset score when value is "Reset"
    else:
        currScore = 0
    
    # send scores to client
    scores["highScore"] = highScore
    scores["currScore"] = currScore
    return scores, scored

# --- WiFi --- #
HOST = "192.168.1.25"
PORT = 65432

# Use socket to connect to client
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1) # removes delay to reuse address
    s.bind((HOST, PORT))
    s.listen()
    client, clientInfo = s.accept()

    try:
        while True:
            data = client.recv(3) # receive data

            # If reset initiated, reset current score
            if data == b"R\r\n":
                scores, _ = getScores("Reset")
                client.sendall(json.dumps(scores).encode('utf-8'))

            # Else, get updated scores, send back to client
            elif data == b"C\r\n":
                scores, scored = getScores("Count")
                if scored:
                    client.sendall(json.dumps(scores).encode('utf-8')) # sends encoded JSON back to client
                    time.sleep(1) # If player scores, sleep for 1 second to avoid overloading server with unnecessary client requests
            else:
                s.close()
    except:
        s.close()
