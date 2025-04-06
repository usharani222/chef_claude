import React from "react";
import ReactMarkdown from "react-markdown";

export default function ClaudeRecipe({ recipe }) {
  return (
    <section>
      <h2>ChefClaude Suggestion:</h2>
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </section>
  );
}
