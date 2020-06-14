# Eliminate **worry**, strengthen **focus**. 
 
Living in a world with time-sensitive tasks results in a disruption of focus. Intense focus (*Flow*, being 'in the zone') is beneficial to me because it improves the quality of my work, as well as my enjoyment during its completion. While alerts seem to be necessary in our world, they also disrupt flow, which is contrary to my success. 

I made *Flow* so I wouldn't need distracting alerts to get all of my tasks done, and so all of my jobs would be listed somewhere as soon as I thought of them, so that I would never have to second-guess myself about forgetting a due date or responsibility during a time of focus. This system is better than an alert system because I passively check *Flow* when I take notes, need to set a timer, or just to have something easy to look at on my second monitor.

## Functionality:

*Flow* is a productivity website aimed at keeping track of tasks within categories. A user can create a new task by clicking the "Create new task" button and filling out information within the modal that appears. Most time using the program is spent in the Main category which I use to contain all of my short-term goals. 

Each flow task contains four values: title, preferred completion date, deadline, and notes. While the user can edit the notes on the main page by scrolling down in a task window, there's also a detail view that gives the user more space to write out their thoughts. In this view, the user can click the button on the bottom of the view to download the task title and notes in a text file.

## Commands:

1. **(arg) -del**: Deletes a task based on its assigned number.

2. **(arg) -back**: Sets a background based on its assigned number.

3. **-roll**: Sets a random background.

4. **(args) -timer**: Creates a timer. If the user wanted to create a timer for 1 hour, 5 minutes, and 2 seconds, the user would type: "1h 5m 2s -timer". The site takes the value (regardless of how many arguments are given - "2s -timer" is also acceptable) and creates a timer based on the information. When the timer finishes, a sound will play repeatedly until you click "Done!". 

5-8. **(args) -title, (args) -pref, (args) -dead, (args) -note**. These commands allow the user to change any value of any task. 


For example, this command: 

```
1 "Finish homework" -title
```

would change the first task's title to "Finish homework".


9. **(arg)++**: Creates a category. Example: Creativity++ would create a category named "Creativity".

10. **(arg)- -**: Deletes a category.

11. **(arg)->**: Selects a category to view.

12. **-cats**: Lists category names in the terminal.

13. **-export**: Exports all local data to a text file.

14. **-puzzle**: Displays the current puzzle of the day on Lichess.

## Download:

To use this website, simply download the folder and drag the main.html file into your browser. The background will be blank and you will have no sound for the completion of the timer due to my irrational fear of copyright. To add these things, make folders 'img' and 'sound'. Find a short sound you like and put it in the sound folder with the name 'Done.mp3'. Add backgrounds to the img folder in the following format: bgd0.jpg, bgd1.jpg, and so on. When you're satisfied with the backgrounds you have, change the var 'numOfImages' at the top of 'js/main.js' to equal the amount of backgrounds.
