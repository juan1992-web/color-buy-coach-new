export async function onRequestPost(context) {
  const { env, request } = context;

  try {
    const { imageBase64, accessory, makeup, budget } = await request.json();

    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No image provided" }), { status: 400 });
    }

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
El presupuesto seleccionado por el usuario es la regla MÁS IMPORTANTE. Debes filtrar TODAS las recomendaciones para que sus precios (precio_usd) caigan ESTRICTAMENTE dentro del rango seleccionado. NO DEBES recomendar NINGÚN producto fuera de este rango.
- Si el presupuesto es "<$10", TODOS los productos deben costar MENOS de 10 USD.
- Si el presupuesto es "$10-25", TODOS los productos deben costar ENTRE 10 y 25 USD.
- Si el presupuesto es "$25+", TODOS los productos deben costar MÁS de 25 USD.

FORMATO DE SALIDA (OBLIGATORIO)
Responde SOLO con un JSON válido (sin markdown, sin texto extra) con esta estructura exacta:
{
  "tono_sugerido": "Cálido|Neutro|Frío",
  "confianza": "Baja|Media|Alta",
  "subtono": "Primavera|Verano|Otoño|Invierno",
  "contraste": "Bajo|Medio|Alto",
  "recomendacion_de_hoy": {
    "prioridad_compra": "...",
    "labiales": [...],
    "rubores": [...]
  },
  "debug": {
    "calidad_foto": "...",
    "motivo_confianza": "..."
  }
}

Si la foto no permite análisis, devuelve confianza \"Baja\" y razones de cautela.`
          },
          {
            role: "user",
            content: [
              { type: "text", text: `Preferencias: accesorios ${accessory}, maquillaje ${makeup}, presupuesto ${budget}` },
              { type: "image_url", image_url: { url: imageBase64 } }
            ]
          }
        ],
        max_tokens: 1500,
        temperature: 0.1
      })
    });

    if (!openAiResponse.ok) {
      const err = await openAiResponse.text();
      return new Response(JSON.stringify({ error: "OpenAI API error", details: err }), { status: 500 });
    }

    const aiData = await openAiResponse.json();
    const messageContent = aiData.choices[0].message.content;
    
    let result;
    try {
      result = JSON.parse(messageContent);
    } catch(e) {
      const jsonMatch = messageContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
         result = JSON.parse(jsonMatch[0]);
      } else {
         throw new Error("Failed to parse AI response");
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
