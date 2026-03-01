export const onRequestPost: PagesFunction<any> = async (context) => {
  const { env, request } = context;

  try {
    // 1. Check if API Key exists
    if (!env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ 
        error: "Configuración incompleta", 
        details: "La clave API de OpenAI (OPENAI_API_KEY) no está configurada en Cloudflare." 
      }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const { imageBase64, accessory, makeup, budget } = await request.json() as any;

    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No se proporcionó ninguna imagen" }), { status: 400 });
    }

    // 2. Call OpenAI
    const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Eres “ColorCompra”, un coach de compras basado en colorimetría personal aplicada al maquillaje facial (labiales y rubores).
Tu objetivo es reducir la duda del usuario y recomendar compras seguras para HOY, usando:
(1) una foto frontal del rostro (sin filtro, luz natural) y
(2) respuestas rápidas del usuario: accesorios (Dorado/Plateado/No sé), maquillaje (Natural/Intenso/Poco/Nada), y presupuesto.

TAREAS
1) Diagnosticar el perfil de color con una postura conservadora:
   - tono_sugerido: Cálido | Neutro | Frío
   - confianza: Baja | Media | Alta
   - subtono (estación): Primavera | Verano | Otoño | Invierno
   - contraste: Bajo | Medio | Alto
2) Recomendar “Prioridad de compra” para hoy (1 frase corta, accionable).
3) Entregar 3 labiales y 2 rubores. Cada item debe incluir: nombre, precio_usd, etiqueta (Seguro/Favorito/Punto), razon (breve), color_hex (código hexadecimal del color sugerido), y MUY IMPORTANTE, un amazon_search_query.
No recomiendes ropa o moda general. Enfócate exclusivamente en maquillaje facial.

REGLA DE PRESUPUESTO (OBLIGATORIO Y ESTRICTO):
El presupuesto seleccionado por el usuario es la regla MÁS IMPORTANTE. Debes filtrar TODAS las recomendaciones para que sus precios (precio_usd) caigan ESTRICTAMENTE dentro del rango seleccionado.
- Si el presupuesto es "<$10", < 10 USD.
- Si el presupuesto es "$10-25", 10-25 USD.
- Si el presupuesto es "$25+", > 25 USD.

FORMATO DE SALIDA (OBLIGATORIO)
Responde SOLO con un JSON válido (sin markdown, sin texto extra) con esta estructura:
{
  "tono_sugerido": "Cálido|Neutro|Frío",
  "confianza": "Baja|Media|Alta",
  "subtono": "Primavera|Verano|Otoño|Invierno",
  "contraste": "Bajo|Medio|Alto",
  "recomendacion_de_hoy": {
    "prioridad_compra": "...",
    "labiales": [...],
    "rubores": [...]
  }
}

Si la foto no permite el análisis, devuelve confianza "Baja" y recomendaciones conservadoras.`
          },
          {
            role: "user",
            content: [
              { type: "text", text: `Preferencias: accesorios ${accessory}, maquillaje ${makeup}, presupuesto ${budget}` },
              { type: "image_url", image_url: { url: imageBase64 } }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.1
      })
    });

    if (!openAiResponse.ok) {
      const errorText = await openAiResponse.text();
      return new Response(JSON.stringify({ 
        error: "OpenAI API error", 
        status: openAiResponse.status,
        details: errorText 
      }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const aiData = await openAiResponse.json();
    const result = JSON.parse(aiData.choices[0].message.content);

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: "Internal Server Error", message: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
