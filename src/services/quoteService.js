export const fetchQuote = async () => {
  try {
    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    return { text: data.content, author: data.author };
  } catch (error) {
    // Fallback quotes
    const fallback = [
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
      { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
      { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
      { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
      { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
      { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" }
    ];
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
}; 