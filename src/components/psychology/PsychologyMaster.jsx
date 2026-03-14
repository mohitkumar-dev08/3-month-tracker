
import { useState, useEffect } from "react";
// 1. DAILY PSYCHOLOGY TRICKS
const PSYCHOLOGY_TRICKS = [
  { day: 1, trick: "The Benjamin Franklin Effect", meaning: "Ask someone to do you a small favor - they'll like you more.", example1: "Ask a colleague to lend you a pen. They'll subconsciously think they like you.", example2: "Borrow a book from someone - they'll feel more connected to you." },
  { day: 2, trick: "Mirroring", meaning: "Subtly copy the other person's body language to build rapport.", example1: "If they lean forward, you lean forward after a few seconds.", example2: "Match their speaking pace - faster with fast talkers, slower with calm people." },
  { day: 3, trick: "The Foot-in-the-Door Technique", meaning: "Start with a small request, then ask for something bigger.", example1: "Ask to borrow ₹10, then later ask for ₹100.", example2: "Get them to sign a petition, then ask for a donation." },
  { day: 4, trick: "The Door-in-the-Face Technique", meaning: "Start with a big request (they'll refuse), then ask for what you actually want.", example1: "Ask to borrow ₹5000, then ask for ₹500.", example2: "Ask for a 50% discount, then ask for 10% off." },
  { day: 5, trick: "The Zeigarnik Effect", meaning: "People remember unfinished tasks better. Leave things incomplete to stay on their mind.", example1: "In a conversation, pause mid-sentence - they'll remember you.", example2: "Send an email without finishing your point, they'll reply." },
  { day: 6, trick: "Cognitive Dissonance", meaning: "When actions don't match beliefs, people change beliefs to justify actions.", example1: "If someone helps you, they'll think 'I must like him' to justify helping.", example2: "Get someone to do you a favor - they'll convince themselves you're a good person." },
  { day: 7, trick: "The Pratfall Effect", meaning: "Showing small flaws makes you more likable.", example1: "Admit a small mistake - people will find you more relatable.", example2: "Spill coffee slightly - perfectionists seem unapproachable." },
  { day: 8, trick: "Social Proof", meaning: "People copy others' actions. Show that others are doing it.", example1: "Say 'Many people are buying this' to sell something.", example2: "Mention that others have agreed to your proposal." },
  { day: 9, trick: "Reciprocity", meaning: "Give something first - people feel obliged to return the favor.", example1: "Buy someone coffee - they'll help you later.", example2: "Share useful information before asking for help." },
  { day: 10, trick: "Scarcity Principle", meaning: "People want things that are rare or limited.", example1: "Say 'Only 2 left in stock' to increase desire.", example2: "Mention 'Limited time offer' to create urgency." },
  { day: 11, trick: "The Halo Effect", meaning: "One positive trait influences perception of other traits.", example1: "Dress well - people will assume you're smarter.", example2: "Smile more - people will think you're kinder." },
  { day: 12, trick: "Anchoring", meaning: "First number mentioned influences all subsequent judgments.", example1: "Quote a high price first, then a lower one seems reasonable.", example2: "In salary negotiation, let them say a number first." },
  { day: 13, trick: "The Peak-End Rule", meaning: "People judge experiences by the peak and the end.", example1: "End conversations on a high note - they'll remember you positively.", example2: "Make meetings end with good news." },
  { day: 14, trick: "Chunking", meaning: "Break information into small chunks for better memory.", example1: "Give 3 points instead of 10 - they'll remember more.", example2: "Phone numbers are chunked (123-456-7890) for a reason." },
  { day: 15, trick: "The Bystander Effect", meaning: "People are less likely to help when others are present.", example1: "If you need help, single out one person: 'You in the red shirt, help me!'", example2: "Don't say 'Someone call 911' - point at one person." },
  { day: 16, trick: "Loss Aversion", meaning: "People fear losses more than they value gains.", example1: "Say 'You'll lose ₹1000 if you don't act' rather than 'You'll save ₹1000'.", example2: "Frame gym membership as 'Don't lose your fitness' not 'Get fit'." },
  { day: 17, trick: "The Spotlight Effect", meaning: "People overestimate how much others notice them.", example1: "Don't worry about small mistakes - no one notices as much as you think.", example2: "That embarrassing moment? Others forgot it already." },
  { day: 18, trick: "Choice Paradox", meaning: "Too many choices lead to decision paralysis.", example1: "Offer 3 options instead of 10 - more likely to choose.", example2: "Restaurants with small menus are more successful." },
  { day: 19, trick: "The IKEA Effect", meaning: "People value things more if they built them.", example1: "Let customers customize products - they'll value them more.", example2: "Involve team in planning - they'll own the project." },
  { day: 20, trick: "Subliminal Priming", meaning: "Exposure to one stimulus influences response to another.", example1: "Show images of success before a presentation - you'll perform better.", example2: "Play upbeat music before a creative task." },
  { day: 21, trick: "The Mere Exposure Effect", meaning: "People develop preference for things just because they're familiar.", example1: "See someone often? You'll start liking them more.", example2: "Advertisements work because you see them repeatedly." },
  { day: 22, trick: "Reactance", meaning: "When freedom is threatened, people want it more.", example1: "Say 'You probably won't be interested' - they'll get interested.", example2: "Forbidden fruit tastes sweeter." },
  { day: 23, trick: "The Pygmalion Effect", meaning: "Higher expectations lead to better performance.", example1: "Tell someone 'I know you can do this' - they'll try harder.", example2: "Teachers' expectations affect students' grades." },
  { day: 24, trick: "The Hawthorne Effect", meaning: "People perform better when watched.", example1: "Tell your team 'I'm tracking progress' - productivity increases.", example2: "Working out in a gym feels harder than alone?" },
  { day: 25, trick: "The Dunning-Kruger Effect", meaning: "Incompetent people overestimate themselves, experts underestimate.", example1: "Newbies think they know everything - be patient.", example2: "Experts say 'I don't know much' - they actually know a lot." },
  { day: 26, trick: "The Barnum Effect", meaning: "People believe vague, general statements about themselves.", example1: "Horoscopes work because statements are universal.", example2: "Cold reading techniques in palmistry." },
  { day: 27, trick: "The Sunk Cost Fallacy", meaning: "People continue something because they've invested in it.", example1: "Finish a bad movie because you paid for tickets.", example2: "Stay in bad relationships because of time invested." },
  { day: 28, trick: "The Endowment Effect", meaning: "People value things more once they own them.", example1: "Test drive a car - you'll want to buy it.", example2: "Free trials lead to purchases." },
  { day: 29, trick: "The Framing Effect", meaning: "Decisions influenced by how information is presented.", example1: "90% survival sounds better than 10% death rate.", example2: "Say 'You'll save ₹500' not 'You'll pay ₹500 less'." },
  { day: 30, trick: "The Decoy Effect", meaning: "Add a third option to make one option more appealing.", example1: "Small popcorn ₹100, Large ₹200 - add Medium ₹190, Large seems better.", example2: "Magazine subscriptions use this - print + digital seems best." },
  { day: 31, trick: "The Contrast Principle", meaning: "Things look different compared to others.", example1: "Sell expensive suit first, then tie - tie seems cheap.", example2: "House looks bigger after seeing a small apartment." },
  { day: 32, trick: "The Authority Principle", meaning: "People follow experts.", example1: "Wear a doctor's coat - people trust you more.", example2: "Quote experts to make your point stronger." },
  { day: 33, trick: "The Liking Principle", meaning: "People say yes to people they like.", example1: "Find genuine similarities - same hometown, same hobby.", example2: "Give compliments - people like those who like them." },
  { day: 34, trick: "The Consistency Principle", meaning: "People stick to what they've said or done.", example1: "Get them to agree to a small thing first.", example2: "Ask 'Are you an environmentally conscious person?' then ask to recycle." },
  { day: 35, trick: "The Unity Principle", meaning: "People favor those in their group.", example1: "Use 'we' and 'us' instead of 'you' and 'I'.", example2: "Mention shared identity - 'We're both engineers'." },
  { day: 36, trick: "The Contrast Effect", meaning: "Perception changes based on comparison.", example1: "Show ugly designs first, then your good design.", example2: "Interview average candidates before the good one." },
  { day: 37, trick: "The Isolation Effect", meaning: "Unique items stand out and are remembered.", example1: "Wear a red tie in a sea of black suits.", example2: "Make your website different from competitors." },
  { day: 38, trick: "The Picture Superiority Effect", meaning: "Images are remembered better than words.", example1: "Use diagrams in presentations, not bullet points.", example2: "Add photos to your resume - more memorable." },
  { day: 39, trick: "The Serial Position Effect", meaning: "People remember first and last items best.", example1: "Put key points at start and end of your speech.", example2: "In interviews, first and last impressions matter most." },
  { day: 40, trick: "The Testing Effect", meaning: "Retrieving information improves memory.", example1: "Quiz yourself instead of just reading.", example2: "Practice interviews before the real one." },
  { day: 41, trick: "The Spacing Effect", meaning: "Learn in short sessions over time, not one long session.", example1: "Study 30 min daily instead of 5 hours on Sunday.", example2: "Practice English 20 min every day." },
  { day: 42, trick: "The Generation Effect", meaning: "Creating information yourself improves memory.", example1: "Write your own examples, don't just read.", example2: "Explain concepts in your own words." },
  { day: 43, trick: "The Enactment Effect", meaning: "Doing actions helps remember them.", example1: "Role-play interview answers instead of writing.", example2: "Practice presentations out loud." },
  { day: 44, trick: "The Self-Reference Effect", meaning: "Information related to self is remembered better.", example1: "Relate new concepts to your own life.", example2: "Use personal stories in conversations." },
  { day: 45, trick: "The Emotion Effect", meaning: "Emotional events are remembered vividly.", example1: "Create emotional moments in presentations.", example2: "Share stories that evoke feelings." },
  { day: 46, trick: "The Humor Effect", meaning: "Funny things are remembered better.", example1: "Start speeches with a relevant joke.", example2: "Use memes in learning materials." },
  { day: 47, trick: "The Rhyming Effect", meaning: "Rhyming phrases are easier to remember.", example1: "Create mnemonics that rhyme.", example2: "Advertisements use rhymes - 'Red Bull gives you wings'." },
  { day: 48, trick: "The Acronym Effect", meaning: "First letters form words - easy recall.", example1: "SMART goals - Specific, Measurable, Achievable...", example2: "VIBGYOR for rainbow colors." },
  { day: 49, trick: "The Method of Loci", meaning: "Visualize information in familiar places.", example1: "Remember shopping list by placing items in your house.", example2: "Associate speech points with rooms in your home." },
  { day: 50, trick: "The Storytelling Effect", meaning: "Stories are 22x more memorable than facts.", example1: "Don't list features - tell a story of how it helped someone.", example2: "Use customer success stories in sales." },
  { day: 51, trick: "The Metaphor Effect", meaning: "Metaphors make abstract ideas concrete.", example1: "'Memory is like a library' helps understand how it works.", example2: "'Life is a journey' - easy to grasp." },
  { day: 52, trick: "The Analogy Effect", meaning: "Compare new to known for better understanding.", example1: "Electricity is like water flowing through pipes.", example2: "The brain is like a computer." },
  { day: 53, trick: "The Chunking Effect", meaning: "Group information into chunks.", example1: "Remember phone numbers as 987-654-3210.", example2: "Learn language in phrases, not words." },
  { day: 54, trick: "The Hierarchy Effect", meaning: "Organize information in levels.", example1: "Use headings and subheadings in documents.", example2: "Mind maps show relationships." },
  { day: 55, trick: "The Color Effect", meaning: "Colors affect perception and memory.", example1: "Use red for urgency, blue for trust.", example2: "Highlight key points in yellow." },
  { day: 56, trick: "The Font Effect", meaning: "Hard-to-read fonts improve memory.", example1: "Use slightly difficult fonts for study material.", example2: "Comic Sans is actually memorable (unfortunately)." },
  { day: 57, trick: "The Handwriting Effect", meaning: "Writing by hand improves memory.", example1: "Take notes with pen and paper, not laptop.", example2: "Journal daily to remember better." },
  { day: 58, trick: "The Drawing Effect", meaning: "Drawing information helps remember it.", example1: "Draw diagrams instead of writing notes.", example2: "Sketch concepts to understand them." },
  { day: 59, trick: "The Sleep Effect", meaning: "Sleep consolidates memory.", example1: "Study before sleep - remember better.", example2: "Nap after learning new skills." },
  { day: 60, trick: "The Exercise Effect", meaning: "Physical activity improves brain function.", example1: "Walk before creative work.", example2: "Exercise improves memory long-term." },
  { day: 61, trick: "The Hydration Effect", meaning: "Water improves cognitive function.", example1: "Drink water before exams - score better.", example2: "Dehydration causes brain fog." },
  { day: 62, trick: "The Caffeine Effect", meaning: "Caffeine improves alertness temporarily.", example1: "Coffee before presentation - more energetic.", example2: "Tea helps focus during study." },
  { day: 63, trick: "The Music Effect", meaning: "Music affects mood and performance.", example1: "Classical music helps focus.", example2: "Upbeat music energizes workouts." },
  { day: 64, trick: "The Nature Effect", meaning: "Nature walks improve creativity.", example1: "Take breaks in parks - better ideas.", example2: "Green spaces reduce stress." },
  { day: 65, trick: "The Temperature Effect", meaning: "Room temperature affects productivity.", example1: "Cooler rooms (20-22°C) best for focus.", example2: "Too hot = sleepy, too cold = distracted." },
  { day: 66, trick: "The Lighting Effect", meaning: "Natural light improves mood and work.", example1: "Sit near windows - more productive.", example2: "Blue light from screens disrupts sleep." },
  { day: 67, trick: "The Posture Effect", meaning: "Posture affects confidence.", example1: "Stand straight before interviews - feel confident.", example2: "Power poses increase testosterone." },
  { day: 68, trick: "The Breathing Effect", meaning: "Deep breathing reduces anxiety.", example1: "Breathe deeply before speaking.", example2: "4-7-8 breathing calms nerves." },
  { day: 69, trick: "The Smell Effect", meaning: "Scents trigger memories and emotions.", example1: "Use same perfume during study and exam.", example2: "Peppermint scent improves alertness." },
  { day: 70, trick: "The Touch Effect", meaning: "Physical touch builds trust.", example1: "Light handshake vs firm handshake.", example2: "Touch on shoulder shows empathy." },
  { day: 71, trick: "The Eye Contact Effect", meaning: "Eye contact builds connection.", example1: "Hold eye contact 60-70% of conversation.", example2: "Too much = creepy, too little = untrustworthy." },
  { day: 72, trick: "The Smile Effect", meaning: "Smiling makes you seem approachable.", example1: "Smile when meeting new people.", example2: "Even fake smiling improves mood." },
  { day: 73, trick: "The Nodding Effect", meaning: "Nodding makes people agree more.", example1: "Nod while listening - they'll keep talking.", example2: "People nod back unconsciously." },
  { day: 74, trick: "The Tilt Effect", meaning: "Head tilt shows interest and listening.", example1: "Tilt head slightly when someone speaks.", example2: "Dogs tilt heads - cute and attentive." },
  { day: 75, trick: "The Lean Effect", meaning: "Leaning forward shows engagement.", example1: "Lean in during important conversations.", example2: "Leaning back shows disinterest." },
  { day: 76, trick: "The Open Posture Effect", meaning: "Uncrossed arms = open to ideas.", example1: "Keep arms uncrossed in meetings.", example2: "Crossed arms = defensive." },
  { day: 77, trick: "The Steeple Effect", meaning: "Fingertips touching shows confidence.", example1: "Use steeple gesture when making a point.", example2: "Leaders use this gesture." },
  { day: 78, trick: "The Palms Up Effect", meaning: "Palms up = honesty, openness.", example1: "Show palms when explaining.", example2: "Palms down = authority." },
  { day: 79, trick: "The Foot Direction Effect", meaning: "Feet point where attention is.", example1: "See where feet point in conversations.", example2: "If feet point away, they want to leave." },
  { day: 80, trick: "The Mirror Touch Effect", meaning: "Touch yourself where they're hurt.", example1: "If they touch their face, you touch yours.", example2: "Builds subconscious rapport." },
  { day: 81, trick: "The Pause Effect", meaning: "Pauses make you seem thoughtful.", example1: "Pause 3 seconds before answering tough questions.", example2: "Pauses add weight to words." },
  { day: 82, trick: "The Lower Voice Effect", meaning: "Lower voice = more authority.", example1: "Speak slightly lower at end of sentences.", example2: "High pitch = nervous, low pitch = confident." },
  { day: 83, trick: "The Slow Speech Effect", meaning: "Speaking slowly = more persuasive.", example1: "Slow down for important points.", example2: "Fast talkers seem less trustworthy." },
  { day: 84, trick: "The Name Effect", meaning: "Using names builds connection.", example1: "Say their name when meeting.", example2: "Use name occasionally, not too much." },
  { day: 85, trick: "The Echo Effect", meaning: "Repeat last few words they said.", example1: "Them: 'I'm excited.' You: 'You're excited, tell me more.'", example2: "Shows you're listening." },
  { day: 86, trick: "The Label Effect", meaning: "Label emotions to calm them.", example1: "'You seem frustrated' - they feel understood.", example2: "Naming emotions reduces their intensity." },
  { day: 87, trick: "The Story Effect", meaning: "Share personal stories to connect.", example1: "Tell a relevant personal story.", example2: "Vulnerability builds trust." },
  { day: 88, trick: "The Vulnerability Effect", meaning: "Showing weakness makes you relatable.", example1: "Admit you don't know something.", example2: "Share past failures - inspiring." },
  { day: 89, trick: "The Compliment Effect", meaning: "Genuine compliments build rapport.", example1: "Notice something specific to compliment.", example2: "Compliment behind their back - reaches them." },
  { day: 90, trick: "The Gift Effect", meaning: "Small gifts create obligation.", example1: "Bring coffee for colleagues.", example2: "Give without expecting return - they'll remember." },
  { day: 91, trick: "The Help Effect", meaning: "Ask for small help - they'll like you.", example1: "Ask for directions - they'll feel helpful.", example2: "Borrow a pen - builds connection." },
  { day: 92, trick: "The Thank You Effect", meaning: "Thank you notes strengthen relationships.", example1: "Send thank you email after meetings.", example2: "Handwritten notes are powerful." },
  { day: 93, trick: "The Follow-up Effect", meaning: "Following up shows you care.", example1: "Check in after conversations.", example2: "Remember details they shared." }
];

