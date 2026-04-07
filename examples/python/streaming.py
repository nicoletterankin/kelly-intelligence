"""
Kelly Intelligence — Streaming Example (Python)

Run: KELLY_API_KEY=your_key python streaming.py
"""

import os
from kelly_intelligence import KellyIntelligence


def main():
    kelly = KellyIntelligence(api_key=os.environ["KELLY_API_KEY"])

    for chunk in kelly.chat.completions.create(
        model="kelly-sonnet",
        messages=[
            {"role": "user", "content": 'Teach me the word "serendipity" using the 5-phase Socratic method.'},
        ],
        stream=True,
    ):
        print(chunk["choices"][0]["delta"].get("content", ""), end="", flush=True)
    print()


if __name__ == "__main__":
    main()
