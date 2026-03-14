// components/english/EnglishMaster.jsx
import { useState, useEffect } from "react";

const TONGUE_TWISTERS = [
  { day: 1, text: "🔴 TH/S/SH: Thirty-three thieves thought they thrilled the throne." },
  { day: 2, text: "🔵 R/L: Red lorry, yellow lorry." },
  { day: 3, text: "🟢 P/B/T/D: Peter Piper picked a peck of pickled peppers." },
  { day: 4, text: "🟡 V/W/F: Vincent vowed vengeance very vehemently." },
  { day: 5, text: "🟠 CH/J/Y: Chester Cheetah chews a chunk of cheap cheddar cheese." },
  { day: 6, text: "🟣 Mixed: I slit a sheet, a sheet I slit." }
];

const INTERVIEW_QUESTIONS = [
  { id: "iq1", question: "Tell me about yourself." },
  { id: "iq2", question: "Why should we hire you?" },
  { id: "iq3", question: "What are your strengths?" },
  { id: "iq4", question: "What are your weaknesses?" },
  { id: "iq5", question: "Where do you see yourself in 5 years?" },
  { id: "iq6", question: "Why do you want to work here?" },
  { id: "iq7", question: "Tell me about a time you faced a challenge." },
  { id: "iq8", question: "How do you handle pressure?" },
  { id: "iq9", question: "What is your greatest achievement?" },
  { id: "iq10", question: "Why did you leave your last job?" },
  { id: "iq11", question: "Why should we hire you over other candidates?" },
  { id: "iq12", question: "What are your salary expectations?" },
  { id: "iq13", question: "Why do you want to leave your current job?" },
  { id: "iq14", question: "What do you know about our company?" },
  { id: "iq15", question: "How do you deal with conflict?" }
];