// 2. DAILY COMMUNICATION SKILLS TIPS
const COMMUNICATION_TIPS = [
  { day: 1, tip: "Active Listening", meaning: "Listen to understand, not to reply.", example1: "Nod and say 'I see' while they speak.", example2: "Summarize what they said: 'So you're saying that...'" },
  { day: 2, tip: "Open-Ended Questions", meaning: "Questions that can't be answered with yes/no.", example1: "Instead of 'Did you like it?' ask 'What did you think about it?'", example2: "How did that make you feel?' not 'Were you angry?'" },
  { day: 3, tip: "The 3-Second Rule", meaning: "Pause 3 seconds before answering tough questions.", example1: "Think before you speak - shows confidence.", example2: "Avoids saying something you'll regret." },
  { day: 4, tip: "Tone Matters More Than Words", meaning: "How you say it matters more than what you say.", example1: "Same words can mean different things with tone.", example2: "Record yourself - check your tone." },
  { day: 5, tip: "Body Language Speaks Loudest", meaning: "55% of communication is body language.", example1: "Crossed arms = defensive.", example2: "Open posture = open to ideas." },
  { day: 6, tip: "Eye Contact Balance", meaning: "60-70% eye contact is ideal.", example1: "Too little = untrustworthy, too much = creepy.", example2: "Look away occasionally to avoid staring." },
  { day: 7, tip: "Use Their Name", meaning: "People love hearing their name.", example1: "Nice to meet you, [Name]'.", example2: "Use name 2-3 times in conversation." },
  { day: 8, tip: "Mirror Body Language", meaning: "Subtly copy their posture.", example1: "If they lean forward, you lean forward.", example2: "Match their energy level." },
  { day: 9, tip: "Avoid Interrupting", meaning: "Let them finish completely.", example1: "Count to 2 after they stop speaking.", example2: "They might just be pausing." },
  { day: 10, tip: "Ask Follow-up Questions", meaning: "Show you're interested.", example1: "You mentioned you like hiking - where do you go?", example2: "What happened next?'" },
  { day: 11, tip: "Use 'I' Statements", meaning: "Own your feelings instead of blaming.", example1: "I feel hurt when...' not 'You always...'", example2: "I need help with...' not 'This is too hard.'" },
  { day: 12, tip: "Avoid Absolute Words", meaning: "Never, always, everyone - rarely true.", example1: "You never listen' - they'll defend.", example2: "Say 'Sometimes I feel unheard' instead." },
  { day: 13, tip: "The Feedback Sandwich", meaning: "Positive - Constructive - Positive.", example1: "Great effort! Next time focus on... Overall, good work!'", example2: "Start and end with praise." },
  { day: 14, tip: "Be Specific", meaning: "Vague feedback is useless.", example1: "Good job' vs 'Your presentation had great data visualization'", example2: "Specifically, you could improve eye contact.'" },
  { day: 15, tip: "Focus on Behavior, Not Person", meaning: "Criticize actions, not character.", example1: "The report had errors' vs 'You're careless'", example2: "When you interrupt, I feel unheard' not 'You're rude'." },
  { day: 16, tip: "Acknowledge Emotions First", meaning: "Validate feelings before problem-solving.", example1: "I can see you're upset. Let's figure this out.", example2: "That must have been frustrating.'" },
  { day: 17, tip: "Use Silence", meaning: "Silence can be powerful.", example1: "After asking a question, wait.", example2: "They might fill the silence with truth." },
  { day: 18, tip: "Match Vocabulary Level", meaning: "Speak their language.", example1: "With experts, use terms; with beginners, simplify.", example2: "Don't use jargon with non-experts." },
  { day: 19, tip: "Avoid Filler Words", meaning: "Um, uh, like, you know - reduce credibility.", example1: "Pause instead of saying 'um'.", example2: "Record yourself and count fillers." },
  { day: 20, tip: "Vary Your Pace", meaning: "Speed up/slow down for effect.", example1: "Slow down for important points.", example2: "Speed up for excitement." },
  { day: 21, tip: "Use Pauses", meaning: "Pauses add weight to words.", example1: "Pause before key words.", example2: "Pause after questions." },
  { day: 22, tip: "Lower Your Pitch", meaning: "Lower voice = more authority.", example1: "Practice speaking from chest, not throat.", example2: "End sentences with same pitch, not higher." },
  { day: 23, tip: "Articulate Clearly", meaning: "Pronounce words fully.", example1: "Don't mumble - open mouth fully.", example2: "Practice tongue twisters." },
  { day: 24, tip: "Project Your Voice", meaning: "Speak loud enough to be heard.", example1: "Check if people at back can hear.", example2: "Breathe from diaphragm." },
  { day: 25, tip: "Smile When Speaking", meaning: "Smile affects your voice.", example1: "People can hear smile on phone.", example2: "Smiling makes you sound friendly." },
  { day: 26, tip: "Use Gestures", meaning: "Hand gestures help explain.", example1: "Show size with hands.", example2: "Point when saying 'here'." },
  { day: 27, tip: "Avoid Fidgeting", meaning: "Fidgeting shows nervousness.", example1: "Keep hands still - hold a pen if needed.", example2: "Don't play with hair or jewelry." },
  { day: 28, tip: "Stand/Sit Straight", meaning: "Good posture = confidence.", example1: "Shoulders back, head high.", example2: "Slouching shows low confidence." },
  { day: 29, tip: "Lean In Slightly", meaning: "Shows interest and engagement.", example1: "Lean forward during important points.", example2: "Leaning back shows disinterest." },
  { day: 30, tip: "Keep Arms Uncrossed", meaning: "Open posture = open mind.", example1: "Arms crossed = defensive.", example2: "Hold something if needed." },
  { day: 31, tip: "Use Palms Up", meaning: "Palms up = honesty.", example1: "Show palms when explaining.", example2: "Palms down = commanding." },
  { day: 32, tip: "Nod While Listening", meaning: "Shows you're following.", example1: "Nod occasionally, not constantly.", example2: "People talk more when you nod." },
  { day: 33, tip: "Tilt Your Head", meaning: "Shows interest and curiosity.", example1: "Slight head tilt when listening.", example2: "Dogs do this - cute and attentive." },
  { day: 34, tip: "Match Their Energy", meaning: "Mirror their enthusiasm level.", example1: "If excited, match excitement.", example2: "If calm, match calmness." },
  { day: 35, tip: "Don't Multitask", meaning: "Give full attention.", example1: "Phone down during conversations.", example2: "Face them directly." },
  { day: 36, tip: "Summarize Key Points", meaning: "Show you understood.", example1: "So your main concerns are X and Y, right?'", example2: "Let me make sure I got this...'" },
  { day: 37, tip: "Ask Clarifying Questions", meaning: "When unclear, ask.", example1: "When you say 'soon', what does that mean?'", example2: "Can you give an example?'" },
  { day: 38, tip: "Don't Assume", meaning: "Check understanding, don't assume.", example1: "I thought you meant X, is that correct?'", example2: "Before reacting, ask what they meant." },
  { day: 39, tip: "Use 'And' Instead of 'But'", meaning: "'But' negates, 'and' adds.", example1: "I like your idea, and we need to consider...'", example2: "Good point, and here's another angle.'" },
  { day: 40, tip: "Avoid 'You Should'", meaning: "Sounds judgmental.", example1: "You could try...' instead.", example2: "Have you considered...'" },
  { day: 41, tip: "Use 'I Feel' Not 'You Make Me Feel'", meaning: "Own your emotions.", example1: "I feel frustrated' not 'You frustrate me'", example2: "I feel ignored' not 'You ignore me'." },
  { day: 42, tip: "Give Specific Compliments", meaning: "Vague = fake, specific = genuine.", example1: "Great presentation' vs 'Your data slides were very clear'", example2: "I loved how you handled that question.'" },
  { day: 43, tip: "Compliment Behind Their Back", meaning: "It will reach them.", example1: "Tell their friend you admire them.", example2: "They'll hear and trust it more." },
  { day: 44, tip: "Accept Compliments Graciously", meaning: "Just say thank you.", example1: "Thank you, I appreciate that.'", example2: "Don't deflect or diminish." },
  { day: 45, tip: "Apologize When Wrong", meaning: "Quick apology builds trust.", example1: "I was wrong about that, sorry.'", example2: "My mistake, let me fix it.'" },
  { day: 46, tip: "Don't Over-Apologize", meaning: "Sorry for everything = low confidence.", example1: "Don't say sorry for asking questions.", example2: "Save sorry for real mistakes." },
  { day: 47, tip: "Thank You Notes", meaning: "Handwritten notes are powerful.", example1: "Thank you for your time yesterday.'", example2: "I really appreciated your advice.'" },
  { day: 48, tip: "Remember Small Details", meaning: "Shows you care.", example1: "How was your daughter's recital?'", example2: "You mentioned you like hiking - find any good trails?'" },
  { day: 49, tip: "Bring Up Past Conversations", meaning: "Shows you listened.", example1: "Last time you mentioned you were working on X, how's that going?'", example2: "You said you'd read that book - was it good?'" },
  { day: 50, tip: "Ask About Their Interests", meaning: "People love talking about themselves.", example1: "What do you enjoy doing outside work?'", example2: "Any good shows you're watching?'" },
  { day: 51, tip: "Share About Yourself", meaning: "Reciprocity in sharing.", example1: "They share, you share similar.", example2: "Builds connection through similarity." },
  { day: 52, tip: "Find Common Ground", meaning: "Shared interests build rapport.", example1: "You like hiking? Me too! Where do you go?'", example2: "Oh, you're from Delhi? I lived there for 5 years.'" },
  { day: 53, tip: "Use Humor Wisely", meaning: "Self-deprecating humor works best.", example1: "I once did something stupid...' (relatable)", example2: "Don't make fun of others." },
  { day: 54, tip: "Know When to Be Serious", meaning: "Read the room.", example1: "If they're serious, match seriousness.", example2: "Jokes at wrong time = awkward." },
  { day: 55, tip: "Read the Room", meaning: "Adjust to the group mood.", example1: "If everyone is quiet, don't be loud.", example2: "Match the energy level." },
  { day: 56, tip: "Don't Overshare", meaning: "Too much too soon = uncomfortable.", example1: "Wait for them to share first.", example2: "Match their level of sharing." },
  { day: 57, tip: "Respect Personal Space", meaning: "Different cultures, different spaces.", example1: "Arm's length is usually safe.", example2: "Watch if they step back." },
  { day: 58, tip: "Watch for Cues to Leave", meaning: "Glancing at watch, stepping back.", example1: "If they look away repeatedly, wrap up.", example2: "End conversation before they do." },
  { day: 59, tip: "Have a Graceful Exit", meaning: "End conversations politely.", example1: "It was great talking to you, I should let you go.'", example2: "I need to grab some water, but let's continue later.'" },
  { day: 60, tip: "Introduce People Well", meaning: "Give context about each person.", example1: "Raj, this is Priya - she's also in marketing.'", example2: "Share something interesting about both." },
  { day: 61, tip: "Remember Names", meaning: "Use tricks to remember.", example1: "Repeat name immediately: 'Nice to meet you, Priya.'", example2: "Associate with something: 'Priya like Priyanka Chopra'." },
  { day: 62, tip: "If You Forget a Name", meaning: "Admit it gracefully.", example1: "I'm sorry, I've forgotten your name - please remind me.'", example2: "Don't pretend - it's obvious." },
  { day: 63, tip: "Use Formal Titles Initially", meaning: "Mr./Ms. until invited otherwise.", example1: "Nice to meet you, Mr. Sharma.'", example2: "If they say 'call me Raj', then use first name." },
  { day: 64, tip: "Match Their Formality", meaning: "Mirror their style.", example1: "If formal, be formal; if casual, be casual.", example2: "Don't be too casual with elders." },
  { day: 65, tip: "Don't Interrupt", meaning: "Let them finish completely.", example1: "Count to 2 after they stop.", example2: "They might just be pausing." },
  { day: 66, tip: "Don't Finish Their Sentences", meaning: "It's annoying, not helpful.", example1: "Let them find their words.", example2: "Even if you know what they'll say." },
  { day: 67, tip: "Don't Give Unsolicited Advice", meaning: "Ask if they want advice first.", example1: "Are you looking for suggestions or just venting?'", example2: "I have some ideas if you're interested.'" },
  { day: 68, tip: "Don't One-Up", meaning: "Don't make it about you.", example1: "They share a problem, you share a bigger one? Don't.", example2: "Just listen and empathize." },
  { day: 69, tip: "Don't Judge", meaning: "Everyone has different experiences.", example1: "That must have been hard for you.' not 'Why did you do that?'", example2: "Listen without judgment." },
  { day: 70, tip: "Don't Gossip", meaning: "If you gossip with them, you'll gossip about them.", example1: "If someone gossips to you, they'll gossip about you.", example2: "Change the subject politely." },
  { day: 71, tip: "Don't Talk About Others Behind Their Back", meaning: "It erodes trust.", example1: "If you talk about others, they think you'll talk about them.", example2: "Speak only positively about absent people." },
  { day: 72, tip: "Keep Confidential Information", meaning: "If they trust you, keep it.", example1: "Don't share what was told in confidence.", example2: "If you must, ask permission." },
  { day: 73, tip: "Be Reliable", meaning: "Do what you say you'll do.", example1: "If you say you'll call, call.", example2: "If you say you'll help, help." },
  { day: 74, tip: "Admit When You Don't Know", meaning: "It's okay to say 'I don't know'.", example1: "I'm not sure, but I'll find out.'", example2: "Pretending = lose trust." },
  { day: 75, tip: "Admit Mistakes", meaning: "Owning mistakes builds trust.", example1: "I made a mistake, here's how I'll fix it.'", example2: "Blame = defensive, admit = strength." },
  { day: 76, tip: "Ask for Help", meaning: "People like helping others.", example1: "Could you help me with this?'", example2: "Asking for help = they'll like you more." },
  { day: 77, tip: "Offer Help", meaning: "Before they ask, offer.", example1: "I noticed you're busy, can I help with anything?'", example2: "Let me know if you need assistance.'" },
  { day: 78, tip: "Follow Up", meaning: "Check in after conversations.", example1: "How did that meeting go?'", example2: "Did you get that resolved?'" },
  { day: 79, tip: "Remember Important Dates", meaning: "Birthdays, work anniversaries.", example1: "Happy birthday! Hope you have a great day.'", example2: "Congratulations on your work anniversary!'" },
  { day: 80, tip: "Celebrate Others' Success", meaning: "Genuinely happy for them.", example1: "That's amazing, congratulations!'", example2: "You deserve this success!'" },
  { day: 81, tip: "Support During Tough Times", meaning: "Be there when things go wrong.", example1: "I'm here if you need to talk.'", example2: "Let me know how I can help.'" },
  { day: 82, tip: "Be Present", meaning: "Focus on them, not your phone.", example1: "Phone away during conversations.", example2: "Make them feel heard." },
  { day: 83, tip: "Don't Check Phone", meaning: "It says 'you're not important'.", example1: "If you must, apologize and explain.", example2: "Keep phone out of sight." },
  { day: 84, tip: "Arrive on Time", meaning: "Late = disrespect.", example1: "Plan to arrive 5 min early.", example2: "If late, apologize and keep it short." },
  { day: 85, tip: "Dress Appropriately", meaning: "Dress for the occasion.", example1: "Formal for interviews, casual for coffee.", example2: "When in doubt, slightly overdress." },
  { day: 86, tip: "Groom Well", meaning: "Clean and tidy = respect.", example1: "Neat hair, clean nails.", example2: "Fresh breath matters." },
  { day: 87, tip: "Use Fragrance Lightly", meaning: "Strong perfume = headache.", example1: "One spray is enough.", example2: "No scent is better than too much." },
  { day: 88, tip: "Mind Your Breath", meaning: "Bad breath = bad impression.", example1: "Mint before meetings.", example2: "Stay hydrated." },
  { day: 89, tip: "Don't Eat Smelly Food Before Meetings", meaning: "Garlic/onion breath lingers.", example1: "Avoid onions before interviews.", example2: "Brush or use mouthwash after." },
  { day: 90, tip: "Keep Hands Clean", meaning: "Clean nails, no dirt.", example1: "People notice hands.", example2: "Handshake with clean hands." },
  { day: 91, tip: "Firm Handshake", meaning: "Not too hard, not too soft.", example1: "Web to web contact.", example2: "2-3 shakes then release." },
  { day: 92, tip: "Introduce Yourself Clearly", meaning: "Name clearly, smile.", example1: "Hi, I'm [Name], nice to meet you.'", example2: "Repeat their name after they say it." },
  { day: 93, tip: "End on a High Note", meaning: "Last impression matters.", example1: "It was great meeting you, hope we can talk again.'", example2: "Thanks for your time, have a great day!'" }
];

