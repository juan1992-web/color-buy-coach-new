export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { imageBase64, makeup, accessory, budget } = body;

    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No image provided" }), { status: 400 });
    }

    // OpenAI API 호출 (GPT-4o 계열, 비전 인식 지원 모델)
    // 환경 변수 OPENAI_API_KEY가 설정되어 있어야 합니다.
    if (!env.OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY is not set. Returning mock response.");
      // 개발 환경이거나 키가 없을 때는 안전하게 Mock 데이터를 반환합니다.
      return new Response(JSON.stringify({
        diagnosis: { tone: "Cálido", subtone: "Otoño", contrast: "Medio", confidence: "Media" },
        recommendations: getProductsForTone("Cálido")
      }), { headers: { "Content-Type": "application/json" } });
    }

    const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // 비용 효율성을 위해 gpt-4o-mini 사용 (vision 지원됨)
        messages: [
          {
            role: "system",
            content: `Eres un analista profesional de color personal. Analiza el rostro de la persona en la imagen y devuelve su diagnóstico de color estrictamente como un objeto JSON sin markdown.
Schema: 
{ 
  "tone": "Cálido" | "Frío" | "Neutral", 
  "subtone": "Primavera" | "Otoño" | "Verano" | "Invierno" | "Neutral", 
  "contrast": "Alto" | "Medio" | "Bajo", 
  "confidence": "Alta" | "Media" | "Baja" 
}`
          },
          {
            role: "user",
            content: [
              { type: "text", text: `Analiza esta imagen. Preferencias del usuario - Accesorio: ${accessory}, Maquillaje: ${makeup}` },
              { type: "image_url", image_url: { url: imageBase64 } }
            ]
          }
        ],
        max_tokens: 300,
        temperature: 0.2 // 할루시네이션 최소화
      })
    });

    if (!openAiResponse.ok) {
      const err = await openAiResponse.text();
      return new Response(JSON.stringify({ error: "OpenAI API error", details: err }), { status: 500 });
    }

    const aiData = await openAiResponse.json();
    const messageContent = aiData.choices[0].message.content;
    
    // AI의 JSON 응답 파싱
    let diagnosis;
    try {
      diagnosis = JSON.parse(messageContent);
    } catch(e) {
      const jsonMatch = messageContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
         diagnosis = JSON.parse(jsonMatch[0]);
      } else {
         diagnosis = { tone: "Cálido", subtone: "Cálido/Neutral", contrast: "Medio", confidence: "Baja" };
      }
    }

    // AI의 예측 톤에 맞춰서 "정해진 실제 상품 DB"에서 안전하게 매칭 (거짓 정보 방지)
    const recommendations = getProductsForTone(diagnosis.tone);

    return new Response(JSON.stringify({
      diagnosis,
      recommendations
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// 할루시네이션 방지를 위한 엄격한 로컬/정적 데이터 매칭 함수
function getProductsForTone(tone: string) {
  const allProducts: Record<string, any> = {
    "Cálido": {
      lips: [
        { id: 1, name: 'MAC Velvet Teddy', reason: 'Nude cálido clásico, seguro para diario', price: '$24', tag: 'Seguro', type: 'Seguro', color: '#B67C6E' },
        { id: 2, name: 'Revlon Super Lustrous - Toast of New York', reason: 'Da vida al rostro con un tono cálido', price: '$10', tag: 'Favorito', type: 'Favorito', color: '#9C3B2A' },
        { id: 3, name: 'Maybelline SuperStay - Amazonian', reason: 'Ideal para la noche', price: '$12', tag: 'Punto', type: 'Punto', color: '#8A3B3C' },
      ],
      blush: [
        { id: 4, name: 'Milani Baked Blush - Luminoso', reason: 'Efecto natural con destellos dorados', price: '$11', tag: 'Seguro', type: 'Seguro', color: '#F39F86' },
        { id: 5, name: 'NARS Blush - Torrid', reason: 'Coral vibrante que da luz instantánea', price: '$32', tag: 'Favorito', type: 'Favorito', color: '#E87461' },
      ]
    },
    "Frío": {
      lips: [
        { id: 6, name: 'MAC Ruby Woo', reason: 'Rojo frío universal', price: '$24', tag: 'Punto', type: 'Punto', color: '#B0182C' },
        { id: 7, name: 'Clinique Almost Lipstick - Black Honey', reason: 'Brillo sutil frío', price: '$24', tag: 'Seguro', type: 'Seguro', color: '#6B313D' },
        { id: 8, name: 'Revlon Cherries in the Snow', reason: 'Rosa vibrante y clásico', price: '$10', tag: 'Favorito', type: 'Favorito', color: '#B82855' },
      ],
      blush: [
        { id: 9, name: 'Rare Beauty Soft Pinch - Happy', reason: 'Rosa frío natural y radiante', price: '$23', tag: 'Seguro', type: 'Seguro', color: '#E58A97' },
        { id: 10, name: 'Dior Rosy Glow - Pink', reason: 'Aporta frescura extrema', price: '$40', tag: 'Favorito', type: 'Favorito', color: '#FF7AA2' },
      ]
    },
    "Neutral": {
      lips: [
        { id: 11, name: 'Charlotte Tilbury Pillow Talk', reason: 'Equilibrio perfecto neutro', price: '$35', tag: 'Seguro', type: 'Seguro', color: '#D49F98' },
        { id: 12, name: 'Burt Bees Tinted Lip Balm - Rose', reason: 'Toque ligero e hidratante', price: '$6', tag: 'Favorito', type: 'Favorito', color: '#C67C81' },
        { id: 13, name: 'Fenty Beauty Gloss Bomb - Fenty Glow', reason: 'Elegante, versátil y brillante', price: '$21', tag: 'Punto', type: 'Punto', color: '#B27668' },
      ],
      blush: [
        { id: 14, name: 'Glossier Cloud Paint - Dusk', reason: 'Acabado de piel natural', price: '$20', tag: 'Seguro', type: 'Seguro', color: '#D6898F' },
        { id: 15, name: 'MAC Blushbaby', reason: 'Neutro para cualquier look', price: '$29', tag: 'Favorito', type: 'Favorito', color: '#D18E8C' },
      ]
    }
  };

  const key = allProducts[tone] ? tone : "Cálido"; // 기본값(안전 장치)
  return allProducts[key];
}