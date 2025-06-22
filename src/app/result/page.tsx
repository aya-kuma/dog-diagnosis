"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface DogBreed {
  name: string;
  nameEn: string;
  description: string;
  characteristics: string[];
  personality: string[];
  carePoints: string[];
  suitability: string;
  image: string;
}

const dogBreeds: Record<string, DogBreed> = {
  "small_quiet": {
    name: "トイプードル",
    nameEn: "Toy Poodle",
    description: "小型で賢く、毛が抜けにくいため室内飼いに最適な犬種です。",
    characteristics: ["小型犬（2-4kg）", "毛が抜けにくい", "非常に賢い", "運動量は中程度"],
    personality: ["甘えん坊", "人懐っこい", "学習能力が高い", "活発だが落ち着きもある"],
    carePoints: ["定期的なトリミングが必要", "毎日の散歩30分程度", "知的な刺激を与える"],
    suitability: "狭い住環境でも飼いやすく、初心者にもおすすめです。",
    image: "🐩"
  },
  "medium_active": {
    name: "柴犬",
    nameEn: "Shiba Inu",
    description: "日本原産の中型犬で、忠実で警戒心が強く、独立心のある犬種です。",
    characteristics: ["中型犬（8-12kg）", "ダブルコート", "丈夫で健康", "運動量は多め"],
    personality: ["忠実", "警戒心が強い", "独立心がある", "頑固な面もある"],
    carePoints: ["毎日の散歩1時間以上", "換毛期のブラッシング", "しつけは根気よく"],
    suitability: "ある程度の運動量を確保でき、犬の飼育経験がある方におすすめです。",
    image: "🐕"
  },
  "large_gentle": {
    name: "ゴールデンレトリバー",
    nameEn: "Golden Retriever",
    description: "大型犬で非常に温厚で人懐っこく、家族犬として人気の犬種です。",
    characteristics: ["大型犬（25-35kg）", "長毛", "温厚な性格", "運動量は多い"],
    personality: ["温厚", "人懐っこい", "子供好き", "学習能力が高い"],
    carePoints: ["毎日の散歩1-2時間", "定期的なブラッシング", "十分なスペースが必要"],
    suitability: "広い住環境があり、十分な運動時間を確保できる家庭におすすめです。",
    image: "🦮"
  },
  "small_calm": {
    name: "キャバリア・キング・チャールズ・スパニエル",
    nameEn: "Cavalier King Charles Spaniel",
    description: "小型犬で非常に温厚で優しく、子供や他のペットとも仲良くできる犬種です。",
    characteristics: ["小型犬（5-8kg）", "絹のような被毛", "温厚な性格", "運動量は中程度"],
    personality: ["非常に優しい", "社交的", "おっとり", "甘えん坊"],
    carePoints: ["毎日の散歩30-45分", "定期的なブラッシング", "心疾患に注意"],
    suitability: "子供がいる家庭や、穏やかな犬を求める方におすすめです。",
    image: "🐶"
  },
  "medium_guard": {
    name: "ボーダーコリー",
    nameEn: "Border Collie",
    description: "非常に賢く活発で、牧羊犬として活躍してきた運動能力の高い犬種です。",
    characteristics: ["中型犬（12-20kg）", "長毛", "非常に賢い", "運動量は非常に多い"],
    personality: ["非常に賢い", "活発", "集中力がある", "働くことが好き"],
    carePoints: ["毎日2時間以上の運動", "知的な刺激が必要", "定期的なブラッシング"],
    suitability: "十分な運動時間と知的刺激を提供できる、経験豊富な飼い主におすすめです。",
    image: "🐕‍🦺"
  }
};