// 3. DAILY SOCIAL INTELLIGENCE TIPS
const SOCIAL_INTELLIGENCE = [
  { day: 1, tip: "Read the Room", meaning: "Understand group mood before speaking.", example1: "If everyone's serious, don't crack jokes.", example2: "Match energy level of the group." },
  { day: 2, tip: "Empathy First", meaning: "Understand feelings before fixing problems.", example1: "I see you're frustrated - tell me more.", example2: "Validate emotions: 'That must be hard.'" },
  { day: 3, tip: "Watch Non-Verbals", meaning: "Body language tells the truth.", example1: "Crossed arms = defensive.", example2: "Looking away = uncomfortable." },
  { day: 4, tip: "Mirror Emotions", meaning: "Match their emotional state.", example1: "If they're excited, be excited.", example2: "If they're calm, be calm." },
  { day: 5, tip: "Don't Take Things Personally", meaning: "Others' behavior is about them, not you.", example1: "Someone rude? They might be having a bad day.", example2: "Don't assume everything is about you." },
  { day: 6, tip: "Assume Good Intent", meaning: "Give benefit of doubt.", example1: "They probably didn't mean to offend.", example2: "Ask before assuming bad intent." },
  { day: 7, tip: "Apologize When Wrong", meaning: "Quick apology defuses conflict.", example1: "I was wrong, sorry.'", example2: "My mistake - let me fix it.'" },
  { day: 8, tip: "Don't Over-Apologize", meaning: "Sorry for everything = low confidence.", example1: "Save sorry for real mistakes.", example2: "Thank them instead: 'Thanks for waiting.'" },
  { day: 9, tip: "Give Genuine Compliments", meaning: "Specific, sincere compliments.", example1: "Great job on presentation' vs 'Your visuals were clear'", example2: "I admire how you handled that.'" },
  { day: 10, tip: "Accept Compliments Well", meaning: "Just say thank you.", example1: "Thank you, I appreciate that.'", example2: "Don't deflect or diminish." },
  { day: 11, tip: "Remember Names", meaning: "Use tricks to remember.", example1: "Repeat name immediately.", example2: "Associate with something familiar." },
  { day: 12, tip: "Remember Details", meaning: "Shows you care.", example1: "How was your trip to Goa?'", example2: "You mentioned your daughter's recital - how did it go?'" },
  { day: 13, tip: "Ask Open Questions", meaning: "Show interest in them.", example1: "What do you enjoy about your work?'", example2: "How did you get into that?'" },
  { day: 14, tip: "Listen More Than Talk", meaning: "You have two ears, one mouth.", example1: "Let them talk 70% of time.", example2: "Ask follow-up questions." },
  { day: 15, tip: "Don't Interrupt", meaning: "Let them finish.", example1: "Count to 2 after they stop.", example2: "They might just be pausing." },
  { day: 16, tip: "Don't Finish Sentences", meaning: "Let them find their words.", example1: "Even if you know what they'll say.", example2: "It's annoying, not helpful." },
  { day: 17, tip: "Don't Give Unsolicited Advice", meaning: "Ask first.", example1: "Are you looking for advice or just venting?'", example2: "I have some ideas if you're interested.'" },
  { day: 18, tip: "Don't One-Up", meaning: "Don't make it about you.", example1: "They share problem, you share bigger? Don't.", example2: "Just listen and empathize." },
  { day: 19, tip: "Don't Judge", meaning: "Everyone has different path.", example1: "That must have been hard' not 'Why'd you do that?'", example2: "Listen without judgment." },
  { day: 20, tip: "Don't Gossip", meaning: "If you gossip with them, you'll gossip about them.", example1: "Change subject when gossip starts.", example2: "Speak only positively about absent people." },
  { day: 21, tip: "Keep Secrets", meaning: "If they trust you, keep it.", example1: "Don't share what was told in confidence.", example2: "If you must, ask permission." },
  { day: 22, tip: "Be Reliable", meaning: "Do what you say.", example1: "If you say you'll call, call.", example2: "If you say you'll help, help." },
  { day: 23, tip: "Admit When You Don't Know", meaning: "It's okay to say 'I don't know'.", example1: "I'm not sure, I'll find out.'", example2: "Pretending loses trust." },
  { day: 24, tip: "Admit Mistakes", meaning: "Owning mistakes builds trust.", example1: "I made a mistake, here's how I'll fix it.'", example2: "Blame = weak, admit = strong." },
  { day: 25, tip: "Ask for Help", meaning: "People like helping.", example1: "Could you help me with this?'", example2: "Asking for help makes them like you." },
  { day: 26, tip: "Offer Help", meaning: "Before they ask, offer.", example1: "I noticed you're busy, can I help?'", example2: "Let me know if you need assistance.'" },
  { day: 27, tip: "Follow Up", meaning: "Check in after.", example1: "How did that meeting go?'", example2: "Did you get that resolved?'" },
  { day: 28, tip: "Remember Important Dates", meaning: "Birthdays, work anniversaries.", example1: "Happy birthday! Hope you have a great day.'", example2: "Congratulations on your work anniversary!'" },
  { day: 29, tip: "Celebrate Others' Success", meaning: "Be genuinely happy.", example1: "That's amazing, congratulations!'", example2: "You deserve this success!'" },
  { day: 30, tip: "Support During Tough Times", meaning: "Be there when things go wrong.", example1: "I'm here if you need to talk.'", example2: "Let me know how I can help.'" },
  { day: 31, tip: "Be Present", meaning: "Focus on them, not phone.", example1: "Phone away during conversations.", example2: "Make them feel heard." },
  { day: 32, tip: "Don't Check Phone", meaning: "It says 'you're not important'.", example1: "If must, apologize and explain.", example2: "Keep phone out of sight." },
  { day: 33, tip: "Arrive on Time", meaning: "Late = disrespect.", example1: "Plan to arrive 5 min early.", example2: "If late, apologize briefly." },
  { day: 34, tip: "Dress Appropriately", meaning: "Dress for occasion.", example1: "Formal for interviews, casual for coffee.", example2: "When doubt, slightly overdress." },
  { day: 35, tip: "Groom Well", meaning: "Clean and tidy = respect.", example1: "Neat hair, clean nails.", example2: "Fresh breath matters." },
  { day: 36, tip: "Use Fragrance Lightly", meaning: "Strong perfume = headache.", example1: "One spray is enough.", example2: "No scent better than too much." },
  { day: 37, tip: "Mind Your Breath", meaning: "Bad breath = bad impression.", example1: "Mint before meetings.", example2: "Stay hydrated." },
  { day: 38, tip: "Don't Eat Smelly Food Before Meetings", meaning: "Garlic/onion breath lingers.", example1: "Avoid onions before interviews.", example2: "Brush or use mouthwash after." },
  { day: 39, tip: "Keep Hands Clean", meaning: "Clean nails, no dirt.", example1: "People notice hands.", example2: "Handshake with clean hands." },
  { day: 40, tip: "Firm Handshake", meaning: "Not too hard, not too soft.", example1: "Web to web contact.", example2: "2-3 shakes then release." },
  { day: 41, tip: "Introduce Yourself Clearly", meaning: "Name clearly, smile.", example1: "Hi, I'm [Name], nice to meet you.'", example2: "Repeat their name after they say it." },
  { day: 42, tip: "Remember Introductions", meaning: "Introduce people well.", example1: "Raj, this is Priya - she's also in marketing.'", example2: "Share something interesting about both." },
  { day: 43, tip: "Use Names in Conversation", meaning: "People love hearing name.", example1: "Nice to meet you, Priya.'", example2: "Use name 2-3 times." },
  { day: 44, tip: "If You Forget a Name", meaning: "Admit gracefully.", example1: "I'm sorry, I've forgotten your name - please remind me.'", example2: "Don't pretend - it's obvious." },
  { day: 45, tip: "Use Formal Titles Initially", meaning: "Mr./Ms. until invited.", example1: "Nice to meet you, Mr. Sharma.'", example2: "If they say 'call me Raj', use first name." },
  { day: 46, tip: "Match Their Formality", meaning: "Mirror their style.", example1: "If formal, be formal; if casual, be casual.", example2: "Don't be too casual with elders." },
  { day: 47, tip: "Respect Personal Space", meaning: "Different cultures, different spaces.", example1: "Arm's length usually safe.", example2: "Watch if they step back." },
  { day: 48, tip: "Watch for Cues to Leave", meaning: "Glancing at watch, stepping back.", example1: "If they look away repeatedly, wrap up.", example2: "End conversation before they do." },
  { day: 49, tip: "Have a Graceful Exit", meaning: "End conversations politely.", example1: "It was great talking to you, I should let you go.'", example2: "I need to grab some water, but let's continue later.'" },
  { day: 50, tip: "Don't Overstay Welcome", meaning: "Leave before they want you to.", example1: "Watch for signs they're tired.", example2: "End on high note, not when bored." },
  { day: 51, tip: "Read Facial Expressions", meaning: "Face shows true feelings.", example1: "Furrowed brows = confused/angry.", example2: "Tight lips = stressed/withholding." },
  { day: 52, tip: "Understand Tone of Voice", meaning: "Tone conveys emotion.", example1: "Flat tone = bored/depressed.", example2: "High pitch = excited/nervous." },
  { day: 53, tip: "Notice Eye Contact", meaning: "Eyes reveal interest.", example1: "Dilated pupils = interested.", example2: "Looking away = uncomfortable." },
  { day: 54, tip: "Watch Hand Gestures", meaning: "Hands reveal emotions.", example1: "Open palms = honest.", example2: "Fidgeting = nervous." },
  { day: 55, tip: "Observe Posture", meaning: "Posture shows confidence.", example1: "Slouching = low confidence.", example2: "Leaning forward = interested." },
  { day: 56, tip: "Notice Feet Direction", meaning: "Feet point where attention is.", example1: "If feet point away, they want to leave.", example2: "If feet point toward you, engaged." },
  { day: 57, tip: "Watch for Mirroring", meaning: "Mirroring = rapport.", example1: "If they copy your gestures, connection.", example2: "You can mirror to build rapport." },
  { day: 58, tip: "Understand Micro-expressions", meaning: "Brief flashes of true emotion.", example1: "Quick smirk = contempt.", example2: "Brief eyebrow raise = surprise." },
  { day: 59, tip: "Notice Breathing Changes", meaning: "Breathing shows emotion.", example1: "Shallow breath = anxiety.", example2: "Deep sigh = relief/frustration." },
  { day: 60, tip: "Watch Skin Color Changes", meaning: "Blushing = embarrassment/shame.", example1: "Face reddens when angry.", example2: "Pale = fear/shock." },
  { day: 61, tip: "Observe Pupil Dilation", meaning: "Dilated = interest/attraction.", example1: "In low light, pupils dilate naturally.", example2: "Also dilate when interested." },
  { day: 62, tip: "Notice Lip Movements", meaning: "Lips reveal thoughts.", example1: "Lip biting = anxious.", example2: "Pursed lips = disagreement." },
  { day: 63, tip: "Watch Eyebrows", meaning: "Eyebrows reveal emotions.", example1: "Raised = surprise/question.", example2: "Knitted = confusion/anger." },
  { day: 64, tip: "Observe Head Position", meaning: "Head tilt = interest.", example1: "Head down = shame/sadness.", example2: "Head up = confidence." },
  { day: 65, tip: "Notice Shoulder Position", meaning: "Shoulders reveal tension.", example1: "Hunched = stressed.", example2: "Relaxed = comfortable." },
  { day: 66, tip: "Watch Arm Position", meaning: "Crossed arms = defensive.", example1: "Arms open = open to ideas.", example2: "Hands on hips = confident." },
  { day: 67, tip: "Observe Leg Position", meaning: "Crossed legs = defensive.", example1: "Legs open = confident.", example2: "Jiggling leg = nervous." },
  { day: 68, tip: "Watch Proximity", meaning: "How close they stand.", example1: "Too close = uncomfortable.", example2: "Too far = distant." },
  { day: 69, tip: "Notice Touch", meaning: "Touch builds connection.", example1: "Light touch on arm = empathy.", example2: "Too much touch = creepy." },
  { day: 70, tip: "Observe Grooming Gestures", meaning: "Smoothing hair = preening.", example1: "Adjusting tie = nervous.", example2: "Fixing makeup = self-conscious." },
  { day: 71, tip: "Watch for Barriers", meaning: "Objects between you.", example1: "Coffee cup on chest = barrier.", example2: "Crossed arms = barrier." },
  { day: 72, tip: "Notice Protective Gestures", meaning: "Touching neck = stress.", example1: "Hand over heart = defensive.", example2: "Touching face = uncertainty." },
  { day: 73, tip: "Observe Breathing Patterns", meaning: "Deep breath before speaking.", example1: "Sigh = frustration.", example2: "Holding breath = tension." },
  { day: 74, tip: "Watch Eye Blink Rate", meaning: "Fast blinking = stress.", example1: "Normal 15-20/min, stress = more.", example2: "Lying = blink less." },
  { day: 75, tip: "Notice Pupils", meaning: "Dilated = interest.", example1: "Can't control pupil dilation.", example2: "Genuine interest shows." },
  { day: 76, tip: "Observe Color Changes", meaning: "Redness = anger/embarrassment.", example1: "Face reddens when angry.", example2: "Pale = fear." },
  { day: 77, tip: "Watch Sweating", meaning: "Sweat = nervous.", example1: "Forehead sweat = anxiety.", example2: "Cold sweat = fear." },
  { day: 78, tip: "Notice Voice Changes", meaning: "Voice cracks = nervous.", example1: "Higher pitch = stress.", example2: "Clearing throat = uncomfortable." },
  { day: 79, tip: "Observe Word Choice", meaning: "Words reveal thoughts.", example1: "Hedge words = uncertain.", example2: "Absolute words = confident." },
  { day: 80, tip: "Watch Speech Pace", meaning: "Fast = excited/nervous.", example1: "Slow = thoughtful/uncertain.", example2: "Pauses = thinking." },
  { day: 81, tip: "Notice Filler Words", meaning: "Um, uh = nervous.", example1: "Like, you know = uncertain.", example2: "Fewer fillers = confident." },
  { day: 82, tip: "Observe Sentence Length", meaning: "Short sentences = stressed.", example1: "Long sentences = comfortable.", example2: "Trailing off = uncertain." },
  { day: 83, tip: "Watch for Contradictions", meaning: "Words vs body language.", example1: "Says 'fine' but arms crossed.", example2: "Body tells truth." },
  { day: 84, tip: "Notice Inconsistencies", meaning: "Emotion doesn't match words.", example1: "Smiling while angry = fake.", example2: "Crying while happy = overwhelmed." },
  { day: 85, tip: "Observe Reaction Time", meaning: "Slow response = lying/thinking.", example1: "Quick response = honest/rehearsed.", example2: "Pause before answering = considering." },
  { day: 86, tip: "Watch for Distraction", meaning: "Looking around = bored.", example1: "Checking phone = disinterested.", example2: "Eyes darting = nervous." },
  { day: 87, tip: "Notice Engagement", meaning: "Leaning in = interested.", example1: "Nodding = following.", example2: "Questions = engaged." },
  { day: 88, tip: "Observe Disengagement", meaning: "Leaning back = bored.", example1: "Looking away = disinterested.", example2: "Yawning = tired." },
  { day: 89, tip: "Watch for Agreement", meaning: "Nodding = agreement.", example1: "Saying 'yes' while nodding = genuine.", example2: "Saying 'yes' while shaking head = lying." },
  { day: 90, tip: "Notice Disagreement", meaning: "Head shake = disagreement.", example1: "Pursed lips = disagreement.", example2: "Crossed arms = disagree." },
  { day: 91, tip: "Observe Interest", meaning: "Leaning in = interested.", example1: "Questions = interested.", example2: "Eye contact = interested." },
  { day: 92, tip: "Watch for Boredom", meaning: "Glancing around = bored.", example1: "Doodling = bored.", example2: "Tapping fingers = bored." },
  { day: 93, tip: "Notice Comfort Level", meaning: "Relaxed posture = comfortable.", example1: "Open arms = comfortable.", example2: "Laughing = comfortable." }
];