// ✅ 93 MOST COMMON PHRASES - DAY WISE
const DAILY_PHRASES = [
  { day: 1, phrase: "Break the ice", meaning: "Start a conversation in a social situation", example: "I told a joke to break the ice at the party." },
  { day: 2, phrase: "Piece of cake", meaning: "Very easy", example: "The exam was a piece of cake!" },
  { day: 3, phrase: "Cost an arm and a leg", meaning: "Very expensive", example: "This phone costs an arm and a leg." },
  { day: 4, phrase: "Hit the nail on the head", meaning: "Say exactly the right thing", example: "You hit the nail on the head with that answer." },
  { day: 5, phrase: "Once in a blue moon", meaning: "Very rarely", example: "I visit my hometown once in a blue moon." },
  { day: 6, phrase: "When pigs fly", meaning: "Never", example: "He'll clean his room when pigs fly." },
  { day: 7, phrase: "Spill the beans", meaning: "Tell a secret", example: "Come on, spill the beans! What happened?" },
  { day: 8, phrase: "Go the extra mile", meaning: "Do more than expected", example: "She always goes the extra mile for her clients." },
  { day: 9, phrase: "Sit on the fence", meaning: "Not make a decision", example: "Stop sitting on the fence and choose!" },
  { day: 10, phrase: "Call it a day", meaning: "Stop working", example: "We're tired, let's call it a day." },
  { day: 11, phrase: "Under the weather", meaning: "Feel sick", example: "I'm feeling under the weather today." },
  { day: 12, phrase: "Cut corners", meaning: "Do something poorly to save time/money", example: "Don't cut corners on this project." },
  { day: 13, phrase: "Add insult to injury", meaning: "Make a bad situation worse", example: "He was late, and to add insult to injury, he forgot the documents." },
  { day: 14, phrase: "Blessing in disguise", meaning: "Something bad that turns out good", example: "Losing that job was a blessing in disguise." },
  { day: 15, phrase: "Get out of hand", meaning: "Become uncontrollable", example: "The party got out of hand." },
  { day: 16, phrase: "Come rain or shine", meaning: "No matter what", example: "I'll be there, come rain or shine." },
  { day: 17, phrase: "Curiosity killed the cat", meaning: "Don't be too curious", example: "Don't ask so many questions - curiosity killed the cat!" },
  { day: 18, phrase: "Don't count your chickens", meaning: "Don't assume before it happens", example: "You might not win, so don't count your chickens." },
  { day: 19, phrase: "Every cloud has a silver lining", meaning: "Good in every bad situation", example: "Every cloud has a silver lining." },
  { day: 20, phrase: "Fit as a fiddle", meaning: "Very healthy", example: "Grandpa is 80 but fit as a fiddle." },
  { day: 21, phrase: "Get a taste of your own medicine", meaning: "Get treated how you treat others", example: "He got a taste of his own medicine." },
  { day: 22, phrase: "Give the benefit of the doubt", meaning: "Trust without proof", example: "I'll give you the benefit of the doubt." },
  { day: 23, phrase: "In the same boat", meaning: "Same situation", example: "We're all in the same boat." },
  { day: 24, phrase: "It's not rocket science", meaning: "It's easy", example: "Come on, it's not rocket science!" },
  { day: 25, phrase: "Keep your chin up", meaning: "Stay positive", example: "Keep your chin up, things will get better." },
  { day: 26, phrase: "Kill two birds with one stone", meaning: "Do two things at once", example: "I'll kill two birds with one stone." },
  { day: 27, phrase: "Let sleeping dogs lie", meaning: "Don't restart old arguments", example: "Let sleeping dogs lie." },
  { day: 28, phrase: "Make a long story short", meaning: "Summarize", example: "To make a long story short, I got the job." },
  { day: 29, phrase: "Miss the boat", meaning: "Miss an opportunity", example: "I applied too late, I missed the boat." },
  { day: 30, phrase: "No pain, no gain", meaning: "Work hard to achieve", example: "No pain, no gain!" },
  { day: 31, phrase: "On the ball", meaning: "Alert and efficient", example: "You're really on the ball today!" },
  { day: 32, phrase: "Out of the blue", meaning: "Suddenly", example: "He called me out of the blue." },
  { day: 33, phrase: "Pull yourself together", meaning: "Calm down", example: "Pull yourself together!" },
  { day: 34, phrase: "See eye to eye", meaning: "Agree", example: "We don't see eye to eye." },
  { day: 35, phrase: "Take it easy", meaning: "Relax", example: "Take it easy, man." },
  { day: 36, phrase: "Time flies", meaning: "Time passes quickly", example: "Time flies when you're having fun!" },
  { day: 37, phrase: "To be on top of the world", meaning: "Feel great", example: "I'm on top of the world!" },
  { day: 38, phrase: "Up in the air", meaning: "Uncertain", example: "My plans are up in the air." },
  { day: 39, phrase: "You can say that again", meaning: "I agree", example: "You can say that again!" },
  { day: 40, phrase: "Your guess is as good as mine", meaning: "I don't know", example: "Your guess is as good as mine." },
  { day: 41, phrase: "A dime a dozen", meaning: "Very common", example: "Those skills are a dime a dozen." },
  { day: 42, phrase: "Back to the drawing board", meaning: "Start over", example: "Back to the drawing board." },
  { day: 43, phrase: "Beat around the bush", meaning: "Avoid saying directly", example: "Stop beating around the bush." },
  { day: 44, phrase: "Bite the bullet", meaning: "Face something difficult", example: "I'll bite the bullet." },
  { day: 45, phrase: "By the skin of your teeth", meaning: "Just barely", example: "I passed by the skin of my teeth." },
  { day: 46, phrase: "Elbow grease", meaning: "Hard work", example: "Put some elbow grease into it." },
  { day: 47, phrase: "Feel something in your bones", meaning: "Have a strong feeling", example: "I feel it in my bones." },
  { day: 48, phrase: "Get a second wind", meaning: "Get new energy", example: "I got my second wind." },
  { day: 49, phrase: "Get your act together", meaning: "Organize yourself", example: "Get your act together!" },
  { day: 50, phrase: "Give someone the cold shoulder", meaning: "Ignore someone", example: "She gave me the cold shoulder." },
  { day: 51, phrase: "Go Dutch", meaning: "Split the bill", example: "Let's go Dutch." },
  { day: 52, phrase: "Have a change of heart", meaning: "Change your mind", example: "I had a change of heart." },
  { day: 53, phrase: "In hot water", meaning: "In trouble", example: "I'm in hot water." },
  { day: 54, phrase: "It takes two to tango", meaning: "Both responsible", example: "It takes two to tango." },
  { day: 55, phrase: "Jump on the bandwagon", meaning: "Join a popular trend", example: "Everyone jumped on the bandwagon." },
  { day: 56, phrase: "Keep an eye on", meaning: "Watch carefully", example: "Keep an eye on him." },
  { day: 57, phrase: "Last straw", meaning: "Final problem", example: "That was the last straw." },
  { day: 58, phrase: "Let someone off the hook", meaning: "Not punish", example: "I'll let you off the hook." },
  { day: 59, phrase: "Make matters worse", meaning: "Make a problem worse", example: "He made matters worse." },
  { day: 60, phrase: "Method to my madness", meaning: "A reason for strange behavior", example: "There's method to my madness." },
  { day: 61, phrase: "Not my cup of tea", meaning: "Not what I like", example: "That's not my cup of tea." },
  { day: 62, phrase: "On cloud nine", meaning: "Very happy", example: "I'm on cloud nine!" },
  { day: 63, phrase: "Out of the frying pan into the fire", meaning: "From bad to worse", example: "Out of the frying pan into the fire." },
  { day: 64, phrase: "Play devil's advocate", meaning: "Argue opposite side", example: "Let me play devil's advocate." },
  { day: 65, phrase: "Put all your eggs in one basket", meaning: "Rely on one thing", example: "Don't put all your eggs in one basket." },
  { day: 66, phrase: "Ring a bell", meaning: "Sound familiar", example: "That rings a bell." },
  { day: 67, phrase: "Saved by the bell", meaning: "Saved at the last moment", example: "I was saved by the bell." },
  { day: 68, phrase: "Steal someone's thunder", meaning: "Take attention from someone", example: "Don't steal my thunder." },
  { day: 69, phrase: "Take with a grain of salt", meaning: "Don't believe completely", example: "Take it with a grain of salt." },
  { day: 70, phrase: "The ball is in your court", meaning: "Your turn to act", example: "The ball is in your court." },
  { day: 71, phrase: "The best thing since sliced bread", meaning: "Great invention", example: "It's the best thing since sliced bread." },
  { day: 72, phrase: "Through thick and thin", meaning: "Through good and bad", example: "We're together through thick and thin." },
  { day: 73, phrase: "Tie the knot", meaning: "Get married", example: "They tied the knot." },
  { day: 74, phrase: "To be in someone's shoes", meaning: "In someone's situation", example: "I'd like to be in your shoes." },
  { day: 75, phrase: "Turn a blind eye", meaning: "Ignore", example: "He turned a blind eye." },
  { day: 76, phrase: "Up for grabs", meaning: "Available", example: "The job is up for grabs." },
  { day: 77, phrase: "Water under the bridge", meaning: "Past problems forgotten", example: "It's water under the bridge." },
  { day: 78, phrase: "When it rains, it pours", meaning: "Problems come together", example: "When it rains, it pours." },
  { day: 79, phrase: "Wild goose chase", meaning: "Useless search", example: "It's a wild goose chase." },
  { day: 80, phrase: "Wolf in sheep's clothing", meaning: "Dangerous pretending to be harmless", example: "He's a wolf in sheep's clothing." },
  { day: 81, phrase: "You reap what you sow", meaning: "You get what you deserve", example: "You reap what you sow." },
  { day: 82, phrase: "Zero tolerance", meaning: "No acceptance", example: "We have zero tolerance." },
  { day: 83, phrase: "Zone out", meaning: "Stop paying attention", example: "I zoned out during the meeting." },
  { day: 84, phrase: "Zip your lip", meaning: "Stop talking", example: "Zip your lip!" },
  { day: 85, phrase: "Achilles heel", meaning: "Weak point", example: "Procrastination is my Achilles heel." },
  { day: 86, phrase: "Bark up the wrong tree", meaning: "Make a wrong assumption", example: "If you think I did it, you're barking up the wrong tree." },
  { day: 87, phrase: "Cry over spilled milk", meaning: "Worry about past mistakes", example: "It's done, no use crying over spilled milk." },
  { day: 88, phrase: "Don't put all your eggs in one basket", meaning: "Don't risk everything on one plan", example: "Invest in different stocks - don't put all your eggs in one basket." },
  { day: 89, phrase: "Face the music", meaning: "Face consequences", example: "I made a mistake, now I have to face the music." },
  { day: 90, phrase: "Hit the road", meaning: "Leave", example: "It's late, time to hit the road." },
  { day: 91, phrase: "In the nick of time", meaning: "Just in time", example: "I reached the station in the nick of time." },
  { day: 92, phrase: "Jump the gun", meaning: "Start too early", example: "Don't jump the gun, wait for the signal." },
  { day: 93, phrase: "Steer clear of", meaning: "Avoid", example: "Steer clear of him, he's trouble." }
];

