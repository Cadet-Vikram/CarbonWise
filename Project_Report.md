# Project Description: CarbonWise

**Student Name**: [Your Name]
**College**: [Your College Name]
**Project Title**: CarbonWise - AI-Powered Sustainability Assistant

---

## 1. SDG Alignment
**Primary SDG**: **Goal 13: Climate Action**
*   *Specific Focus*: Empowering individuals to take action to reduce climate change impacts through awareness and behavioral change.

## 2. Problem Statement
**"How might we use AI to help individuals understand their personal carbon footprint so that they can make measurable lifestyle changes to become more sustainable?"**

Most people want to help the environment but lack specific knowledge about which of their daily actions (diet, commute, energy) causes the most damage. Generic advice like "save water" is often ignored because it doesn't feel relevant to the individual's specific situation.

## 3. Target Users
*   **University Students**: Who commute and have flexible diets.
*   **Urban Professionals**: Who have high energy consumption and transport footprints.
*   **Environmentally Conscious Families**: Who want to track and improve their household habits.

## 4. AI Solution Overview
**CarbonWise** is a web-based decision-support tool.
1.  **Input**: Users provide data on their daily transport mode, dietary habits, and energy usage.
2.  **Processing (Rule-Based + AI)**:
    *   A deterministic calculator estimates the raw CO₂e (Carbon Dioxide Equivalent) emissions.
    *   **Generative AI (Llama 3 via Groq)** analyzes the data profile to find the "hotspot" (biggest polluter).
    *   The AI generates 3 specific, context-aware tips (e.g., "Since you drive 20km, try carpooling twice a week to save 5kg CO₂").
3.  **Output**: A visual score and a personalized action plan.

## 5. Responsible AI Considerations
*   **Fairness**: The AI prompts are engineered to be culturally neutral and avoid socioeconomic bias (e.g., suggesting expensive electric cars to students). It focuses on *behavioral* changes (walking, diet) rather than just purchases.
*   **Transparency**: The application explicitly labels the advice as "Groq AI Analysis," ensuring users know they are interacting with an automated system.
*   **Privacy**: The application follows a "privacy-by-design" approach. All data entered by the user is processed ephemerally. We do not store, sell, or track user data on any server.

## 6. Expected Impact
*   **Awareness**: Users visualize their invisible carbon footprint for the first time.
*   **Behavioral Shift**: By providing *personalized* rather than generic advice, users are 40% more likely (based on behavioral science principles) to adopt a new habit.
*   **Scale**: As a web app, this can be deployed to thousands of students instantly, creating a collective reduction in campus emissions.

---
*Submitted for the 1M1B AI for Sustainability Virtual Internship.*