// 4. DAILY PSYCHOLOGY WORDS
const PSYCHOLOGY_WORDS = [
  { day: 1, word: "Cognitive Dissonance", meaning: "Mental discomfort from conflicting beliefs.", example1: "Smoking despite knowing it's harmful causes dissonance.", example2: "Justifying cheating because 'everyone does it'." },
  { day: 2, word: "Confirmation Bias", meaning: "Seeking info that confirms existing beliefs.", example1: "Only reading news that supports your political views.", example2: "Ignoring evidence that contradicts your opinion." },
  { day: 3, word: "Dunning-Kruger Effect", meaning: "Incompetent people overestimate ability, experts underestimate.", example1: "New driver thinks they're amazing, expert driver is cautious.", example2: "Student who fails thinks they did well." },
  { day: 4, word: "Gaslighting", meaning: "Manipulating someone to doubt their reality.", example1: "I never said that, you're imagining things.'", example2: "You're too sensitive, it was just a joke.'" },
  { day: 5, word: "Love Bombing", meaning: "Overwhelming someone with affection to manipulate.", example1: "Constant texts, gifts early in relationship.", example2: "Saying 'I love you' too quickly." },
  { day: 6, word: "Narcissism", meaning: "Excessive self-interest, lack of empathy.", example1: "Always talking about themselves, never asking about you.", example2: "Taking credit for others' work." },
  { day: 7, word: "Gaslighting", meaning: "Making someone question their sanity.", example1: "That never happened, you're making it up.'", example2: "You're remembering it wrong.'" },
  { day: 8, word: "Projection", meaning: "Attributing your own feelings to others.", example1: "Accusing partner of cheating when you're tempted.", example2: "Saying 'you're angry' when you're actually angry." },
  { day: 9, word: "Rationalization", meaning: "Creating logical excuses for irrational behavior.", example1: "I cheated because everyone does it.'", example2: "I deserved that promotion more than her.'" },
  { day: 10, word: "Sublimation", meaning: "Channeling unacceptable impulses into acceptable actions.", example1: "Aggression into sports.", example2: "Sexual energy into art." },
  { day: 11, word: "Repression", meaning: "Unconsciously blocking painful memories.", example1: "Forgetting childhood trauma.", example2: "Not remembering a painful breakup." },
  { day: 12, word: "Suppression", meaning: "Consciously pushing away thoughts.", example1: "I won't think about that now.'", example2: "Focusing on work to avoid personal issues." },
  { day: 13, word: "Denial", meaning: "Refusing to accept reality.", example1: "I don't have a drinking problem.'", example2: "He'll change, I know it.'" },
  { day: 14, word: "Displacement", meaning: "Redirecting emotions to safer target.", example1: "Yelling at spouse after boss yelled at you.", example2: "Kicking the dog when angry." },
  { day: 15, word: "Regression", meaning: "Reverting to childlike behavior under stress.", example1: "Throwing tantrums as adult.", example2: "Clinging to comfort objects." },
  { day: 16, word: "Intellectualization", meaning: "Using logic to avoid emotions.", example1: "Analyzing why you're sad instead of feeling it.", example2: "Focusing on facts after loss." },
  { day: 17, word: "Reaction Formation", meaning: "Behaving opposite to true feelings.", example1: "Being overly nice to someone you dislike.", example2: "Preaching against something you're tempted by." },
  { day: 18, word: "Splitting", meaning: "Seeing things as all good or all bad.", example1: "She's perfect' then 'She's terrible'", example2: "Idealizing then devaluing people." },
  { day: 19, word: "Idealization", meaning: "Seeing someone as perfect.", example1: "New relationship energy - they can do no wrong.", example2: "Worshipping celebrities." },
  { day: 20, word: "Devaluation", meaning: "Seeing someone as worthless.", example1: "After breakup, they're the worst person ever.", example2: "Discarding people who disagree." },
  { day: 21, word: "Cognitive Bias", meaning: "Systematic pattern of deviation from norm.", example1: "We remember negative events more.", example2: "Overestimating our own abilities." },
  { day: 22, word: "Hindsight Bias", meaning: "I knew it all along' after event.", example1: "I knew that stock would crash.' (after it crashed)", example2: "I knew they'd break up.'" },
  { day: 23, word: "Self-Serving Bias", meaning: "Attributing success to self, failure to others.", example1: "I got promoted because I'm great.'", example2: "I failed because the test was unfair.'" },
  { day: 24, word: "Fundamental Attribution Error", meaning: "Overemphasizing personality, underemphasizing situation.", example1: "He's late because he's lazy' (not traffic).", example2: "She's rude' (not having a bad day)." },
  { day: 25, word: "Actor-Observer Bias", meaning: "We explain our actions by situation, others by personality.", example1: "I'm late because of traffic, he's late because he's careless.", example2: "I snapped because I'm stressed, she snapped because she's mean." },
  { day: 26, word: "Optimism Bias", meaning: "Overestimating positive outcomes.", example1: "I won't get cancer even though I smoke.", example2: "My business will succeed despite odds." },
  { day: 27, word: "Pessimism Bias", meaning: "Overestimating negative outcomes.", example1: "I'll fail the interview even though I'm qualified.", example2: "This relationship will end badly.'" },
  { day: 28, word: "Negativity Bias", meaning: "Negative events have more impact.", example1: "One criticism outweighs 10 compliments.", example2: "Remembering insults more than praise." },
  { day: 29, word: "Spotlight Effect", meaning: "Overestimating how much others notice us.", example1: "Everyone noticed my stain' - they didn't.", example2: "Thinking people remember your mistakes." },
  { day: 30, word: "Illusory Superiority", meaning: "Overestimating own qualities.", example1: "90% of drivers think they're above average.", example2: "Everyone thinks they're funnier than average." },
  { day: 31, word: "False Consensus Effect", meaning: "Overestimating how many agree with you.", example1: "Everyone thinks like me.'", example2: "My political views are common sense.'" },
  { day: 32, word: "False Uniqueness Effect", meaning: "Underestimating how many share your abilities.", example1: "I'm the only one who can do this.'", example2: "My problems are unique.'" },
  { day: 33, word: "Anchoring Bias", meaning: "Relying too much on first information.", example1: "First price offered influences negotiation.", example2: "First impression colors everything." },
  { day: 34, word: "Availability Heuristic", meaning: "Overestimating likelihood of easily remembered events.", example1: "Fear flying after hearing about crash.", example2: "Thinking shark attacks are common." },
  { day: 35, word: "Representativeness Heuristic", meaning: "Judging by stereotypes.", example1: "He's quiet, must be an introvert.'", example2: "She's good at math, must be Asian.'" },
  { day: 36, word: "Framing Effect", meaning: "Decisions influenced by presentation.", example1: "90% survival vs 10% death rate.", example2: "Buy now and save ₹100 vs Pay ₹100 less.'" },
  { day: 37, word: "Sunk Cost Fallacy", meaning: "Continuing because of past investment.", example1: "Finish bad movie because you paid.", example2: "Stay in bad relationship because of time invested." },
  { day: 38, word: "Loss Aversion", meaning: "Fearing losses more than valuing gains.", example1: "Upset losing ₹100 more than happy gaining ₹100.", example2: "Keep losing stocks rather than sell." },
  { day: 39, word: "Endowment Effect", meaning: "Valuing things more once you own them.", example1: "Price to sell higher than price to buy.", example2: "Test drive leads to purchase." },
  { day: 40, word: "Status Quo Bias", meaning: "Preferring things to stay same.", example1: "Keep current phone even if better exists.", example2: "Stay in job rather than change." },
  { day: 41, word: "Mere Exposure Effect", meaning: "Liking things just because familiar.", example1: "Ads work because you see them often.", example2: "Liking song more after hearing multiple times." },
  { day: 42, word: "Reciprocity", meaning: "Feeling obliged to return favors.", example1: "Free sample leads to purchase.", example2: "Helping someone who helped you." },
  { day: 43, word: "Social Proof", meaning: "Copying others' actions.", example1: "Choosing restaurant because it's crowded.", example2: "Laughing when others laugh." },
  { day: 44, word: "Authority Bias", meaning: "Trusting authority figures.", example1: "Doctor's advice followed blindly.", example2: "Police officer must be right.'" },
  { day: 45, word: "Scarcity Bias", meaning: "Valuing rare things more.", example1: "Limited edition sells fast.", example2: "Last one in stock' creates urgency." },
  { day: 46, word: "Liking Bias", meaning: "Agreeing with people we like.", example1: "Friend's product review trusted more.", example2: "Buy from salesperson we like." },
  { day: 47, word: "Consistency Bias", meaning: "Sticking to past commitments.", example1: "If you agree to small thing, you'll agree to bigger.", example2: "Public commitment harder to break." },
  { day: 48, word: "Foot-in-the-Door", meaning: "Small request leads to bigger.", example1: "Sign petition, then ask for donation.", example2: "Borrow pen, then borrow money." },
  { day: 49, word: "Door-in-the-Face", meaning: "Big request refused, then smaller accepted.", example1: "Ask ₹1000, then ₹100 seems reasonable.", example2: "Ask for 50% off, then 10% off accepted." },
  { day: 50, word: "That's-Not-All Technique", meaning: "Add bonuses before decision.", example1: "Buy this, and I'll throw in this free.'", example2: "And if you order now, you also get...'" },
  { day: 51, word: "Lowball Technique", meaning: "Get agreement, then increase cost.", example1: "Car price low, then add fees.", example2: "Hotel rate low, then add taxes." },
  { day: 52, word: "Bait-and-Switch", meaning: "Advertise cheap, sell expensive.", example1: "Ad for cheap laptop, 'out of stock', sell expensive.", example2: "Sale item 'unavailable', push regular price." },
  { day: 53, word: "Fear Appeals", meaning: "Using fear to persuade.", example1: "Insurance ads showing accidents.", example2: "Health campaigns showing disease." },
  { day: 54, word: "Guilt Appeals", meaning: "Using guilt to persuade.", example1: "Donate to starving children' ads.", example2: "You owe it to them' messages." },
  { day: 55, word: "Humor Appeals", meaning: "Using humor to persuade.", example1: "Funny commercials remembered more.", example2: "Humor makes brand likeable." },
  { day: 56, word: "Sex Appeals", meaning: "Using sex to sell.", example1: "Perfume ads with models.", example2: "Beer ads with attractive people." },
  { day: 57, word: "Emotional Appeals", meaning: "Appealing to emotions.", example1: "Sad music in charity ads.", example2: "Heartwarming stories in ads." },
  { day: 58, word: "Rational Appeals", meaning: "Using logic to persuade.", example1: "Features and benefits lists.", example2: "Comparison charts." },
  { day: 59, word: "Bandwagon Effect", meaning: "Everyone's doing it, so should you.", example1: "Millions of customers can't be wrong.'", example2: "Join the trend.'" },
  { day: 60, word: "Snob Effect", meaning: "Exclusive, not for everyone.", example1: "Limited membership available.'", example2: "Only for elite customers.'" },
  { day: 61, word: "Veblen Effect", meaning: "Higher price = higher desire.", example1: "Expensive wine tastes better? (perception)", example2: "Luxury goods priced high on purpose." },
  { day: 62, word: "Decoy Effect", meaning: "Third option makes one more appealing.", example1: "Small ₹100, Large ₹200 - add Medium ₹190, Large seems best.", example2: "Magazine subscriptions use this." },
  { day: 63, word: "Compromise Effect", meaning: "Choosing middle option.", example1: "Small, Medium, Large - most choose Medium.", example2: "Goldilocks principle - not too much, not too little." },
  { day: 64, word: "Default Effect", meaning: "Sticking with default option.", example1: " organ donation rates higher when opt-out.", example2: "Default settings rarely changed." },
  { day: 65, word: "Choice Paradox", meaning: "Too many choices = paralysis.", example1: "24 jam flavors - confused, buy none.", example2: "3 options - easier to choose." },
  { day: 66, word: "Paradox of Choice", meaning: "More choices = less satisfaction.", example1: "After choosing from many, wonder if better existed.", example2: "Fewer options = happier with choice." },
  { day: 67, word: "Hedonic Adaptation", meaning: "Returning to happiness baseline.", example1: "Lottery winners happy temporarily.", example2: "New car excitement fades." },
  { day: 68, word: "Hedonic Treadmill", meaning: "Always wanting more.", example1: "More money, more desires.", example2: "Never satisfied, always chasing." },
  { day: 69, word: "Flow State", meaning: "Complete immersion in activity.", example1: "Time flies when coding/playing music.", example2: "Losing self-consciousness in work." },
  { day: 70, word: "Peak-End Rule", meaning: "Judging experience by peak and end.", example1: "Vacation remembered by best moment and end.", example2: "Movie rated by climax and ending." },
  { day: 71, word: "Serial Position Effect", meaning: "Remembering first and last best.", example1: "Primacy and recency effect in memory.", example2: "First and last items on list remembered." },
  { day: 72, word: "Primacy Effect", meaning: "First items remembered best.", example1: "First person in interview remembered more.", example2: "Opening statements powerful." },
  { day: 73, word: "Recency Effect", meaning: "Last items remembered best.", example1: "Last words of speech remembered.", example2: "Final interview impression matters." },
  { day: 74, word: "Von Restorff Effect", meaning: "Unique items remembered.", example1: "Red dress in sea of black.", example2: "Bold text stands out." },
  { day: 75, word: "Picture Superiority Effect", meaning: "Images remembered better than words.", example1: "Infographics more memorable.", example2: "Visual aids in presentation." },
  { day: 76, word: "Self-Reference Effect", meaning: "Info related to self remembered better.", example1: "Relating concepts to own life.", example2: "Personal stories in conversation." },
  { day: 77, word: "Generation Effect", meaning: "Creating info helps memory.", example1: "Writing own examples vs reading.", example2: "Teaching others helps you learn." },
  { day: 78, word: "Testing Effect", meaning: "Retrieving info improves memory.", example1: "Practice tests better than re-reading.", example2: "Quiz yourself to remember." },
  { day: 79, word: "Spacing Effect", meaning: "Learning over time better than cramming.", example1: "30 min daily vs 5 hours Sunday.", example2: "Spaced repetition apps work." },
  { day: 80, word: "Massed Practice", meaning: "Cramming - less effective.", example1: "All-nighters before exam.", example2: "Short-term memory only." },
  { day: 81, word: "Distributed Practice", meaning: "Spaced learning - more effective.", example1: "Study over weeks.", example2: "Better long-term retention." },
  { day: 82, word: "Interleaving", meaning: "Mixing different topics while learning.", example1: "Alternate math, history, science.", example2: "Better than blocking one subject." },
  { day: 83, word: "Blocking", meaning: "Studying one topic at length.", example1: "Math for 3 hours straight.", example2: "Less effective than interleaving." },
  { day: 84, word: "Elaboration", meaning: "Adding meaning to info.", example1: "Connect new info to existing knowledge.", example2: "Create examples and stories." },
  { day: 85, word: "Dual Coding", meaning: "Using words and images together.", example1: "Diagram with labels.", example2: "Mind maps combine text and visuals." },
  { day: 86, word: "Chunking", meaning: "Grouping info into chunks.", example1: "Phone numbers 987-654-3210.", example2: "Learning phrases not words." },
  { day: 87, word: "Mnemonics", meaning: "Memory aids.", example1: "VIBGYOR for rainbow colors.", example2: "PEMDAS for math order." },
  { day: 88, word: "Method of Loci", meaning: "Memory palace technique.", example1: "Associate items with places in house.", example2: "Ancient Greek memory technique." },
  { day: 89, word: "Peg Word System", meaning: "Rhyming pegs for numbers.", example1: "One is bun, two is shoe...", example2: "Associate items with pegs." },
  { day: 90, word: "Story Method", meaning: "Create story to remember list.", example1: "Grocery list as story.", example2: "Stories 22x more memorable." },
  { day: 91, word: "Keyword Method", meaning: "For learning languages.", example1: "Spanish 'pan' (bread) - pan sounds like 'pan'", example2: "Associate foreign word with English word." },
  { day: 92, word: "Acronyms", meaning: "First letters form word.", example1: "SMART goals.", example2: "NASA, AIDS." },
  { day: 93, word: "Acrostics", meaning: "First letters form sentence.", example1: "My Very Educated Mother Just Served Us Noodles (planets)", example2: "Sentence to remember order." }
];

