import json

# Load weights from weights.json
def load_weights(weights_file="weights.json"):
    with open(weights_file, "r") as f:
        weights = json.load(f)
    return weights

# Calculate financial score for a given profile
def calculate_financial_score(profile, weights):
    weighted_sum = 0
    for metric, weight in weights.items():
        if metric in profile:
            weighted_sum += profile[metric] * weight

    # Normalize score to be between 0 and 1
    normalized_score = (weighted_sum - min(weights.values())) / (max(weights.values()) - min(weights.values()))
    return normalized_score

# Determine financial risk level based on score
def determine_risk_level(financial_score):
    if financial_score > 0.75:
        return "Low Risk"
    elif 0.5 <= financial_score <= 0.75:
        return "Medium Risk"
    elif 0.25 <= financial_score < 0.5:
        return "High Risk"
    else:
        return "Critical Risk"

if __name__ == "__main__":
    # Load the weights
    weights = load_weights()

    # Dummy profile
    new_profile = {
        "Bank_Balance": 3000,
        "Income": 1050,
        "Expenses": 580,
        "Financial_Literacy": 9
    }

    # Scale dummy profile values if required (assuming weights were derived from scaled data)
    # Note: Adjust scaling logic to match what was used in `genWeight.py`
    max_values = {"Bank_Balance": 10000, "Income": 2000, "Expenses": 1000, "Financial_Literacy": 10}
    scaled_profile = {key: value / max_values[key] for key, value in new_profile.items()}

    # Calculate financial score
    financial_score = calculate_financial_score(scaled_profile, weights)

    # Determine financial risk
    risk_level = determine_risk_level(financial_score)

    print(f"Financial Score: {financial_score:.2f}")
    print(f"Risk Level: {risk_level}")
