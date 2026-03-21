
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
  { day: 93, trick: "The Follow-up Effect", meaning: "Following up shows you care.", example1: "Check in after conversations.", example2: "Remember details they shared." },
  { day: 94, trick: "The Tetris Effect", meaning: "Repeated activities shape your thoughts.", example1: "After playing Tetris, you see blocks everywhere.", example2: "Practice gratitude - you'll start noticing good things." },
  { day: 95, trick: "The Google Effect", meaning: "We forget information we can easily look up.", example1: "Don't remember phone numbers - they're in your phone.", example2: "Focus on learning concepts, not facts you can Google." },
  { day: 96, trick: "The Curse of Knowledge", meaning: "Once you know something, you can't imagine not knowing it.", example1: "Experts struggle to teach beginners - they forget what it's like.", example2: "When explaining, assume the other person knows nothing." },
  { day: 97, trick: "The Illusion of Transparency", meaning: "We think our emotions are more obvious than they are.", example1: "You're nervous but others can't tell - don't assume they know.", example2: "Speak up about your feelings - people can't read your mind." },
  { day: 98, trick: "The Spotlight Effect", meaning: "We think people notice us more than they do.", example1: "That embarrassing moment? Others forgot it already.", example2: "Wear what makes you happy - no one's staring." },
  { day: 99, trick: "The Hindsight Bias", meaning: "We think we 'knew it all along' after something happens.", example1: "I knew that stock would crash!' (after it crashed)", example2: "Use this in meetings - 'As I predicted earlier...'" },
  { day: 100, trick: "The Overconfidence Effect", meaning: "We overestimate our abilities.", example1: "90% of drivers think they're above average.", example2: "Always double-check your work - confidence can mislead." },
  { day: 101, trick: "The Planning Fallacy", meaning: "We underestimate how long things take.", example1: "Projects always take longer than planned - add buffer time.", example2: "Tell your boss 'It'll take 2 weeks' even if you think 1 week." },
  { day: 102, trick: "The Action Bias", meaning: "We feel we must do something, even if doing nothing is better.", example1: "Stock traders overtrade and lose money.", example2: "Sometimes waiting is the best action." },
  { day: 103, trick: "The Omission Bias", meaning: "We judge harmful actions worse than harmful inactions.", example1: "Not vaccinating (inaction) feels less bad than side effects (action).", example2: "People forgive 'not helping' more than 'hurting'." },
  { day: 104, trick: "The Status Quo Bias", meaning: "We prefer things to stay the same.", example1: "People stick with current phone plan even if better exists.", example2: "In negotiations, make the current option seem worse." },
  { day: 105, trick: "The Slippery Slope Fallacy", meaning: "Assuming one small step leads to disaster.", example1: "If we legalize weed, everyone will become addicts.", example2: "Use carefully - 'If we don't act now, things will get worse.'" },
  { day: 106, trick: "The Straw Man Fallacy", meaning: "Misrepresenting someone's argument to attack it.", example1: "You want to lower taxes? So you hate poor people?", example2: "Don't fall for this - clarify your actual position." },
  { day: 107, trick: "The Ad Hominem Fallacy", meaning: "Attacking the person instead of the argument.", example1: "You can't trust his climate science - he drives a car.", example2: "When someone attacks you, redirect to the topic." },
  { day: 108, trick: "The Bandwagon Effect", meaning: "People do things because others are doing them.", example1: "Crowded restaurant must be good - let's eat there.", example2: "In meetings, say 'Many teams are adopting this approach.'" },
  { day: 109, trick: "The Boomerang Effect", meaning: "Trying to persuade can make people believe the opposite.", example1: "Tell teens not to smoke - they smoke more.", example2: "Instead of saying 'Don't', explain benefits of alternative." },
  { day: 110, trick: "The Sleeper Effect", meaning: "Messages from low-credibility sources become persuasive over time.", example1: "You forget the source, remember the message.", example2: "Good ideas stick even if initially dismissed." },
  { day: 111, trick: "The Elaboration Likelihood Model", meaning: "People persuaded by logic or emotion depending on involvement.", example1: "High involvement (buying car) = logic matters.", example2: "Low involvement (buying gum) = emotion matters." },
  { day: 112, trick: "The Yale Attitude Change Approach", meaning: "Who says what to whom matters.", example1: "Expert source = more persuasive.", example2: "Attractive source = more persuasive for shallow topics." },
  { day: 113, trick: "The Inoculation Theory", meaning: "Exposing to weak arguments builds resistance to strong ones.", example1: "Teach kids about peer pressure before it happens.", example2: "Prepare your team for competitor objections." },
  { day: 114, trick: "The Self-Perception Theory", meaning: "We infer our attitudes by observing our behavior.", example1: "I helped this person, so I must like them.", example2: "If you want to like someone, do them a favor." },
  { day: 115, trick: "The Overjustification Effect", meaning: "External rewards can reduce intrinsic motivation.", example1: "Pay kids to read - they'll stop reading for fun.", example2: "Praise effort, not just results." },
  { day: 116, trick: "The Goal Gradient Effect", meaning: "We work harder as we get closer to a goal.", example1: "Coffee shop punch cards - people buy more coffee near the free one.", example2: "Show progress bars to motivate teams." },
  { day: 117, trick: "The Zeigarnik Effect", meaning: "We remember interrupted tasks better.", example1: "Leave a task halfway - you'll think about it.", example2: "In conversations, pause mid-sentence - they'll remember you." },
  { day: 118, trick: "The Ovsiankina Effect", meaning: "We feel compelled to complete interrupted tasks.", example1: "Cliffhangers make us watch next episode.", example2: "Start a task but don't finish - you'll want to return." },
  { day: 119, trick: "The Leveling and Sharpening Effect", meaning: "Stories get simplified (leveled) and details exaggerated (sharpened).", example1: "Tell a story 3 times - it becomes very different.", example2: "In gossip, details get distorted - be careful." },
  { day: 120, trick: "The Misinformation Effect", meaning: "Memories can be altered by misleading information.", example1: "Leading questions change what witnesses remember.", example2: "Don't ask 'Did you see the broken headlight?' Ask 'What did you see?'" },
  { day: 121, trick: "The Mandela Effect", meaning: "Large groups misremember the same thing.", example1: "Many remember Nelson Mandela dying in prison (he didn't).", example2: "Berenstain Bears vs Berenstein - many misremember." },
  { day: 122, trick: "The Cryptomnesia Effect", meaning: "Thinking you invented something you actually remembered.", example1: "A 'new' idea is actually something you heard before.", example2: "Keep idea journals to track originality." },
  { day: 123, trick: "The Tip of the Tongue Effect", meaning: "Temporary inability to retrieve known information.", example1: "You know the word but can't say it.", example2: "Relax and let it come - forcing makes it worse." },
  { day: 124, trick: "The Fading Affect Bias", meaning: "Negative memories fade faster than positive ones.", example1: "Breakups hurt less over time, good memories remain.", example2: "Time heals - remind yourself when things are hard." },
  { day: 125, trick: "The Pollyanna Principle", meaning: "We process pleasant information more accurately.", example1: "People remember compliments more than criticism.", example2: "Start meetings with good news - it'll be remembered." },
  { day: 126, trick: "The Reminiscence Bump", meaning: "We remember more from adolescence and early adulthood.", example1: "Old people recall teen years vividly.", example2: "Create memorable experiences in your 20s." },
  { day: 127, trick: "The Next-in-Line Effect", meaning: "We don't remember what others say when we're next to speak.", example1: "In group discussions, you're focused on your turn.", example2: "Take notes when others speak - don't just wait to talk." },
  { day: 128, trick: "The Bizarreness Effect", meaning: "Bizarre things are remembered better.", example1: "A purple cow is more memorable than a brown one.", example2: "Make your presentations weird - people will remember." },
  { day: 129, trick: "The Humor Effect", meaning: "Funny things are remembered better.", example1: "Jokes in presentations stick.", example2: "Use relevant memes in training materials." },
  { day: 130, trick: "The Self-Implication Effect", meaning: "We remember things that involve us.", example1: "Personal examples are unforgettable.", example2: "Relate concepts to your own life." },
  { day: 131, trick: "The Production Effect", meaning: "Saying things aloud improves memory.", example1: "Read your notes out loud while studying.", example2: "Teach others to remember better." },
  { day: 132, trick: "The Enactment Effect", meaning: "Doing actions helps remember them.", example1: "Role-play scenarios to learn.", example2: "Practice presentations physically." },
  { day: 133, trick: "The Observation Effect", meaning: "Watching others do things helps learning.", example1: "Watch skilled people work - you'll learn.", example2: "Apprenticeship works via observation." },
  { day: 134, trick: "The Mirror Neuron Effect", meaning: "We feel what we see others feel.", example1: "Yawn when others yawn.", example2: "Smile at someone - they'll smile back." },
  { day: 135, trick: "The Chameleon Effect", meaning: "We unconsciously mimic others.", example1: "Cross legs when they cross legs.", example2: "Use this to build rapport subtly." },
  { day: 136, trick: "The Emotional Contagion Effect", meaning: "Emotions spread between people.", example1: "Work with positive people - you'll be positive.", example2: "Stay calm around angry people - calm spreads." },
  { day: 137, trick: "The Priming Effect", meaning: "Exposure to one thing influences response to another.", example1: "See money signs - become more selfish.", example2: "Show nature images - become kinder." },
  { day: 138, trick: "The Anchoring Effect", meaning: "We rely heavily on first information.", example1: "First price offered influences negotiation.", example2: "First impression colors everything." },
  { day: 139, trick: "The Adjustment Effect", meaning: "We adjust insufficiently from anchors.", example1: "Start high in salary negotiation - final will be higher.", example2: "List high price first, then show discount." },
  { day: 140, trick: "The Contrast Effect", meaning: "We judge things relative to what came before.", example1: "Cold water feels colder after warm water.", example2: "Show ugly designs before your good one." },
  { day: 141, trick: "The Distinction Bias", meaning: "We overestimate differences when comparing side by side.", example1: "TVs look very different in store, same at home.", example2: "Don't compare too many options - you'll see false differences." },
  { day: 142, trick: "The Focusing Effect", meaning: "We overemphasize one aspect when judging.", example1: "Sunny weather = good life? (No, but we focus on weather)", example2: "Money matters but not as much as we think." },
  { day: 143, trick: "The Impact Bias", meaning: "We overestimate emotional impact of future events.", example1: "I'll be miserable forever after breakup' - you won't.", example2: "Winning lottery won't make you happy forever." },
  { day: 144, trick: "The Durability Bias", meaning: "We overestimate how long emotions will last.", example1: "I'll never get over this' - you will.", example2: "Humans are resilient - remember that." },
  { day: 145, trick: "The Focalism Effect", meaning: "We focus too much on one event, ignore other life aspects.", example1: "This exam determines my future' (it doesn't).", example2: "Remember: life has many parts, not just one." },
  { day: 146, trick: "The Immune Neglect Effect", meaning: "We underestimate our psychological immune system.", example1: "We adapt to setbacks faster than expected.", example2: "Trust yourself to handle hard times." },
  { day: 147, trick: "The Paradox of Choice", meaning: "More choices = less satisfaction.", example1: "24 jam flavors - confused, buy none.", example2: "3 options - easier to choose and happier." },
  { day: 148, trick: "The Maximizer Effect", meaning: "Seeking the best leads to less happiness.", example1: "Maximizers compare endlessly, regret choices.", example2: "Satisficers (good enough) are happier." },
  { day: 149, trick: "The Satisficer Effect", meaning: "Accepting 'good enough' leads to more happiness.", example1: "Pick first option that meets criteria, don't search forever.", example2: "Be a satisficer in small decisions." },
  { day: 150, trick: "The Counterfactual Thinking Effect", meaning: "We imagine 'what if' scenarios.", example1: "Bronze medalists happier than silver (almost didn't get medal).", example2: "Downward counterfactuals (could be worse) increase gratitude." },
  { day: 151, trick: "The Upward Counterfactual Effect", meaning: "Imagining better outcomes leads to regret.", example1: "If only I studied more...'", example2: "Use upward for motivation, not self-punishment." },
  { day: 152, trick: "The Downward Counterfactual Effect", meaning: "Imagining worse outcomes increases gratitude.", example1: "I could have died in that accident - glad I'm alive.", example2: "Practice downward counterfactuals daily." },
  { day: 153, trick: "The Regret Aversion Effect", meaning: "We avoid actions that might cause regret.", example1: "Don't invest because might lose money.", example2: "Inaction regret is often worse - we regret chances not taken." },
  { day: 154, trick: "The Anticipated Regret Effect", meaning: "We imagine future regret to guide decisions.", example1: "Will I regret not traveling when I'm old?", example2: "Ask 'Will I regret not doing this?'" },
  { day: 155, trick: "The Disposition Effect", meaning: "We sell winners too early, keep losers too long.", example1: "Sell stock that goes up (take profit), keep falling stock (hope recovers).", example2: "Check your portfolio - are you doing this?" },
  { day: 156, trick: "The Endowment Effect", meaning: "We value what we own more.", example1: "Price to sell > price to buy.", example2: "Test drive a car - you'll want it." },
  { day: 157, trick: "The Mere Ownership Effect", meaning: "We value things just because we own them.", example1: "Your own mug feels more valuable than identical one.", example2: "Use 'yours' in marketing - 'Your free guide'." },
  { day: 158, trick: "The Possession Effect", meaning: "We remember what we own better.", example1: "Remember items on 'my list' vs generic list.", example2: "Personalize learning - relate to your life." },
  { day: 159, trick: "The IKEA Effect", meaning: "We value what we create.", example1: "Self-assembled furniture valued more.", example2: "Involve team in planning - they'll own it." },
  { day: 160, trick: "The Not-Invented-Here Bias", meaning: "We distrust ideas from outside.", example1: "Internal team rejects good external ideas.", example2: "Be open - good ideas come from anywhere." },
  { day: 161, trick: "The Pro-Innovation Bias", meaning: "We overvalue new things.", example1: "New version must be better (often isn't).", example2: "Don't upgrade blindly - check reviews." },
  { day: 162, trick: "The Neomania Effect", meaning: "Obsession with new things.", example1: "Always want latest phone.", example2: "New ≠ better - check if you actually need it." },
  { day: 163, trick: "The Sunk Cost Effect", meaning: "We continue because we've invested.", example1: "Finish bad movie because you paid.", example2: "Stay in bad relationship because of time invested." },
  { day: 164, trick: "The Irrational Escalation Effect", meaning: "We invest more to justify past investment.", example1: "Keep putting money into failing business.", example2: "Know when to cut losses - don't throw good money after bad." },
  { day: 165, trick: "The Loss Aversion Effect", meaning: "Losing hurts more than winning feels good.", example1: "Upset losing ₹100 > happy gaining ₹100.", example2: "Frame things as 'avoid loss' not 'gain'." },
  { day: 166, trick: "The Risk Aversion Effect", meaning: "We prefer sure thing over gamble.", example1: "Sure ₹500 vs 50% chance of ₹1000 - most take sure ₹500.", example2: "Use this in negotiations - offer certainty." },
  { day: 167, trick: "The Certainty Effect", meaning: "We overweight certain outcomes.", example1: "100% chance vs 99% - we pay more for that 1%.", example2: "Guarantees sell - '100% money back'." },
  { day: 168, trick: "The Possibility Effect", meaning: "We overweight small probabilities.", example1: "Lottery tickets sell because 'someone wins'.", example2: "Hope sells - 'You could be the winner'." },
  { day: 169, trick: "The Zero Risk Bias", meaning: "We prefer to eliminate one risk completely.", example1: "Prefer 0% risk on one thing vs reducing all risks.", example2: "Use in sales - 'Eliminate this specific worry'." },
  { day: 170, trick: "The Ambiguity Effect", meaning: "We avoid options with missing information.", example1: "Choose known brand over unknown even if unknown might be better.", example2: "Provide complete information - people trust clarity." },
  { day: 171, trick: "The Familiarity Effect", meaning: "We prefer what we know.", example1: "Buy same brand again.", example2: "Familiarity breeds liking - not contempt." },
  { day: 172, trick: "The Fluency Effect", meaning: "Easy-to-process things seem truer.", example1: "Rhyming statements seem more accurate.", example2: "Make your messages simple and clear." },
  { day: 173, trick: "The Disfluency Effect", meaning: "Hard-to-process things are remembered better.", example1: "Hard-to-read fonts improve memory.", example2: "Use slightly difficult fonts for study materials." },
  { day: 174, trick: "The Clarity Effect", meaning: "Clear messages seem more credible.", example1: "Simple explanations beat complex ones.", example2: "If you can't explain simply, you don't understand well." },
  { day: 175, trick: "The Simplicity Effect", meaning: "Simple ideas spread faster.", example1: "Apple's design philosophy - simple sells.", example2: "One clear message beats ten confusing ones." },
  { day: 176, trick: "The Complexity Effect", meaning: "Complex things seem more sophisticated.", example1: "Big words in academic papers (often unnecessary).", example2: "Use complexity only when needed - otherwise simplify." },
  { day: 177, trick: "The Oberon Effect", meaning: "We judge attractive people as more competent.", example1: "Good-looking people get hired more.", example2: "Dress well for interviews - it matters." },
  { day: 178, trick: "The Beauty Premium Effect", meaning: "Attractive people earn more.", example1: "Study shows attractive people earn 10-15% more.", example2: "Invest in grooming - it pays off." },
  { day: 179, trick: "The Physical Attractiveness Stereotype", meaning: "What is beautiful is good.", example1: "Assume attractive people are kinder, smarter.", example2: "Be aware of this bias in hiring." },
  { day: 180, trick: "The What-Is-Beautiful-Is-Good Effect", meaning: "We attribute positive traits to attractive people.", example1: "Attractive = successful, happy, intelligent.", example2: "Check if you're falling for this." },
  { day: 181, trick: "The Baby-Face Effect", meaning: "People with baby faces seem more naive.", example1: "Baby-faced adults seen as warmer, less competent.", example2: "If you have baby face, work on sounding authoritative." },
  { day: 182, trick: "The Mature-Face Effect", meaning: "Mature faces seem more competent.", example1: "Older-looking people get leadership roles.", example2: "Dress maturely if you want authority." },
  { day: 183, trick: "The Height Effect", meaning: "Taller people earn more.", example1: "CEOs are taller than average.", example2: "Stand straight - posture affects perceived height." },
  { day: 184, trick: "The Deep Voice Effect", meaning: "Deeper voices seem more authoritative.", example1: "Deep-voiced politicians win more elections.", example2: "Practice speaking from chest, not throat." },
  { day: 185, trick: "The Fast Talker Effect", meaning: "Fast talkers seem more intelligent.", example1: "Rapid speech = confidence (but can seem nervous).", example2: "Vary pace - fast for energy, slow for importance." },
  { day: 186, trick: "The Slow Talker Effect", meaning: "Slow talkers seem more thoughtful.", example1: "Pauses make you seem wise.", example2: "Slow down for important points." },
  { day: 187, trick: "The Upspeak Effect", meaning: "Rising intonation makes you seem uncertain.", example1: "Ending sentences like questions? Sounds unsure?", example2: "End statements with falling tone for authority." },
  { day: 188, trick: "The Downspeak Effect", meaning: "Falling intonation shows confidence.", example1: "Lower pitch at end = certainty.", example2: "Practice ending sentences firmly." },
  { day: 189, trick: "The Vocal Fry Effect", meaning: "Creaky voice can seem trendy or unprofessional.", example1: "Young women use vocal fry - can be seen as less competent.", example2: "Be aware of your voice quality." },
  { day: 190, trick: "The Fidgeting Effect", meaning: "Fidgeting makes you seem nervous.", example1: "Playing with pen, touching hair = anxious.", example2: "Keep hands still - hold something if needed." },
  { day: 191, trick: "The Steady Gaze Effect", meaning: "Steady eye contact builds trust.", example1: "Look at people 60-70% of time.", example2: "Too little = untrustworthy, too much = creepy." }
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
  { day: 93, tip: "End on a High Note", meaning: "Last impression matters.", example1: "It was great meeting you, hope we can talk again.'", example2: "Thanks for your time, have a great day!'" },
  { day: 94, tip: "The 7-38-55 Rule", meaning: "7% words, 38% tone, 55% body language.", example1: "Focus on how you say it, not just what you say.", example2: "Record yourself - check your body language." },
  { day: 95, tip: "The Power of Pause", meaning: "Pause before important points.", example1: "Pause 2-3 seconds before key message.", example2: "Silence builds anticipation." },
  { day: 96, tip: "The Rule of Three", meaning: "Things in threes are more memorable.", example1: "I came, I saw, I conquered.'", example2: "Give 3 main points, not 10." },
  { day: 97, tip: "The Story Formula", meaning: "Character + Problem + Solution = Story.", example1: "Share customer success stories this way.", example2: "Personal stories follow this pattern." },
  { day: 98, tip: "The PREP Method", meaning: "Point, Reason, Example, Point.", example1: "State point, explain why, give example, restate.", example2: "Use in presentations for clarity." },
  { day: 99, tip: "The STAR Method", meaning: "Situation, Task, Action, Result.", example1: "Use in interviews to answer behavioral questions.", example2: "Structure your success stories this way." },
  { day: 100, tip: "The 30-Second Rule", meaning: "You have 30 seconds to hook attention.", example1: "Start with a question, fact, or story.", example2: "Don't waste the opening." },
  { day: 101, tip: "The 5-Second Rule", meaning: "If you hesitate more than 5 seconds, you lose them.", example1: "Answer questions promptly.", example2: "If you don't know, say 'Let me find out'." },
  { day: 102, tip: "The 1-Minute Rule", meaning: "Don't talk more than 1 minute without engaging.", example1: "Ask a question every minute.", example2: "Check for understanding frequently." },
  { day: 103, tip: "The 80/20 Rule", meaning: "Listen 80%, talk 20%.", example1: "You have two ears, one mouth - use them proportionally.", example2: "Ask questions, don't dominate." },
  { day: 104, tip: "The Echo Technique", meaning: "Repeat last few words they said.", example1: "Them: 'I'm excited about the project.' You: 'Excited - tell me more.'", example2: "Shows you're listening." },
  { day: 105, tip: "The Paraphrase Technique", meaning: "Summarize what they said in your words.", example1: "So if I understand correctly, you're saying...", example2: "Check understanding and show listening." },
  { day: 106, tip: "The Label Technique", meaning: "Name their emotion.", example1: "You seem frustrated about this.", example2: "It sounds like you're really excited." },
  { day: 107, tip: "The Validation Technique", meaning: "Acknowledge their feelings as valid.", example1: "That makes sense given what happened.", example2: "Anyone would feel that way in your situation." },
  { day: 108, tip: "The Normalization Technique", meaning: "Let them know it's normal.", example1: "Many people feel that way at first.", example2: "That's a common reaction." },
  { day: 109, tip: "The Empowerment Technique", meaning: "Remind them of their strengths.", example1: "You've handled similar situations before.", example2: "I've seen you overcome bigger challenges." },
  { day: 110, tip: "The Possibility Technique", meaning: "Open up new possibilities.", example1: "What if we looked at this differently?", example2: "Another way to think about this is..." },
  { day: 111, tip: "The Perspective Technique", meaning: "Help them see other views.", example1: "How might they be seeing this?", example2: "What would you advise a friend in this situation?" },
  { day: 112, tip: "The Future Technique", meaning: "Focus on future solutions, not past problems.", example1: "What would you like to happen next?", example2: "Let's focus on where we go from here." },
  { day: 113, tip: "The Scaling Technique", meaning: "Rate things on a scale.", example1: "On a scale of 1-10, how upset are you?", example2: "What would it take to go from 5 to 6?" },
  { day: 114, tip: "The Miracle Question", meaning: "If a miracle happened, what would be different?", example1: "If you woke up tomorrow and problem was solved, what would change?", example2: "Helps clarify goals." },
  { day: 115, tip: "The Exception Question", meaning: "When is the problem not happening?", example1: "Tell me about times when you don't feel this way.", example2: "What's different about those times?" },
  { day: 116, tip: "The Coping Question", meaning: "How are you managing?", example1: "This is really hard - how are you coping?", example2: "What's helping you get through?" },
  { day: 117, tip: "The Strength Question", meaning: "What strengths are you using?", example1: "What personal strengths are helping you?", example2: "What have you learned about yourself?" },
  { day: 118, tip: "The Support Question", meaning: "Who supports you?", example1: "Who in your life is helping you?", example2: "What support would be most helpful now?" },
  { day: 119, tip: "The Action Question", meaning: "What's the next small step?", example1: "What's one small thing you could do today?", example2: "What would be a good first step?" },
  { day: 120, tip: "The Commitment Question", meaning: "How committed are you?", example1: "On a scale of 1-10, how likely are you to do this?", example2: "What would make it a 10?" },
  { day: 121, tip: "The Follow-Up Question", meaning: "What happened after?", example1: "After that conversation, what happened?", example2: "How did things change?" },
  { day: 122, tip: "The Clarifying Question", meaning: "Help me understand better.", example1: "When you say 'soon', what does that mean?", example2: "Can you give me an example?" },
  { day: 123, tip: "The Probing Question", meaning: "Dig deeper.", example1: "What else can you tell me about that?", example2: "Why do you think that happened?" },
  { day: 124, tip: "The Leading Question", meaning: "Guide toward an answer.", example1: "Don't you think it would be better to...", example2: "Wouldn't you agree that... (use carefully)" },
  { day: 125, tip: "The Rhetorical Question", meaning: "Question not needing answer.", example1: "Isn't it amazing what we can achieve together?", example2: "Who doesn't want to save money?" },
  { day: 126, tip: "The Open Loop Question", meaning: "Leave them curious.", example1: "I'll tell you the secret later - first, let's discuss...", example2: "There's one more thing I'll share at the end." },
  { day: 127, tip: "The Closed Question", meaning: "Yes/no answers.", example1: "Did you finish the report?", example2: "Are you available tomorrow?" },
  { day: 128, tip: "The Funnel Technique", meaning: "Broad to narrow questions.", example1: "Start with 'Tell me about your work', then 'What projects?', then 'Tell me about that specific project.'", example2: "Narrow down to details." },
  { day: 129, tip: "The Inverted Funnel", meaning: "Narrow to broad.", example1: "Start with specific, then generalize.", example2: "Use when you need quick facts then explore." },
  { day: 130, tip: "The Tunnel Technique", meaning: "All questions on same topic.", example1: "Stay on one subject until fully explored.", example2: "Good for investigations." },
  { day: 131, tip: "The Spotlight Technique", meaning: "Focus on one aspect.", example1: "Let's focus specifically on the budget for now.", example2: "We'll cover other areas later." },
  { day: 132, tip: "The Scattergun Technique", meaning: "Many topics quickly.", example1: "Brainstorming - throw out many ideas.", example2: "Good for creativity, not for details." },
  { day: 133, tip: "The Bounce Technique", meaning: "Redirect question back.", example1: "That's interesting - what do you think?", example2: "How would you answer that?" },
  { day: 134, tip: "The Bridge Technique", meaning: "Acknowledge then redirect.", example1: "That's a good point, and I'd also add...", example2: "I hear you, and let me share another perspective." },
  { day: 135, tip: "The Flag Technique", meaning: "Flag important points.", example1: "This is really important: ...", example2: "If you remember only one thing, remember this." },
  { day: 136, tip: "The Bookend Technique", meaning: "Start and end with key message.", example1: "Open with main point, close with same point.", example2: "People remember beginnings and endings." },
  { day: 137, tip: "The Signpost Technique", meaning: "Tell them what's coming.", example1: "I'll cover three points: first..., second..., finally...", example2: "Makes your talk easy to follow." },
  { day: 138, tip: "The Summary Technique", meaning: "Summarize periodically.", example1: "So far we've discussed X and Y. Now let's move to Z.", example2: "Helps retention." },
  { day: 139, tip: "The Transition Technique", meaning: "Smooth topic changes.", example1: "Now that we've covered X, let's turn to Y.", example2: "Speaking of X, that reminds me of Y." },
  { day: 140, tip: "The Hook Technique", meaning: "Grab attention early.", example1: "Start with a surprising fact.", example2: "Open with a question that makes them think." },
  { day: 141, tip: "The Cliffhanger Technique", meaning: "Leave them wanting more.", example1: "I'll share the solution after the break.", example2: "If you want to know the secret, stay tuned." },
  { day: 142, tip: "The Teaser Technique", meaning: "Preview exciting content.", example1: "Wait till you hear what I discovered.", example2: "You won't believe what happened next." },
  { day: 143, tip: "The Curiosity Gap", meaning: "Create curiosity.", example1: "The one thing successful people do differently...", example2: "The secret they don't want you to know..." },
  { day: 144, tip: "The Contrast Technique", meaning: "Show difference.", example1: "Before this method, I struggled. After, everything changed.", example2: "Compare old vs new." },
  { day: 145, tip: "The Comparison Technique", meaning: "Compare to something familiar.", example1: "It's like riding a bike - once you learn, you never forget.", example2: "Think of it as a smartphone - simple interface, complex inside." },
  { day: 146, tip: "The Analogy Technique", meaning: "Use analogies to explain.", example1: "Memory is like a library - organize it well.", example2: "The brain is like a computer - process input, store data." },
  { day: 147, tip: "The Metaphor Technique", meaning: "Use metaphors.", example1: "Life is a journey.", example2: "Time is money." },
  { day: 148, tip: "The Example Technique", meaning: "Give specific examples.", example1: "For instance, last week...", example2: "Let me give you a real example." },
  { day: 149, tip: "The Story Technique", meaning: "Wrap message in story.", example1: "Let me tell you about a client who...", example2: "This reminds me of when I..." },
  { day: 150, tip: "The Data Technique", meaning: "Use numbers and facts.", example1: "Studies show that 80% of people...", example2: "According to research..." },
  { day: 151, tip: "The Testimonial Technique", meaning: "Quote others.", example1: "As one client said, 'This changed my life.'", example2: "Even Einstein said..." },
  { day: 152, tip: "The Authority Technique", meaning: "Cite experts.", example1: "Harvard researchers found that...", example2: "According to Dr. Smith..." },
  { day: 153, tip: "The Social Proof Technique", meaning: "Show others agree.", example1: "Join 10,000 satisfied customers.", example2: "Most people choose this option." },
  { day: 154, tip: "The Scarcity Technique", meaning: "Highlight limited availability.", example1: "Only 5 spots left.", example2: "This offer ends today." },
  { day: 155, tip: "The Urgency Technique", meaning: "Create time pressure.", example1: "Act now before it's too late.", example2: "Limited time offer." },
  { day: 156, tip: "The Reciprocity Technique", meaning: "Give first.", example1: "Here's a free guide - no strings attached.", example2: "Let me help you with that." },
  { day: 157, tip: "The Liking Technique", meaning: "Build rapport first.", example1: "Find common ground before business.", example2: "Give genuine compliments." },
  { day: 158, tip: "The Consistency Technique", meaning: "Get small agreement first.", example1: "Do you agree that health is important? Then let's discuss gym membership.", example2: "You said you value quality - let me show you our premium option." },
  { day: 159, tip: "The Unity Technique", meaning: "Emphasize shared identity.", example1: "We're both parents, so we want what's best for children.", example2: "As fellow engineers, you'll appreciate this." },
  { day: 160, tip: "The Contrast Technique", meaning: "Show difference after.", example1: "This is ₹1000, but for just ₹100 more you get premium.", example2: "Compared to others, our price is lower." },
  { day: 161, tip: "The Decoy Technique", meaning: "Add third option to make one appealing.", example1: "Small ₹100, Large ₹200 - add Medium ₹190, Large seems best.", example2: "Gold plan $100, Platinum $200 - add Silver $199, Platinum seems best." },
  { day: 162, tip: "The Anchor Technique", meaning: "Start high.", example1: "Quote ₹10,000 first, then ₹5,000 seems reasonable.", example2: "Compare to expensive option first." },
  { day: 163, tip: "The Framing Technique", meaning: "Frame positively.", example1: "90% success rate vs 10% failure rate.", example2: "Save ₹500 vs Pay ₹500 less." },
  { day: 164, tip: "The Reframing Technique", meaning: "Change the meaning.", example1: "Not a failure, but a learning experience.", example2: "Not expensive, but an investment." },
  { day: 165, tip: "The Reappraisal Technique", meaning: "Reinterpret feelings.", example1: "Nervousness is excitement without breath.", example2: "Anxiety means you care." },
  { day: 166, tip: "The Normalizing Technique", meaning: "Make feelings normal.", example1: "Everyone feels this way at first.", example2: "It's completely normal to be nervous." },
  { day: 167, tip: "The Depersonalizing Technique", meaning: "Not about you.", example1: "Their anger is about them, not you.", example2: "Don't take it personally." },
  { day: 168, tip: "The Externalizing Technique", meaning: "Problem is separate.", example1: "The problem is the deadline, not you.", example2: "Let's fight the problem together." },
  { day: 169, tip: "The De-catastrophizing Technique", meaning: "What's worst that could happen?", example1: "If you fail interview, you try another.", example2: "Really, how bad would that be?" },
  { day: 170, tip: "The Re-catastrophizing Technique", meaning: "What's best that could happen?", example1: "But what if you succeed brilliantly?", example2: "Imagine the best possible outcome." },
  { day: 171, tip: "The Probability Technique", meaning: "What are the actual odds?", example1: "What's the real probability of that happening?", example2: "How likely is that, really?" },
  { day: 172, tip: "The Evidence Technique", meaning: "What's the evidence?", example1: "What proof do you have for that thought?", example2: "Is there another way to see this?" },
  { day: 173, tip: "The Alternative Technique", meaning: "What's another explanation?", example1: "Could there be a different reason?", example2: "What would a friend say about this?" },
  { day: 174, tip: "The Balanced Technique", meaning: "Look at both sides.", example1: "What are the pros and cons?", example2: "What's good and bad about this situation?" },
  { day: 175, tip: "The Big Picture Technique", meaning: "Zoom out.", example1: "Will this matter in 5 years?", example2: "In the grand scheme, how important is this?" },
  { day: 176, tip: "The Small Picture Technique", meaning: "Zoom in.", example1: "What's the next small step?", example2: "Focus on today, not the whole mountain." },
  { day: 177, tip: "The Gratitude Technique", meaning: "What's going well?", example1: "What are three good things today?", example2: "What can you appreciate right now?" },
  { day: 178, tip: "The Optimism Technique", meaning: "Look for opportunities.", example1: "What opportunity does this challenge present?", example2: "What can you learn from this?" },
  { day: 179, tip: "The Pessimism Technique", meaning: "Prepare for worst.", example1: "What's the worst case, and can you handle it?", example2: "Plan for problems, hope for best." },
  { day: 180, tip: "The Acceptance Technique", meaning: "Accept what you can't change.", example1: "It is what it is - now what?", example2: "Accept, then act on what you can control." },
  { day: 181, tip: "The Control Technique", meaning: "Focus on what you control.", example1: "What's in your control here?", example2: "Let go of what you can't control." },
  { day: 182, tip: "The Responsibility Technique", meaning: "Own your part.", example1: "What's my responsibility in this?", example2: "What could I do differently?" },
  { day: 183, tip: "The Blame Technique", meaning: "Don't blame.", example1: "Blaming doesn't solve - focus on solutions.", example2: "Instead of who's fault, ask what's next." },
  { day: 184, tip: "The Forgiveness Technique", meaning: "Forgive to move on.", example1: "Holding anger hurts you, not them.", example2: "Forgiveness is for your peace." },
  { day: 185, tip: "The Apology Technique", meaning: "Apologize well.", example1: "I was wrong, I'm sorry, here's how I'll fix it.", example2: "Apologize for impact, not just intent." },
  { day: 186, tip: "The Gratitude Technique", meaning: "Say thank you.", example1: "Thank you for your patience.", example2: "I appreciate your help." },
  { day: 187, tip: "The Appreciation Technique", meaning: "Appreciate specifically.", example1: "I really appreciated how you handled that client.", example2: "Your attention to detail made a difference." },
  { day: 188, tip: "The Recognition Technique", meaning: "Recognize effort.", example1: "I see how hard you're working.", example2: "Your effort hasn't gone unnoticed." },
  { day: 189, tip: "The Encouragement Technique", meaning: "Encourage progress.", example1: "You're making great progress.", example2: "Keep going - you're almost there." },
  { day: 190, tip: "The Celebration Technique", meaning: "Celebrate wins.", example1: "Let's celebrate this milestone.", example2: "You deserve to celebrate this success." },
  { day: 191, tip: "The Connection Technique", meaning: "Connect genuinely.", example1: "Share something real about yourself.", example2: "Ask about them, listen, remember." }
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
  { day: 93, tip: "Notice Comfort Level", meaning: "Relaxed posture = comfortable.", example1: "Open arms = comfortable.", example2: "Laughing = comfortable." },
   { day: 94, tip: "Read Emotional Temperature", meaning: "Gauge the mood before speaking.", example1: "If tension is high, be calming.", example2: "If energy is low, be energizing." },
  { day: 95, tip: "Detect Hidden Emotions", meaning: "Look for micro-expressions.", example1: "Quick flash of anger before smile.", example2: "Brief sadness before neutral face." },
  { day: 96, tip: "Spot Fake Smiles", meaning: "Real smiles reach eyes.", example1: "Duchenne smile - crow's feet appear.", example2: "Fake smile - mouth only." },
  { day: 97, tip: "Recognize Genuine Interest", meaning: "Leaning in, eye contact, questions.", example1: "They ask follow-up questions.", example2: "They remember details later." },
  { day: 98, tip: "Detect Boredom", meaning: "Glancing around, checking phone.", example1: "Doodling or fidgeting.", example2: "Short responses, no questions." },
  { day: 99, tip: "Spot Discomfort", meaning: "Shifting weight, crossing arms.", example1: "Touching neck or face.", example2: "Leaning away, creating distance." },
  { day: 100, tip: "Recognize Attraction", meaning: "Prolonged eye contact, mirroring.", example1: "Playing with hair, preening.", example2: "Leaning in, finding excuses to touch." },
  { day: 101, tip: "Detect Deception", meaning: "Inconsistencies, over-explaining.", example1: "Touching face, covering mouth.", example2: "Less blinking, stiff posture." },
  { day: 102, tip: "Spot Nervousness", meaning: "Fidgeting, shallow breathing.", example1: "Voice cracks, fast talking.", example2: "Sweating, blushing." },
  { day: 103, tip: "Recognize Confidence", meaning: "Steady eye contact, open posture.", example1: "Slow speech, pauses.", example2: "Steeple hand gesture." },
  { day: 104, tip: "Detect Insecurity", meaning: "Seeking reassurance, over-apologizing.", example1: "Defensive body language.", example2: "Downplaying achievements." },
  { day: 105, tip: "Spot Arrogance", meaning: "One-upping, interrupting.", example1: "Dismissive gestures.", example2: "Not listening, waiting to talk." },
  { day: 106, tip: "Recognize Kindness", meaning: "Offers help, remembers details.", example1: "Asks how you're doing, means it.", example2: "Follows up on past conversations." },
  { day: 107, tip: "Detect Manipulation", meaning: "Guilt trips, love bombing.", example1: "Makes you feel obligated.", example2: "Hot and cold behavior." },
  { day: 108, tip: "Spot Toxic People", meaning: "Drain your energy, make you feel bad.", example1: "Always negative, criticizing.", example2: "Drama follows them everywhere." },
  { day: 109, tip: "Recognize Authenticity", meaning: "Consistent words and actions.", example1: "Admits mistakes, vulnerable.", example2: "No hidden agenda." },
  { day: 110, tip: "Detect Hidden Agendas", meaning: "Too good to be true offers.", example1: "Help with strings attached.", example2: "Friendly only when need something." },
  { day: 111, tip: "Spot Envy", meaning: "Backhanded compliments.", example1: "Happy for you but not really.", example2: "Downplays your success." },
  { day: 112, tip: "Recognize Support", meaning: "Celebrates your wins.", example1: "Helps without expecting return.", example2: "Defends you when you're not there." },
  { day: 113, tip: "Detect Jealousy", meaning: "Competes with you.", example1: "One-ups your stories.", example2: "Uncomfortable when you succeed." },
  { day: 114, tip: "Spot Respect", meaning: "Listens, values your time.", example1: "Asks your opinion, considers it.", example2: "Respects boundaries." },
  { day: 115, tip: "Recognize Disrespect", meaning: "Interrupts, dismisses your views.", example1: "Shows up late consistently.", example2: "Forgets what you said." },
  { day: 116, tip: "Detect Interest in You", meaning: "Asks personal questions.", example1: "Remembers what you like.", example2: "Wants to spend time with you." },
  { day: 117, tip: "Spot Self-Centeredness", meaning: "Always talks about themselves.", example1: "Never asks about you.", example2: "Every conversation turns to them." },
  { day: 118, tip: "Recognize Generosity", meaning: "Shares credit, gives freely.", example1: "Mentors without expecting.", example2: "Happy to help." },
  { day: 119, tip: "Detect Stinginess", meaning: "Keeps score of favors.", example1: "Reminds you of what they did.", example2: "Helps only when benefit for them." },
  { day: 120, tip: "Spot Reliability", meaning: "Does what they say.", example1: "Shows up on time.", example2: "Follows through on promises." },
  { day: 121, tip: "Recognize Unreliability", meaning: "Excuses, cancellations.", example1: "Promises but doesn't deliver.", example2: "Last minute changes." },
  { day: 122, tip: "Detect Honesty", meaning: "Consistent stories, admits when wrong.", example1: "Transparent about mistakes.", example2: "No need to exaggerate." },
  { day: 123, tip: "Spot Dishonesty", meaning: "Inconsistent, avoids eye contact.", example1: "Over-explains unnecessarily.", example2: "Changes story details." },
  { day: 124, tip: "Recognize Emotional Intelligence", meaning: "Reads your emotions, responds appropriately.", example1: "Knows when you need space.", example2: "Comforts when you're down." },
  { day: 125, tip: "Detect Emotional Immaturity", meaning: "Blames others, can't handle criticism.", example1: "Mood swings, unpredictable.", example2: "Can't apologize sincerely." },
  { day: 126, tip: "Spot Maturity", meaning: "Owns mistakes, calm under pressure.", example1: "Apologizes sincerely.", example2: "Handles criticism well." },
  { day: 127, tip: "Recognize Wisdom", meaning: "Learns from experience, gives good advice.", example1: "Shares lessons, not just opinions.", example2: "Asks good questions." },
  { day: 128, tip: "Detect Naivety", meaning: "Trusts too easily, sees only good.", example1: "Ignoring red flags.", example2: "Believes everyone has good intentions." },
  { day: 129, tip: "Spot Cynicism", meaning: "Assumes worst in people.", example1: "Always suspicious of motives.", example2: "Nothing good ever lasts." },
  { day: 130, tip: "Recognize Optimism", meaning: "Sees possibilities, lifts others.", example1: "Finds silver lining.", example2: "Encourages when things are hard." },
  { day: 131, tip: "Detect Pessimism", meaning: "Sees problems, drains energy.", example1: "Always expects worst.", example2: "Nothing will work anyway." },
  { day: 132, tip: "Spot Leadership", meaning: "Takes initiative, helps others shine.", example1: "Makes decisions, takes responsibility.", example2: "Empowers others." },
  { day: 133, tip: "Recognize Followership", meaning: "Supports, implements well.", example1: "Reliable executor.", example2: "Good team player." },
  { day: 134, tip: "Detect Micromanagement", meaning: "Controls every detail, doesn't trust.", example1: "Must approve everything.", example2: "Can't delegate." },
  { day: 135, tip: "Spot Delegation Skill", meaning: "Trusts others, gives autonomy.", example1: "Assigns then steps back.", example2: "Available but not hovering." },
  { day: 136, tip: "Recognize Team Player", meaning: "Shares credit, helps others.", example1: "Collaborates not competes.", example2: "Celebrates team wins." },
  { day: 137, tip: "Detect Lone Wolf", meaning: "Works alone, doesn't share.", example1: "Hoards information.", example2: "Not interested in team." },
  { day: 138, tip: "Spot Mentor", meaning: "Develops others, shares wisdom.", example1: "Takes time to teach.", example2: "Happy when mentees succeed." },
  { day: 139, tip: "Recognize Learner", meaning: "Always curious, asks questions.", example1: "Eager to learn from anyone.", example2: "Takes feedback well." },
  { day: 140, tip: "Detect Know-It-All", meaning: "Already knows everything.", example1: "Dismisses others' ideas.", example2: "Can't be told anything." },
  { day: 141, tip: "Spot Open-Mindedness", meaning: "Considers different views.", example1: "Listens without judging.", example2: "Changes mind with evidence." },
  { day: 142, tip: "Recognize Closed-Mindedness", meaning: "My way or highway.", example1: "Ignores facts that disagree.", example2: "Dismisses others' opinions." },
  { day: 143, tip: "Detect Flexibility", meaning: "Adapts to change easily.", example1: "Plans change, they adjust.", example2: "Sees opportunities in change." },
  { day: 144, tip: "Spot Rigidity", meaning: "Can't handle change.", example1: "Stuck in routines.", example2: "Upset when plans change." },
  { day: 145, tip: "Recognize Patience", meaning: "Calm while waiting.", example1: "Doesn't rush others.", example2: "Understands things take time." },
  { day: 146, tip: "Detect Impatience", meaning: "Rushes, interrupts.", example1: "Taps foot, sighs.", example2: "Wants results now." },
  { day: 147, tip: "Spot Tolerance", meaning: "Accepts differences.", example1: "Respects others' choices.", example2: "Doesn't judge." },
  { day: 148, tip: "Recognize Intolerance", meaning: "Can't accept differences.", example1: "Criticizes others' lifestyles.", example2: "Must convert others to their way." },
  { day: 149, tip: "Detect Compassion", meaning: "Feels for others, acts.", example1: "Helps without being asked.", example2: "Understands suffering." },
  { day: 150, tip: "Spot Apathy", meaning: "Doesn't care about others.", example1: "Ignores others' struggles.", example2: "Only cares about self." },
  { day: 151, tip: "Recognize Empathy", meaning: "Feels with others.", example1: "I can imagine how hard that is.", example2: "Your pain feels real to me." },
  { day: 152, tip: "Detect Sympathy", meaning: "Feels for others (from distance).", example1: "I feel sorry for you.", example2: "Less connected than empathy." },
  { day: 153, tip: "Spot Kindness", meaning: "Small acts of care.", example1: "Holds door, offers seat.", example2: "Asks if you need anything." },
  { day: 154, tip: "Recognize Cruelty", meaning: "Enjoys others' pain.", example1: "Makes fun of others.", example2: "Happy when others fail." },
  { day: 155, tip: "Detect Fairness", meaning: "Treats everyone equally.", example1: "Shares credit fairly.", example2: "Considers everyone's needs." },
  { day: 156, tip: "Spot Unfairness", meaning: "Plays favorites, biased.", example1: "Different rules for different people.", example2: "Takes more than gives." },
  { day: 157, tip: "Recognize Justice", meaning: "Wants what's right.", example1: "Speaks up against wrong.", example2: "Defends the weak." },
  { day: 158, tip: "Detect Injustice", meaning: "Takes advantage of others.", example1: "Exploits the vulnerable.", example2: "Silent when should speak." },
  { day: 159, tip: "Spot Integrity", meaning: "Does right when no one watches.", example1: "Returns found money.", example2: "Honest even when costly." },
  { day: 160, tip: "Recognize Hypocrisy", meaning: "Says one thing, does another.", example1: "Preaches honesty but lies.", example2: "Rules for thee, not for me." },
  { day: 161, tip: "Detect Courage", meaning: "Acts despite fear.", example1: "Speaks truth to power.", example2: "Admits mistakes publicly." },
  { day: 162, tip: "Spot Cowardice", meaning: "Avoids hard conversations.", example1: "Lets others take blame.", example2: "Silent when should speak." },
  { day: 163, tip: "Recognize Resilience", meaning: "Bounces back from setbacks.", example1: "Fails, learns, tries again.", example2: "Doesn't give up." },
  { day: 164, tip: "Detect Fragility", meaning: "Crumbles under pressure.", example1: "Can't handle criticism.", example2: "Gives up easily." },
  { day: 165, tip: "Spot Grit", meaning: "Persistent toward long-term goals.", example1: "Works hard despite obstacles.", example2: "Consistent effort over time." },
  { day: 166, tip: "Recognize Quitting", meaning: "Gives up when hard.", example1: "Stops at first failure.", example2: "No follow-through." },
  { day: 167, tip: "Detect Self-Awareness", meaning: "Knows own strengths/weaknesses.", example1: "Asks for feedback.", example2: "Reflects on behavior." },
  { day: 168, tip: "Spot Blindness", meaning: "Unaware of own impact.", example1: "Surprised when people react.", example2: "Doesn't see own flaws." },
  { day: 169, tip: "Recognize Humility", meaning: "Doesn't brag, admits limitations.", example1: "Shares credit.", example2: "Open to learning." },
  { day: 170, tip: "Detect Arrogance", meaning: "Thinks they're better.", example1: "Looks down on others.", example2: "Can't admit being wrong." },
  { day: 171, tip: "Spot Gratitude", meaning: "Appreciates what they have.", example1: "Says thank you often.", example2: "Notices small kindnesses." },
  { day: 172, tip: "Recognize Entitlement", meaning: "Thinks they deserve more.", example1: "Ungrateful for what they get.", example2: "Expects special treatment." },
  { day: 173, tip: "Detect Contentment", meaning: "Happy with enough.", example1: "Not always wanting more.", example2: "Enjoys present moment." },
  { day: 174, tip: "Spot Greed", meaning: "Never enough.", example1: "Always wants more.", example2: "Takes more than needs." },
  { day: 175, tip: "Recognize Generosity", meaning: "Gives freely.", example1: "Shares without expecting.", example2: "Happy to help others." },
  { day: 176, tip: "Detect Selfishness", meaning: "Takes, doesn't give.", example1: "Only cares about self.", example2: "What's in it for me?" },
  { day: 177, tip: "Spot Loyalty", meaning: "Stands by you.", example1: "Defends you when absent.", example2: "There in hard times." },
  { day: 178, tip: "Recognize Betrayal", meaning: "Turns on you.", example1: "Shares your secrets.", example2: "Leaves when you need them." },
  { day: 179, tip: "Detect Trustworthiness", meaning: "Keeps promises, secrets.", example1: "Reliable, consistent.", example2: "Honest even when costly." },
  { day: 180, tip: "Spot Untrustworthiness", meaning: "Breaks promises, gossips.", example1: "Shares what you told in confidence.", example2: "Unreliable." },
  { day: 181, tip: "Recognize Supportiveness", meaning: "Cheerleader for your success.", example1: "Celebrates your wins.", example2: "Encourages your dreams." },
  { day: 182, tip: "Detect Jealousy", meaning: "Threatened by your success.", example1: "Downplays achievements.", example2: "Uncomfortable when you shine." },
  { day: 183, tip: "Spot Encouragement", meaning: "Believes in you.", example1: "You can do this!'", example2: "I'm proud of you.'" },
  { day: 184, tip: "Recognize Discouragement", meaning: "Drains your hope.", example1: "That'll never work.'", example2: "Why bother?'" },
  { day: 185, tip: "Detect Inspiration", meaning: "Makes you want to be better.", example1: "Their example motivates you.", example2: "Lifts your spirit." },
  { day: 186, tip: "Spot Demotivation", meaning: "Makes you want to give up.", example1: "Always negative.", example2: "Nothing matters anyway.'" },
  { day: 187, tip: "Recognize Calm", meaning: "Brings peace to chaos.", example1: "Stays steady in crisis.", example2: "Others feel safe near them." },
  { day: 188, tip: "Detect Chaos", meaning: "Creates drama everywhere.", example1: "Always in crisis.", example2: "Energy drains you." },
  { day: 189, tip: "Spot Wisdom", meaning: "Knows when to speak, when to listen.", example1: "Gives advice only when asked.", example2: "Learns from everything." },
  { day: 190, tip: "Recognize Foolishness", meaning: "Talks without thinking.", example1: "Repeats same mistakes.", example2: "Doesn't learn." },
  { day: 191, tip: "Detect Presence", meaning: "Fully here with you.", example1: "No phone, no distraction.", example2: "Remembers what you said." }
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
  { day: 93, word: "Acrostics", meaning: "First letters form sentence.", example1: "My Very Educated Mother Just Served Us Noodles (planets)", example2: "Sentence to remember order." },
  { day: 94, word: "Proactive Interference", meaning: "Old memories disrupt new ones.", example1: "Can't remember new password because of old one.", example2: "Old phone number blocks new one." },
  { day: 95, word: "Retroactive Interference", meaning: "New memories disrupt old ones.", example1: "Learn French, forget Spanish.", example2: "New address makes you forget old one." },
  { day: 96, word: "Anterograde Amnesia", meaning: "Can't form new memories.", example1: "Remember past but not new people.", example2: "Movie 'Memento' shows this." },
  { day: 97, word: "Retrograde Amnesia", meaning: "Can't remember past.", example1: "Remember new things but not old.", example2: "Forget childhood after accident." },
  { day: 98, word: "Source Amnesia", meaning: "Remember fact but not where learned.", example1: "Know fact but forget if true or rumor.", example2: "Think your idea but heard elsewhere." },
  { day: 99, word: "Flashbulb Memory", meaning: "Vivid memory of emotional event.", example1: "Remember where you were on 9/11.", example2: "Vivid recall of major news events." },
  { day: 100, word: "Eyewitness Memory", meaning: "Memory of witnessed event.", example1: "Often unreliable - influenced by questions.", example2: "Different witnesses see differently." },
  { day: 101, word: "Autobiographical Memory", meaning: "Memory of your own life.", example1: "Remembering your first day of school.", example2: "Personal life events." },
  { day: 102, word: "Episodic Memory", meaning: "Memory of specific events.", example1: "Remembering your last birthday party.", example2: "What you did yesterday." },
  { day: 103, word: "Semantic Memory", meaning: "Memory of facts and knowledge.", example1: "Knowing Paris is capital of France.", example2: "Facts, concepts, meanings." },
  { day: 104, word: "Procedural Memory", meaning: "Memory of how to do things.", example1: "Riding a bike, tying shoes.", example2: "Unconscious memory of skills." },
  { day: 105, word: "Priming", meaning: "Exposure influences response.", example1: "See 'doctor' then faster recognition of 'nurse'.", example2: "Word associations." },
  { day: 106, word: "Encoding", meaning: "Processing information for memory.", example1: "Deep processing (meaning) vs shallow (sound).", example2: "How you learn affects recall." },
  { day: 107, word: "Storage", meaning: "Maintaining information over time.", example1: "Short-term vs long-term storage.", example2: "Where memories live." },
  { day: 108, word: "Retrieval", meaning: "Accessing stored information.", example1: "Recall vs recognition.", example2: "Multiple choice easier than essay." },
  { day: 109, word: "Recall", meaning: "Retrieving without cues.", example1: "Essay questions test recall.", example2: "Harder than recognition." },
  { day: 110, word: "Recognition", meaning: "Identifying learned information.", example1: "Multiple choice tests recognition.", example2: "Easier than recall." },
  { day: 111, word: "Relearning", meaning: "Learning again faster.", example1: "Study for exam, forget, restudy faster.", example2: "Savings score measures this." },
  { day: 112, word: "Savings Score", meaning: "Time saved when relearning.", example1: "Learn French in 100hrs, relearn in 40hrs - 60% savings.", example2: "Shows memory persists." },
  { day: 113, word: "Maintenance Rehearsal", meaning: "Repeating to remember.", example1: "Repeat phone number to remember temporarily.", example2: "Shallow processing." },
  { day: 114, word: "Elaborative Rehearsal", meaning: "Connecting to meaning.", example1: "Relate new info to what you know.", example2: "Deeper processing, better memory." },
  { day: 115, word: "Depth of Processing", meaning: "Deeper processing = better memory.", example1: "Meaning > sound > appearance.", example2: "Think about meaning, not just words." },
  { day: 116, word: "Shallow Processing", meaning: "Superficial encoding.", example1: "Remember font, not meaning.", example2: "Poor memory later." },
  { day: 117, word: "Deep Processing", meaning: "Meaningful encoding.", example1: "Think about implications, examples.", example2: "Better long-term memory." },
  { day: 118, word: "Self-Referential Encoding", meaning: "Relating to self improves memory.", example1: "How does this apply to me?", example2: "Personal examples stick." },
  { day: 119, word: "Transfer-Appropriate Processing", meaning: "Match encoding and retrieval.", example1: "Study in quiet, test in quiet - better.", example2: "Context matters." },
  { day: 120, word: "Context-Dependent Memory", meaning: "Same context helps recall.", example1: "Study in room, test in same room - better.", example2: "Divers remember underwater." },
  { day: 121, word: "State-Dependent Memory", meaning: "Same internal state helps recall.", example1: "Learn drunk, recall drunk - better.", example2: "Mood affects memory." },
  { day: 122, word: "Mood-Congruent Memory", meaning: "Recall matches current mood.", example1: "Sad mood = recall sad memories.", example2: "Happy mood = happy memories." },
  { day: 123, word: "Encoding Specificity", meaning: "Cues at encoding help retrieval.", example1: "Remember 'piano' if cue 'heavy' vs 'sound'.", example2: "Cues matter." },
  { day: 124, word: "Retrieval Cue", meaning: "Stimulus that triggers recall.", example1: "Smell triggers memory.", example2: "Song from past brings memories." },
  { day: 125, word: "Encoding Failure", meaning: "Never encoded, can't recall.", example1: "Don't remember coin details - never encoded.", example2: "Not in memory at all." },
  { day: 126, word: "Storage Decay", meaning: "Memories fade over time.", example1: "Forget names over years.", example2: "Ebbinghaus forgetting curve." },
  { day: 127, word: "Retrieval Failure", meaning: "Memory exists but can't access.", example1: "Tip of tongue phenomenon.", example2: "Know but can't recall." },
  { day: 128, word: "Interference Theory", meaning: "Other info blocks recall.", example1: "Proactive and retroactive interference.", example2: "Competing memories." },
  { day: 129, word: "Motivated Forgetting", meaning: "Forget what's painful.", example1: "Forget traumatic events.", example2: "Repression - unconscious blocking." },
  { day: 130, word: "Repression", meaning: "Unconscious blocking of painful memories.", example1: "Forget childhood abuse.", example2: "Controversial concept." },
  { day: 131, word: "Suppression", meaning: "Conscious forgetting.", example1: "I won't think about that now.", example2: "Push thoughts away intentionally." },
  { day: 132, word: "False Memory", meaning: "Remembering things that didn't happen.", example1: "Remember being lost in mall (implanted).", example2: "Loftus research." },
  { day: 133, word: "Misinformation Effect", meaning: "Leading questions alter memory.", example1: "Did you see 'the' broken headlight?", example2: "Witnesses influenced." },
  { day: 134, word: "Source Monitoring Error", meaning: "Misremembering source of info.", example1: "Thought you saw it, but heard about it.", example2: "Confusing dream with reality." },
  { day: 135, word: "Cryptomnesia", meaning: "Think you invented, actually remembered.", example1: "New idea' is from old memory.", example2: "Unconscious plagiarism." },
  { day: 136, word: "Consistency Bias", meaning: "Think past was like present.", example1: "I always believed that' (but you changed).", example2: "Rewrite personal history." },
  { day: 137, word: "Change Blindness", meaning: "Miss obvious changes.", example1: "Person asking directions swapped - people don't notice.", example2: "Inattentional blindness." },
  { day: 138, word: "Inattentional Blindness", meaning: "Miss visible things when focused.", example1: "Gorilla in basketball video - people miss it.", example2: "Focus = blind to other things." },
  { day: 139, word: "Choice Blindness", meaning: "Don't notice choice changes.", example1: "Choose face, then shown different - defend choice.", example2: "We don't know why we choose." },
  { day: 140, word: "Bystander Effect", meaning: "Less help when others present.", example1: "Kitty Genovese murder - 38 watched.", example2: "Diffusion of responsibility." },
  { day: 141, word: "Diffusion of Responsibility", meaning: "Others will help, so I won't.", example1: "In group, assume someone else will act.", example2: "Less personal responsibility." },
  { day: 142, word: "Pluralistic Ignorance", meaning: "Everyone privately disagrees, but thinks everyone agrees.", example1: "Nobody believes, but thinks everyone believes.", example2: "Peer pressure works this way." },
  { day: 143, word: "Social Loafing", meaning: "Less effort in groups.", example1: "Tug of war - pull less in team.", example2: "Rely on others to work." },
  { day: 144, word: "Social Facilitation", meaning: "Better on simple tasks with audience.", example1: "Pool players do better with crowd.", example2: "Worse on complex tasks." },
  { day: 145, word: "Social Inhibition", meaning: "Worse on complex tasks with audience.", example1: "Learn new skill worse when watched.", example2: "Stage fright." },
  { day: 146, word: "Deindividuation", meaning: "Lose self-awareness in groups.", example1: "Mob behavior, anonymity.", example2: "Klan members do things alone wouldn't." },
  { day: 147, word: "Group Polarization", meaning: "Groups make views more extreme.", example1: "Discussion makes opinions stronger.", example2: "Risky shift - groups take more risks." },
  { day: 148, word: "Groupthink", meaning: "Group harmony over critical thinking.", example1: "Bay of Pigs disaster - no one objected.", example2: "Everyone agrees to avoid conflict." },
  { day: 149, word: "Abilene Paradox", meaning: "Group does what no one wants.", example1: "Family drives to Abilene - no one wanted to go.", example2: "Everyone assumes everyone wants." },
  { day: 150, word: "Social Identity Theory", meaning: "We favor our group.", example1: "In-group vs out-group bias.", example2: "Sports fans favor their team." },
  { day: 151, word: "In-Group Bias", meaning: "Favor our group over others.", example1: "Our team is better.", example2: "Allocate more to our group." },
  { day: 152, word: "Out-Group Homogeneity", meaning: "They are all alike; we are diverse.", example1: "They're all the same.'", example2: "We are individuals." },
  { day: 153, word: "Minimal Group Paradigm", meaning: "Even random groups create bias.", example1: "Split by coin flip - favor your group.", example2: "Klee vs Kandinsky experiment." },
  { day: 154, word: "Realistic Conflict Theory", meaning: "Competition for resources creates conflict.", example1: "Robbers Cave experiment.", example2: "Jobs scarce = more prejudice." },
  { day: 155, word: "Superordinate Goals", meaning: "Shared goals reduce conflict.", example1: "Robbers Cave - fix water supply together.", example2: "Common enemy unites." },
  { day: 156, word: "Contact Hypothesis", meaning: "Contact reduces prejudice under conditions.", example1: "Equal status, common goals, authority support.", example2: "Integrated housing works." },
  { day: 157, word: "Jigsaw Classroom", meaning: "Cooperative learning reduces prejudice.", example1: "Each student has piece of puzzle.", example2: "Need each other to learn." },
  { day: 158, word: "Stereotype Threat", meaning: "Fear of confirming stereotype harms performance.", example1: "Girls told 'girls bad at math' - do worse.", example2: "Black students told test measures intelligence - do worse." },
  { day: 159, word: "Self-Fulfilling Prophecy", meaning: "Expectations create reality.", example1: "Teacher expects student to do well - student does.", example2: "Think someone is hostile - act cold - they respond hostile." },
  { day: 160, word: "Pygmalion Effect", meaning: "High expectations lead to high performance.", example1: "Teachers told certain students 'bloomers' - they did.", example2: "Manager expects more, gets more." },
  { day: 161, word: "Golem Effect", meaning: "Low expectations lead to low performance.", example1: "Expect failure, get failure.", example2: "Negative Pygmalion." },
  { day: 162, word: "Placebo Effect", meaning: "Belief in treatment causes improvement.", example1: "Sugar pill helps if you believe.", example2: "Mind-body connection." },
  { day: 163, word: "Nocebo Effect", meaning: "Negative expectations cause harm.", example1: "Told side effects, experience them.", example2: "Believe you'll get sick, do." },
  { day: 164, word: "Hawthorne Effect", meaning: "Behavior changes when watched.", example1: "Workers more productive when observed.", example2: "Being studied changes behavior." },
  { day: 165, word: "John Henry Effect", meaning: "Compete when compared to others.", example1: "Control group works harder when compared.", example2: "Try harder when in experiment." },
  { day: 166, word: "Demand Characteristics", meaning: "Participants guess study purpose, act accordingly.", example1: "Try to be 'good participant'.", example2: "Act how they think expected." },
  { day: 167, word: "Social Desirability Bias", meaning: "Answer to look good.", example1: "Say vote, didn't. Say donate, didn't.", example2: "Overreport good, underreport bad." },
  { day: 168, word: "Acquiescence Bias", meaning: "Agree with everything.", example1: "Yes-saying on surveys.", example2: "Agree regardless of content." },
  { day: 169, word: "Extremity Bias", meaning: "Use extremes on scales.", example1: "Always 1 or 7, never middle.", example2: "Avoid moderate answers." },
  { day: 170, word: "Central Tendency Bias", meaning: "Avoid extremes, choose middle.", example1: "Always 4 on 1-7 scale.", example2: "Safe, middle answers." },
  { day: 171, word: "Recency Effect in Surveys", meaning: "Last options remembered better.", example1: "In long lists, last items chosen more.", example2: "Order matters." },
  { day: 172, word: "Primacy Effect in Surveys", meaning: "First options remembered better.", example1: "First in list chosen more.", example2: "Especially in oral surveys." },
  { day: 173, word: "Question Order Effect", meaning: "Earlier questions affect later.", example1: "Ask about happiness, then dating - correlated.", example2: "Order changes answers." },
  { day: 174, word: "Framing Effect in Surveys", meaning: "Wording changes answers.", example1: "Forbid' vs 'not allow' - different.", example2: "Support' vs 'favor' - different." },
  { day: 175, word: "Double-Barreled Question", meaning: "Two questions in one.", example1: "Do you support X and Y?' (can't answer both)", example2: "Should be separated." },
  { day: 176, word: "Leading Question", meaning: "Suggests desired answer.", example1: "Don't you agree that...", example2: "Surely you think...'" },
  { day: 177, word: "Loaded Question", meaning: "Contains assumption.", example1: "Have you stopped beating your wife?'", example2: "Assumes you did." },
  { day: 178, word: "Correlation vs Causation", meaning: "Related doesn't mean caused.", example1: "Ice cream sales and drowning correlate (heat causes both).", example2: "Don't assume cause." },
  { day: 179, word: "Third Variable Problem", meaning: "Unmeasured variable causes both.", example1: "Coffee drinkers live longer? Maybe wealth (third variable).", example2: "Hidden factor." },
  { day: 180, word: "Directionality Problem", meaning: "Which causes which?", example1: "Depression causes low self-esteem or reverse?", example2: "Unknown direction." },
  { day: 181, word: "Naturalistic Observation", meaning: "Observe in natural setting.", example1: "Watch children on playground.", example2: "No intervention." },
  { day: 182, word: "Laboratory Observation", meaning: "Observe in controlled setting.", example1: "Children in playroom with camera.", example2: "Control conditions." },
  { day: 183, word: "Case Study", meaning: "In-depth study of one person.", example1: "Phineas Gage - brain injury study.", example2: "Rare phenomena." },
  { day: 184, word: "Survey Method", meaning: "Ask many people questions.", example1: "Political polls.", example2: "Self-report data." },
  { day: 185, word: "Correlational Study", meaning: "Measure relationship between variables.", example1: "Study time and grades correlate.", example2: "No causation." },
  { day: 186, word: "Experiment", meaning: "Manipulate variable to see effect.", example1: "Give drug to one group, placebo to other.", example2: "Establish causation." },
  { day: 187, word: "Independent Variable", meaning: "What experimenter manipulates.", example1: "Drug vs placebo.", example2: "Teaching method." },
  { day: 188, word: "Dependent Variable", meaning: "What is measured.", example1: "Test scores.", example2: "Mood ratings." },
  { day: 189, word: "Control Group", meaning: "No treatment, for comparison.", example1: "Placebo group.", example2: "Baseline to compare." },
  { day: 190, word: "Experimental Group", meaning: "Gets treatment.", example1: "Gets actual drug.", example2: "New teaching method." },
  { day: 191, word: "Random Assignment", meaning: "Participants randomly assigned to groups.", example1: "Flip coin for group.", example2: "Ensures groups equivalent." }
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
  { day: 93, phrase: "You've become just like [negative person]", meaning: "Insulting comparison.", example1: "You're becoming just like your mother.", example2: "You're turning into my ex.'" },
   { day: 94, phrase: "You're too emotional", meaning: "Invalidating your feelings.", example1: "When you express anger: 'You're too emotional.'", example2: "Can't we discuss this calmly?' (when you're calm)" },
  { day: 95, phrase: "You're overthinking", meaning: "Dismissing your concerns.", example1: "It's not a big deal, you're overthinking.", example2: "You always read too much into things.'" },
  { day: 96, phrase: "You're paranoid", meaning: "Making you doubt valid suspicions.", example1: "You think I'm cheating? You're paranoid.", example2: "No one's out to get you, you're paranoid.'" },
  { day: 97, phrase: "You're so insecure", meaning: "Attacking when you question them.", example1: "If you were secure, you wouldn't ask.", example2: "Your insecurity is pushing me away.'" },
  { day: 98, phrase: "You're being dramatic", meaning: "Minimizing your feelings.", example1: "It's not that bad, you're being dramatic.", example2: "Stop making everything a drama.'" },
  { day: 99, phrase: "You're making a big deal out of nothing", meaning: "Invalidating your concerns.", example1: "It was just a joke, you're making a big deal.", example2: "Why are you so upset over nothing?'" },
  { day: 100, phrase: "You're impossible to please", meaning: "Making you feel unreasonable.", example1: "Nothing I do is ever good enough for you.", example2: "You're never satisfied.'" },
  { day: 101, phrase: "You're too demanding", meaning: "Shaming your needs.", example1: "You always want more, you're too demanding.", example2: "Why can't you just be happy with what you have?'" },
  { day: 102, phrase: "You're too needy", meaning: "Shaming your need for connection.", example1: "I need space, you're too needy.", example2: "You're suffocating me.'" },
  { day: 103, phrase: "You're too clingy", meaning: "Making you feel bad for wanting closeness.", example1: "Can't I have time alone? You're too clingy.", example2: "You're always there, it's too much.'" },
  { day: 104, phrase: "You're too controlling", meaning: "When you set boundaries.", example1: "I can't have friends? You're controlling.", example2: "You want to know where I am? Controlling.'" },
  { day: 105, phrase: "You're too jealous", meaning: "Dismissing valid concerns.", example1: "I was just talking to them, you're jealous.", example2: "Your jealousy is your problem.'" },
  { day: 106, phrase: "You're too sensitive", meaning: "Classic invalidation.", example1: "I was joking, you're too sensitive.", example2: "Can't you take criticism? Too sensitive.'" },
  { day: 107, phrase: "You're too serious", meaning: "Dismissing your concerns.", example1: "Lighten up, you're too serious.", example2: "Why so serious? It was just a joke.'" },
  { day: 108, phrase: "You have no sense of humor", meaning: "When you don't laugh at their cruelty.", example1: "Can't take a joke? No sense of humor.", example2: "You're so uptight, no humor.'" },
  { day: 109, phrase: "You're so negative", meaning: "Dismissing valid criticism.", example1: "Always pointing out problems, so negative.", example2: "Can't you be positive for once?'" },
  { day: 110, phrase: "You're always complaining", meaning: "Silencing your concerns.", example1: "Nothing is ever good enough for you.", example2: "All you do is complain.'" },
  { day: 111, phrase: "You're never happy", meaning: "Making you seem impossible.", example1: "I do so much and you're never happy.", example2: "What would make you happy? Nothing.'" },
  { day: 112, phrase: "You expect too much", meaning: "Lowering your standards.", example1: "Expecting me to remember? You expect too much.", example2: "Basic respect is too much?'" },
  { day: 113, phrase: "You're so ungrateful", meaning: "Guilt-tripping.", example1: "After all I do, you're so ungrateful.", example2: "Never a thank you, so ungrateful.'" },
  { day: 114, phrase: "You don't appreciate anything", meaning: "Making you feel guilty.", example1: "I work so hard and you don't appreciate it.", example2: "Nothing I do is appreciated.'" },
  { day: 115, phrase: "You take me for granted", meaning: "Guilt-tripping.", example1: "You think I'll always be here? Taking me for granted.", example2: "I'm not your doormat.'" },
  { day: 116, phrase: "You don't deserve me", meaning: "Lowering self-esteem.", example1: "Other people would appreciate me.", example2: "You're lucky I stay with you.'" },
  { day: 117, phrase: "No one else would want you", meaning: "Destroying self-worth.", example1: "Look at yourself, who else would want you?", example2: "You should be grateful I'm with you.'" },
  { day: 118, phrase: "You're lucky I put up with you", meaning: "Making you feel inferior.", example1: "Most people would have left by now.", example2: "I'm the only one who tolerates you.'" },
  { day: 119, phrase: "I'm the best thing that ever happened to you", meaning: "Inflating their importance.", example1: "Your life was a mess before me.", example2: "You'd be lost without me.'" },
  { day: 120, phrase: "You'd be nothing without me", meaning: "Creating dependency.", example1: "I made you who you are.", example2: "Without me, you have nothing.'" },
  { day: 121, phrase: "I gave you everything", meaning: "Exaggerating their contributions.", example1: "I sacrificed everything for you.", example2: "And this is how you repay me?'" },
  { day: 122, phrase: "I did so much for you", meaning: "Guilt-tripping with favors.", example1: "Remember when I helped you with...", example2: "You owe me for all I've done.'" },
  { day: 123, phrase: "You owe me", meaning: "Creating false debt.", example1: "I did X, so you owe me Y.", example2: "After all I've done, you owe me.'" },
  { day: 124, phrase: "You need to earn my trust back", meaning: "Moving goalposts.", example1: "You made a mistake, now earn trust.", example2: "No matter what, not enough.'" },
  { day: 125, phrase: "Trust is earned", meaning: "Holding over your head.", example1: "You haven't earned my trust yet.", example2: "Keep trying, maybe someday.'" },
  { day: 126, phrase: "I need to think about whether I can forgive you", meaning: "Keeping you in limbo.", example1: "Dangling forgiveness, not giving it.", example2: "You'll have to wait and see.'" },
  { day: 127, phrase: "I forgive you, but I won't forget", meaning: "Holding grudge.", example1: "I'll remind you of this forever.", example2: "Forgiveness with conditions.'" },
  { day: 128, phrase: "I'll never forget this", meaning: "Holding onto resentment.", example1: "You'll pay for this forever.", example2: "This will always be between us.'" },
  { day: 129, phrase: "You'll regret this", meaning: "Threat.", example1: "If you leave, you'll regret it.", example2: "You don't want to make me angry.'" },
  { day: 130, phrase: "You'll be sorry", meaning: "Threat.", example1: "Just wait, you'll be sorry.", example2: "You'll regret crossing me.'" },
  { day: 131, phrase: "I'll make sure everyone knows what you did", meaning: "Threat to reputation.", example1: "I'll tell everyone your secrets.", example2: "Wait till they find out about you.'" },
  { day: 132, phrase: "Wait till I tell people about you", meaning: "Threat to reputation.", example1: "They'll see who you really are.", example2: "Your reputation will be ruined.'" },
  { day: 133, phrase: "Everyone will know the truth about you", meaning: "Threat to expose.", example1: "I have proof of what you did.", example2: "The real you will come out.'" },
  { day: 134, phrase: "I have evidence", meaning: "Threatening with 'proof'.", example1: "I saved all your messages.", example2: "I have recordings, you know.'" },
  { day: 135, phrase: "I'll destroy you", meaning: "Extreme threat.", example1: "I'll ruin your life.", example2: "You'll wish you never met me.'" },
  { day: 136, phrase: "You don't know what I'm capable of", meaning: "Vague threat.", example1: "You haven't seen my dark side.", example2: "Don't push me.'" },
  { day: 137, phrase: "I'm not the one to mess with", meaning: "Intimidation.", example1: "You picked the wrong person.", example2: "I always get even.'" },
  { day: 138, phrase: "You asked for this", meaning: "Blaming you for their actions.", example1: "If you hadn't..., I wouldn't have...", example2: "You brought this on yourself.'" },
  { day: 139, phrase: "Look what you made me do", meaning: "Blaming you for their behavior.", example1: "I wouldn't have yelled if you didn't...", example2: "You pushed me to this.'" },
  { day: 140, phrase: "You provoked me", meaning: "Justifying abuse.", example1: "I hit you because you provoked me.", example2: "You knew how to make me angry.'" },
  { day: 141, phrase: "You know how to push my buttons", meaning: "Blaming you for their reaction.", example1: "You do this on purpose to upset me.", example2: "You know exactly what sets me off.'" },
  { day: 142, phrase: "You're making me angry", meaning: "Making you responsible for their emotions.", example1: "Stop before I get angry.", example2: "You're making me lose my temper.'" },
  { day: 143, phrase: "Don't make me angry", meaning: "Warning/threat.", example1: "You won't like me when I'm angry.", example2: "Don't push your luck.'" },
  { day: 144, phrase: "You won't like me when I'm angry", meaning: "Threat.", example1: "Hulk reference but threatening.", example2: "I lose control when angry.'" },
  { day: 145, phrase: "I can't control myself when I'm angry", meaning: "Excuse for behavior.", example1: "I just snap, I can't help it.", example2: "You know how I get.'" },
  { day: 146, phrase: "You know I have anger issues", meaning: "Excuse, not taking responsibility.", example1: "It's not my fault, I have issues.", example2: "You knew this when you met me.'" },
  { day: 147, phrase: "This is just who I am", meaning: "Refusing to change.", example1: "Take it or leave it, this is me.", example2: "I'm not going to change.'" },
  { day: 148, phrase: "I'm not going to change", meaning: "Refusing growth.", example1: "This is me, deal with it.", example2: "If you don't like it, leave.'" },
  { day: 149, phrase: "If you can't handle me at my worst...", meaning: "Excuse for bad behavior.", example1: "...you don't deserve me at my best.'", example2: "Marilyn Monroe quote misused.'" },
  { day: 150, phrase: "Take it or leave it", meaning: "Ultimatum.", example1: "These are my terms, take or leave.", example2: "No negotiation.'" },
  { day: 151, phrase: "It's my way or the highway", meaning: "No compromise.", example1: "Do it my way or get out.", example2: "I don't negotiate.'" },
  { day: 152, phrase: "I'm not asking, I'm telling", meaning: "Authoritarian.", example1: "This isn't a request.", example2: "Do it because I said so.'" },
  { day: 153, phrase: "Because I said so", meaning: "No explanation needed.", example1: "Parent to child, but in adult relationships.", example2: "My word is law.'" },
  { day: 154, phrase: "I don't have to explain myself to you", meaning: "Shutting down communication.", example1: "I do what I want, no explanation.", example2: "You're not entitled to an answer.'" },
  { day: 155, phrase: "You're not my boss", meaning: "Dismissing valid requests.", example1: "I don't answer to you.", example2: "Who made you in charge?'" },
  { day: 156, phrase: "You can't tell me what to do", meaning: "Rebelling against boundaries.", example1: "I'm free to do what I want.", example2: "You're controlling me.'" },
  { day: 157, phrase: "I'll do what I want", meaning: "Refusing accountability.", example1: "Don't try to stop me.", example2: "You can't control me.'" },
  { day: 158, phrase: "You're not the boss of me", meaning: "Childish defiance.", example1: "I don't have to listen to you.", example2: "You're not my parent.'" },
  { day: 159, phrase: "Mind your own business", meaning: "Pushing you away.", example1: "Stay out of my affairs.", example2: "This doesn't concern you.'" },
  { day: 160, phrase: "Stay out of it", meaning: "Excluding you.", example1: "This is between me and them.", example2: "You're not involved.'" },
  { day: 161, phrase: "It's none of your business", meaning: "Keeping secrets.", example1: "What I do is my business.", example2: "You don't need to know.'" },
  { day: 162, phrase: "You don't need to know", meaning: "Withholding information.", example1: "I'll tell you if I want to.", example2: "Need-to-know basis.'" },
  { day: 163, phrase: "I'll tell you when you need to know", meaning: "Controlling information.", example1: "You'll find out when it's time.", example2: "Don't ask again.'" },
  { day: 164, phrase: "Stop asking questions", meaning: "Shutting down curiosity.", example1: "Just do what I say.", example2: "Questions aren't allowed.'" },
  { day: 165, phrase: "Don't question me", meaning: "Demanding blind obedience.", example1: "I know what I'm doing.", example2: "Trust me, don't ask.'" },
  { day: 166, phrase: "Just trust me", meaning: "Asking blind faith.", example1: "I have a plan, just trust me.", example2: "You'll see, but trust me now.'" },
  { day: 167, phrase: "You'll see, I'm right", meaning: "Dismissing your views.", example1: "I told you so later.", example2: "Just wait, you'll agree eventually.'" },
  { day: 168, phrase: "Mark my words", meaning: "Predicting to seem wise.", example1: "You'll remember what I said.", example2: "This will happen, mark my words.'" },
  { day: 169, phrase: "I told you so", meaning: "Gloating after being right.", example1: "See, I was right.", example2: "Should have listened to me.'" },
  { day: 170, phrase: "You should have listened to me", meaning: "Blaming after failure.", example1: "If you had listened, this wouldn't have happened.", example2: "But no, you knew better.'" },
  { day: 171, phrase: "I knew this would happen", meaning: "Claiming foresight.", example1: "I predicted this from the start.", example2: "I tried to warn you.'" },
  { day: 172, phrase: "I tried to warn you", meaning: "I-told-you-so.", example1: "But you didn't listen.", example2: "Now look what happened.'" },
  { day: 173, phrase: "Don't say I didn't warn you", meaning: "Covering themselves.", example1: "I did my part, now it's on you.", example2: "Remember this conversation.'" },
  { day: 174, phrase: "I wash my hands of this", meaning: "Abandoning responsibility.", example1: "It's your problem now.", example2: "I'm done, don't come to me.'" },
  { day: 175, phrase: "It's your problem now", meaning: "Abandoning you.", example1: "I'm out, deal with it yourself.", example2: "Not my circus, not my monkeys.'" },
  { day: 176, phrase: "Don't come crying to me", meaning: "Withdrawing support.", example1: "When it fails, don't blame me.", example2: "You made your bed, lie in it.'" },
  { day: 177, phrase: "You made your bed, now lie in it", meaning: "No sympathy.", example1: "You chose this, now deal.", example2: "Consequences of your actions.'" },
  { day: 178, phrase: "Actions have consequences", meaning: "Punishing/threatening.", example1: "You'll learn when something bad happens.", example2: "Hope you're ready for what comes.'" },
  { day: 179, phrase: "Play stupid games, win stupid prizes", meaning: "Mocking your choices.", example1: "What did you expect?", example2: "You got what you deserved.'" },
  { day: 180, phrase: "What did you expect?", meaning: "Blaming you.", example1: "You knew who I was.", example2: "You should have seen this coming.'" },
  { day: 181, phrase: "You knew what you were getting into", meaning: "Dismissing complaints.", example1: "I was like this from day one.", example2: "Don't act surprised now.'" },
  { day: 182, phrase: "I never promised you anything", meaning: "Avoiding responsibility.", example1: "I didn't say I'd change.", example2: "You assumed, I didn't promise.'" },
  { day: 183, phrase: "That was your assumption", meaning: "Gaslighting.", example1: "I never said that, you assumed.", example2: "You read too much into it.'" },
  { day: 184, phrase: "You misinterpreted", meaning: "Blaming your understanding.", example1: "That's not what I meant.", example2: "You took it the wrong way.'" },
  { day: 185, phrase: "You're putting words in my mouth", meaning: "Denying what they said.", example1: "I never said that.", example2: "Stop twisting my words.'" },
  { day: 186, phrase: "Stop twisting my words", meaning: "When paraphrased accurately.", example1: "That's not what I meant.", example2: "You're distorting what I said.'" },
  { day: 187, phrase: "You're taking it out of context", meaning: "Defending indefensible.", example1: "In context, it was different.", example2: "You're ignoring the full picture.'" },
  { day: 188, phrase: "You don't understand", meaning: "Dismissing your perspective.", example1: "It's complicated, you wouldn't get it.", example2: "You're not in my shoes.'" },
  { day: 189, phrase: "You can't possibly understand", meaning: "Excluding you.", example1: "You haven't been through this.", example2: "It's different for me.'" },
  { day: 190, phrase: "You're not listening", meaning: "Blaming you for not agreeing.", example1: "You hear but don't listen.", example2: "You're not really hearing me.'" },
  { day: 191, phrase: "You hear what you want to hear", meaning: "Dismissing your understanding.", example1: "You filter everything through your bias.", example2: "You only listen to confirm your views.'" }
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
  { day: 93, tactic: "Ultimatums: This or That", meaning: "Forcing choice with threats.", example1: "It's me or your friends.", example2: "Do this or I'm leaving.'" },
  { day: 94, tactic: "Emotional Blackmail", meaning: "Using fear, obligation, guilt.", example1: "If you leave, I'll hurt myself.", example2: "After all I've done for you...'" },
  { day: 95, tactic: "Fear Mongering", meaning: "Creating fear to control.", example1: "The world is dangerous, stay with me.", example2: "No one else will protect you.'" },
  { day: 96, tactic: "Future Faking 2.0", meaning: "Promising future to keep you.", example1: "We'll get married, have kids, travel.", example2: "Next year we'll buy a house.'" },
  { day: 97, tactic: "Love Bombing 2.0", meaning: "Overwhelming affection after conflict.", example1: "After abuse, gifts and apologies.", example2: "Honeymoon phase after fight.'" },
  { day: 98, tactic: "Intermittent Reinforcement 2.0", meaning: "Random rewards keep you hooked.", example1: "Sometimes kind, sometimes cruel.", example2: "Addictive unpredictability.'" },
  { day: 99, tactic: "Gaslighting 2.0: Reality Distortion", meaning: "Denying your reality.", example1: "That never happened, you're imagining.", example2: "You're crazy, that's not true.'" },
  { day: 100, tactic: "Gaslighting 2.0: Trivializing", meaning: "Making feelings seem small.", example1: "You're overreacting, it's nothing.", example2: "It wasn't that bad.'" },
  { day: 101, tactic: "Gaslighting 2.0: Withholding", meaning: "Pretending not to understand.", example1: "I don't know what you're talking about.", example2: "You're confusing me.'" },
  { day: 102, tactic: "Gaslighting 2.0: Countering", meaning: "Questioning your memory.", example1: "Are you sure that's how it happened?", example2: "I remember it differently.'" },
  { day: 103, tactic: "Gaslighting 2.0: Diverting", meaning: "Changing subject.", example1: "You're upset about that? What about you...", example2: "Let's talk about your problems.'" },
  { day: 104, tactic: "Gaslighting 2.0: Forgetting/Denial", meaning: "Pretending to forget.", example1: "I don't remember saying that.", example2: "You must have misunderstood.'" },
  { day: 105, tactic: "Triangulation 2.0", meaning: "Bringing in others to control.", example1: "Even your mother agrees with me.", example2: "Everyone thinks you're wrong.'" },
  { day: 106, tactic: "Isolation 2.0", meaning: "Cutting off support system.", example1: "Your friends are toxic.", example2: "Your family doesn't love you like I do.'" },
  { day: 107, tactic: "Moving Goalposts 2.0", meaning: "Changing expectations constantly.", example1: "You did X, but now I need Y.", example2: "Never satisfied, always more.'" },
  { day: 108, tactic: "Projection 2.0", meaning: "Accusing you of their flaws.", example1: "You're cheating (when they are).", example2: "You're the liar (when they lie).'" },
  { day: 109, tactic: "Blaming 2.0", meaning: "Everything is your fault.", example1: "If you hadn't..., I wouldn't have...", example2: "Our problems are because of you.'" },
  { day: 110, tactic: "Shaming 2.0", meaning: "Making you feel worthless.", example1: "You're stupid, ugly, fat, etc.", example2: "What's wrong with you?'" },
  { day: 111, tactic: "Guilt-Tripping 2.0", meaning: "Making you feel guilty.", example1: "I sacrificed everything for you.", example2: "You owe me after all I've done.'" },
  { day: 112, tactic: "Victim Playing 2.0", meaning: "Making themselves the victim.", example1: "Why is everyone so mean to me?", example2: "I'm always the one who suffers.'" },
  { day: 113, tactic: "Martyrdom 2.0", meaning: "Sacrificing then guilt-tripping.", example1: "I gave up everything for you.", example2: "I work so hard for this family.'" },
  { day: 114, tactic: "Silent Treatment 2.0", meaning: "Withdrawing to punish.", example1: "Ignores for hours/days.", example2: "Refuses to speak until you apologize.'" },
  { day: 115, tactic: "Stonewalling 2.0", meaning: "Refusing to communicate.", example1: "Shuts down, won't engage.", example2: "Leaves room, hangs up.'" },
  { day: 116, tactic: "Withholding 2.0", meaning: "Withholding affection, attention.", example1: "No intimacy until you comply.", example2: "Cold and distant.'" },
  { day: 117, tactic: "Negging 2.0", meaning: "Backhanded compliments.", example1: "You're pretty for your size.", example2: "I usually don't date your type.'" },
  { day: 118, tactic: "Comparison 2.0", meaning: "Comparing you unfavorably.", example1: "Why can't you be more like...", example2: "My ex was better at this.'" },
  { day: 119, tactic: "Competition 2.0", meaning: "Always competing with you.", example1: "My problem is worse than yours.", example2: "I'm more tired/sicker/busier.'" },
  { day: 120, tactic: "One-Upmanship 2.0", meaning: "Always have to be better.", example1: "You got a raise? I got bigger.", example2: "You're sick? I'm sicker.'" },
  { day: 121, tactic: "Minimizing 2.0", meaning: "Making concerns seem small.", example1: "It's not a big deal.", example2: "You're overreacting.'" },
  { day: 122, tactic: "Trivializing 2.0", meaning: "Making important things small.", example1: "Your feelings don't matter.", example2: "That's not important.'" },
  { day: 123, tactic: "Catastrophizing 2.0", meaning: "Making small issues huge.", example1: "This mistake will ruin everything.", example2: "You'll never recover from this.'" },
  { day: 124, tactic: "Pathologizing 2.0", meaning: "Labeling you mentally ill.", example1: "You're bipolar, you're crazy.", example2: "You need therapy.'" },
  { day: 125, tactic: "Diagnosing 2.0", meaning: "Pretending to diagnose you.", example1: "You have narcissistic personality.", example2: "You're borderline, I researched.'" },
  { day: 126, tactic: "Word Salad 2.0", meaning: "Confusing talk to avoid issues.", example1: "Rambling, no point, you get confused.", example2: "Changes subjects constantly.'" },
  { day: 127, tactic: "Circular Conversations 2.0", meaning: "Going in circles, no resolution.", example1: "Same argument for years.", example2: "Never reach conclusion.'" },
  { day: 128, tactic: "Jokes That Aren't Funny 2.0", meaning: "Cruelty disguised as humor.", example1: "Says hurtful things, then 'just joking'.", example2: "Can't you take a joke?'" },
  { day: 129, tactic: "Name-Calling 2.0", meaning: "Labels to hurt.", example1: "Crazy, stupid, fat, ugly.", example2: "You're impossible, too much.'" },
  { day: 130, tactic: "Ultimatums 2.0", meaning: "This or that, no choice.", example1: "It's me or your job.", example2: "Do this or I'm gone.'" },
  { day: 131, tactic: "Threats 2.0", meaning: "Threatening to get way.", example1: "If you leave, I'll hurt myself.", example2: "I'll ruin your reputation.'" },
  { day: 132, tactic: "Intimidation 2.0", meaning: "Scaring you into compliance.", example1: "Yelling, blocking exits, throwing things.", example2: "Physical presence to scare.'" },
  { day: 133, tactic: "Financial Control", meaning: "Controlling money to control you.", example1: "Access to all accounts, you get allowance.", example2: "You can't spend without permission.'" },
  { day: 134, tactic: "Social Control", meaning: "Controlling who you see.", example1: "Who you can be friends with.", example2: "Need permission to go out.'" },
  { day: 135, tactic: "Digital Control", meaning: "Controlling phone/social media.", example1: "Checking your phone, passwords.", example2: "Who you can follow/talk to.'" },
  { day: 136, tactic: "Time Control", meaning: "Controlling your time.", example1: "Where you go, when you return.", example2: "Timing your errands.'" },
  { day: 137, tactic: "Information Control", meaning: "Controlling what you know.", example1: "Hiding information, lying.", example2: "You don't need to know.'" },
  { day: 138, tactic: "Emotional Control", meaning: "Controlling how you feel.", example1: "Make you feel guilty, afraid.", example2: "Mood determines your mood.'" },
  { day: 139, tactic: "Reality Control", meaning: "Controlling what's real.", example1: "Gaslighting - denying reality.", example2: "Rewriting history.'" },
  { day: 140, tactic: "Choice Control", meaning: "Controlling your decisions.", example1: "Must consult them before deciding.", example2: "Your choices are wrong.'" },
  { day: 141, tactic: "Micro-Managing", meaning: "Controlling every detail.", example1: "How you do everything.", example2: "Nothing is good enough.'" },
  { day: 142, tactic: "Second-Guessing", meaning: "Making you doubt yourself.", example1: "Are you sure that's right?", example2: "Maybe you should think again.'" },
  { day: 143, tactic: "Undermining", meaning: "Weakening your confidence.", example1: "You'll probably fail.", example2: "That's too hard for you.'" },
  { day: 144, tactic: "Sabotage", meaning: "Actively making you fail.", example1: "Interfere with your work.", example2: "Create problems for you.'" },
  { day: 145, tactic: "Sleep Deprivation", meaning: "Keeping you tired.", example1: "Keep you up late fighting.", example2: "Wake you up unnecessarily.'" },
  { day: 146, tactic: "Food Control", meaning: "Controlling what you eat.", example1: "Comment on what you eat.", example2: "Restrict or force food.'" },
  { day: 147, tactic: "Health Control", meaning: "Controlling healthcare.", example1: "Prevent doctor visits.", example2: "Dismiss your health concerns.'" },
  { day: 148, tactic: "Appearance Control", meaning: "Controlling how you look.", example1: "What you wear, how you style.", example2: "Criticize appearance constantly.'" },
  { day: 149, tactic: "Privacy Invasion", meaning: "No boundaries.", example1: "Read your messages, emails.", example2: "Follow you, track you.'" },
  { day: 150, tactic: "Boundary Violation", meaning: "Ignoring your limits.", example1: "Touch when you say no.", example2: "Enter when door closed.'" },
  { day: 151, tactic: "Gaslighting 3.0: Reality Shifting", meaning: "Changing facts constantly.", example1: "First said X, now says Y, denies X.", example2: "You can't keep up.'" },
  { day: 152, tactic: "Gaslighting 3.0: Time Distortion", meaning: "Making you doubt time.", example1: "That happened last week' (was yesterday).", example2: "You're losing track of time.'" },
  { day: 153, tactic: "Gaslighting 3.0: Event Distortion", meaning: "Changing event details.", example1: "You said X' (you didn't).", example2: "That's not what happened.'" },
  { day: 154, tactic: "Gaslighting 3.0: Emotion Invalidation", meaning: "Your feelings are wrong.", example1: "You shouldn't feel that way.", example2: "You're too sensitive.'" },
  { day: 155, tactic: "Gaslighting 3.0: Perception Invalidation", meaning: "What you see isn't real.", example1: "You're imagining things.", example2: "That's not what happened.'" },
  { day: 156, tactic: "Love Bombing 3.0: Trauma Bonding", meaning: "Creating addiction through abuse cycles.", example1: "Abuse then love - you're hooked.", example2: "Stockholm syndrome dynamics.'" },
  { day: 157, tactic: "Love Bombing 3.0: Idealize-Devalue-Discard", meaning: "Cycle of abuse.", example1: "Put on pedestal, then tear down.", example2: "Then abandon, then repeat.'" },
  { day: 158, tactic: "Intermittent Reinforcement 3.0", meaning: "Random rewards strongest.", example1: "Slot machine effect - unpredictable.", example2: "Keeps you trying for love.'" },
  { day: 159, tactic: "Triangulation 3.0: Jealousy Induction", meaning: "Making you jealous.", example1: "Talk about others interested in them.", example2: "Flirt with others to make you insecure.'" },
  { day: 160, tactic: "Isolation 3.0: Create Dependency", meaning: "Make you need them.", example1: "Destroy confidence so you rely on them.", example2: "Handle everything so you can't.'" },
  { day: 161, tactic: "Moving Goalposts 3.0", meaning: "Standards always rise.", example1: "You meet one, new one appears.", example2: "Can never satisfy.'" },
  { day: 162, tactic: "Projection 3.0: Mirror Accusations", meaning: "Accuse you of what they do.", example1: "Cheaters accuse of cheating.", example2: "Liars call you liar.'" },
  { day: 163, tactic: "Blaming 3.0: Reverse Victim", meaning: "You're the real abuser.", example1: "I only react to your abuse.", example2: "You're the narcissist.'" },
  { day: 164, tactic: "Shaming 3.0: Public Humiliation", meaning: "Embarrass you publicly.", example1: "Share secrets in front of others.", example2: "Mock you in public.'" },
  { day: 165, tactic: "Guilt-Tripping 3.0: Debt Collection", meaning: "Keep score of favors.", example1: "Remember when I did X for you?", example2: "You owe me for Y.'" },
  { day: 166, tactic: "Victim Playing 3.0: Professional Victim", meaning: "Always the victim.", example1: "Everyone always hurts me.", example2: "Why does this always happen to me?'" },
  { day: 167, tactic: "Martyrdom 3.0: Suffering Show", meaning: "Make suffering obvious.", example1: "Sigh loudly, look miserable.", example2: "I'll just suffer in silence.'" },
  { day: 168, tactic: "Silent Treatment 3.0: Stone Cold", meaning: "Complete shutdown.", example1: "Act like you don't exist.", example2: "No response for days.'" },
  { day: 169, tactic: "Withholding 3.0: Emotional Starvation", meaning: "No affection, no warmth.", example1: "Cold, distant, unresponsive.", example2: "You're alone even with them.'" },
  { day: 170, tactic: "Negging 3.0: Subtle Undermining", meaning: "Small digs constantly.", example1: "That's an interesting choice...", example2: "You actually look nice today.'" },
  { day: 171, tactic: "Comparison 3.0: Benchmarking", meaning: "Always comparing.", example1: "Why can't you be like them?", example2: "They do this better than you.'" },
  { day: 172, tactic: "Competition 3.0: Everything is Contest", meaning: "Life is competition.", example1: "My success vs your success.", example2: "Can't just be happy for you.'" },
  { day: 173, tactic: "One-Upmanship 3.0: Always Win", meaning: "Must be superior.", example1: "You did well, but I did better.", example2: "Your experience? Let me top it.'" },
  { day: 174, tactic: "Minimizing 3.0: Dismissive", meaning: "Nothing matters.", example1: "It's not important.", example2: "Why focus on that?'" },
  { day: 175, tactic: "Trivializing 3.0: It's Nothing", meaning: "Your concerns are nothing.", example1: "You're upset over that?", example2: "That's not worth discussing.'" },
  { day: 176, tactic: "Catastrophizing 3.0: Disaster Always", meaning: "Everything is disaster.", example1: "This small mistake will ruin everything.", example2: "It's the end of the world.'" },
  { day: 177, tactic: "Pathologizing 3.0: You're Sick", meaning: "You have disorders.", example1: "You're bipolar, narcissistic, etc.", example2: "You need professional help.'" },
  { day: 178, tactic: "Word Salad 3.0: Nonsense", meaning: "Can't follow conversation.", example1: "Rambling, no logic.", example2: "You give up trying.'" },
  { day: 179, tactic: "Circular Conversations 3.0", meaning: "Same loop forever.", example1: "Same arguments, no progress.", example2: "Exhausting and pointless.'" },
  { day: 180, tactic: "Jokes That Aren't Funny 3.0", meaning: "Testing boundaries.", example1: "Cruel 'jokes' to see what you tolerate.", example2: "If you object, 'sensitive'.'" },
  { day: 181, tactic: "Name-Calling 3.0: Labels", meaning: "Constant negative labels.", example1: "Crazy, stupid, useless, etc.", example2: "Words designed to hurt.'" },
  { day: 182, tactic: "Ultimatums 3.0: Final Offer", meaning: "No negotiation.", example1: "Last chance, take it or leave.", example2: "This is your only option.'" },
  { day: 183, tactic: "Threats 3.0: Veiled Threats", meaning: "Not direct but threatening.", example1: "You don't want to see me angry.", example2: "Things might get worse.'" },
  { day: 184, tactic: "Intimidation 3.0: Presence", meaning: "Physical presence to scare.", example1: "Stand too close, block path.", example2: "Use size to intimidate.'" },
  { day: 185, tactic: "Financial Abuse 2.0", meaning: "Using money to control.", example1: "Withholding money, stealing.", example2: "Prevent work, create dependency.'" },
  { day: 186, tactic: "Coercive Control", meaning: "Overall pattern of control.", example1: "Isolation, intimidation, control.", example2: "Trapping you in relationship.'" },
  { day: 187, tactic: "Stalking", meaning: "Following, monitoring.", example1: "Show up where you are.", example2: "Track your movements.'" },
  { day: 188, tactic: "Cyberstalking", meaning: "Online monitoring.", example1: "Check all your social media.", example2: "Fake accounts to watch you.'" },
  { day: 189, tactic: "Gaslighting 4.0: Reality Erasure", meaning: "Make you question everything.", example1: "Your memories, perceptions, sanity.", example2: "You don't know what's real.'" },
  { day: 190, tactic: "Love Bombing 4.0: Soulmate Lie", meaning: "Claim you're soulmates.", example1: "We're meant to be together.", example2: "I've never felt this way.'" },
  { day: 191, tactic: "Intermittent Reinforcement 4.0", meaning: "Addiction cycle complete.", example1: "Random rewards strongest bond.", example2: "Trauma bond complete.'" }
];