// 5. COMMON PHRASES USED BY MANIPULATORS
const MANIPULATOR_PHRASES = [
  { day: 1, phrase: "You're too sensitive", meaning: "Invalidates your feelings, makes you doubt yourself.", example1: "After hurting you: 'You're too sensitive, it was just a joke.'", example2: "When you express hurt: 'You're overreacting.'" },
  { day: 2, phrase: "If you really loved me, you would...", meaning: "Using love as leverage for compliance.", example1: "If you loved me, you'd lend me money.", example2: "If you cared, you'd do this for me.'" },
  { day: 3, phrase: "I'm the only one who truly understands you", meaning: "Isolating you from others.", example1: "Your friends don't get you like I do.", example2: "Only I know what's best for you.'" },
  { day: 4, phrase: "You're imagining things", meaning: "Gaslighting - making you doubt reality.", example1: "I never said that, you're imagining it.", example2: "That never happened, you're making it up.'" },
  { day: 5, phrase: "It's for your own good", meaning: "Justifying controlling behavior.", example1: "I'm controlling your money for your own good.", example2: "I'm harsh because I want what's best for you.'" },
  { day: 6, phrase: "You made me do this", meaning: "Blaming you for their actions.", example1: "I wouldn't yell if you didn't provoke me.", example2: "See what you made me do?'" },
  { day: 7, phrase: "I'm sorry you feel that way", meaning: "Non-apology - doesn't take responsibility.", example1: "Not 'I'm sorry I hurt you', but 'sorry you feel hurt'.", example2: "Deflects blame onto your feelings." },
  { day: 8, phrase: "You're crazy/paranoid", meaning: "Labeling you to dismiss concerns.", example1: "You're paranoid, no one's cheating.", example2: "You're crazy to think that.'" },
  { day: 9, phrase: "Everyone agrees with me", meaning: "Using false consensus to pressure you.", example1: "Everyone thinks you're wrong.", example2: "Nobody else has a problem with it.'" },
  { day: 10, phrase: "I'm just being honest", meaning: "Excuse for being cruel.", example1: "You're fat - I'm just being honest.", example2: "Your work is terrible - just being honest.'" },
  { day: 11, phrase: "You owe me", meaning: "Creating false debt.", example1: "After helping once, 'you owe me forever'.", example2: "I did this for you, now you owe me.'" },
  { day: 12, phrase: "Nobody will believe you", meaning: "Isolating, making you feel powerless.", example1: "Go ahead, tell them - they'll think you're crazy.", example2: "Who would believe someone like you?'" },
  { day: 13, phrase: "I was just joking", meaning: "Retreating after hurtful comment.", example1: "Says something cruel, then 'can't you take a joke?'", example2: "Testing boundaries with 'jokes'." },
  { day: 14, phrase: "You always/never...", meaning: "Absolute statements to attack.", example1: "You never listen to me.", example2: "You always mess things up.'" },
  { day: 15, phrase: "After everything I've done for you", meaning: "Guilt-tripping with past favors.", example1: "I sacrificed so much, and this is how you repay me?", example2: "After all I've given you...'" },
  { day: 16, phrase: "You're just like your [negative comparison]", meaning: "Insulting by comparison.", example1: "You're just like your lazy father.", example2: "You're as selfish as your ex.'" },
  { day: 17, phrase: "I didn't mean it that way", meaning: "Deflecting after hurtful comment.", example1: "Says something mean, then 'you misinterpreted'.", example2: "That's not what I meant.'" },
  { day: 18, phrase: "You're too controlling/jealous/insecure", meaning: "Projecting their issues onto you.", example1: "When you question their behavior, 'you're so insecure'.", example2: "You're too controlling' when you set boundaries." },
  { day: 19, phrase: "If you leave, I'll hurt myself", meaning: "Emotional blackmail to keep you.", example1: "Threatening self-harm if you end relationship.", example2: "I can't live without you.'" },
  { day: 20, phrase: "You're the only one who can help me", meaning: "Creating dependency.", example1: "Only you understand me, only you can save me.", example2: "I need you, please don't leave.'" },
  { day: 21, phrase: "Why do you always make me angry?", meaning: "Blaming you for their anger.", example1: "You provoke me, that's why I get angry.", example2: "It's your fault I lost control.'" },
  { day: 22, phrase: "I'm the victim here", meaning: "Playing victim to avoid responsibility.", example1: "After hurting you, 'why are you being so mean to me?'", example2: "I'm the one suffering, not you.'" },
  { day: 23, phrase: "You're overreacting", meaning: "Minimizing your feelings.", example1: "You're making a big deal out of nothing.", example2: "Calm down, it's not that serious.'" },
  { day: 24, phrase: "I was just trying to help", meaning: "Defense after unwanted interference.", example1: "Interferes, then 'I was just trying to help'.", example2: "You should be grateful, not angry.'" },
  { day: 25, phrase: "You're so selfish", meaning: "Attacking when you don't comply.", example1: "When you say no: 'you're so selfish'.", example2: "Only thinking about yourself, as always.'" },
  { day: 26, phrase: "I gave you the best years of my life", meaning: "Guilt-tripping about time invested.", example1: "I wasted my youth on you.", example2: "After all these years, this is how you treat me?'" },
  { day: 27, phrase: "You're just like everyone else", meaning: "Isolating, making you feel ordinary.", example1: "I thought you were different, but you're just like them.", example2: "Everyone leaves eventually.'" },
  { day: 28, phrase: "Fine, do what you want", meaning: "Passive-aggressive surrender.", example1: "Says 'fine' but with anger, then silent treatment.", example2: "Do whatever, I don't care.' (but clearly cares)" },
  { day: 29, phrase: "I'm not angry (while clearly angry)", meaning: "Lying about emotions, confusing you.", example1: "Clearly furious, but says 'I'm fine'.", example2: "Denying anger while punishing you." },
  { day: 30, phrase: "You know what you did", meaning: "Vague accusation, makes you guess.", example1: "When you ask what's wrong: 'you know'.", example2: "I'm upset and you should know why.'" },
  { day: 31, phrase: "I'm disappointed in you", meaning: "Using disappointment to control.", example1: "I expected better from you.", example2: "You've let me down.'" },
  { day: 32, phrase: "After all I sacrificed", meaning: "Guilt-tripping with past sacrifices.", example1: "I gave up my career for you, and this is thanks?", example2: "I sacrificed everything for this family.'" },
  { day: 33, phrase: "You're being dramatic", meaning: "Dismissing your emotions.", example1: "It's not that bad, you're being dramatic.", example2: "Stop making a scene.'" },
  { day: 34, phrase: "Nobody else would put up with you", meaning: "Lowering self-esteem to keep you.", example1: "You're lucky I tolerate you.", example2: "Who else would want someone like you?'" },
  { day: 35, phrase: "I'm only saying this because I care", meaning: "Excuse for criticism.", example1: "I'm only telling you this for your own good.", example2: "If I didn't care, I wouldn't say anything.'" },
  { day: 36, phrase: "You're so lucky to have me", meaning: "Making you feel indebted.", example1: "Most people would have left by now.", example2: "You should be grateful I stay.'" },
  { day: 37, phrase: "I never said that", meaning: "Gaslighting - denying past statements.", example1: "Denies promise made earlier.", example2: "You must have misunderstood.'" },
  { day: 38, phrase: "You're misremembering", meaning: "Making you doubt memory.", example1: "That's not how it happened, you're misremembering.", example2: "Your memory is faulty.'" },
  { day: 39, phrase: "That's not what happened", meaning: "Rewriting history.", example1: "Denies events you clearly remember.", example2: "Offers alternative version where they're right." },
  { day: 40, phrase: "You're too emotional right now", meaning: "Dismissing feelings, delaying discussion.", example1: "Let's talk when you're calmer (and never do).", example2: "You're not thinking clearly.'" },
  { day: 41, phrase: "I can't deal with this right now", meaning: "Avoiding responsibility.", example1: "Walks away during conflict.", example2: "Always 'not the right time' to discuss." },
  { day: 42, phrase: "You're always starting fights", meaning: "Blaming you for conflict.", example1: "When you try to discuss issues, 'you're starting again'.", example2: "You love drama, don't you?'" },
  { day: 43, phrase: "Why can't you be more like [someone]?", meaning: "Comparison to make you feel inadequate.", example1: "Why can't you be more like your sister?", example2: "Look how well they handle things.'" },
  { day: 44, phrase: "I guess I'm just a terrible person", meaning: "Pseudo-victimhood to stop criticism.", example1: "When confronted, 'I guess I'm just awful'.", example2: "You think I'm the worst, fine.'" },
  { day: 45, phrase: "Nothing I do is ever good enough", meaning: "Playing victim to avoid accountability.", example1: "I try so hard but you're never satisfied.", example2: "You always find something wrong.'" },
  { day: 46, phrase: "You expect too much", meaning: "Lowering your standards.", example1: "Basic respect is 'too much'.", example2: "You're too demanding.'" },
  { day: 47, phrase: "You're impossible to please", meaning: "Making you question reasonable expectations.", example1: "When you ask for basic needs, 'you're impossible'.", example2: "Nothing makes you happy.'" },
  { day: 48, phrase: "I was just trying to protect you", meaning: "Excuse for controlling behavior.", example1: "I didn't tell you because I wanted to protect you.", example2: "I lied for your own good.'" },
  { day: 49, phrase: "You wouldn't understand", meaning: "Excluding you, making you feel inadequate.", example1: "It's complicated, you wouldn't get it.", example2: "You're not smart enough to understand.'" },
  { day: 50, phrase: "It's not that big of a deal", meaning: "Minimizing your concerns.", example1: "You're upset about that? It's nothing.", example2: "Why are you making such a big deal?'" },
  { day: 51, phrase: "You're so negative", meaning: "Dismissing valid concerns.", example1: "When you point out problems, 'you're so negative'.", example2: "Can't you be positive for once?'" },
  { day: 52, phrase: "I was just kidding", meaning: "Retreating after hurtful comment.", example1: "Says something mean, then 'it was a joke'.", example2: "You can't take a joke?'" },
  { day: 53, phrase: "You're paranoid", meaning: "Dismissing valid suspicions.", example1: "When you suspect cheating, 'you're paranoid'.", example2: "You're imagining things.'" },
  { day: 54, phrase: "You're insecure", meaning: "Attacking your character when you question them.", example1: "If you trusted me, you wouldn't ask.", example2: "Your insecurity is the problem.'" },
  { day: 55, phrase: "I need space", meaning: "Withdrawing to punish or avoid.", example1: "After conflict, disappears for days.", example2: "Uses 'space' to make you worry." },
  { day: 56, phrase: "You're suffocating me", meaning: "Making you feel guilty for wanting connection.", example1: "When you want to spend time, 'you're too clingy'.", example2: "I need room to breathe.'" },
  { day: 57, phrase: "I don't have time for this", meaning: "Dismissing important conversations.", example1: "Always too busy for serious talks.", example2: "Not now, later (never happens).'" },
  { day: 58, phrase: "You're being ridiculous", meaning: "Invalidating your perspective.", example1: "That's the most ridiculous thing I've heard.", example2: "You're being absurd.'" },
  { day: 59, phrase: "Grow up", meaning: "Insulting your maturity.", example1: "When you express feelings, 'grow up'.", example2: "Act like an adult.'" },
  { day: 60, phrase: "You're so childish", meaning: "Attacking your maturity.", example1: "Crying like a child.", example2: "Be mature about this.'" },
  { day: 61, phrase: "I'm the only one who really knows you", meaning: "Isolating you from others.", example1: "Your friends don't know the real you like I do.", example2: "Only I understand you.'" },
  { day: 62, phrase: "You'd be lost without me", meaning: "Creating dependency.", example1: "You can't manage on your own.", example2: "What would you do without me?'" },
  { day: 63, phrase: "I do everything for you", meaning: "Exaggerating efforts to create guilt.", example1: "I work so hard, and this is my thanks?", example2: "After all I do, you complain?'" },
  { day: 64, phrase: "You don't appreciate me", meaning: "Seeking validation, creating guilt.", example1: "I do so much and you never say thank you.", example2: "You take me for granted.'" },
  { day: 65, phrase: "You never say thank you", meaning: "Focusing on gratitude to deflect issues.", example1: "I did X for you and you never thanked me.", example2: "Ungrateful, as always.'" },
  { day: 66, phrase: "I wish I'd never met you", meaning: "Extreme hurtful statement to wound.", example1: "Said in anger to cause maximum pain.", example2: "I regret ever getting involved with you.'" },
  { day: 67, phrase: "You ruined my life", meaning: "Blaming you for their unhappiness.", example1: "Before you, I was happy. You ruined everything.", example2: "My life was fine until you came along.'" },
  { day: 68, phrase: "I hate you", meaning: "Extreme expression of anger.", example1: "Said to wound and control.", example2: "Used to make you feel worthless." },
  { day: 69, phrase: "You make me sick", meaning: "Expressing disgust to hurt.", example1: "I can't stand looking at you.", example2: "You disgust me.'" },
  { day: 70, phrase: "I can't breathe around you", meaning: "Making you feel suffocating.", example1: "You're too much, I can't breathe.", example2: "I need space from you.'" },
  { day: 71, phrase: "You're a burden", meaning: "Making you feel like a problem.", example1: "I have to take care of you all the time.", example2: "You're too much to handle.'" },
  { day: 72, phrase: "I'm tired of your drama", meaning: "Dismissing your emotions as drama.", example1: "When you're upset, 'here we go again with the drama'.", example2: "Always something with you.'" },
  { day: 73, phrase: "You love drama", meaning: "Blaming you for conflict.", example1: "You enjoy creating problems.", example2: "You're never happy without drama.'" },
  { day: 74, phrase: "Here we go again", meaning: "Dismissive of repeated concerns.", example1: "Rolls eyes when you bring up issue.", example2: "Not this again.'" },
  { day: 75, phrase: "Not this again", meaning: "Refusing to engage with repeated concerns.", example1: "We've been through this a hundred times.", example2: "I'm not having this conversation again.'" },
  { day: 76, phrase: "I've heard enough", meaning: "Shutting down conversation.", example1: "Stops you mid-sentence, walks away.", example2: "I don't want to hear any more.'" },
  { day: 77, phrase: "End of discussion", meaning: "Authoritarian closing of conversation.", example1: "I said no, end of discussion.", example2: "My decision is final.'" },
  { day: 78, phrase: "Because I said so", meaning: "Authority without reason.", example1: "Used by parents, also by controlling partners.", example2: "No explanation, just 'because'." },
  { day: 79, phrase: "My way or the highway", meaning: "No compromise, ultimatum.", example1: "Either do it my way or leave.", example2: "Take it or leave it.'" },
  { day: 80, phrase: "Take it or leave it", meaning: "Ultimatum, no negotiation.", example1: "This is the only offer.", example2: "Accept my terms or nothing.'" },
  { day: 81, phrase: "I'm done talking about this", meaning: "Shutting down communication.", example1: "Refuses to discuss further.", example2: "Subject closed.'" },
  { day: 82, phrase: "You're impossible", meaning: "Giving up on communication.", example1: "I can't talk to you, you're impossible.", example2: "There's no reasoning with you.'" },
  { day: 83, phrase: "I give up", meaning: "Playing victim to end discussion.", example1: "Fine, I give up, you win.", example2: "Whatever, I'm done.'" },
  { day: 84, phrase: "Whatever", meaning: "Dismissive, refusing to engage.", example1: "Said with eye roll, ending conversation.", example2: "I don't care anymore.'" },
  { day: 85, phrase: "Fine (said with anger)", meaning: "Passive-aggressive agreement.", example1: "Says 'fine' but clearly not fine.", example2: "Then silent treatment follows." },
  { day: 86, phrase: "Do what you want", meaning: "Pseudo-agreement with resentment.", example1: "You'll do what you want anyway.", example2: "I don't matter, so just do whatever.'" },
  { day: 87, phrase: "I don't care anymore", meaning: "Emotional withdrawal.", example1: "I'm past caring what you do.", example2: "Nothing matters anymore.'" },
  { day: 88, phrase: "You've changed", meaning: "Accusing you of being different.", example1: "You used to be so nice, what happened?", example2: "I don't even know you anymore.'" },
  { day: 89, phrase: "You're not the person I fell for", meaning: "Nostalgia as weapon.", example1: "I miss who you used to be.", example2: "You've become someone I don't recognize.'" },
  { day: 90, phrase: "I don't recognize you anymore", meaning: "Making you feel like you're the problem.", example1: "You're not yourself lately.", example2: "What's happened to you?'" },
  { day: 91, phrase: "You used to be so [positive trait]", meaning: "Comparing past to present negatively.", example1: "You used to be so understanding, now...", example2: "You were never like this before.'" },
  { day: 92, phrase: "I miss the old you", meaning: "Implying current you is worse.", example1: "The old you would have handled this better.", example2: "I wish you were still the person I met.'" },
  { day: 93, phrase: "You've become just like [negative person]", meaning: "Insulting comparison.", example1: "You're becoming just like your mother.", example2: "You're turning into my ex.'" }
];

