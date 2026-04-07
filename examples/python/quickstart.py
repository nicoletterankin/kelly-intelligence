"""
Kelly Intelligence — Quick Start (Python)

Run: KELLY_API_KEY=your_key python quickstart.py
Get a free key at https://api.thedailylesson.com
"""

import os
from kelly_intelligence import KellyIntelligence


def main():
    kelly = KellyIntelligence(api_key=os.environ["KELLY_API_KEY"])

    response = kelly.chat.completions.create(
        model="kelly-haiku",
        messages=[
            {"role": "user", "content": 'What does the word "ephemeral" mean? Teach me with an example.'},
        ],
    )

    print(response["choices"][0]["message"]["content"])
    print("\nTokens used:", response["usage"])


if __name__ == "__main__":
    main()
