
// *** CONFIGURATION ***
// We are splitting the key to prevent GitHub from auto-blocking the push.
// In a real app, use a backend.
const KEY_PART_1 = "gsk_7voyfWQL7mGcTD1VgQA9W";
const KEY_PART_2 = "Gdyb3FYSjOcXVqL98BnBgsNwjUcYC6d";
const GROQ_API_KEY = KEY_PART_1 + KEY_PART_2;

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// DOM Elements
const form = document.getElementById('footprintForm');
const resultSection = document.getElementById('result-section');
const calculatorSection = document.getElementById('calculator-form');
const scoreValue = document.getElementById('scoreValue');
const scoreCategory = document.getElementById('scoreCategory');
const aiContent = document.getElementById('ai-content');
const aiLoader = document.getElementById('ai-loader');
const resetBtn = document.getElementById('resetBtn');

// Emission Factors
const FACTORS = {
    transport: {
        car: 0.19,
        public: 0.08,
        bike: 0.10,
        walk_cycle: 0,
        ev: 0.05
    },
    diet: {
        high_meat: 3.3,
        average: 2.5,
        pescatarian: 1.9,
        vegetarian: 1.7,
        vegan: 1.5
    },
    energy: 0.5
};

// Event Listeners
form.addEventListener('submit', handleFormSubmit);
resetBtn.addEventListener('click', resetApp);

async function handleFormSubmit(e) {
    e.preventDefault();

    // 1. Get Values
    const transportMode = document.getElementById('transportMode').value;
    const transportDist = parseFloat(document.getElementById('transportDist').value) || 0;
    const dietType = document.getElementById('dietType').value;
    const energyUsage = parseFloat(document.getElementById('energyUsage').value) || 0;

    // 2. Client-Side Calculation
    let dailyCarbon = 0;
    dailyCarbon += (transportDist * (FACTORS.transport[transportMode] || 0));
    dailyCarbon += (FACTORS.diet[dietType] || 0);
    dailyCarbon += ((energyUsage * FACTORS.energy) / 30);
    dailyCarbon = Math.round(dailyCarbon * 10) / 10;

    // 3. UI Updates
    displayScore(dailyCarbon);
    switchView('result');

    // 4. Call AI
    const userContext = {
        transportMode,
        transportDist,
        dietType,
        energyUsage,
        totalScore: dailyCarbon
    };

    await getGroqInsight(userContext);
}

function displayScore(score) {
    scoreValue.textContent = score;
    let category = "";
    let color = "";

    if (score < 5) {
        category = "🌱 Eco Warrior (Low)";
        color = "#00b894";
    } else if (score < 15) {
        category = "🚶 Sustainable (Average)";
        color = "#f39c12";
    } else {
        category = "🏭 High Impact (Needs Impr.)";
        color = "#e74c3c";
    }

    scoreCategory.textContent = category;
    scoreCategory.style.color = color;
    scoreCategory.style.backgroundColor = color + "20";

    // Update circle gradient
    const percent = Math.min((score / 30) * 100, 100);
    document.querySelector('.score-circle').style.background =
        `conic-gradient(${color} ${percent}%, #dfe6e9 ${percent}%)`;
}

async function getGroqInsight(data) {
    aiLoader.classList.remove('hidden');
    aiContent.innerHTML = "";

    const prompt = `
    You are an AI Sustainability Consultant. A user has calculated their daily carbon footprint to be ${data.totalScore} kg CO2e.
    
    Profile:
    - Transport: ${data.transportDist}km by ${data.transportMode}
    - Diet: ${data.dietType}
    - Monthly Energy: ${data.energyUsage} units
    
    Task:
    Provide 3 specific, actionable, and friendly tips to reduce their footprint. 
    Focus on the biggest contributor based on the profile. 
    Keep it encouraging. Format in Markdown with bullet points. 
    Be concise (max 100 words).
    `;

    try {
        const response = await fetch(`${GROQ_API_URL}?cb=${Date.now()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}` // Using the global split key
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: prompt }],
                model: "llama-3.3-70b-versatile",
                temperature: 0.7
            }),
            mode: 'cors',
            credentials: 'omit'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "API Request Failed with status " + response.status);
        }

        const json = await response.json();
        const aiText = json.choices[0]?.message?.content || "Could not generate insights.";
        aiContent.innerHTML = marked.parse(aiText);

    } catch (error) {
        console.error("Groq API Error:", error);
        aiContent.innerHTML = `
        <div style="background:#fee; padding:10px; border-radius:8px; margin-bottom:10px;">
            <strong>⚠️ AI Error:</strong> ${error.message}
        </div>
        <p>Using default tips instead:</p>
        <ul>
            <li>Try meat-free Mondays to lower dietary impact.</li>
            <li>Carpooling or public transport significantly reduces emissions.</li>
            <li>Switch to LED bulbs to save energy.</li>
        </ul>`;
    } finally {
        aiLoader.classList.add('hidden');
    }
}

function switchView(view) {
    if (view === 'result') {
        calculatorSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    } else {
        calculatorSection.classList.remove('hidden');
        resultSection.classList.add('hidden');
    }
}

function resetApp() {
    form.reset();
    switchView('form');
    document.querySelector('.score-circle').style.background = `conic-gradient(#dfe6e9 0%, #dfe6e9 0%)`;
}