// ==================== MAIN COMPONENT ====================
export default function PsychologyMaster() {
  const [streak, setStreak] = useState(0);
  const [checks, setChecks] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [challengeDay, setChallengeDay] = useState(1);
  
  // ===== Favorites State =====
  const [favorites, setFavorites] = useState({
    psychology_trick: [],
    communication_tip: [],
    social_tip: [],
    psychology_word: [],
    manipulator_phrase: [],
    manipulator_tactic: []
  });
  const [showFavorites, setShowFavorites] = useState(false);
  
  const today = new Date();
  const todayStr = today.toDateString();

  // Calculate challenge day based on start date
  useEffect(() => {
    const startDate = localStorage.getItem("psychologyStartDate");
    if (startDate) {
      const start = new Date(startDate);
      const diffTime = Math.abs(today - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setChallengeDay(Math.min(diffDays, 52));
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
        setChecks(parsed.checks || {});
        setFavorites(parsed.favorites || {
          psychology_trick: [],
          communication_tip: [],
          social_tip: [],
          psychology_word: [],
          manipulator_phrase: [],
          manipulator_tactic: []
        });
        console.log("✅ Psychology data loaded:", parsed);
      }
    } catch (error) {
      console.error("Error loading psychology data:", error);
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
    const dataToSave = {
      checks: checks,
      favorites: favorites
    };
    localStorage.setItem("psychologyMaster", JSON.stringify(dataToSave));
    console.log("✅ Psychology data saved");
  }, [checks, favorites, isInitialized]);

  // Toggle task completion
  const toggleTask = (taskId) => {
    setChecks(prev => {
      const todayData = prev[todayStr] || {};
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

  // ===== Toggle Favorite Function =====
  const toggleFavorite = (category, item) => {
    setFavorites(prev => {
      const categoryFavorites = prev[category] || [];
      
      // Check if already saved
      const exists = categoryFavorites.some(fav => fav.day === item.day);
      
      if (exists) {
        // Remove from favorites
        return {
          ...prev,
          [category]: categoryFavorites.filter(fav => fav.day !== item.day)
        };
      } else {
        // Add to favorites
        const newItem = {
          day: item.day,
          title: item.trick || item.tip || item.word || item.phrase || item.tactic,
          meaning: item.meaning,
          example1: item.example1,
          example2: item.example2,
          category: category
        };
        return {
          ...prev,
          [category]: [...categoryFavorites, newItem]
        };
      }
    });
  };

  // ===== Check if Item is Favorite =====
  const isFavorite = (category, item) => {
    const categoryFavorites = favorites[category] || [];
    return categoryFavorites.some(fav => fav.day === item.day);
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

  // Calculate total favorites count
  const totalFavorites = Object.values(favorites).reduce((acc, curr) => acc + curr.length, 0);

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
        <div className="day-badge">Day {challengeDay}/52</div>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4>{todaysPsychologyTrick.trick}</h4>
              <button 
                onClick={() => toggleFavorite('psychology_trick', {...todaysPsychologyTrick, day: challengeDay})}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: isFavorite('psychology_trick', {...todaysPsychologyTrick, day: challengeDay}) ? 'var(--warning)' : '#ccc',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {isFavorite('psychology_trick', {...todaysPsychologyTrick, day: challengeDay}) ? '★' : '☆'}
              </button>
            </div>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4>{todaysCommunicationTip.tip}</h4>
              <button 
                onClick={() => toggleFavorite('communication_tip', {...todaysCommunicationTip, day: challengeDay})}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: isFavorite('communication_tip', {...todaysCommunicationTip, day: challengeDay}) ? 'var(--warning)' : '#ccc',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {isFavorite('communication_tip', {...todaysCommunicationTip, day: challengeDay}) ? '★' : '☆'}
              </button>
            </div>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4>{todaysSocialTip.tip}</h4>
              <button 
                onClick={() => toggleFavorite('social_tip', {...todaysSocialTip, day: challengeDay})}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: isFavorite('social_tip', {...todaysSocialTip, day: challengeDay}) ? 'var(--warning)' : '#ccc',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {isFavorite('social_tip', {...todaysSocialTip, day: challengeDay}) ? '★' : '☆'}
              </button>
            </div>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4>{todaysPsychologyWord.word}</h4>
              <button 
                onClick={() => toggleFavorite('psychology_word', {...todaysPsychologyWord, day: challengeDay})}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: isFavorite('psychology_word', {...todaysPsychologyWord, day: challengeDay}) ? 'var(--warning)' : '#ccc',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {isFavorite('psychology_word', {...todaysPsychologyWord, day: challengeDay}) ? '★' : '☆'}
              </button>
            </div>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4>"{todaysManipulatorPhrase.phrase}"</h4>
              <button 
                onClick={() => toggleFavorite('manipulator_phrase', {...todaysManipulatorPhrase, day: challengeDay})}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: isFavorite('manipulator_phrase', {...todaysManipulatorPhrase, day: challengeDay}) ? 'var(--warning)' : '#ccc',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {isFavorite('manipulator_phrase', {...todaysManipulatorPhrase, day: challengeDay}) ? '★' : '☆'}
              </button>
            </div>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4>{todaysManipulatorTactic.tactic}</h4>
              <button 
                onClick={() => toggleFavorite('manipulator_tactic', {...todaysManipulatorTactic, day: challengeDay})}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: isFavorite('manipulator_tactic', {...todaysManipulatorTactic, day: challengeDay}) ? 'var(--warning)' : '#ccc',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {isFavorite('manipulator_tactic', {...todaysManipulatorTactic, day: challengeDay}) ? '★' : '☆'}
              </button>
            </div>
            <p className="meaning">{todaysManipulatorTactic.meaning}</p>
            <div className="examples">
              <p><strong>Example 1:</strong> {todaysManipulatorTactic.example1}</p>
              <p><strong>Example 2:</strong> {todaysManipulatorTactic.example2}</p>
            </div>
          </div>
        )}
      </div>

      {/* ===== FAVORITES TOGGLE BUTTON ===== */}
      <button 
        className="favorites-toggle-btn"
        onClick={() => setShowFavorites(!showFavorites)}
        style={{
          width: '100%',
          padding: '0.8rem',
          margin: '1rem 0',
          background: showFavorites ? 'var(--warning)' : 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-lg)',
          fontWeight: '600',
          fontSize: '1rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          transition: 'all 0.3s ease'
        }}
      >
        <span>{showFavorites ? '⭐' : '☆'}</span>
        {showFavorites ? 'Hide Favorites' : `Show Favorites (${totalFavorites})`}
      </button>

      {/* ===== FAVORITES SECTION ===== */}
      {showFavorites && (
        <div className="favorites-section" style={{
          background: 'var(--card-light)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          marginTop: '0rem',
          marginBottom: '2rem',
          border: '2px solid var(--warning)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <h3 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            color: 'var(--warning)',
            fontSize: '1.3rem'
          }}>
            <span>⭐</span> Your Saved Favorites
          </h3>

          {/* Psychology Tricks Favorites */}
          {favorites.psychology_trick.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '0.8rem' }}>🎯 Psychology Tricks</h4>
              {favorites.psychology_trick.map((item, idx) => (
                <div key={idx} style={{
                  background: 'var(--bg-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem',
                  marginBottom: '0.8rem',
                  border: '1px solid var(--border-light)',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--primary)' }}>Day {item.day}: {item.title}</strong>
                    <button 
                      onClick={() => toggleFavorite('psychology_trick', item)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        color: 'var(--warning)'
                      }}
                    >
                      ★
                    </button>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>{item.meaning}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text)' }}>Example 1: {item.example1}</p>
                </div>
              ))}
            </div>
          )}

          {/* Communication Tips Favorites */}
          {favorites.communication_tip.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--success)', marginBottom: '0.8rem' }}>💬 Communication Tips</h4>
              {favorites.communication_tip.map((item, idx) => (
                <div key={idx} style={{
                  background: 'var(--bg-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem',
                  marginBottom: '0.8rem',
                  border: '1px solid var(--border-light)',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--success)' }}>Day {item.day}: {item.title}</strong>
                    <button 
                      onClick={() => toggleFavorite('communication_tip', item)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        color: 'var(--warning)'
                      }}
                    >
                      ★
                    </button>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>{item.meaning}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text)' }}>Example 1: {item.example1}</p>
                </div>
              ))}
            </div>
          )}

          {/* Social Intelligence Favorites */}
          {favorites.social_tip.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--info)', marginBottom: '0.8rem' }}>🤝 Social Intelligence</h4>
              {favorites.social_tip.map((item, idx) => (
                <div key={idx} style={{
                  background: 'var(--bg-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem',
                  marginBottom: '0.8rem',
                  border: '1px solid var(--border-light)',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--info)' }}>Day {item.day}: {item.title}</strong>
                    <button 
                      onClick={() => toggleFavorite('social_tip', item)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        color: 'var(--warning)'
                      }}
                    >
                      ★
                    </button>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>{item.meaning}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text)' }}>Example 1: {item.example1}</p>
                </div>
              ))}
            </div>
          )}

          {/* Psychology Words Favorites */}
          {favorites.psychology_word.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--purple)', marginBottom: '0.8rem' }}>📚 Psychology Words</h4>
              {favorites.psychology_word.map((item, idx) => (
                <div key={idx} style={{
                  background: 'var(--bg-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem',
                  marginBottom: '0.8rem',
                  border: '1px solid var(--border-light)',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--purple)' }}>Day {item.day}: {item.title}</strong>
                    <button 
                      onClick={() => toggleFavorite('psychology_word', item)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        color: 'var(--warning)'
                      }}
                    >
                      ★
                    </button>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>{item.meaning}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text)' }}>Example 1: {item.example1}</p>
                </div>
              ))}
            </div>
          )}

          {/* Manipulator Phrases Favorites */}
          {favorites.manipulator_phrase.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--warning)', marginBottom: '0.8rem' }}>⚠️ Manipulator Phrases</h4>
              {favorites.manipulator_phrase.map((item, idx) => (
                <div key={idx} style={{
                  background: 'var(--bg-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem',
                  marginBottom: '0.8rem',
                  border: '1px solid var(--border-light)',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--warning)' }}>Day {item.day}: "{item.title}"</strong>
                    <button 
                      onClick={() => toggleFavorite('manipulator_phrase', item)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        color: 'var(--warning)'
                      }}
                    >
                      ★
                    </button>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>{item.meaning}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text)' }}>Example 1: {item.example1}</p>
                </div>
              ))}
            </div>
          )}

          {/* Manipulator Tactics Favorites */}
          {favorites.manipulator_tactic.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--danger)', marginBottom: '0.8rem' }}>🔍 Manipulator Tactics</h4>
              {favorites.manipulator_tactic.map((item, idx) => (
                <div key={idx} style={{
                  background: 'var(--bg-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem',
                  marginBottom: '0.8rem',
                  border: '1px solid var(--border-light)',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--danger)' }}>Day {item.day}: {item.title}</strong>
                    <button 
                      onClick={() => toggleFavorite('manipulator_tactic', item)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        color: 'var(--warning)'
                      }}
                    >
                      ★
                    </button>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>{item.meaning}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text)' }}>Example 1: {item.example1}</p>
                </div>
              ))}
            </div>
          )}

          {totalFavorites === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text)' }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</p>
              <p>No favorites saved yet.</p>
              <p style={{ fontSize: '0.9rem', opacity: '0.7' }}>Click the ★ button on any card to save it here.</p>
            </div>
          )}
        </div>
      )}

    </div>  
  );
}