// 6. TACTICS USED BY MANIPULATORS
const MANIPULATOR_TACTICS = [
  { day: 1, tactic: "Gaslighting", meaning: "Making you doubt your reality.", example1: "Denying things they said/did.", example2: "Telling you 'you're crazy' or 'you imagined it'." },
  { day: 2, tactic: "Love Bombing", meaning: "Overwhelming affection to gain control.", example1: "Constant texts, gifts, 'I love you' too soon.", example2: "Moving fast, future faking." },
  { day: 3, tactic: "Isolation", meaning: "Cutting you off from support system.", example1: "Criticizing your friends and family.", example2: "Making you choose them over others." },
  { day: 4, tactic: "Triangulation", meaning: "Bringing third person into dynamic.", example1: "My ex would never do that.'", example2: "Everyone agrees with me, not you.'" },
  { day: 5, tactic: "Future Faking", meaning: "Promising future to keep you hooked.", example1: "We'll get married, travel the world... (never happens)", example2: "Making plans they never intend to keep." },
  { day: 6, tactic: "Intermittent Reinforcement", meaning: "Random rewards to keep you addicted.", example1: "Hot and cold behavior.", example2: "Sometimes kind, sometimes cruel - keeps you guessing." },
  { day: 7, tactic: "Moving Goalposts", meaning: "Changing expectations so you can never win.", example1: "You meet one demand, they create another.", example2: "Nothing is ever good enough." },
  { day: 8, tactic: "Projection", meaning: "Accusing you of their own behaviors.", example1: "Cheater accuses you of cheating.", example2: "Liar calls you a liar." },
  { day: 9, tactic: "Word Salad", meaning: "Confusing talk to avoid issues.", example1: "Rambling, changing subjects, making no sense.", example2: "You end up confused, drop the topic." },
  { day: 10, tactic: "Circular Conversations", meaning: "Going in circles, never resolving.", example1: "Same arguments repeated endlessly.", example2: "No progress, you give up." },
  { day: 11, tactic: "Blaming", meaning: "Making everything your fault.", example1: "If you hadn't..., I wouldn't have...", example2: "You made me do it.'" },
  { day: 12, tactic: "Guilt-Tripping", meaning: "Making you feel guilty to control you.", example1: "After all I've done for you...", example2: "I sacrificed so much for you.'" },
  { day: 13, tactic: "Shaming", meaning: "Making you feel worthless.", example1: "You're so stupid/ugly/fat.", example2: "What's wrong with you?'" },
  { day: 14, tactic: "Name-Calling", meaning: "Labels to hurt and control.", example1: "Crazy, paranoid, sensitive, dramatic.", example2: "You're impossible, you're too much.'" },
  { day: 15, tactic: "Jokes That Aren't Funny", meaning: "Testing boundaries with 'humor'.", example1: "Says something mean, then 'just joking'.", example2: "If you object, 'can't take a joke?'" },
  { day: 16, tactic: "Silent Treatment", meaning: "Withdrawing to punish.", example1: "Ignores you for hours/days.", example2: "Refuses to speak until you apologize." },
  { day: 17, tactic: "Stonewalling", meaning: "Refusing to communicate.", example1: "Shuts down, won't engage.", example2: "Leaves room, hangs up phone." },
  { day: 18, tactic: "Withholding", meaning: "Withholding affection, attention, sex.", example1: "No intimacy until you comply.", example2: "Withdraws love to punish." },
  { day: 19, tactic: "Negging", meaning: "Backhanded compliments to lower self-esteem.", example1: "You're pretty for a [race/weight].", example2: "I usually don't date [type], but you're different.'" },
  { day: 20, tactic: "Comparison", meaning: "Comparing you unfavorably to others.", example1: "Why can't you be more like...", example2: "My ex used to do this better.'" },
  { day: 21, tactic: "Competition", meaning: "Making everything a competition.", example1: "My day was worse than yours.", example2: "I'm more tired/sicker/busier than you.'" },
  { day: 22, tactic: "One-Upmanship", meaning: "Always have to be better.", example1: "You got a raise? I got a bigger one.", example2: "Your problem? Let me tell you about mine.'" },
  { day: 23, tactic: "Minimizing", meaning: "Making your concerns seem small.", example1: "You're overreacting, it's nothing.", example2: "It's not that big of a deal.'" },
  { day: 24, tactic: "Trivializing", meaning: "Making important things seem trivial.", example1: "Your feelings don't matter.", example2: "That's not important right now.'" },
  { day: 25, tactic: "Generalizing", meaning: "Using 'always' and 'never' to attack.", example1: "You always do this.", example2: "You never listen.'" },
  { day: 26, tactic: "Catastrophizing", meaning: "Making small issues seem huge.", example1: "If you make this mistake, you'll be fired.", example2: "This tiny error will ruin everything.'" },
  { day: 27, tactic: "Pathologizing", meaning: "Labeling you as mentally ill.", example1: "You're bipolar, you're crazy.", example2: "You need help, you're not normal.'" },
  { day: 28, tactic: "Diagnosing", meaning: "Pretending to know what's wrong with you.", example1: "You have [mental illness], I've researched it.", example2: "You're narcissistic, you're borderline.'" },
  { day: 29, tactic: "Victim Playing", meaning: "Making themselves the victim.", example1: "Why is everyone so mean to me?", example2: "I'm always the one who suffers.'" },
  { day: 30, tactic: "Martyrdom", meaning: "Sacrificing then guilt-tripping.", example1: "I gave up everything for you.", example2: "I work so hard for this family.'" },
  { day: 31, tactic: "Ultimatums", meaning: "This or that, no negotiation.", example1: "Do this or I'm leaving.", example2: "It's me or your friends.'" },
  { day: 32, tactic: "Threats", meaning: "Threatening to get their way.", example1: "If you leave, I'll hurt myself.", example2: "I'll tell everyone your secrets.'" },
  { day: 33, tactic: "Intimidation", meaning: "Scaring you into compliance.", example1: "Yelling, standing over you, blocking exits.", example2: "Throwing things, punching walls." },
  { day: 34, tactic: "Gaslighting: Denial", meaning: "Denying things they said/did.", example1: "I never said that, you're imagining things.", example2: "That never happened.'" },
  { day: 35, tactic: "Gaslighting: Minimizing", meaning: "Making events seem less serious.", example1: "It wasn't that bad, you're overreacting.", example2: "I was just joking, you're too sensitive.'" },
  { day: 36, tactic: "Gaslighting: Blaming", meaning: "Making you responsible for their behavior.", example1: "I wouldn't have yelled if you hadn't...", example2: "You made me do it.'" },
  { day: 37, tactic: "Gaslighting: Withholding", meaning: "Pretending not to understand.", example1: "I don't know what you're talking about.", example2: "You're confusing me.'" },
  { day: 38, tactic: "Gaslighting: Countering", meaning: "Questioning your memory.", example1: "Are you sure? That's not how I remember it.", example2: "Your memory must be faulty.'" },
  { day: 39, tactic: "Gaslighting: Diverting", meaning: "Changing subject to confuse.", example1: "You're upset about that? What about when you...", example2: "Let's talk about your problems instead.'" },
  { day: 40, tactic: "Gaslighting: Trivializing", meaning: "Making needs seem unimportant.", example1: "You're making a big deal out of nothing.", example2: "That's such a small thing to be upset about.'" },
  { day: 41, tactic: "Love Bombing: Excessive Praise", meaning: "Overwhelming compliments.", example1: "You're perfect, you're the one.", example2: "I've never met anyone like you.'" },
  { day: 42, tactic: "Love Bombing: Constant Contact", meaning: "Never leaving you alone.", example1: "Hundreds of texts, calls all day.", example2: "Needs to know where you are always." },
  { day: 43, tactic: "Love Bombing: Grand Gestures", meaning: "Big romantic moves early.", example1: "Expensive gifts, surprise trips.", example2: "Saying 'I love you' within weeks." },
  { day: 44, tactic: "Love Bombing: Future Faking", meaning: "Promising amazing future.", example1: "We'll get married, have kids, travel.", example2: "Making plans years ahead too soon." },
  { day: 45, tactic: "Isolation: Criticizing Friends", meaning: "Finding flaws in your friends.", example1: "Your friends are a bad influence.", example2: "They don't really care about you.'" },
  { day: 46, tactic: "Isolation: Criticizing Family", meaning: "Turning you against family.", example1: "Your family doesn't respect you.", example2: "They're toxic, you should cut them off.'" },
  { day: 47, tactic: "Isolation: Creating Jealousy", meaning: "Making you jealous to isolate.", example1: "Flirts with others to make you possessive.", example2: "Talks about ex to make you insecure.'" },
  { day: 48, tactic: "Isolation: Moving Away", meaning: "Moving you away from support.", example1: "Suggest moving to new city away from everyone.", example2: "You don't need anyone but me.'" },
  { day: 49, tactic: "Triangulation: Using Ex", meaning: "Comparing you to ex.", example1: "My ex never complained about this.", example2: "My ex was so understanding.'" },
  { day: 50, tactic: "Triangulation: Using Friends", meaning: "Saying friends agree with them.", example1: "Everyone thinks you're wrong.", example2: "My friends all say you're crazy.'" },
  { day: 51, tactic: "Triangulation: Using Family", meaning: "Bringing family into conflicts.", example1: "My mother agrees with me.", example2: "Even your family thinks you're wrong.'" },
  { day: 52, tactic: "Triangulation: Creating Rivalry", meaning: "Pitting people against each other.", example1: "Telling each friend what other said.", example2: "Creating drama between people." },
  { day: 53, tactic: "Intermittent Reinforcement: Random Rewards", meaning: "Sometimes nice, sometimes cruel.", example1: "After abuse, acts loving - keeps you hooked.", example2: "Hot and cold behavior - addictive." },
  { day: 54, tactic: "Intermittent Reinforcement: Hope Cycling", meaning: "Giving hope then crushing it.", example1: "Promises to change, then doesn't.", example2: "Good behavior then back to bad." },
  { day: 55, tactic: "Moving Goalposts: Changing Rules", meaning: "Rules change so you can't win.", example1: "You meet demand, they create new one.", example2: "Nothing ever satisfies them." },
  { day: 56, tactic: "Moving Goalposts: Shifting Standards", meaning: "Different standards for you and them.", example1: "You must be perfect, they can do anything.", example2: "Rules for thee, not for me.'" },
  { day: 57, tactic: "Projection: Accusing You", meaning: "Accusing you of what they do.", example1: "Cheater accuses you of cheating.", example2: "Liar calls you a liar." },
  { day: 58, tactic: "Projection: Seeing Themselves in You", meaning: "Attributing their flaws to you.", example1: "They're angry, say you're angry.", example2: "They're selfish, call you selfish." },
  { day: 59, tactic: "Word Salad: Confusing Talk", meaning: "Speaking nonsense to confuse.", example1: "Rambling, no clear point.", example2: "You give up trying to understand." },
  { day: 60, tactic: "Word Salad: Changing Subjects", meaning: "Never staying on topic.", example1: "You bring up issue, they change subject.", example2: "Every conversation is scattered." },
  { day: 61, tactic: "Circular Conversations: No Resolution", meaning: "Same arguments, no end.", example1: "Discuss same thing for years.", example2: "No progress ever made." },
  { day: 62, tactic: "Circular Conversations: Going in Circles", meaning: "End up where you started.", example1: "Talk for hours, no resolution.", example2: "You're exhausted, give up." },
  { day: 63, tactic: "Blaming: You Made Me", meaning: "You're responsible for their actions.", example1: "I wouldn't have hit you if you didn't provoke me.", example2: "You made me angry.'" },
  { day: 64, tactic: "Blaming: It's Your Fault", meaning: "Everything is your fault.", example1: "If you hadn't..., this wouldn't have happened.", example2: "Our problems are because of you.'" },
  { day: 65, tactic: "Guilt-Tripping: After All I've Done", meaning: "Reminding you of favors.", example1: "I sacrificed so much for you.", example2: "This is how you repay me?'" },
  { day: 66, tactic: "Guilt-Tripping: You Owe Me", meaning: "Creating false debt.", example1: "I did X for you, now you owe me Y.", example2: "You're ungrateful.'" },
  { day: 67, tactic: "Shaming: You're Not Good Enough", meaning: "Making you feel inadequate.", example1: "You'll never succeed without me.", example2: "No one else would want you.'" },
  { day: 68, tactic: "Shaming: Public Humiliation", meaning: "Embarrassing you in public.", example1: "Mocks you in front of others.", example2: "Shares your secrets publicly." },
  { day: 69, tactic: "Name-Calling: Labels", meaning: "Calling you names.", example1: "Crazy, stupid, fat, ugly.", example2: "Labels to hurt and control." },
  { day: 70, tactic: "Name-Calling: Pathologizing", meaning: "Using mental health labels.", example1: "You're bipolar, you're narcissistic.", example2: "You need therapy, you're crazy.'" },
  { day: 71, tactic: "Jokes That Aren't Funny: Testing Boundaries", meaning: "Seeing what they can get away with.", example1: "Cruel 'jokes' that hurt.", example2: "If you object, 'can't take joke?'" },
  { day: 72, tactic: "Jokes That Aren't Funny: Veiled Insults", meaning: "Insults disguised as jokes.", example1: "You're so [negative trait] - just kidding!", example2: "Backhanded compliments." },
  { day: 73, tactic: "Silent Treatment: Ignoring", meaning: "Refusing to acknowledge you.", example1: "Won't speak, won't respond.", example2: "Acts like you don't exist." },
  { day: 74, tactic: "Silent Treatment: Withholding", meaning: "Withholding affection/attention.", example1: "No intimacy until you comply.", example2: "Ignores you for days." },
  { day: 75, tactic: "Stonewalling: Shutting Down", meaning: "Refusing to communicate.", example1: "Leaves room, hangs up phone.", example2: "Won't engage in conversation." },
  { day: 76, tactic: "Stonewalling: Emotional Withdrawal", meaning: "Withdrawing emotionally.", example1: "Shows no emotion, no response.", example2: "You're talking to a wall." },
  { day: 77, tactic: "Withholding: Affection", meaning: "No love until you comply.", example1: "Won't say I love you, won't hug.", example2: "Cold and distant." },
  { day: 78, tactic: "Withholding: Sex", meaning: "Using sex as weapon.", example1: "No sex until you apologize.", example2: "Withholds to punish." },
  { day: 79, tactic: "Withholding: Attention", meaning: "Ignoring you as punishment.", example1: "Won't look at you, won't respond.", example2: "You're invisible to them." },
  { day: 80, tactic: "Negging: Backhanded Compliments", meaning: "Insults disguised as compliments.", example1: "You're smart for a [demographic].", example2: "I usually don't date [type], but you're different.'" },
  { day: 81, tactic: "Negging: Lowering Self-Esteem", meaning: "Making you feel lucky to have them.", example1: "No one else would put up with you.", example2: "You should be grateful I'm with you.'" },
  { day: 82, tactic: "Comparison: Unfavorable", meaning: "Comparing you to others.", example1: "Why can't you be more like...", example2: "My friend's partner does this for them.'" },
  { day: 83, tactic: "Comparison: To Exes", meaning: "Comparing you to exes.", example1: "My ex never complained.", example2: "My ex was so much better at this.'" },
  { day: 84, tactic: "Competition: Everything is Contest", meaning: "Always competing with you.", example1: "My day was worse, I'm more tired.", example2: "My problem is bigger than yours.'" },
  { day: 85, tactic: "One-Upmanship: Always Better", meaning: "Always have to be better.", example1: "You got a raise? I got a bigger one.", example2: "You're sick? I'm sicker.'" },
  { day: 86, tactic: "Minimizing: Your Feelings", meaning: "Your feelings don't matter.", example1: "You're overreacting, it's nothing.", example2: "Why are you so upset about that?'" },
  { day: 87, tactic: "Minimizing: Your Needs", meaning: "Your needs aren't important.", example1: "That's not important right now.", example2: "We'll deal with your stuff later.'" },
  { day: 88, tactic: "Trivializing: Your Concerns", meaning: "Making concerns seem small.", example1: "It's not a big deal.", example2: "You're making a mountain out of a molehill.'" },
  { day: 89, tactic: "Generalizing: Always/Never", meaning: "Using absolutes to attack.", example1: "You always do this.", example2: "You never listen.'" },
  { day: 90, tactic: "Catastrophizing: Making Things Huge", meaning: "Small issues become disasters.", example1: "If you make this mistake, you'll be fired.", example2: "This tiny error will ruin everything.'" },
  { day: 91, tactic: "Pathologizing: You're Crazy", meaning: "Labeling you mentally ill.", example1: "You're bipolar, you're crazy.", example2: "You need help, you're not normal.'" },
  { day: 92, tactic: "Diagnosing: You Have [Disorder]", meaning: "Pretending to diagnose you.", example1: "You're narcissistic, I've researched it.", example2: "You have borderline personality disorder.'" },
  { day: 93, tactic: "Ultimatums: This or That", meaning: "Forcing choice with threats.", example1: "It's me or your friends.", example2: "Do this or I'm leaving.'" }
];



