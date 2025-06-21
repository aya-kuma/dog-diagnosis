"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  id: string;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: "house_size",
    text: "🏠 家の広さはどのくらいですか？",
    options: ["狭い", "普通", "広い"]
  },
  {
    id: "children_pets",
    text: "👶 子供や他のペットはいますか？",
    options: ["はい", "いいえ"]
  },
  {
    id: "walk_frequency",
    text: "🚶‍♀️ 散歩の頻度は理想的にどのくらいですか？",
    options: ["毎日2回以上", "毎日1回", "あまり行けない"]
  },
  {
    id: "noise_concern",
    text: "🔇 鳴き声の大きさが気になりますか？",
    options: ["はい、静かな犬がいい", "気にならない"]
  },
  {
    id: "personality",
    text: "💕 性格の好みは？",
    options: ["甘えん坊", "おっとり", "活発", "警戒心が強い"]
  },
  {
    id: "fur_type",
    text: "✨ 毛のタイプの好みは？",
    options: ["ツヤツヤ", "フサフサ"]
  }
];

export default function DiagnosisPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerSelect = async (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    // 次の質問があるかチェック
    if (currentQuestionIndex < questions.length - 1) {
      // 少し待ってから次の質問を表示
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 500);
    } else {
      // 全ての質問が完了
      setIsCompleted(true);
      
      setTimeout(async () => {
        try {
          // APIを呼び出して診断結果を取得
          const response = await fetch('/api/diagnosis', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers: newAnswers }),
          });
          
          const data = await response.json();
          
          // 結果ページに遷移（診断結果も含める）
          const params = new URLSearchParams({
            ...newAnswers,
            result: JSON.stringify(data.breed),
            source: data.source || 'default'
          });
          window.location.href = `/result?${params.toString()}`;
        } catch (error) {
          console.error('診断API呼び出しエラー:', error);
          // エラーの場合はデフォルトの結果ページに遷移
          const params = new URLSearchParams(newAnswers);
          window.location.href = `/result?${params.toString()}`;
        }
      }, 2000);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 relative overflow-hidden">
        {/* 背景アニメーション */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-green-300 to-blue-300 rounded-full opacity-35 animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-white via-yellow-50 to-pink-50 rounded-3xl shadow-2xl p-12 text-center border-4 border-white">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
                  <span className="text-4xl">🐕</span>
                </div>
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-300 border-t-pink-600 mx-auto mb-6"></div>
              </div>
              <h2 className="text-3xl font-black text-gray-800 mb-6">
                🎉 診断結果を分析中... 🎉
              </h2>
              <p className="text-xl text-gray-700 font-semibold mb-8">
                あなたの回答を基に、運命のワンちゃんを見つけています ✨🤖✨
              </p>
              <div className="flex justify-center space-x-3">
                <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 relative overflow-hidden">
      {/* 背景アニメーション */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-green-300 to-blue-300 rounded-full opacity-25 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-white hover:text-yellow-200 mb-6 font-bold text-lg bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="mr-2">←</span>
            🏠 ホームに戻る
          </Link>
          
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse border-4 border-white">
              <span className="text-3xl">🐶</span>
            </div>
            <h1 className="text-4xl font-black text-white mb-4 drop-shadow-lg">
              🌟 犬種診断 🌟
            </h1>
          </div>

          {/* プログレスバー */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-white drop-shadow">✨ 進行状況</span>
              <span className="text-sm font-bold text-white drop-shadow">{currentQuestionIndex + 1} / {questions.length}</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-4 shadow-inner backdrop-blur-sm">
              <div
                className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 h-4 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* プログレスドット */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-5 h-5 rounded-full transition-all duration-300 ${
                  index < currentQuestionIndex
                    ? "bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg scale-110"
                    : index === currentQuestionIndex
                    ? "bg-gradient-to-r from-yellow-400 to-pink-400 shadow-lg scale-150 animate-pulse"
                    : "bg-white/50 border-2 border-white shadow-md"
                }`}
              />
            ))}
          </div>
        </header>

        <div className="max-w-3xl mx-auto">
          {/* 質問カード */}
          <div className="bg-gradient-to-br from-white via-yellow-50 to-pink-50 rounded-3xl shadow-2xl p-10 mb-12 border-4 border-white">
            <div className="text-center mb-10">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-bounce border-4 border-white">
                <span className="text-4xl font-black text-white">{currentQuestionIndex + 1}</span>
              </div>
              <h2 className="text-3xl font-black text-gray-800 mb-6">
                {currentQuestion.text}
              </h2>
              <p className="text-xl text-gray-700 font-semibold">
                ✨ あてはまるものを選択してね！ ✨
              </p>
            </div>

            {/* 選択肢 */}
            <div className="grid gap-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className="group relative p-8 text-left border-4 border-white rounded-2xl hover:border-pink-300 hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 hover:from-pink-50 hover:via-purple-50 hover:to-indigo-50 transform hover:-translate-y-1 hover:scale-105"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 border-4 border-pink-300 rounded-full mr-6 group-hover:border-purple-400 transition-colors duration-300 flex items-center justify-center bg-white shadow-lg">
                      <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <span className="text-xl font-bold text-gray-800 group-hover:text-purple-700">
                      {option}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>

          {/* 可愛い装飾 */}
          <div className="text-center">
            <div className="flex justify-center space-x-6 text-4xl">
              <span className="animate-bounce drop-shadow-lg" style={{animationDelay: '0s'}}>🐕</span>
              <span className="animate-bounce drop-shadow-lg" style={{animationDelay: '0.2s'}}>🐶</span>
              <span className="animate-bounce drop-shadow-lg" style={{animationDelay: '0.4s'}}>🦮</span>
              <span className="animate-bounce drop-shadow-lg" style={{animationDelay: '0.6s'}}>🐕‍🦺</span>
              <span className="animate-bounce drop-shadow-lg" style={{animationDelay: '0.8s'}}>🐩</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}