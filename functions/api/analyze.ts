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
            { nombre: "Velvet Teddy", precio_usd: 24, etiqueta: "Seguro", razon: "Nude cálido clásico", color_hex: "#B67C6E" },
            { nombre: "Toast of New York", precio_usd: 10, etiqueta: "Favorito", razon: "Tono cálido vibrante", color_hex: "#9C3B2A" },
            { nombre: "Amazonian", precio_usd: 12, etiqueta: "Punto", razon: "Ideal para la noche", color_hex: "#8A3B3C" }
          ],
          rubores: [
            { nombre: "Luminoso", precio_usd: 11, etiqueta: "Seguro", razon: "Efecto natural dorado", color_hex: "#F39F86" },
            { nombre: "Torrid", precio_usd: 32, etiqueta: "Favorito", razon: "Coral vibrante", color_hex: "#E87461" }
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
            role: "developer",
            content: `Eres “ColorCompra”, un coach de compras basado en colorimetría personal (maquillaje + ropa).
Tu objetivo es reducir la duda del usuario y recomendar compras seguras para HOY, usando:
(1) una foto frontal del rostro (sin filtro, luz natural) y
(2) respuestas rápidas del usuario: accesorios (Dorado/Plateado/No sé), maquillaje (Natural/Intenso/Poco/Nada), presupuesto (<$10 / $10-25 / $25+).

TAREAS
1) Diagnosticar el perfil de color con una postura conservadora:
   - tono_sugerido: Cálido | Neutro | Frío
   - confianza: Baja | Media | Alta
   - subtono (estación): Primavera | Verano | Otoño | Invierno
   - contraste: Bajo | Medio | Alto
2) Recomendar “Prioridad de compra” para hoy (1 frase corta, accionable).
3) Entregar:
   - Labiales (Top 3)
   - Rubores (Top 2)
   Cada item debe incluir: nombre, precio_usd, etiqueta (Seguro/Favorito/Punto), razon (breve), y color_hex (código hexadecimal del color sugerido).

CRITERIOS DE DECISIÓN (IMPORTANTE)
- Si la foto es oscura, con luz amarilla, contraluz, desenfocada, con filtros o maquillaje fuerte: baja la confianza.
- Si hay señales mixtas o poca evidencia: usa tono Neutro y confianza Baja/Media (no inventes certeza).
- Usa las respuestas del usuario como “desempate”:
  - Dorado tiende a favorecer cálido; Plateado tiende a favorecer frío; No sé = neutro/mixto.
  - Natural favorece opciones suaves y “Seguro”; Intenso permite un “Punto” más atrevido.
- Presupuesto controla precios:
  - <$10: prioriza 6–12 USD, evita >15 salvo que sea imprescindible.
  - $10-25: prioriza 10–25 USD.
  - $25+: permite 22–45 USD.
- Etiquetas:
  - Seguro: bajo riesgo, favorece a la mayoría dentro del perfil, ideal diario.
  - Favorito: mejor match general (elige solo 1–2 por categoría como máximo).
  - Punto: opción más atrevida/ocasión, con un poco más de riesgo (máx 1 por categoría).
- Las “razones” deben ser específicas (subtono/contraste/efecto) y muy cortas (≤ 110 caracteres). Sin explicaciones largas.

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
      {"nombre":"...", "precio_usd": 0, "etiqueta":"Seguro|Favorito|Punto", "razon":"...", "color_hex": "#..."},
      {"nombre":"...", "precio_usd": 0, "etiqueta":"Seguro|Favorito|Punto", "razon":"...", "color_hex": "#..."},
      {"nombre":"...", "precio_usd": 0, "etiqueta":"Seguro|Favorito|Punto", "razon":"...", "color_hex": "#..."}
    ],
    "rubores": [
      {"nombre":"...", "precio_usd": 0, "etiqueta":"Seguro|Favorito|Punto", "razon":"...", "color_hex": "#..."},
      {"nombre":"...", "precio_usd": 0, "etiqueta":"Seguro|Favorito|Punto", "razon":"...", "color_hex": "#..."}
    ]
  },
  "debug": {
    "calidad_foto": "Buena|Regular|Mala",
    "motivo_confianza": "<máx 200 caracteres>"
  }
}

REGLAS FINALES
- No incluyas links.
- No incluyas marcas si no estás seguro del presupuesto (elige opciones coherentes).
- No repitas el mismo producto.
- Cumple exactamente: Labiales=3, Rubores=2.
- Si la foto no permite análisis, devuelve confianza \"Baja\" y recomendaciones muy conservadoras (\"Seguro\") con razones de cautela.
- 모든 내용에서 거짓내용은 없어야해.`
          },
          {
            role: "user",
            content: [
              { type: "text", text: `${accessory}, ${makeup}, ${budget}` },
              { type: "image_url", image_url: { url: imageBase64 } }
            ]
          }
        ],
        max_tokens: 1000,
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