import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Diagnosis API called');
    const { answers } = await request.json();
    
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey || apiKey === 'xxxxxxxx') {
      console.log('Using default breed recommendation due to missing API key');
      // APIキーが設定されていない場合は、デフォルトの診断ロジックを使用
      return NextResponse.json({
        breed: getDefaultBreedRecommendation(answers),
        source: 'default'
      });
    }

    // OpenAI APIを使用した診断
    const prompt = createPrompt(answers);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'あなたは犬種の専門家です。世界中の全ての犬種の中から、ユーザーの回答に基づいて最適な犬種を1つ選んで詳しく説明してください。一般的でない犬種や珍しい犬種も含めて検討し、ユーザーの条件に最も適した犬種を推薦してください。回答は日本語で、以下のJSON形式で返してください：{"name": "犬種名", "nameEn": "英語名", "description": "説明", "characteristics": ["特徴1", "特徴2", "特徴3", "特徴4"], "personality": ["性格1", "性格2", "性格3"], "carePoints": ["ケアポイント1", "ケアポイント2", "ケアポイント3"], "suitability": "なぜこの犬種がユーザーの条件に適しているかの詳細な説明"}'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    try {
      console.log('AI response:', aiResponse);
      const breedData = JSON.parse(aiResponse);
      return NextResponse.json({
        breed: breedData,
        source: 'openai'
      });
    } catch {
      // JSONパースに失敗した場合はデフォルトを使用
      return NextResponse.json({
        breed: getDefaultBreedRecommendation(answers),
        source: 'default',
        error: 'AI response parsing failed'
      });
    }

  } catch (error) {
    console.error('Diagnosis API error:', error);
    
    // エラーが発生した場合はデフォルトの診断を返す
    const { answers } = await request.json();
    return NextResponse.json({
      breed: getDefaultBreedRecommendation(answers),
      source: 'default',
      error: 'API error occurred'
    });
  }
}

function createPrompt(answers: Record<string, string>): string {
  return `
世界中の全ての犬種（AKC、JKC、FCI認定犬種、地域固有の犬種、希少犬種を含む）の中から、以下の条件に最も適した犬種を1つ選んで推薦してください：

【ユーザーの条件】
1. 家の広さ: ${answers.house_size || '不明'}
2. 子供や他のペット: ${answers.children_pets || '不明'}
3. 散歩の頻度: ${answers.walk_frequency || '不明'}
4. 鳴き声の気になり度: ${answers.noise_concern || '不明'}
5. 好みの性格: ${answers.personality || '不明'}
6. 好みの毛のタイプ: ${answers.fur_type || '不明'}

【推薦の指針】
- 一般的な犬種（柴犬、トイプードル、ゴールデンレトリバーなど）だけでなく、珍しい犬種や地域固有の犬種も検討対象に含めてください
- ユーザーの生活環境と条件に最も適合する犬種を選択してください
- 犬種の特性、性格、ケア要件、適性を詳しく説明してください
- なぜその犬種がユーザーに最適なのかを具体的に説明してください

最適な犬種を1つ選んで、詳細な情報を日本語で提供してください。
  `;
}