// ✅ 93 MOST COMMON IDIOMS - DAY WISE
const DAILY_IDIOMS = [
  { day: 1, idiom: "Better late than never", meaning: "It's better to do something late than not at all", example: "I know I'm late, but better late than never!" },
  { day: 2, idiom: "Break a leg", meaning: "Good luck", example: "You have an interview? Break a leg!" },
  { day: 3, idiom: "Hit the sack", meaning: "Go to sleep", example: "I'm tired, time to hit the sack." },
  { day: 4, idiom: "Let the cat out of the bag", meaning: "Reveal a secret", example: "We let the cat out of the bag about the surprise party." },
  { day: 5, idiom: "Burn the midnight oil", meaning: "Work late into the night", example: "I have to burn the midnight oil for this exam." },
  { day: 6, idiom: "Caught between two stools", meaning: "Unable to choose between two alternatives", example: "I'm caught between two stools - which job should I take?" },
  { day: 7, idiom: "Fish out of water", meaning: "Feel uncomfortable in a new situation", example: "On my first day, I felt like a fish out of water." },
  { day: 8, idiom: "Once in a lifetime", meaning: "Very rare opportunity", example: "This is a once in a lifetime chance." },
  { day: 9, idiom: "Speak of the devil", meaning: "The person we were talking about appears", example: "Speak of the devil, here comes Raj!" },
  { day: 10, idiom: "The best of both worlds", meaning: "Two good things together", example: "Working from home gives me the best of both worlds." },
  { day: 11, idiom: "When pigs fly", meaning: "Never", example: "He'll clean his room when pigs fly." },
  { day: 12, idiom: "Cost an arm and a leg", meaning: "Very expensive", example: "This phone costs an arm and a leg." },
  { day: 13, idiom: "Piece of cake", meaning: "Very easy", example: "The exam was a piece of cake!" },
  { day: 14, idiom: "Once in a blue moon", meaning: "Very rarely", example: "I visit my hometown once in a blue moon." },
  { day: 15, idiom: "Break the ice", meaning: "Start a conversation", example: "I told a joke to break the ice." },
  { day: 16, idiom: "Hit the nail on the head", meaning: "Say exactly the right thing", example: "You hit the nail on the head with that answer." },
  { day: 17, idiom: "Go the extra mile", meaning: "Do more than expected", example: "She always goes the extra mile for her clients." },
  { day: 18, idiom: "Sit on the fence", meaning: "Not make a decision", example: "Stop sitting on the fence and choose!" },
  { day: 19, idiom: "Call it a day", meaning: "Stop working", example: "We're tired, let's call it a day." },
  { day: 20, idiom: "Under the weather", meaning: "Feel sick", example: "I'm feeling under the weather today." },
  { day: 21, idiom: "Cut corners", meaning: "Do something poorly to save time/money", example: "Don't cut corners on this project." },
  { day: 22, idiom: "Add insult to injury", meaning: "Make a bad situation worse", example: "He was late, and to add insult to injury, he forgot the documents." },
  { day: 23, idiom: "Blessing in disguise", meaning: "Something bad that turns out good", example: "Losing that job was a blessing in disguise." },
  { day: 24, idiom: "Get out of hand", meaning: "Become uncontrollable", example: "The party got out of hand." },
  { day: 25, idiom: "Come rain or shine", meaning: "No matter what", example: "I'll be there, come rain or shine." },
  { day: 26, idiom: "Curiosity killed the cat", meaning: "Being too curious can get you into trouble", example: "Don't ask so many questions - curiosity killed the cat!" },
  { day: 27, idiom: "Don't count your chickens", meaning: "Don't assume something will happen before it does", example: "You might not win, so don't count your chickens." },
  { day: 28, idiom: "Every cloud has a silver lining", meaning: "There's something good in every bad situation", example: "Don't worry, every cloud has a silver lining." },
  { day: 29, idiom: "Fit as a fiddle", meaning: "Very healthy", example: "My grandfather is 80 but fit as a fiddle." },
  { day: 30, idiom: "Get a taste of your own medicine", meaning: "Get treated the way you treat others", example: "He's always rude, now he got a taste of his own medicine." },
  { day: 31, idiom: "Give someone the benefit of the doubt", meaning: "Trust someone without proof", example: "I'll give him the benefit of the doubt." },
  { day: 32, idiom: "In the same boat", meaning: "In the same situation", example: "We're all in the same boat with this deadline." },
  { day: 33, idiom: "It's not rocket science", meaning: "It's not difficult", example: "Come on, it's not rocket science!" },
  { day: 34, idiom: "Keep your chin up", meaning: "Stay positive", example: "Keep your chin up, things will get better." },
  { day: 35, idiom: "Kill two birds with one stone", meaning: "Do two things at once", example: "I'll kill two birds with one stone - shop and meet you." },
  { day: 36, idiom: "Let sleeping dogs lie", meaning: "Don't restart old arguments", example: "I know we fought, but let sleeping dogs lie." },
  { day: 37, idiom: "Make a long story short", meaning: "Summarize", example: "To make a long story short, I got the job." },
  { day: 38, idiom: "Miss the boat", meaning: "Miss an opportunity", example: "I applied too late, I missed the boat." },
  { day: 39, idiom: "No pain, no gain", meaning: "Work hard to achieve", example: "I workout daily - no pain, no gain!" },
  { day: 40, idiom: "On the ball", meaning: "Alert and efficient", example: "You're really on the ball today!" },
  { day: 41, idiom: "Out of the blue", meaning: "Suddenly, unexpectedly", example: "He called me out of the blue after 5 years." },
  { day: 42, idiom: "Pull yourself together", meaning: "Calm down and control emotions", example: "Pull yourself together, it's just an interview." },
  { day: 43, idiom: "See eye to eye", meaning: "Agree with someone", example: "We don't see eye to eye on politics." },
  { day: 44, idiom: "Take it easy", meaning: "Relax", example: "Take it easy, don't stress too much." },
  { day: 45, idiom: "Time flies", meaning: "Time passes quickly", example: "Time flies when you're having fun!" },
  { day: 46, idiom: "To be on top of the world", meaning: "Feel great", example: "I got promoted, I'm on top of the world!" },
  { day: 47, idiom: "Up in the air", meaning: "Uncertain", example: "My travel plans are still up in the air." },
  { day: 48, idiom: "You can say that again", meaning: "I completely agree", example: "That was a great movie! - You can say that again!" },
  { day: 49, idiom: "Your guess is as good as mine", meaning: "I don't know either", example: "When will he arrive? Your guess is as good as mine." },
  { day: 50, idiom: "A dime a dozen", meaning: "Very common", example: "Those skills are a dime a dozen." },
  { day: 51, idiom: "Back to the drawing board", meaning: "Start over", example: "The plan failed, back to the drawing board." },
  { day: 52, idiom: "Beat around the bush", meaning: "Avoid saying directly", example: "Stop beating around the bush and tell me." },
  { day: 53, idiom: "Bite the bullet", meaning: "Face something difficult", example: "I'll bite the bullet and tell her the truth." },
  { day: 54, idiom: "By the skin of your teeth", meaning: "Just barely", example: "I passed the exam by the skin of my teeth." },
  { day: 55, idiom: "Elbow grease", meaning: "Hard work", example: "Put some elbow grease into cleaning." },
  { day: 56, idiom: "Feel in your bones", meaning: "Have a strong feeling", example: "I feel in my bones that something is wrong." },
  { day: 57, idiom: "Get a second wind", meaning: "Get new energy", example: "After coffee, I got a second wind." },
  { day: 58, idiom: "Get your act together", meaning: "Organize yourself", example: "Get your act together before the meeting." },
  { day: 59, idiom: "Give the cold shoulder", meaning: "Ignore someone", example: "She gave me the cold shoulder after our fight." },
  { day: 60, idiom: "Go Dutch", meaning: "Split the bill", example: "Let's go Dutch on dinner." },
  { day: 61, idiom: "Have a change of heart", meaning: "Change your mind", example: "I had a change of heart about quitting." },
  { day: 62, idiom: "In hot water", meaning: "In trouble", example: "He's in hot water with his boss." },
  { day: 63, idiom: "It takes two to tango", meaning: "Both are responsible", example: "Don't blame me, it takes two to tango." },
  { day: 64, idiom: "Jump on the bandwagon", meaning: "Join a trend", example: "Everyone is using AI, time to jump on the bandwagon." },
  { day: 65, idiom: "Keep an eye on", meaning: "Watch carefully", example: "Keep an eye on the baby." },
  { day: 66, idiom: "Last straw", meaning: "Final problem", example: "His rudeness was the last straw." },
  { day: 67, idiom: "Let off the hook", meaning: "Not punish", example: "I'll let you off the hook this time." },
  { day: 68, idiom: "Make matters worse", meaning: "Make worse", example: "Don't interfere, you'll make matters worse." },
  { day: 69, idiom: "Method to the madness", meaning: "Reason for strange behavior", example: "There's method to his madness." },
  { day: 70, idiom: "Not my cup of tea", meaning: "Not what I like", example: "Horror movies are not my cup of tea." },
  { day: 71, idiom: "On cloud nine", meaning: "Very happy", example: "She's been on cloud nine since her engagement." },
  { day: 72, idiom: "Out of the frying pan into the fire", meaning: "From bad to worse", example: "I left my job and ended up in a worse one - out of the frying pan into the fire." },
  { day: 73, idiom: "Play devil's advocate", meaning: "Argue opposite side", example: "Let me play devil's advocate for a moment." },
  { day: 74, idiom: "Put all eggs in one basket", meaning: "Rely on one thing", example: "Don't put all your eggs in one basket." },
  { day: 75, idiom: "Ring a bell", meaning: "Sound familiar", example: "That name rings a bell." },
  { day: 76, idiom: "Saved by the bell", meaning: "Saved at last moment", example: "The teacher arrived and I was saved by the bell." },
  { day: 77, idiom: "Steal thunder", meaning: "Take attention", example: "Don't steal my thunder on my birthday." },
  { day: 78, idiom: "Take with a grain of salt", meaning: "Don't believe completely", example: "Take his advice with a grain of salt." },
  { day: 79, idiom: "Ball in your court", meaning: "Your turn", example: "I've done my part, now the ball is in your court." },
  { day: 80, idiom: "Best thing since sliced bread", meaning: "Great invention", example: "This app is the best thing since sliced bread." },
  { day: 81, idiom: "Through thick and thin", meaning: "Through good and bad", example: "We've been friends through thick and thin." },
  { day: 82, idiom: "Tie the knot", meaning: "Get married", example: "They're tying the knot next month." },
  { day: 83, idiom: "In someone's shoes", meaning: "In their situation", example: "I wouldn't want to be in his shoes." },
  { day: 84, idiom: "Turn a blind eye", meaning: "Ignore", example: "The teacher turned a blind eye to cheating." },
  { day: 85, idiom: "Up for grabs", meaning: "Available", example: "The promotion is up for grabs." },
  { day: 86, idiom: "Water under the bridge", meaning: "Past problems", example: "Let's forget it, it's water under the bridge." },
  { day: 87, idiom: "When it rains, it pours", meaning: "Problems come together", example: "First I lost my job, then my phone broke - when it rains, it pours." },
  { day: 88, idiom: "Wild goose chase", meaning: "Useless search", example: "Looking for my keys was a wild goose chase." },
  { day: 89, idiom: "Wolf in sheep's clothing", meaning: "Dangerous pretending to be harmless", example: "He seems nice but he's a wolf in sheep's clothing." },
  { day: 90, idiom: "You reap what you sow", meaning: "You get what you deserve", example: "Work hard and you'll succeed - you reap what you sow." },
  { day: 91, idiom: "Face the music", meaning: "Face consequences", example: "I made a mistake, now I have to face the music." },
  { day: 92, idiom: "Hit the road", meaning: "Leave", example: "It's getting late, time to hit the road." },
  { day: 93, idiom: "In the nick of time", meaning: "Just in time", example: "I caught the train in the nick of time." }
];

