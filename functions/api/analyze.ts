export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { imageBase64, makeup, accessory, budget } = body;

    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No image provided" }), { status: 400 });
    }

    if (!env.OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY is not set. Returning mock response.");
      return new Response(JSON.stringify({
        tono_sugerido: "Cálido",
        confianza: "Media",
        subtono: "Otoño",
        contraste: "Medio",
        recomendacion_de_hoy: {
          prioridad_compra: "Un labial terracota para resaltar tu calidez natural.",
          labiales: [
            { nombre: "Velvet Teddy", precio_usd: 24, etiqueta: "Seguro", razon: "Nude cálido clásico", color_hex: "#B67C6E", amazon_search_query: "MAC Velvet Teddy lipstick" },
            { nombre: "Toast of New York", precio_usd: 10, etiqueta: "Favorito", razon: "Tono cálido vibrante", color_hex: "#9C3B2A", amazon_search_query: "Revlon Super Lustrous Toast of New York" },
            { nombre: "Amazonian", precio_usd: 12, etiqueta: "Punto", razon: "Ideal para la noche", color_hex: "#8A3B3C", amazon_search_query: "Tarte Amazonian Clay lipstick" }
          ],
          rubores: [
            { nombre: "Luminoso", precio_usd: 11, etiqueta: "Seguro", razon: "Efecto natural dorado", color_hex: "#F39F86", amazon_search_query: "Milani Baked Blush Luminoso" },
            { nombre: "Torrid", precio_usd: 32, etiqueta: "Favorito", razon: "Coral vibrante", color_hex: "#E87461", amazon_search_query: "NARS Blush Torrid" }
          ]
        },
        debug: { calidad_foto: "Regular", motivo_confianza: "Mock data" }
      }), { headers: { "Content-Type": "application/json" } });
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
            content: `Eres “ColorCompra”, un coach de compras basado en colorimetría personal (solo maquillaje facial).
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

REGLA DE PRESUPUESTO (OBLIGATORIO Y ESTRICTO):
El presupuesto seleccionado por el usuario es la regla MÁS IMPORTANTE. Debes filtrar TODAS las recomendaciones para que sus precios (precio_usd) caigan ESTRICTAMENTE dentro del rango seleccionado. NO DEBES recomendar NINGÚN producto fuera de este rango.
- Si el presupuesto es "<$10", TODOS los productos deben costar MENOS de 10 USD.
- Si el presupuesto es "$10-25", TODOS los productos deben costar ENTRE 10 y 25 USD.
- Si el presupuesto es "$25+", TODOS los productos deben costar MÁS de 25 USD.
- Esta regla es más importante que cualquier otra consideración. Si no encuentras un producto perfecto en el rango de precios, elige el mejor disponible DENTRO de ese rango.

CRITERIOS DE DECISIÓN
- amazon_search_query: Crea una frase de búsqueda para Amazon que sea lo más específica posible, incluyendo la marca y el nombre del producto exacto (ej: "MAC Velvet Teddy lipstick", "NARS Blush Orgasm").
- Si la foto es oscura, con luz amarilla, contraluz, desenfocada, con filtros o maquillaje fuerte: baja la confianza.
- Si hay señales mixtas o poca evidencia: usa tono Neutro y confianza Baja/Media (no inventes certeza).
- Usa las respuestas del usuario como “desempate”:
  - Dorado tiende a favorecer cálido; Plateado tiende a favorecer frío; No sé = neutro/mixto.
  - Natural favorece opciones suaves y “Seguro”; Intenso permite un “Punto” más atrevido.
- Etiquetas:
  - Seguro: bajo riesgo, favorece a la mayoría dentro del perfil, ideal diario.
  - Favorito: mejor match general (elige solo 1–2 por categoría como máximo).
  - Punto: opción más atrevida/ocasión, con un poco más de riesgo (máx 1 por categoría).
- Las “razones” deben ser específicas (subtono/contraste/efecto) y muy cortas (≤ 110 caracteres).

FORMATO DE SALIDA (OBLIGATORIO)
Responde SOLO con un JSON válido (sin markdown, sin texto extra) con esta estructura exacta:

{
  "tono_sugerido": "Cálido|Neutro|Frío",
  "confianza": "Baja|Media|Alta",
  "subtono": "Primavera|Verano|Otoño|Invierno",
  "contraste": "Bajo|Medio|Alto",
  "recomendacion_de_hoy": {
    "prioridad_compra": "<frase corta>",
    "labiales": [
      {"nombre":"...", "precio_usd": 0, "etiqueta":"Seguro|Favorito|Punto", "razon":"...", "color_hex": "#...", "amazon_search_query": "..."}
    ],
    "rubores": [
      {"nombre":"...", "precio_usd": 0, "etiqueta":"Seguro|Favorito|Punto", "razon":"...", "color_hex": "#...", "amazon_search_query": "..."}
    ]
  },
  "debug": {
    "calidad_foto": "Buena|Regular|Mala",
    "motivo_confianza": "<máx 200 caracteres>"
  }
}

REGLAS FINALES
- No incluyas links.
- No repitas el mismo producto.
- Cumple exactamente: Labiales=3, Rubores=2.
- Si la foto no permite análisis, devuelve confianza \"Baja\" y recomendaciones muy conservadoras (\"Seguro\") con razones de cautela.`
          },
          {
            role: "user",
            content: [
              { type: "text", text: `Mis preferencias son: accesorios ${accessory}, maquillaje ${makeup}, y presupuesto ${budget}` },
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

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
