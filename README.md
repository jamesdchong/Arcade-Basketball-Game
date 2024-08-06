# Mini-Hoop Automated Scoreboard

## Demo

https://github.com/user-attachments/assets/3b386ab6-c761-433c-adf4-98c0981c69f9

## Motivation
- Problem: Traditional mini basketball hoops lack a competitive and interactive component, making the game repetitive and unengaging.
- Solution: Add a scoreboard with a timer to track the number of baskets made within one minute and display the high score.
- Importance:
    - Enhances gameplay experience and adds a competitive edge.
    - Encourages physical activity indoors, especially when outdoor spaces are unavailable.
    - Builds social connections, fosters teamwork, and improves mental health.
    - Boosts self-esteem, reduces stress, and improves cognitive function.


## Technical Approach
- Component Selection:
    - Used an ultrasonic sensor and batteries.
    - Opted for a foam ball to reduce noise and risk of damage.

![Picture1](https://github.com/user-attachments/assets/16253a76-f4f2-44ad-b554-7df5c61e9085)

- Setup:
    - Secured components to the mini basketball hoop setup using double-sided tape.
    - Protected the Pi device with foam and tested the setup extensively.

![Picture2](https://github.com/user-attachments/assets/62f3ac7d-b5ab-485f-b7a3-0c2737e45e38)
![Picture3](https://github.com/user-attachments/assets/a2e9b2d1-8974-40ca-be3d-dd2075be2f9b)

- Implementation:
    - Focused on one-player mode with a high score display.
    - Displayed scoreboard on a laptop using WiFi connectivity.
    - Server on the Pi communicated with the client to display the scoreboard.
    - Utilized ElectronJS and NodeJS on the client side.
    - Used Python on the server side to process requests and track scores.