const DAY1_TASKS = [
  { id: "d1_sentence", text: "📝 5 Words + Sentences: new 5 words, 5 sentences each" },
  { id: "d1_current", text: "📰 Current Affairs from indiabix.com" },
  { id: "d1_journal", text: "📔 5 Lines Journal: best lines you spoke/heard" },
  { id: "d1_read", text: "📚 Read Aloud - any book (10 min)" },
  { id: "d1_friends", text: "📺 Watch Friends episode - shadowing technique" },
  { id: "d1_gemini", text: "🤖 Client Meeting Simulation with Gemini AI" },
  { id: "d1_speak", text: "🎤 3min Topic + Record yourself" },
  { id: "d1_ted", text: "🎯 TED 1min + repeat with body language" },
  { id: "d1_gemini_practice", text: "🤖 Gemini English Practice (30 min)" },
  { id: "podcast", text: "🎧 Listen to English Podcast + note 3 phrases" },
  { id: "grammar_fix", text: "✏️ Correct 5 wrong sentences daily" },
  { id: "interview_q", text: "💼 Practice 1 interview question today" },
  { id: "phrase_idiom", text: "📚 Learn 1 phrase + 1 idiom with meaning & example" }
];

const DAY2_TASKS = [
  { id: "d2_sentence", text: "📝 5 Words + Sentences: new 5 words, 5 sentences each" },
  { id: "d2_current", text: "📰 Current Affairs from indiabix.com" },
  { id: "d2_journal", text: "📔 5 Lines Journal: best lines you spoke/heard" },
  { id: "d2_read", text: "📚 Read Aloud - any book (10 min)" },
  { id: "d2_friends_repeat", text: "📺 Friends + Repeat dialogues 5 times" },
  { id: "d2_mirror", text: "🪞 Mirror Talk: Speak on any topic" },
  { id: "d2_interview", text: "💼 Interview Practice with Gemini based on CV" },
  { id: "d2_ppt", text: "📽️ Presentation Practice: script → with script → without script" },
  { id: "d2_explain", text: "🔧 Project/Code Explain in English" },
  { id: "d2_intro", text: "👤 Introduce yourself - Write script + recording" },
  { id: "d2_gemini_practice", text: "🤖 Gemini English Practice (30 min)" },
  { id: "podcast", text: "🎧 Listen to English Podcast + note 3 phrases" },
  { id: "grammar_fix", text: "✏️ Correct 5 wrong sentences daily" },
  { id: "interview_q", text: "💼 Practice 1 interview question today" },
  { id: "phrase_idiom", text: "📚 Learn 1 phrase + 1 idiom with meaning & example" }
];

