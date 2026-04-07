"""
Kelly Intelligence SDK
OpenAI-compatible AI tutor API — 162K words, 47 languages, powered by Claude.
https://api.thedailylesson.com
"""

import os
import json
from typing import Optional, List, Dict, Any, Iterator

try:
    import httpx
except ImportError:
    raise ImportError("httpx is required: pip install httpx")

__version__ = "1.0.0"
BASE_URL = "https://api.thedailylesson.com"


class KellyIntelligence:
    """OpenAI-compatible AI tutor client with vocabulary RAG."""

    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        self.api_key = api_key or os.environ.get("KELLY_API_KEY") or os.environ.get("KELLY_INTELLIGENCE_API_KEY")
        if not self.api_key:
            raise ValueError("API key required. Pass api_key or set KELLY_API_KEY env var. Get one free at https://api.thedailylesson.com")
        self.base_url = (base_url or BASE_URL).rstrip("/")
        self.chat = self._Chat(self)

    class _Chat:
        def __init__(self, client):
            self._client = client
            self.completions = self._Completions(client)

        class _Completions:
            def __init__(self, client):
                self._client = client

            def create(
                self,
                messages: List[Dict[str, str]],
                model: str = "kelly-haiku",
                stream: bool = False,
                max_tokens: Optional[int] = None,
                temperature: Optional[float] = None,
                top_p: Optional[float] = None,
            ) -> Any:
                body = {"model": model, "messages": messages, "stream": stream}
                if max_tokens is not None:
                    body["max_tokens"] = max_tokens
                if temperature is not None:
                    body["temperature"] = temperature
                if top_p is not None:
                    body["top_p"] = top_p

                if stream:
                    return self._stream(body)
                return self._request(body)

            def _request(self, body: dict) -> dict:
                with httpx.Client(timeout=60) as client:
                    res = client.post(
                        f"{self._client.base_url}/v1/chat/completions",
                        headers={
                            "Authorization": f"Bearer {self._client.api_key}",
                            "Content-Type": "application/json",
                        },
                        json=body,
                    )
                    res.raise_for_status()
                    return res.json()

            def _stream(self, body: dict) -> Iterator[dict]:
                with httpx.Client(timeout=60) as client:
                    with client.stream(
                        "POST",
                        f"{self._client.base_url}/v1/chat/completions",
                        headers={
                            "Authorization": f"Bearer {self._client.api_key}",
                            "Content-Type": "application/json",
                        },
                        json=body,
                    ) as res:
                        res.raise_for_status()
                        for line in res.iter_lines():
                            if line == "data: [DONE]":
                                return
                            if not line.startswith("data: "):
                                continue
                            try:
                                yield json.loads(line[6:])
                            except json.JSONDecodeError:
                                continue

    def models(self) -> dict:
        """List available models and your access level."""
        with httpx.Client(timeout=30) as client:
            res = client.get(
                f"{self.base_url}/v1/models",
                headers={"Authorization": f"Bearer {self.api_key}"},
            )
            res.raise_for_status()
            return res.json()

    def usage(self) -> dict:
        """Get your usage statistics, limits, and recent requests."""
        with httpx.Client(timeout=30) as client:
            res = client.get(
                f"{self.base_url}/v1/usage",
                headers={"Authorization": f"Bearer {self.api_key}"},
            )
            res.raise_for_status()
            return res.json()

    @staticmethod
    def openai_config(api_key: Optional[str] = None) -> dict:
        """Returns config dict for OpenAI SDK: OpenAI(**KellyIntelligence.openai_config('key'))"""
        return {
            "api_key": api_key or os.environ.get("KELLY_API_KEY"),
            "base_url": f"{BASE_URL}/v1",
        }
