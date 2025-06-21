import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(220, 38, 38, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)'}}>
      {/* 和風背景装飾 - 桜の花びらと波模様 */}
      <div className="absolute inset-0">
        {/* 桜の花びら */}
        <div className="absolute top-20 left-16 w-8 h-8 text-pink-300 opacity-60 animate-pulse">🌸</div>
        <div className="absolute top-40 right-24 w-6 h-6 text-pink-400 opacity-50 animate-bounce" style={{animationDelay: '1s'}}>🌸</div>
        <div className="absolute bottom-32 left-20 w-7 h-7 text-pink-300 opacity-70 animate-pulse" style={{animationDelay: '2s'}}>🌸</div>
        <div className="absolute bottom-48 right-16 w-5 h-5 text-pink-400 opacity-60 animate-bounce" style={{animationDelay: '0.5s'}}>🌸</div>
        <div className="absolute top-1/3 left-1/4 w-6 h-6 text-pink-300 opacity-50 animate-pulse" style={{animationDelay: '3s'}}>🌸</div>
        <div className="absolute top-2/3 right-1/3 w-8 h-8 text-pink-400 opacity-40 animate-bounce" style={{animationDelay: '1.5s'}}>🌸</div>
        
        {/* 和風の波模様 */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-10">
          <svg viewBox="0 0 1200 120" className="w-full h-full">
            <path d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z" fill="currentColor" className="text-red-300"/>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* ヘッダー */}
        <header className="text-center mb-16">
          <div className="flex justify-center items-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mr-6 shadow-xl border-4 border-red-200 relative">
              <span className="text-3xl">🐶</span>
              {/* 和風の装飾 */}
              <div className="absolute -top-2 -right-2 w-6 h-6 text-red-400">🌸</div>
            </div>
            <h1 className="text-5xl font-bold text-gray-800 relative">
              犬種診断アプリ
              {/* 和風の下線装飾 */}
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-300 via-orange-300 to-yellow-300 rounded-full"></div>
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            あなたの心に寄り添う、運命のワンちゃんを見つけましょう
          </p>
        </header>

        {/* メインコンテンツ */}
        <main className="max-w-6xl mx-auto">
          {/* 機能紹介 */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-8 text-center border-2 border-red-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
              {/* 和風装飾 */}
              <div className="absolute top-2 right-2 text-red-300 opacity-60">🌸</div>
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-2 border-red-200">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                簡単診断
              </h3>
              <p className="text-gray-700">
                心に響く質問に答えて、あなたにぴったりのワンちゃんを見つけましょう
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-lg p-8 text-center border-2 border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
              {/* 和風装飾 */}
              <div className="absolute top-2 right-2 text-orange-300 opacity-60">🍂</div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-2 border-orange-200">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                AI による提案
              </h3>
              <p className="text-gray-700">
                最新のAI技術があなたの心を読み取り、最適な犬種をご提案いたします
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-red-50 rounded-2xl shadow-lg p-8 text-center border-2 border-yellow-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
              {/* 和風装飾 */}
              <div className="absolute top-2 right-2 text-yellow-400 opacity-60">🌸</div>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-2 border-yellow-200">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                詳細な結果
              </h3>
              <p className="text-gray-700">
                犬種の特徴、性格、飼育の心得まで、丁寧にご紹介いたします
              </p>
            </div>
          </div>

          {/* 質問項目プレビュー */}
          <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-xl p-10 mb-12 border-2 border-red-200 relative">
            {/* 和風装飾 */}
            <div className="absolute top-4 left-4 text-red-300 opacity-40">🌸</div>
            <div className="absolute top-4 right-4 text-orange-300 opacity-40">🍂</div>
            <div className="absolute bottom-4 left-4 text-yellow-400 opacity-40">🌸</div>
            <div className="absolute bottom-4 right-4 text-red-300 opacity-40">🍂</div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center relative">
              こんな質問にお答えいただきます
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-300 to-orange-300 rounded-full"></div>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border border-red-200">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-400 to-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1 shadow-md">一</span>
                  <div>
                    <h4 className="font-bold text-gray-800">🏠 家の広さは？</h4>
                    <p className="text-sm text-gray-600">狭い / 普通 / 広い</p>
                  </div>
                </div>
                <div className="flex items-start bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1 shadow-md">二</span>
                  <div>
                    <h4 className="font-bold text-gray-800">👶 子供や他のペットは？</h4>
                    <p className="text-sm text-gray-600">はい / いいえ</p>
                  </div>
                </div>
                <div className="flex items-start bg-gradient-to-r from-yellow-50 to-red-50 p-4 rounded-xl border border-yellow-200">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-400 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1 shadow-md">三</span>
                  <div>
                    <h4 className="font-bold text-gray-800">🚶 散歩の頻度は？</h4>
                    <p className="text-sm text-gray-600">毎日2回以上 / 毎日1回 / あまり行けない</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border border-red-200">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-400 to-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1 shadow-md">四</span>
                  <div>
                    <h4 className="font-bold text-gray-800">🔊 鳴き声は気になる？</h4>
                    <p className="text-sm text-gray-600">はい、静かな犬がいい / 気にならない</p>
                  </div>
                </div>
                <div className="flex items-start bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1 shadow-md">五</span>
                  <div>
                    <h4 className="font-bold text-gray-800">😊 性格の好みは？</h4>
                    <p className="text-sm text-gray-600">甘えん坊 / おっとり / 活発 / 警戒心が強い</p>
                  </div>
                </div>
                <div className="flex items-start bg-gradient-to-r from-yellow-50 to-red-50 p-4 rounded-xl border border-yellow-200">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-400 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1 shadow-md">六</span>
                  <div>
                    <h4 className="font-bold text-gray-800">✨ 毛のタイプは？</h4>
                    <p className="text-sm text-gray-600">ツヤツヤ / フサフサ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA セクション */}
          <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl shadow-xl p-12 text-center border-2 border-red-200 relative overflow-hidden">
            {/* 和風装飾 */}
            <div className="absolute top-6 left-6 text-red-300 opacity-50 text-2xl">🌸</div>
            <div className="absolute top-6 right-6 text-orange-300 opacity-50 text-2xl">🍂</div>
            <div className="absolute bottom-6 left-6 text-yellow-400 opacity-50 text-2xl">🌸</div>
            <div className="absolute bottom-6 right-6 text-red-300 opacity-50 text-2xl">🍂</div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                運命のワンちゃんを見つけましょう
              </h2>
              <p className="text-xl text-gray-700 mb-10">
                心を込めた6つの質問で、あなたにぴったりの犬種をご提案いたします
              </p>
              <Link
                href="/diagnosis"
                className="inline-block bg-gradient-to-r from-red-400 to-orange-400 hover:from-red-500 hover:to-orange-500 text-white font-bold text-xl py-4 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-white"
              >
                診断を始める
              </Link>
            </div>
          </div>

          {/* 注意事項 */}
          <div className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-red-400 p-8 rounded-r-2xl shadow-lg relative">
            {/* 和風装飾 */}
            <div className="absolute top-2 right-2 text-red-300 opacity-40">🌸</div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-3xl">💡</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  診断について
                </h3>
                <div className="text-gray-700">
                  <p>
                    この診断は参考情報として提供されています。実際に犬を飼う際は、
                    ペットショップやブリーダー、獣医師などの専門家にもご相談ください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* フッター */}
        <footer className="mt-20 text-center">
          <div className="bg-gradient-to-r from-red-400 to-orange-400 text-white py-4 px-8 rounded-xl shadow-lg inline-block border-2 border-red-300">
            <p className="font-medium">&copy; 2024 犬種診断アプリ - あなたとワンちゃんの素敵な出会いを</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
