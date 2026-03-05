interface Props {
  summary: string;
  sentiment: "Positive" | "Mixed" | "Negative";
}

export default function SentimentBox({ summary, sentiment }: Props) {

  const color =
    sentiment === "Positive"
      ? "bg-green-600"
      : sentiment === "Negative"
      ? "bg-red-600"
      : "bg-yellow-500";

  return (
    <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-3xl p-6 shadow-xl">

      <h3 className="text-xl font-bold mb-4">
        🤖 AI Audience Sentiment
      </h3>

      <span className={`${color} px-4 py-1 rounded-full text-sm font-semibold`}>
        {sentiment}
      </span>

      <p className="mt-4 text-gray-300 leading-relaxed">
        {summary}
      </p>

    </div>
  );
}