function ResultContent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<DogBreed | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const answersObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      answersObj[key] = value;
    });

    // APIから受け取った結果があるかチェック
    const apiResult = searchParams.get('result');
    
    setTimeout(() => {
      if (apiResult) {
        try {
          // APIから受け取った結果を使用
          const breedData = JSON.parse(apiResult);
          setResult(breedData);
        } catch (error) {
          console.error('API結果のパースエラー:', error);
          // パースに失敗した場合はデフォルトロジックを使用
          const recommendedBreed = determineBreed(answersObj);
          setResult(recommendedBreed);
        }
      } else {
        // API結果がない場合はデフォルトロジックを使用
        const recommendedBreed = determineBreed(answersObj);
        setResult(recommendedBreed);
      }
      setIsLoading(false);
    }, 2000);
  }, [searchParams]);

  const determineBreed = (answers: Record<string, string>): DogBreed => {
    const houseSize = answers.house_size;
    const walkFrequency = answers.walk_frequency;
    const personality = answers.personality;
    const noiseConcern = answers.noise_concern;

    // 簡単なロジックで犬種を決定
    if (houseSize === "狭い" && noiseConcern === "はい、静かな犬がいい") {
      return dogBreeds.small_quiet;
    } else if (houseSize === "広い" && walkFrequency === "毎日2回以上" && personality === "活発") {
      return dogBreeds.medium_guard;
    } else if (houseSize === "広い" && personality === "おっとり") {
      return dogBreeds.large_gentle;
    } else if (personality === "甘えん坊" || personality === "おっとり") {
      return dogBreeds.small_calm;
    } else {
      return dogBreeds.medium_active;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-green-300 to-blue-300 rounded-full opacity-35 animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-white border-t-pink-600 mx-auto mb-6"></div>
          <h2 className="text-3xl font-black text-white mb-4 drop-shadow-lg">🎉 診断結果を分析中... 🎉</h2>
          <p className="text-xl text-white font-semibold drop-shadow-md">あなたにぴったりの犬種を見つけています ✨🤖✨</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center">
        <div className="text-center bg-white/20 backdrop-blur-sm rounded-3xl p-8 border-4 border-white">
          <p className="text-white text-xl font-bold mb-4">診断結果を取得できませんでした 😢</p>
          <Link href="/diagnosis" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            🔄 診断をやり直す
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-green-300 to-blue-300 rounded-full opacity-25 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full opacity-10 animate-spin" style={{animationDuration: '20s'}}></div>
      </div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* ヘッダー */}
        <header className="text-center mb-12">
          <Link href="/" className="inline-flex items-center text-white hover:text-yellow-200 mb-6 font-bold text-lg bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="mr-2">←</span>
            🏠 ホームに戻る
          </Link>
          <h1 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
            🎉✨ 診断結果 ✨🎉
          </h1>
          <p className="text-2xl text-white font-semibold drop-shadow-md">
            あなたにおすすめの犬種が決まりました！🐶💕
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* メイン結果 */}
          {/* 大々的な結果発表 */}
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-2xl p-12 mb-12 border-4 border-amber-300 relative overflow-hidden">
            {/* キラキラエフェクト */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute top-8 right-8 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 left-8 w-2 h-2 bg-orange-300 rounded-full animate-bounce"></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            <div className="text-center mb-12 relative z-10">
              {/* 大きな発表テキスト */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-4 animate-pulse">
                  🎉 診断結果発表 🎉
                </h1>
                <p className="text-xl md:text-2xl text-amber-700 font-semibold animate-bounce">
                  あなたにぴったりの犬種は...
                </p>
              </div>

              {/* 超大きな犬のアイコン */}
              <div className="mb-8 transform hover:scale-110 transition-transform duration-500">
                <div className="text-8xl md:text-9xl mb-6 animate-bounce" style={{animationDuration: '2s'}}>
                  {result.image}
                </div>
              </div>

              {/* 犬種名を大々的に */}
              <div className="mb-8 p-8 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl border-4 border-amber-400 shadow-lg transform hover:scale-105 transition-all duration-300">
                <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-orange-800 mb-4 animate-pulse">
                  {result.name}
                </h2>
                <p className="text-2xl md:text-3xl text-amber-700 font-semibold mb-4">
                  {result.nameEn}
                </p>
                <div className="flex justify-center space-x-4 text-3xl">
                  <span className="animate-bounce" style={{animationDelay: '0s'}}>🌟</span>
                  <span className="animate-bounce" style={{animationDelay: '0.2s'}}>✨</span>
                  <span className="animate-bounce" style={{animationDelay: '0.4s'}}>🎊</span>
                  <span className="animate-bounce" style={{animationDelay: '0.6s'}}>✨</span>
                  <span className="animate-bounce" style={{animationDelay: '0.8s'}}>🌟</span>
                </div>
              </div>

              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                {result.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 特徴 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📋</span>
                  基本特徴
                </h3>
                <ul className="space-y-2">
                  {result.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span className="text-gray-700">{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 性格 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">❤️</span>
                  性格
                </h3>
                <ul className="space-y-2">
                  {result.personality.map((trait, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span className="text-gray-700">{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ケアポイント */}
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-amber-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🔧</span>
              飼育のポイント
            </h3>
            <ul className="space-y-3">
              {result.carePoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-400 mr-2">⭐</span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 適性 */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg mb-8">
            <h3 className="text-lg font-semibold text-amber-800 mb-2 flex items-center">
              <span className="mr-2">💡</span>
              あなたとの相性
            </h3>
            <p className="text-amber-700">{result.suitability}</p>
          </div>

          {/* アクション */}
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-xl p-8 text-center border-2 border-amber-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              次のステップ
            </h3>
            <p className="text-gray-600 mb-6">
              この結果はあくまで参考です。実際に犬を飼う前には、ペットショップやブリーダー、
              獣医師などの専門家にもご相談することをおすすめします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnosis"
                className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                もう一度診断する
              </Link>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: '犬種診断結果',
                      text: `私におすすめの犬種は「${result.name}」でした！`,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('URLをコピーしました！');
                  }
                }}
                className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                結果をシェア
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-green-300 to-blue-300 rounded-full opacity-35 animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-white border-t-pink-600 mx-auto mb-6"></div>
          <h2 className="text-3xl font-black text-white mb-4 drop-shadow-lg">🎉 ページを読み込み中... 🎉</h2>
          <p className="text-xl text-white font-semibold drop-shadow-md">少々お待ちください ✨</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}