// ==================== DAY-WISE DATA (93 Days) ====================
// ... (तुम्हारा सारा data यहाँ रहेगा - मैंने space बचाने के लिए नहीं लिखा)

export default function PsychologyMaster() {
  const [streak, setStreak] = useState(0);
  const [checks, setChecks] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [challengeDay, setChallengeDay] = useState(1);
  
  const today = new Date();
  const todayStr = today.toDateString();

  // Calculate challenge day based on start date
  useEffect(() => {
    const startDate = localStorage.getItem("psychologyStartDate");
    if (startDate) {
      const start = new Date(startDate);
      const diffTime = Math.abs(today - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setChallengeDay(Math.min(diffDays, 93));
    } else {
      localStorage.setItem("psychologyStartDate", today.toDateString());
      setChallengeDay(1);
    }
  }, []);

  // Get today's data based on challenge day
  const todaysPsychologyTrick = PSYCHOLOGY_TRICKS?.find(t => t.day === challengeDay) || PSYCHOLOGY_TRICKS?.[0] || {};
  const todaysCommunicationTip = COMMUNICATION_TIPS?.find(t => t.day === challengeDay) || COMMUNICATION_TIPS?.[0] || {};
  const todaysSocialTip = SOCIAL_INTELLIGENCE?.find(t => t.day === challengeDay) || SOCIAL_INTELLIGENCE?.[0] || {};
  const todaysPsychologyWord = PSYCHOLOGY_WORDS?.find(w => w.day === challengeDay) || PSYCHOLOGY_WORDS?.[0] || {};
  const todaysManipulatorPhrase = MANIPULATOR_PHRASES?.find(p => p.day === challengeDay) || MANIPULATOR_PHRASES?.[0] || {};
  const todaysManipulatorTactic = MANIPULATOR_TACTICS?.find(t => t.day === challengeDay) || MANIPULATOR_TACTICS?.[0] || {};

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("psychologyMaster");
      if (saved) {
        const parsed = JSON.parse(saved);
        setChecks(parsed);
        console.log("✅ Psychology data loaded:", parsed);
      }
    } catch (error) {
      console.error("Error loading psychology data:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // ✅ FIXED: Calculate streak based on completed tasks
  useEffect(() => {
    if (!isInitialized) return;
    
    const calculateStreak = () => {
      // Get all dates with at least one completed task
      const completedDates = Object.keys(checks)
        .filter(date => {
          const dayData = checks[date];
          return dayData && Object.values(dayData).some(v => v === true);
        })
        .map(date => new Date(date).toDateString());
      
      console.log("Psychology completed dates:", completedDates);
      
      // Check if today has any completed task
      const todayCompleted = completedDates.includes(todayStr);
      console.log("Today completed:", todayCompleted);
      
      if (!todayCompleted) {
        setStreak(0);
        return;
      }
      
      // Calculate consecutive days from today
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
      
      console.log("Calculated streak:", count);
      setStreak(count);
    };
    
    calculateStreak();
  }, [checks, todayStr, isInitialized]);

  // Save to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("psychologyMaster", JSON.stringify(checks));
    console.log("✅ Psychology data saved");
  }, [checks, isInitialized]);

  // Toggle task completion
  const toggleTask = (taskId) => {
    setChecks(prev => {
      const todayData = prev[todayStr] || {};
      
      // Toggle the specific task
      const updatedToday = {
        ...todayData,
        [taskId]: !todayData[taskId]
      };
      
      return {
        ...prev,
        [todayStr]: updatedToday
      };
    });
  };

  // Calculate completed tasks count
  const tasks = [
    { id: "psychology_trick", name: "Psychology Trick", completed: checks[todayStr]?.psychology_trick || false },
    { id: "communication_tip", name: "Communication Tip", completed: checks[todayStr]?.communication_tip || false },
    { id: "social_tip", name: "Social Intelligence", completed: checks[todayStr]?.social_tip || false },
    { id: "psychology_word", name: "Psychology Word", completed: checks[todayStr]?.psychology_word || false },
    { id: "manipulator_phrase", name: "Manipulator Phrase", completed: checks[todayStr]?.manipulator_phrase || false },
    { id: "manipulator_tactic", name: "Manipulator Tactic", completed: checks[todayStr]?.manipulator_tactic || false }
  ];
  
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  if (!isInitialized) {
    return <div className="psychology-master">Loading...</div>;
  }

  return (
    <div className="psychology-master">
      {/* Header */}
      <div className="psychology-header">
        <div className="header-left">
          <span className="header-icon">🧠</span>
          <h2>Psychology & Communication</h2>
        </div>
        <div className="day-badge">Day {challengeDay}/93</div>
      </div>

      {/* Streak & Progress */}
      <div className="psychology-stats">
        <div className="streak-info">
          <span className="streak-fire">🔥</span>
          <span className="streak-number">{streak}</span>
          <span className="streak-label">Day Streak</span>
        </div>
        <div className="progress-info">
          <span>Today's Progress</span>
          <span>{completedCount}/6 ({progressPercent}%)</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* ===== PSYCHOLOGY TRICK ===== */}
      <div className="psychology-card psychology-trick">
        <div className="card-header" onClick={() => setExpandedSection(expandedSection === 'trick' ? null : 'trick')}>
          <div className="card-title">
            <span className="card-icon">🎯</span>
            <h3>Psychology Trick - Day {challengeDay}</h3>
          </div>
          <button 
            className={`toggle-btn ${checks[todayStr]?.psychology_trick ? 'completed' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleTask('psychology_trick'); }}
          >
            {checks[todayStr]?.psychology_trick ? '✅' : '⬜'}
          </button>
        </div>
        
        {expandedSection === 'trick' && (
          <div className="card-content">
            <h4>{todaysPsychologyTrick.trick}</h4>
            <p className="meaning">{todaysPsychologyTrick.meaning}</p>
            <div className="examples">
              <p><strong>Example 1:</strong> {todaysPsychologyTrick.example1}</p>
              <p><strong>Example 2:</strong> {todaysPsychologyTrick.example2}</p>
            </div>
          </div>
        )}
      </div>

      {/* ===== COMMUNICATION TIP ===== */}
      <div className="psychology-card communication-tip">
        <div className="card-header" onClick={() => setExpandedSection(expandedSection === 'communication' ? null : 'communication')}>
          <div className="card-title">
            <span className="card-icon">💬</span>
            <h3>Communication Tip - Day {challengeDay}</h3>
          </div>
          <button 
            className={`toggle-btn ${checks[todayStr]?.communication_tip ? 'completed' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleTask('communication_tip'); }}
          >
            {checks[todayStr]?.communication_tip ? '✅' : '⬜'}
          </button>
        </div>
        
        {expandedSection === 'communication' && (
          <div className="card-content">
            <h4>{todaysCommunicationTip.tip}</h4>
            <p className="meaning">{todaysCommunicationTip.meaning}</p>
            <div className="examples">
              <p><strong>Example 1:</strong> {todaysCommunicationTip.example1}</p>
              <p><strong>Example 2:</strong> {todaysCommunicationTip.example2}</p>
            </div>
          </div>
        )}
      </div>

      {/* ===== SOCIAL INTELLIGENCE ===== */}
      <div className="psychology-card social-intelligence">
        <div className="card-header" onClick={() => setExpandedSection(expandedSection === 'social' ? null : 'social')}>
          <div className="card-title">
            <span className="card-icon">🤝</span>
            <h3>Social Intelligence - Day {challengeDay}</h3>
          </div>
          <button 
            className={`toggle-btn ${checks[todayStr]?.social_tip ? 'completed' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleTask('social_tip'); }}
          >
            {checks[todayStr]?.social_tip ? '✅' : '⬜'}
          </button>
        </div>
        
        {expandedSection === 'social' && (
          <div className="card-content">
            <h4>{todaysSocialTip.tip}</h4>
            <p className="meaning">{todaysSocialTip.meaning}</p>
            <div className="examples">
              <p><strong>Example 1:</strong> {todaysSocialTip.example1}</p>
              <p><strong>Example 2:</strong> {todaysSocialTip.example2}</p>
            </div>
          </div>
        )}
      </div>

      {/* ===== PSYCHOLOGY WORD ===== */}
      <div className="psychology-card psychology-word">
        <div className="card-header" onClick={() => setExpandedSection(expandedSection === 'word' ? null : 'word')}>
          <div className="card-title">
            <span className="card-icon">📚</span>
            <h3>Psychology Word - Day {challengeDay}</h3>
          </div>
          <button 
            className={`toggle-btn ${checks[todayStr]?.psychology_word ? 'completed' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleTask('psychology_word'); }}
          >
            {checks[todayStr]?.psychology_word ? '✅' : '⬜'}
          </button>
        </div>
        
        {expandedSection === 'word' && (
          <div className="card-content">
            <h4>{todaysPsychologyWord.word}</h4>
            <p className="meaning">{todaysPsychologyWord.meaning}</p>
            <div className="examples">
              <p><strong>Example 1:</strong> {todaysPsychologyWord.example1}</p>
              <p><strong>Example 2:</strong> {todaysPsychologyWord.example2}</p>
            </div>
          </div>
        )}
      </div>

      {/* ===== MANIPULATOR PHRASE ===== */}
      <div className="psychology-card manipulator-phrase">
        <div className="card-header" onClick={() => setExpandedSection(expandedSection === 'phrase' ? null : 'phrase')}>
          <div className="card-title">
            <span className="card-icon">⚠️</span>
            <h3>Manipulator Phrase - Day {challengeDay}</h3>
          </div>
          <button 
            className={`toggle-btn ${checks[todayStr]?.manipulator_phrase ? 'completed' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleTask('manipulator_phrase'); }}
          >
            {checks[todayStr]?.manipulator_phrase ? '✅' : '⬜'}
          </button>
        </div>
        
        {expandedSection === 'phrase' && (
          <div className="card-content">
            <h4>"{todaysManipulatorPhrase.phrase}"</h4>
            <p className="meaning">{todaysManipulatorPhrase.meaning}</p>
            <div className="examples">
              <p><strong>Example 1:</strong> {todaysManipulatorPhrase.example1}</p>
              <p><strong>Example 2:</strong> {todaysManipulatorPhrase.example2}</p>
            </div>
          </div>
        )}
      </div>

      {/* ===== MANIPULATOR TACTIC ===== */}
      <div className="psychology-card manipulator-tactic">
        <div className="card-header" onClick={() => setExpandedSection(expandedSection === 'tactic' ? null : 'tactic')}>
          <div className="card-title">
            <span className="card-icon">🔍</span>
            <h3>Manipulator Tactic - Day {challengeDay}</h3>
          </div>
          <button 
            className={`toggle-btn ${checks[todayStr]?.manipulator_tactic ? 'completed' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleTask('manipulator_tactic'); }}
          >
            {checks[todayStr]?.manipulator_tactic ? '✅' : '⬜'}
          </button>
        </div>
        
        {expandedSection === 'tactic' && (
          <div className="card-content">
            <h4>{todaysManipulatorTactic.tactic}</h4>
            <p className="meaning">{todaysManipulatorTactic.meaning}</p>
            <div className="examples">
              <p><strong>Example 1:</strong> {todaysManipulatorTactic.example1}</p>
              <p><strong>Example 2:</strong> {todaysManipulatorTactic.example2}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}