function getDefaultBreedRecommendation(answers: Record<string, string>) {
  const houseSize = answers.house_size;
  const walkFrequency = answers.walk_frequency;
  const personality = answers.personality;
  const noiseConcern = answers.noise_concern;
  const childrenPets = answers.children_pets;
  const furType = answers.fur_type;

  // より多様な犬種を含むデフォルトの診断ロジック
  if (houseSize === "狭い" && noiseConcern === "はい、静かな犬がいい" && furType === "ツヤツヤ") {
    return {
      name: "イタリアン・グレーハウンド",
      nameEn: "Italian Greyhound",
      description: "非常に小型で優雅なサイトハウンドで、短毛で手入れが簡単、静かで上品な犬種です。",
      characteristics: ["超小型犬（3-5kg）", "短毛でツヤツヤ", "優雅な体型", "運動量は少なめ"],
      personality: ["穏やか", "上品", "甘えん坊", "繊細"],
      carePoints: ["寒さに弱いので防寒対策必要", "毎日の散歩30分程度", "骨折に注意"],
      suitability: "狭い住環境で静かな犬を求める方、短毛でお手入れが簡単な犬種をお探しの方におすすめです。"
    };
  } else if (houseSize === "狭い" && noiseConcern === "はい、静かな犬がいい") {
    return {
      name: "フレンチ・ブルドッグ",
      nameEn: "French Bulldog",
      description: "小型で筋肉質、あまり吠えず穏やかな性格で、アパート暮らしに適した犬種です。",
      characteristics: ["小型犬（8-14kg）", "短毛", "筋肉質", "運動量は少なめ"],
      personality: ["穏やか", "愛嬌がある", "人懐っこい", "のんびり"],
      carePoints: ["暑さに弱い", "毎日の散歩30分程度", "呼吸器に注意"],
      suitability: "狭い住環境でも飼いやすく、静かで愛嬌のある犬を求める方におすすめです。"
    };
  } else if (houseSize === "広い" && walkFrequency === "毎日2回以上" && personality === "活発") {
    return {
      name: "オーストラリアン・シェパード",
      nameEn: "Australian Shepherd",
      description: "非常に活発で知的な牧羊犬で、豊富な運動量と知的刺激を必要とする美しい犬種です。",
      characteristics: ["中型犬（16-32kg）", "長毛", "非常に賢い", "運動量は非常に多い"],
      personality: ["非常に活発", "忠実", "働き者", "学習能力が高い"],
      carePoints: ["毎日2時間以上の運動", "定期的なブラッシング", "知的な刺激が必要"],
      suitability: "十分な運動時間と広いスペースを提供でき、アクティブなライフスタイルの飼い主におすすめです。"
    };
  } else if (houseSize === "広い" && childrenPets === "はい" && personality === "おっとり") {
    return {
      name: "ニューファンドランド",
      nameEn: "Newfoundland",
      description: "超大型犬で非常に温厚、子供の守護犬として有名で、水難救助犬としても活躍する優しい巨人です。",
      characteristics: ["超大型犬（45-70kg）", "長毛", "非常に温厚", "水泳が得意"],
      personality: ["非常に優しい", "忍耐強い", "子供好き", "保護本能が強い"],
      carePoints: ["毎日の散歩1時間以上", "定期的なブラッシング", "大量の食事が必要"],
      suitability: "広い住環境があり、子供がいる家庭で、大型犬の飼育経験がある方におすすめです。"
    };
  } else if (personality === "甘えん坊" && furType === "フサフサ") {
    return {
      name: "ポメラニアン",
      nameEn: "Pomeranian",
      description: "超小型犬でフサフサの被毛が美しく、甘えん坊で愛らしい性格の人気犬種です。",
      characteristics: ["超小型犬（1.5-3kg）", "ダブルコート", "フサフサの被毛", "運動量は少なめ"],
      personality: ["甘えん坊", "活発", "好奇心旺盛", "勇敢"],
      carePoints: ["毎日のブラッシング", "毎日の散歩20-30分", "小さいので怪我に注意"],
      suitability: "小さくて可愛い犬を求める方、フサフサの被毛を楽しみたい方におすすめです。"
    };
  } else if (walkFrequency === "あまり行けない" && personality === "おっとり") {
    return {
      name: "バセット・ハウンド",
      nameEn: "Basset Hound",
      description: "中型犬で非常におっとりとした性格、運動量が少なくても満足する穏やかな犬種です。",
      characteristics: ["中型犬（20-29kg）", "短毛", "長い耳", "運動量は少なめ"],
      personality: ["非常におっとり", "穏やか", "マイペース", "人懐っこい"],
      carePoints: ["毎日の散歩30分程度", "耳の掃除が重要", "肥満に注意"],
      suitability: "運動量が少なくても満足し、穏やかな性格の犬を求める方におすすめです。"
    };
  } else {
    return {
      name: "ウェルシュ・コーギー・ペンブローク",
      nameEn: "Welsh Corgi Pembroke",
      description: "中型犬で活発ながらも家庭犬として適応力が高く、短い足と愛らしい外見で人気の犬種です。",
      characteristics: ["中型犬（10-14kg）", "短毛", "短い足", "運動量は中程度"],
      personality: ["活発", "賢い", "愛嬌がある", "社交的"],
      carePoints: ["毎日の散歩1時間程度", "定期的なブラッシング", "肥満に注意"],
      suitability: "適度な運動量で満足し、愛らしい外見と賢い性格を求める方におすすめです。"
    };
  }
}