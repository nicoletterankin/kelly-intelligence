"""
Kelly Intelligence — OpenAI SDK Drop-In (Python)

Use the official OpenAI SDK with Kelly Intelligence as the backend.

Install: pip install openai kelly-intelligence
Run: KELLY_API_KEY=your_key python openai_drop_in.py
"""

import os
from openai import OpenAI
from kelly_intelligence import KellyIntelligence


def main():
    client = OpenAI(**KellyIntelligence.openai_config(os.environ["KELLY_API_KEY"]))

    response = client.chat.completions.create(
        model="kelly-haiku",
        messages=[{"role": "user", "content": 'What does "ubiquitous" mean?'}],
    )

    print(response.choices[0].message.content)


if __name__ == "__main__":
    main()