const SUNDAY_TASKS = [
  { id: "sun_dress", text: "👔 Formal dress pehno" },
  { id: "sun_camera", text: "📹 Camera ON" },
  { id: "sun_interview", text: "🎙️ 20min Mock Interview - Tech + HR mix" }
];

export default function EnglishMaster() {
  const [streak, setStreak] = useState(0);
  const [checks, setChecks] = useState({});
  const [expandedTask, setExpandedTask] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [todaysQuestion, setTodaysQuestion] = useState(null);
  const [todaysPhrase, setTodaysPhrase] = useState(null);
  const [todaysIdiom, setTodaysIdiom] = useState(null);
  const [challengeDay, setChallengeDay] = useState(1);
  
  const today = new Date();
  const dayOfWeek = today.getDay();
  const dayType = dayOfWeek === 0 ? "sunday" : (dayOfWeek % 2 === 1 ? "day1" : "day2");
  
  // Calculate challenge day based on streak or start date
  useEffect(() => {
    // You can modify this logic based on when user started
    // For now, using streak + 1 (if streak > 0)
    const startDate = localStorage.getItem("englishStartDate");
    if (startDate) {
      const start = new Date(startDate);
      const diffTime = Math.abs(today - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setChallengeDay(Math.min(diffDays, 93));
    } else {
      localStorage.setItem("englishStartDate", today.toDateString());
      setChallengeDay(1);
    }
  }, []);

  // Get tongue twister for today
  const twisterDay = dayOfWeek === 0 ? 6 : dayOfWeek;
  const tongueTwister = TONGUE_TWISTERS.find(t => t.day === twisterDay) || TONGUE_TWISTERS[0];

  // Get interview question based on day
  useEffect(() => {
    const qIndex = (challengeDay - 1) % INTERVIEW_QUESTIONS.length;
    setTodaysQuestion(INTERVIEW_QUESTIONS[qIndex]);
    
    // Get phrase for today's challenge day
    const phraseForDay = DAILY_PHRASES.find(p => p.day === challengeDay);
    setTodaysPhrase(phraseForDay || DAILY_PHRASES[0]);
    
    // Get idiom for today's challenge day
    const idiomForDay = DAILY_IDIOMS.find(i => i.day === challengeDay);
    setTodaysIdiom(idiomForDay || DAILY_IDIOMS[0]);
  }, [challengeDay]);

  // Get tasks based on day
  let tasks = [];
  if (dayType === "sunday") tasks = SUNDAY_TASKS;
  else if (dayType === "day1") tasks = DAY1_TASKS;
  else tasks = DAY2_TASKS;

  const todayStr = today.toDateString();
  const todaysChecks = checks[todayStr] || {};
  
  const completedCount = tasks.filter(t => todaysChecks[t.id]).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("englishMaster");
      if (saved) {
        const parsed = JSON.parse(saved);
        setChecks(parsed);
      }
    } catch (error) {
      console.error("Error loading English data:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Calculate streak based on completed tasks
  useEffect(() => {
    if (!isInitialized) return;
    
    const calculateStreak = () => {
      const completedDates = Object.keys(checks)
        .filter(date => {
          const dayData = checks[date];
          return dayData && Object.values(dayData).some(v => v === true);
        })
        .map(date => new Date(date).toDateString());
      
      const todayCompleted = completedDates.includes(todayStr);
      
      if (!todayCompleted) {
        setStreak(0);
        return;
      }
      
      let count = 1;
      let currentDate = new Date(today);
      
      for (let i = 1; i < 365; i++) {
        const prevDate = new Date(currentDate);
        prevDate.setDate(prevDate.getDate() - 1);
        const prevDateStr = prevDate.toDateString();
        
        if (completedDates.includes(prevDateStr)) {
          count++;
          currentDate = prevDate;
        } else {
          break;
        }
      }
      
      setStreak(count);
    };
    
    calculateStreak();
  }, [checks, todayStr, isInitialized]);

  // Save to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("englishMaster", JSON.stringify(checks));
  }, [checks, isInitialized]);

  const toggleTask = (taskId) => {
    setChecks(prev => ({
      ...prev,
      [todayStr]: {
        ...(prev[todayStr] || {}),
        [taskId]: !(prev[todayStr]?.[taskId] || false)
      }
    }));
  };

  const resetToday = () => {
    if (window.confirm("Reset today's English tasks?")) {
      setChecks(prev => {
        const updated = { ...prev };
        delete updated[todayStr];
        return updated;
      });
    }
  };

  // Get history for last 7 days
  const getHistory = () => {
    const history = [];
    const todayDate = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(todayDate);
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      const dayData = checks[dateStr];
      
      if (dayData) {
        const completed = Object.values(dayData).filter(v => v === true).length;
        const total = tasks.length;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        history.push({
          date: dateStr,
          progress: progress,
          completed: completed,
          total: total,
          hasData: completed > 0
        });
      } else {
        history.push({
          date: dateStr,
          progress: 0,
          completed: 0,
          total: 0,
          hasData: false
        });
      }
    }
    
    return history.reverse();
  };

  const history = getHistory();

  // Plant emoji based on streak
  const getPlantEmoji = () => {
    if (streak >= 60) return "🌳";
    if (streak >= 30) return "🌲";
    if (streak >= 15) return "🌿";
    if (streak >= 7) return "🌱";
    if (streak >= 3) return "🌰";
    return "🌰";
  };

  const getPlantStage = () => {
    if (streak >= 60) return "Fluent Speaker";
    if (streak >= 30) return "Confident";
    if (streak >= 15) return "Growing";
    if (streak >= 7) return "Sprout";
    if (streak >= 3) return "Seedling";
    return "Seed";
  };

  if (!isInitialized) {
    return <div className="english-master">Loading...</div>;
  }

  return (
    <div className="english-master">
      {/* Header with Day Number */}
      <div className="english-header">
        <div className="header-left">
          <span className="header-icon">🇬🇧</span>
          <h2>English 3 Month</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className="day-badge" style={{ background: 'var(--primary)' }}>Day {challengeDay}/93</span>
          <div className={`day-badge ${dayType}`}>
            {dayType === "sunday" ? "🎙️ Mock Sunday" : 
             dayType === "day1" ? "📘 Day 1" : "📗 Day 2"}
          </div>
        </div>
      </div>

      {/* Plant & Streak */}
      <div className="english-plant">
        <div className="plant-emoji">{getPlantEmoji()}</div>
        <div className="streak-info">
          <span className="streak-fire">🔥</span>
          <span className="streak-number">{streak}</span>
          <span className="streak-label">Day Streak</span>
        </div>
        <div className="plant-stage">{getPlantStage()}</div>
      </div>

      {/* Milestones */}
      <div className="english-milestones" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <h4>🏆 Milestones</h4>
        <div className="milestone-badges">
          {[7, 15, 30, 60, 93].map(days => (
            <div 
              key={days}
              className={`badge ${streak >= days ? 'unlocked' : 'locked'}`}
            >
              {streak >= days ? '🔥' : '🔒'} {days}d
            </div>
          ))}
        </div>
      </div>

      {/* Tongue Twister */}
      <div className="tongue-twister-card">
        <span className="twister-icon">🗣️</span>
        <div className="twister-content">
          <div className="twister-label">Today's Tongue Twister</div>
          <div className="twister-text">{tongueTwister.text}</div>
        </div>
      </div>

      {/* Daily Interview Question */}
      {todaysQuestion && dayType !== "sunday" && (
        <div className="interview-question-card" style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: 'linear-gradient(135deg, #667eea20, #764ba220)',
          borderRadius: 'var(--radius-lg)',
          borderLeft: '4px solid var(--primary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>💼</span>
            <h4 style={{ margin: 0, color: 'var(--text-h)' }}>Daily Interview Question - Day {challengeDay}</h4>
          </div>
          <p style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            "{todaysQuestion.question}"
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text)', opacity: 0.8 }}>
            Practice your answer today! Record yourself and improve.
          </p>
        </div>
      )}

      {/* Daily Phrase - Day Wise */}
      {todaysPhrase && dayType !== "sunday" && (
        <div className="phrase-card" style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: 'linear-gradient(135deg, #10b98120, #05966920)',
          borderRadius: 'var(--radius-lg)',
          borderLeft: '4px solid var(--success)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📚</span>
            <h4 style={{ margin: 0, color: 'var(--text-h)' }}>Daily Phrase - Day {todaysPhrase.day}</h4>
          </div>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--success)' }}>
            "{todaysPhrase.phrase}"
          </p>
          <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.3rem', color: 'var(--text-h)' }}>
            Meaning: {todaysPhrase.meaning}
          </p>
          <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text)' }}>
            Example: {todaysPhrase.example}
          </p>
        </div>
      )}

      {/* Daily Idiom - Day Wise */}
      {todaysIdiom && dayType !== "sunday" && (
        <div className="idiom-card" style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: 'linear-gradient(135deg, #f59e0b20, #d9770620)',
          borderRadius: 'var(--radius-lg)',
          borderLeft: '4px solid var(--warning)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🔤</span>
            <h4 style={{ margin: 0, color: 'var(--text-h)' }}>Daily Idiom - Day {todaysIdiom.day}</h4>
          </div>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--warning)' }}>
            "{todaysIdiom.idiom}"
          </p>
          <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.3rem', color: 'var(--text-h)' }}>
            Meaning: {todaysIdiom.meaning}
          </p>
          <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text)' }}>
            Example: {todaysIdiom.example}
          </p>
        </div>
      )}

      {/* Progress */}
      <div className="english-progress" style={{ marginTop: '1rem' }}>
        <div className="progress-header">
          <span>Today's Progress</span>
          <span>{completedCount}/{tasks.length} ({progressPercent}%)</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Tasks */}
      <div className="english-tasks" style={{ marginTop: '1rem' }}>
        <h3>Today's Tasks</h3>
        <div className="tasks-list">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`task-item ${todaysChecks[task.id] ? 'completed' : ''}`}
              onClick={() => toggleTask(task.id)}
              onMouseEnter={() => setExpandedTask(task.id)}
              onMouseLeave={() => setExpandedTask(null)}
            >
              <span className="task-checkbox">
                {todaysChecks[task.id] ? '✅' : '⬜'}
              </span>
              <span className="task-text">
                {expandedTask === task.id ? task.text : 
                 task.text.length > 40 ? task.text.substring(0, 40) + '...' : task.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* History Toggle Button */}
      <button 
        className="history-toggle-btn"
        onClick={() => setShowHistory(!showHistory)}
        style={{ marginTop: '1rem' }}
      >
        {showHistory ? '📋 Hide History' : '📋 Show Last 7 Days Progress'}
      </button>

      {/* History Section */}
      {showHistory && (
        <div className="tasks-history" style={{ marginTop: '0.5rem' }}>
          <h4>📊 Daily Progress History</h4>
          <div className="history-list">
            {history.map((day, index) => (
              <div key={index} className="history-item">
                <span className="history-date">
                  {new Date(day.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
                <div className="history-progress">
                  <div className="history-progress-bar">
                    <div 
                      className="history-progress-fill" 
                      style={{ width: `${day.progress}%` }}
                    />
                  </div>
                  <span className="history-stats">
                    {day.hasData ? `${day.completed}/${day.total}` : 'No data'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reset Button */}
      <div className="english-footer" style={{ marginTop: '1.5rem' }}>
        <button onClick={resetToday} className="reset-btn">
          🔄 Reset Today
        </button>
      </div>
    </div>
  );
}