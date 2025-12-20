<div align="center">
  <kbd> <img width="640" height="320" alt="logo_full" src="https://github.com/user-attachments/assets/ee1fae7e-6fe5-4593-8a21-7ce51dc6e72e" /> </kbd>

  <h3 align="center">The Mental Metric</h3>
  <a href="#"><strong>Explore Our Website»</strong></a>
    </br>
    </br>
    <p>
      <img src="https://img.shields.io/github/commit-activity/m/Jackson-Wozniak/The-Mental-Metric?style=for-the-badge" alt="commits" />
      <img src="https://img.shields.io/github/issues/Jackson-Wozniak/The-Mental-Metric?color=darkgreen&style=for-the-badge" alt="issues" />
      <img src="https://img.shields.io/github/languages/count/Jackson-Wozniak/The-Mental-Metric?color=purple&style=for-the-badge" alt="languages" />
    </p> 
    <a href="https://github.com/Jackson-Wozniak">Github</a>
    ·
    <a href="https://github.com/Jackson-Wozniak/TheMentalMetric/issues">Report Bug</a>
    ·
    <a href="https://github.com/Jackson-Wozniak/TheMentalMetric/issues">Request Feature</a>
</div>

## :books: Table of Contents

<ol>
    <li><a href="#overview">Overview & Features</a></li>
    <li><a href="#score-tracking">Score Tracking & Leaderboards</a></li>
    <li>
      <a href="#games">Game Types</a>
      <ul>
        <li><a href="#grid-recall">Grid Recall</a></li>
      </ul>
    </li>
    <li><a href="#technologies">Technologies & Design</a></li>
    <li><a href="#local-dev">Local Development & Setup</a></li>
    <li><a href="#contributing">Contributing</a></li>
</ol>    

<br/> 
<!-- -------------------------------------------------------------------------------------------------------------------------------------------- -->

## 📖 Overview & Features <a id="overview"></a>

## 🏆 Score Tracking & Leaderboards <a id="score-tracking"></a>

## 🎮 Game Types <a id="games"></a>

### Grid Recall <a id="grid-recall"></a>

#### Overview

Grid Recall is a visual-memory focused game where a series of buttons on a grid briefly flash in a specific sequence. Once the grid resets, the user must click each of the buttons that changed color. As the game progresses, the grid grows in size, and the number of buttons that flash increase as well. The game ends when the user incorrectly guesses a total of 10 buttons.

#### Tracked Metrics

- Level: Tracks the highest level reached by the user during the playthrough
- Maximum Correct Streak: Shows the highest streak of correct guesses. Streaks carry over between levels, and resets on an incorrect guess
- Accuracy Rate: The percentage of correct guesses in relation to total guesses

### Peripheral Focus <a id="peripheral-focus"></a>

4 to 6 shapes will be shown in the corner/side of the screen. After they dissapear, the user will be
shown more shapes and have to decide which ones were shown, and what direction they were in. Some shapes
may be shown multiple times at different orientations in the choice, so the user will need to pay
attention to the orientation of each shape

Stats to track:

- Total correct before game end

- Time taken to choose all shapes

- Heat map of accuracy by direction

### Selective Attention <a id="selective-attention"></a>

There will be two groups of shapes/pictures etc. The user must press the button when the
first group shows up, but not when the second does. The images show briefly and users are timed
so are graded on how fast they can correctly identify images without mistakes.

Stats to track:

- accuracy rate %

- missed presses vs. incorrect presses

- average recall time

- quickest recall time

- total correct (game is time based)

- most consecutive correct

- average consecutive correct (measure how often they lose attention)

### Word Link <a id="word-link"></a>

Users are shown pairs of words briefly. Once all the pairs are shown, the pairs are then shown in a random
order, with one word missing in the pair. The user must type the correct match, and if they get it wrong
they can do multiple choice.

As a user gets to higher levels, the # of pairs per level grows, and at the highest levels 3 words are shown
instead of pairs.

Stats To Track:

- final level

- accuracy rate % (both typing and multiple choice)

- % correct with typing vs. multiple choice

- accuracy of first word vs. second word missing

- accuracy on ordering of pairs (whether they got the first one, second one right more often etc.)

## 🔌 Technologies & Design <a id="technologies"></a>

#### Frontend

- Typescript

- React & Vite

- Chart JS

- MUI

### Backend

- Spring Boot

- MySQL

- Docker

## 🖥️: Local Development & Setup <a id="local-dev"></a>

## ✏️: Contributing <a id="contributing"></a>
